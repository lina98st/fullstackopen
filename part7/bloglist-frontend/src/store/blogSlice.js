import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updated = action.payload;
      return state.map((blog) =>
        blog.id !== updated.id ? blog : updated
      );
    },
  },
});

export const { setBlogs, appendBlog, updateBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogData) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogData);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    const returnedBlog = await blogService.update(blog.id, updatedBlog);
    dispatch(updateBlog(returnedBlog));
  };
};

export default blogSlice.reducer;
