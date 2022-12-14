import api from '../api';
class PostService {
  getFloodPosts() {
    return api.get('/posts');
  }
  getSinglePost(id) {
    return api.get(`/posts/${id}`);
  }
  getSinglePostComments(id) {
    return api.get(`/posts/${id}/comments`);
  }
  getCategoryPosts(categoryId) {
    return api.get(`/categories/${categoryId}`);
  }
  likePost(postId) {
    return api.get(`/posts/${postId}/like`);
  }
  createComment(postId) {
    return api.post(`/posts/${postId}/comments`)
  }
}

export default new PostService();
