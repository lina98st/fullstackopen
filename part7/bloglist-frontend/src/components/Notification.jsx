import { useNotificationValue } from '../NotificationContext';

const Notification = () => {
  const notification = useNotificationValue();

  if (!notification) return null;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
