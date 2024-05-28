// services/api.js
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const API = axios.create({ baseURL: 'http://localhost:3001/api/v1' });

// API.interceptors.request.use((config) => {
//     const { token } = useAuth();
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

export const setAuthToken = (token) => {

    if (token) {
        API.defaults.headers.common['Authorization'] = token;
    } else {
        delete API.defaults.headers.common['Authorization'];
    }
};

// Auth
export const loginUser = async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    return response.data;
};
export const signupUser = (userData) => API.post('/auth/signup', userData);

// Profile
export const createProfile = (profileData) => API.post('/profile', profileData);

export const getPosts = async () => {


    try {
        const response = await API.get('/all-posts');

        console.log(response.data); // Do something with the data
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
};

export const fetchFollowedUsersPosts = async () => {
    const token = localStorage.getItem('token'); // or wherever you store your JWT
    setAuthToken(token);

    try {
        const response = await API.get('/followed-users-posts');
        console.log(response.data); // Do something with the data
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
};
// Posts
// export const getPosts = () => API.get('/all-posts');
// export const followed_users_posts = () => API.get('/followed-users-posts');
export const addPost = (postData) => API.post('/posts', postData);
export const likePost = (postId) => API.post(`/posts/${postId}/like`);
export const commentOnPost = (postId, comment) => API.post(`/posts/${postId}/comment`, { comment });

// User
export const followUser = (userId) => API.post(`/users/${userId}/follow`);
export const unfollowUser = (userId) => API.post(`/users/${userId}/unfollow`);
