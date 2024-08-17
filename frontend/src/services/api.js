// services/api.js
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';


const API = axios.create({ baseURL: 'https://socail-media-web-app.vercel.app/api/v1' });

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
export const signupUser = (userData) => API.post('/auth/sig̀nup', userData);

// Profile
export const createProfile = (profileData) => API.post('/profile', profileData);



export const getProfile = async (id) => {
    try {
        const response = await API.get(`/get-profile/?userId=${id}`);
        console.log(response.data); // Do something with the data
        return response.data;
    } catch (error) {
        console.error('Error in getProfile:', error);
    }
}
export const toggleFollow = async (id) => {
    const token = localStorage.getItem('token'); // or wherever you store your JWT
    setAuthToken(token);
    try {
        const response = await API.get(`/toggleFollow/${id}`);
        console.log(response.data); // Do something with the data
        return response.data;
    } catch (error) {
        console.error('Error in toggleFollow:', error);
        alert(error)
    }
}

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

export const addPostApi = async (formData) => {
    const token = localStorage.getItem('token'); // or wherever you store your JWT
    setAuthToken(token);

    try {
        const response = await API.post('/createPost');
        console.log(response.data)

        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }

}

// Function to create a new post
export const createPost = async (productData) => {
    const token = localStorage.getItem('token'); // or wherever you store your JWT
    setAuthToken(token);
    try {
        const response = await API.post('/createPost', productData);
        console.log("response", response)
        const data = await response.data;
        return data;
    } catch (err) {
        console.error(err);
        throw new Error('Error creating post');
    }
};

// like post 

export const likePost = async (id) => {
    const token = localStorage.getItem('token'); // or wherever you store your JWT
    setAuthToken(token);

    try {
        const response = await API.post(`/post/${id}`)

        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }

}

export const uploadStory = async (id) => {
    const token = localStorage.getItem('token'); // or wherever you store your JWT
    setAuthToken(token);

    try {
        const response = await API.post('/addstory')

        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }

}

export const fetchStories = async () => {
    const token = localStorage.getItem('token'); // or wherever you store your JWT
    setAuthToken(token);

    try {
        const response = await API.get('/stories/following');
        console.log("fetchStories", response.data); // Do something with the data
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
};

export const addProfile = async (formData) => {
    const token = localStorage.getItem('token'); // or wherever you store your JWT
    setAuthToken(token);

    try {
        const response = await API.post('/profile')

        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }

}



export const addPost = (postData) => API.post('/posts', postData);
// export const likePost = (postId) => API.post(`/posts/${postId}/like`);
export const commentOnPost = (postId, comment) => API.post(`/posts/${postId}/comment`, { comment });

// User
export const followUser = (userId) => API.post(`/users/${userId}/follow`);
export const unfollowUser = (userId) => API.post(`/users/${userId}/unfollow`);
