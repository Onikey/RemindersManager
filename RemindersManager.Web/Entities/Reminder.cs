using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RemindersManager.Web.Entities
{
    public class Reminder
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Subject { get; set; }

        public string Notes { get; set; }

        public DateTime RemindDate { get; set; }

        public Guid AuthorId { get; set; }

        public bool IsActive { get; set; } = true;

        public bool IsCancelled { get; set; } = false;
    }
}
