﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RemindersManager.Web.Data;

namespace RemindersManager.Web.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("RemindersManager.Web.Entities.Reminder", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("AuthorId");

                    b.Property<bool>("IsActive");

                    b.Property<bool>("IsCancelled");

                    b.Property<string>("Notes");

                    b.Property<DateTime>("RemindDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Subject");

                    b.HasKey("Id");

                    b.ToTable("Reminders");
                });
#pragma warning restore 612, 618
        }
    }
}
