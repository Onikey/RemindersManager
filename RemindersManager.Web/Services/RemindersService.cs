using Microsoft.EntityFrameworkCore;
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

		public RemindersService(ApplicationDbContext dbContext)
		{
			this.dbContext = dbContext;
		}

		public async Task<IEnumerable<Reminder>> GetAll(Guid authorId)
		{
			return await dbContext.Reminders.Where(x => !x.IsCancelled && x.AuthorId == authorId).ToListAsync();
		}

		public async Task<Reminder> GetById(Guid authorId, Guid reminderId)
		{
			return await dbContext.Reminders.FirstOrDefaultAsync(x => !x.IsCancelled && x.Id == reminderId && x.AuthorId == authorId);
		}

		public async Task<bool> Create(Guid authorId, string subject, string notes, DateTime date)
		{
			var reminder = new Reminder
			{
				AuthorId = authorId,
				Subject = subject,
				Notes = notes,
				RemindDate = date
			};

			dbContext.Reminders.Add(reminder);
			await dbContext.SaveChangesAsync();

			return true;
		}

		public async Task<bool> Update(Guid authorId, Guid reminderId, string subject, string notes, DateTime date)
		{
			var reminder = await dbContext.Reminders.FirstOrDefaultAsync(x => !x.IsCancelled && x.Id == reminderId && x.AuthorId == authorId);

			if (reminder == null)
			{
				return false;
			}

			reminder.Notes = notes;
			reminder.RemindDate = date;
			reminder.Subject = subject;

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
	}
}
