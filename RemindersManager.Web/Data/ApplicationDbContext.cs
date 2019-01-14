using Microsoft.EntityFrameworkCore;
using RemindersManager.Web.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RemindersManager.Web.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Reminder>();
                //.HasOne(x => x.Author)
                //.WithMany()
                //.HasForeignKey(x => x.AuthorId);
            builder.Entity<Reminder>()
                .Property(x => x.RemindDate)
                .HasColumnType("datetime2");
        }

        public DbSet<Reminder> Reminders { get; set; }
    }
}
