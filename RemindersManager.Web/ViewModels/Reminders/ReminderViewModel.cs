using System;

namespace RemindersManager.Web.ViewModels.Reminders
{
    public class ReminderViewModel
    {
        public string Subject { get; set; }

        public string Notes { get; set; }

        public DateTime RemindDate { get; set; }
    }
}
