import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostService from './PostService';

const initialState = {
  floodPosts: null,
  error: '',
  message: '',
  postDetails: {
    data: {},
    comments: {
      data: [],
      loading: true,
      message: '',
    },
    releatedPosts: {
      data: [],
      loading: true,
      message: '',
    },
    loading: true,
    message: '',
  },
  likePost: {
    data: {},
    error: '',
    message: '',
  },
};

export const getHomeFlood = createAsyncThunk('getHomeFloodPosts', async () => {
  try {
    const res = await PostService.getFloodPosts();
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
});
export const getSinglePost = createAsyncThunk(
  'getSinglePost',
  async (postId) => {
    try {
      const res = await PostService.getSinglePost(postId);
      return res.data.data;
    } catch (err) {
      console.err(err);
    }
  },
);
export const getSinglePostComments = createAsyncThunk(
  'getSinglePostComments',
  async (postId) => {
    try {
      const res = await PostService.getSinglePostComments(postId);
      return res.data.data;
    } catch (err) {
      console.err(err);
    }
  },
);
export const getCategoryReleatedPosts = createAsyncThunk(
  'getReleatedPosts',
  async ({ categoryId, postId }) => {
    try {
      const res = await PostService.getCategoryPosts(categoryId);
      const excludingCurrentPost = res.data.data.posts.filter(
        (post) => post._id !== postId,
      );
      return excludingCurrentPost;
    } catch (err) {
      console.err(err);
    }
  },
);

export const likePost = createAsyncThunk('likePost', async (postId) => {
  try {
    const res = await PostService.likePost(postId);
    console.log('zzzzz', res);
    return res.data;
  } catch (err) {
    console.err(err);
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomeFlood.pending, (state, action) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getHomeFlood.fulfilled, (state, action) => {
        state.loading = false;
        state.floodPosts = action.payload;
      })
      .addCase(getHomeFlood.rejected, (state, action) => {
        state.loading = false;
        state.error = 'An error occurred while featured categories';
      })
      .addCase(getSinglePost.pending, (state, action) => {
        state.postDetails.loading = true;
        state.postDetails.message = '';
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.postDetails.loading = false;
        state.postDetails.data = action.payload;
        state.postDetails.message = 'Post Details Fetched.';
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.postDetails.loading = false;
        state.postDetails.message = 'An error occurred while get post deatils';
      })
      .addCase(getSinglePostComments.pending, (state, action) => {
        state.postDetails.comments.loading = true;
        state.postDetails.comments.message = '';
      })
      .addCase(getSinglePostComments.fulfilled, (state, action) => {
        state.postDetails.comments.loading = false;
        state.postDetails.comments.data = action.payload;
        state.postDetails.comments.message = 'Post Details Fetched.';
      })
      .addCase(getSinglePostComments.rejected, (state, action) => {
        state.postDetails.comments.loading = false;
        state.postDetails.comments.message =
          'An error occurred while get post comments';
      })
      .addCase(getCategoryReleatedPosts.pending, (state, action) => {
        state.postDetails.releatedPosts.loading = true;
        state.postDetails.releatedPosts.message = '';
      })
      .addCase(getCategoryReleatedPosts.fulfilled, (state, action) => {
        state.postDetails.releatedPosts.loading = false;
        state.postDetails.releatedPosts.data = action.payload;
        state.postDetails.releatedPosts.message = 'Post Details Fetched.';
      })
      .addCase(getCategoryReleatedPosts.rejected, (state, action) => {
        state.postDetails.releatedPosts.loading = false;
        state.postDetails.releatedPosts.message =
          'An error occurred while get releated post comments';
      })
      .addCase(likePost.pending, (state, action) => {
        state.likePost.message = '';
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.likePost.data = action.payload;
        state.likePost.message = 'Post Details Fetched.';
      })
      .addCase(likePost.rejected, (state, action) => {
        state.likePost.error = 'An error occurred while like post';
      });
  },
});

export default postSlice.reducer;
