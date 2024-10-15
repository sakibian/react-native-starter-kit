import axios from 'axios';

const notificationsApi = {
  getAllNotifications: () => {
    return axios.get('/api/notifications');
  },
  // Other notification-related methods can be added here
};

export default notificationsApi;
