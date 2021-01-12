using ImportLog.Business.Notifications;
using System.Collections.Generic;

namespace ImportLog.Business.Intefaces
{
    public interface INotifier
    {
        bool HasNotification();
        List<Notification> GetNotifications();
        void Handle(Notification notification);
    }
}