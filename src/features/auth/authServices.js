import api, { apiWithHeader } from '../api';

class AuthService {
  registerUser(data) {
    return api.post('/auth/register', data);
  }
  loginUser(data) {
    return api.post('/auth/login', data);
  }
  verifyAuthToken(token) {
    return apiWithHeader.post('/auth/verify-token', token);
  }
}
export default new AuthService();
