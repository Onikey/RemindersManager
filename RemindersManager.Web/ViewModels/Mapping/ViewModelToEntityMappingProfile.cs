using AutoMapper;
using RemindersManager.Web.Entities;
using RemindersManager.Web.ViewModels.Reminders;

namespace RemindersManager.Web.ViewModels.Mapping
{
    public class ViewModelToEntityMappingProfile : Profile
    {
        public ViewModelToEntityMappingProfile()
        {
            CreateMap<ReminderViewModel, Reminder>();
        }
    }
}
