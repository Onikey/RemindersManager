using RemindersManager.Web.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RemindersManager.Web.Services
{
	public interface IRemindersService
	{
		/// <summary>
		/// Get all author's reminders.
		/// </summary>
		/// <param name="authorId">Author's id.</param>
		/// <returns>Author's reminders.</returns>
		Task<IEnumerable<Reminder>> GetAll(Guid authorId);

		/// <summary>
		/// Get author's reminder by reminder's id.
		/// </summary>
		/// <param name="authorId">Author's id.</param>
		/// <param name="reminderId">Reminder's id.</param>
		/// <returns>Author's reminder.</returns>
		Task<Reminder> GetById(Guid authorId, Guid reminderId);

		/// <summary>
		/// Create reminder for author.
		/// </summary>
		/// <param name="authorId">Author's id.</param>
		/// <param name="subject">Reminder's subject.</param>
		/// <param name="notes">Reminder's title.</param>
		/// <param name="date">Reminder's date.</param>
		/// <returns>Return *true* if operation successful.</returns>
		Task<bool> Create(Guid authorId, string subject, string notes, DateTime date);

		/// <summary>
		/// Update author's reminder.
		/// </summary>
		/// <param name="authorId">Author's id.</param>
		/// <param name="reminderId">Reminder's id.</param>
		/// <param name="subject">Reminder's subject.</param>
		/// <param name="notes">Reminder's title.</param>
		/// <param name="date">Reminder's date.</param>
		/// <returns>Return *true* if operation successful.</returns>
		Task<bool> Update(Guid authorId, Guid reminderId, string subject, string notes, DateTime date);

		/// <summary>
		/// Mark reminder as canceled.
		/// </summary>
		/// <param name="authorId">Author's id.</param>
		/// <param name="reminderId">Reminder's id.</param>
		/// <returns>Return *true* if operation successful.</returns>
		Task<bool> Cancel(Guid authorId, Guid reminderId);

		/// <summary>
		/// Activate reminder.
		/// </summary>
		/// <param name="authorId">Author's id.</param>
		/// <param name="reminderId">Reminder's id.</param>
		/// <returns>Return *true* if operation successful.</returns>
		Task<bool> Activate(Guid authorId, Guid reminderId);

		/// <summary>
		/// Deactivate reminder.
		/// </summary>
		/// <param name="authorId">Author's id.</param>
		/// <param name="reminderId">Reminder's id.</param>
		/// <returns>Return *true* if operation successful.</returns>
		Task<bool> Deactivate(Guid authorId, Guid reminderId);
	}
}
