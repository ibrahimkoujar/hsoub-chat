import axios from 'axios';

const Auth = {

    init: () => {
        let user = JSON.parse(localStorage.getItem('user'));
        let token = user !== null ? user.token : '';
        axios.defaults.headers.common['Authorization'] = token;
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

}

export default Auth;
