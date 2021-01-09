import axiosInstance from '../helpers/axiosInstance'

const LOGIN_LOADING = 'LOGIN_LOADING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

const REGISTER_LOADING = 'REGISTER_LOADING';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_ERROR = 'REGISTER_ERROR';


const initialState = {
    loggedIn: false,
    loading: false,
    data: null,
    error: null,
    loginLoading: false,
    loginData: null,
    loginError: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            };
        case REGISTER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                data: null,
            };
        case LOGIN_LOADING:
            return {
                ...state,
                loginLoading: true,
                loginError: null
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loginLoading: false,
                loginData: action.payload,
                loginError: null,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loginLoading: false,
                loginError: action.payload,
                loginData: null,
            };
        default:
            return state;
    }
};

export const login = (user) => async (dispatch) => {
    dispatch({
        type: LOGIN_LOADING
    })
    const { username, password } = user;
    axiosInstance().post('auth/login/', {
        username,
        password
    })
        .then(res => {
            localStorage.token = res.data.token
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: LOGIN_ERROR,
                payload: err.data ? err.data : { detail: "Could not connect" }
            })
        })
};

export const register = (user) => async (dispatch) => {
    dispatch({
        type: REGISTER_LOADING
    })
    const { username, firstname: first_name, lastname: last_name, email, password } = user;
    axiosInstance().post('auth/register/', {
        username,
        first_name,
        last_name,
        email,
        password
    })
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: REGISTER_ERROR,
                payload: err.data ? err.data : { detail: "Could not connect" }
            })
        })
};

export default authReducer;