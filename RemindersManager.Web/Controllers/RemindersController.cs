using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RemindersManager.Web.Data;
using RemindersManager.Web.Entities;
using RemindersManager.Web.ViewModels.Reminders;

namespace RemindersManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RemindersController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IMapper mapper;
        private static readonly Guid fakeAuthorId = new Guid("5C60F693-BEF5-E011-A485-80EE7300C695");

        public RemindersController(ApplicationDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        // GET api/reminders
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await dbContext.Reminders.Where(x => !x.IsCancelled && x.AuthorId == fakeAuthorId).ToListAsync());
        }

        // POST api/reminders
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ReminderViewModel model)
        {
            var reminder = mapper.Map<Reminder>(model);
            reminder.Id = fakeAuthorId;

            dbContext.Reminders.Add(reminder);
            await dbContext.SaveChangesAsync();

            return Ok("Reminder created.");
        }

        // PUT api/reminders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ReminderViewModel model)
        {
            var reminder = await dbContext.Reminders.FindAsync(id);

            if (reminder == null)
            {
                return NotFound("Reminder not found");
            }

            reminder.Notes = model.Notes;
            reminder.RemindDate = model.RemindDate;
            reminder.Subject = model.Subject;
            await dbContext.SaveChangesAsync();

            return Ok("Reminder updated");
        }

        // DELETE api/reminders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var reminder = await dbContext.Reminders.FindAsync(id);

            if (reminder == null)
            {
                return NotFound("Reminder not found");
            }

            reminder.IsCancelled = true;
            await dbContext.SaveChangesAsync();

            return Ok("Reminder updated");
        }

        // POST api/reminders/5/activate
        [HttpPost("{id}/activate")]
        public async Task<IActionResult> Activate(Guid id)
        {
            var reminder = await dbContext.Reminders.FindAsync(id);

            if (reminder == null)
            {
                return NotFound("Reminder not found");
            }

            reminder.IsActive = true;
            await dbContext.SaveChangesAsync();

            return Ok("Reminder activated.");
        }

        // POST api/reminders/5/deactivate
        [HttpPost("{id}/deactivate")]
        public async Task<IActionResult> Deactivate(Guid id)
        {
            var reminder = await dbContext.Reminders.FindAsync(id);

            if (reminder == null)
            {
                return NotFound("Reminder not found");
            }

            reminder.IsActive = false;
            await dbContext.SaveChangesAsync();

            return Ok("Reminder activated.");
        }
    }
}
