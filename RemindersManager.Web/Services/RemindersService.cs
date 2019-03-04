using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RemindersManager.Web.Data;
using RemindersManager.Web.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RemindersManager.Web.Services
{
	public class RemindersService : IRemindersService
	{
		private readonly ApplicationDbContext dbContext;
		private readonly IBackgroundTaskQueue queue;
		private readonly IServiceProvider services;

		public RemindersService(ApplicationDbContext dbContext, IBackgroundTaskQueue queue, IServiceProvider services)
		{
			this.dbContext = dbContext;
			this.queue = queue;
			this.services = services;
		}

		public async Task<IEnumerable<Reminder>> GetAll(Guid authorId)
		{
			return await dbContext.Reminders
				.Where(x => !x.IsCancelled && x.AuthorId == authorId)
				.Select(x => new Reminder
				{
					Id = x.Id,
					Subject = x.Subject,
					Notes = x.Notes,
					RemindDate = x.RemindDate.ToLocalTime()
				})
				.ToListAsync();
		}

		public async Task<Reminder> GetById(Guid authorId, Guid reminderId)
		{
			return await dbContext.Reminders
				.Where(x => !x.IsCancelled && x.Id == reminderId && x.AuthorId == authorId)
				.Select(x => new Reminder
				{
					Id = x.Id,
					Subject = x.Subject,
					Notes = x.Notes,
					RemindDate = x.RemindDate.ToLocalTime()
				})
				.FirstOrDefaultAsync();
		}

		public async Task<bool> Create(Guid authorId, string subject, string notes, DateTime date)
		{
			var reminder = new Reminder
			{
				AuthorId = authorId,
				Subject = subject,
				Notes = notes,
				RemindDate = date.ToUniversalTime()
			};

			dbContext.Reminders.Add(reminder);
			await dbContext.SaveChangesAsync();

			AddRemindToQueue(reminder);

			return true;
		}

		public async Task<bool> Update(Guid authorId, Guid reminderId, string subject, string notes, DateTime date)
		{
			var reminder = await dbContext.Reminders.FirstOrDefaultAsync(x => !x.IsCancelled && x.Id == reminderId && x.AuthorId == authorId);

			if (reminder == null)
			{
				return false;
			}

			reminder.Subject = subject;
			reminder.Notes = notes;
			reminder.RemindDate = date.ToUniversalTime();

			await dbContext.SaveChangesAsync();

			return true;
		}

		public async Task<bool> Cancel(Guid authorId, Guid reminderId)
		{
			var reminder = await dbContext.Reminders.FirstOrDefaultAsync(x => !x.IsCancelled && x.Id == reminderId && x.AuthorId == authorId);

			if (reminder == null)
			{
				return false;
			}

			reminder.IsCancelled = true;

			await dbContext.SaveChangesAsync();

			return true;
		}

		public async Task<bool> Activate(Guid authorId, Guid reminderId)
		{
			var reminder = await dbContext.Reminders.FirstOrDefaultAsync(x => !x.IsCancelled && !x.IsActive && x.Id == reminderId && x.AuthorId == authorId);

			if (reminder == null)
			{
				return false;
			}

			reminder.IsActive = true;

			await dbContext.SaveChangesAsync();

			return true;
		}

		public async Task<bool> Deactivate(Guid authorId, Guid reminderId)
		{
			var reminder = await dbContext.Reminders.FirstOrDefaultAsync(x => !x.IsCancelled && x.IsActive && x.Id == reminderId && x.AuthorId == authorId);

			if (reminder == null)
			{
				return false;
			}

			reminder.IsActive = true;

			await dbContext.SaveChangesAsync();

			return true;
		}

		private void AddRemindToQueue(Reminder reminder)
		{
			//no need to send remind
			if (!reminder.IsActive || reminder.IsCancelled)
			{
				return;
			}

			queue.QueueBackgroundWorkItem(async token =>
			{
				var timeout = reminder.RemindDate - DateTime.UtcNow;

				if (timeout.TotalSeconds > 0)
				{
					await Task.Delay(timeout, token);
				}

				using (var scope = services.CreateScope())
				{
					var remindersService =
						scope.ServiceProvider
							.GetRequiredService<RemindersService>();

					//get actual data
					reminder = await remindersService.GetById(reminder.AuthorId, reminder.Id);

					//no need to send remind
					if (!reminder.IsActive || reminder.IsCancelled)
					{
						return;
					}

					// todo send notification

					await remindersService.Deactivate(reminder.AuthorId, reminder.Id);
				}
			});
		}
	}
}
