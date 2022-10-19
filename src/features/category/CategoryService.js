import api from '../api';

class CategoryService {
  getAllCategories() {
    return api.get('/categories');
  }
  getFeaturedCategories() {
    return api.get('/categories/featured');
  }
  getPopularCategories() {
    return api.get('/categories/popular');
  }
  getSingleCategory(id) {
    return api.get(`/categories/${id}`);
  }
}

export default new CategoryService();
