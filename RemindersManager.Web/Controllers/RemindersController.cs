using Microsoft.AspNetCore.Mvc;
using RemindersManager.Web.Services;
using RemindersManager.Web.ViewModels.Reminders;
using System;
using System.Threading.Tasks;

namespace RemindersManager.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RemindersController : ControllerBase
	{
		private readonly IRemindersService reminderService;
		private static readonly Guid fakeAuthorId = new Guid("5C60F693-BEF5-E011-A485-80EE7300C695");

		public RemindersController(IRemindersService reminderService)
		{
			this.reminderService = reminderService;
		}

		// GET api/reminders
		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			return Ok(await reminderService.GetAll(fakeAuthorId));
		}

		// GET api/reminders/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetById(Guid id)
		{
			var reminder = await reminderService.GetById(fakeAuthorId, id);

			if (reminder == null)
			{
				return NotFound("Reminder not found");
			}

			return Ok(reminder);
		}

		// POST api/reminders
		[HttpPost]
		public async Task<IActionResult> Create([FromBody] ReminderViewModel model)
		{
			await reminderService.Create(fakeAuthorId, model.Subject, model.Notes, model.RemindDate);

			return Ok(new { Success = true, Text = "Reminder created" });
		}

		// PUT api/reminders/5
		[HttpPut("{id}")]
		public async Task<IActionResult> Update(Guid id, [FromBody] ReminderViewModel model)
		{
			var result = await reminderService.Update(fakeAuthorId, id, model.Subject, model.Notes, model.RemindDate);

			if (result)
			{
				return Ok(new { Success = true, Text = "Reminder updated" });
			}
			else
			{
				return NotFound("Reminder not found");
			}
		}

		// DELETE api/reminders/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(Guid id)
		{
			var result = await reminderService.Cancel(fakeAuthorId, id);

			if (result)
			{
				return Ok(new { Success = true, Text = "Reminder is cancelled" });
			}
			else
			{
				return BadRequest("Reminder not found or has been deleted.");
			}
		}

		// POST api/reminders/5/activate
		[HttpPost("{id}/activate")]
		public async Task<IActionResult> Activate(Guid id)
		{
			var result = await reminderService.Activate(fakeAuthorId, id);

			if (result)
			{
				return Ok(new { Success = true, Text = "Reminder is activated" });
			}
			else
			{
				return BadRequest("Reminder not found or has been activated.");
			}
		}

		// POST api/reminders/5/deactivate
		[HttpPost("{id}/deactivate")]
		public async Task<IActionResult> Deactivate(Guid id)
		{
			var result = await reminderService.Activate(fakeAuthorId, id);

			if (result)
			{
				return Ok(new { Success = true, Text = "Reminder is deactivated" });
			}
			else
			{
				return BadRequest("Reminder not found or has been deactivated.");
			}
		}
	}
}
