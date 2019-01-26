import axios from 'axios';

const Auth = {

    init: () => {
        let user = JSON.parse(localStorage.getItem('user'));
        axios.defaults.headers.common['Authorization'] = user !== null ? user.token : '';
    },

    login: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = user.token;
    },

    logout: () => {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('user');
    },

    auth: () => {
        return localStorage.getItem('user') !== null
    },

    guest: () => {
        return localStorage.getItem('user') === null
    },

    getToken: () => {
        let user = JSON.parse(localStorage.getItem('user'));
        return user !== null ? user.token : '';
    },

    getUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    },

};

export default Auth;
