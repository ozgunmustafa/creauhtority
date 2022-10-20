import api from '../api';

class UserService {
  getUser(userId) {
    return api.get(`/users/${userId}`);
  }
  getUsersPosts(userId) {
    return api.get(`/users/${userId}/posts`);
  }
  getPopularUsers() {
    return api.get(`/users/popular`);
  }
}

export default new UserService();
