import axiosInstance from '../helpers/axiosInstance'

const LOADING = 'LOADING';
const SET_CURRENT = 'SET_CURRENT';
const GET_CONTACTS = 'GET_CONTACTS';
const ADD_CONTACT = 'ADD_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const DELETE_CONTACT = 'DELETE_CONTACT';
const FILTER_CONTACTS = 'FILTER_CONTACTS';

const initialState = {
    contacts: [],
    loading: false,
    current: null,
    filterContacts: []
}

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true,
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
            };
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false,
                filterContacts: action.payload
            };
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                filterContacts: [action.payload, ...state.filterContacts]
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                current: null,
                contacts: state.contacts.map(item => {
                    if (item.id === action.payload.id) {
                        return action.payload
                    }
                    return item
                }),
                filterContacts: state.filterContacts.map(item => {
                    if (item.id === action.payload.id) {
                        return action.payload
                    }
                    return item
                }),
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(item => item.id !== action.payload),
                filterContacts: state.filterContacts.filter(item => item.id !== action.payload),
            };
        case FILTER_CONTACTS:
            return {
                ...state,
                filterContacts: action.payload,
            };
        default:
            return state;
    }
};

export const setCurrent = (contact) => (dispatch) => {
    dispatch({
        type: SET_CURRENT,
        payload: contact
    })
};

export const getContacts = () => (dispatch) => {
    dispatch({
        type: LOADING,
    })

    axiosInstance().get('/contacts/')
        .then(res => {
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
};

export const addContact = (contact) => (dispatch) => {
    const { firstName: first_name, lastName: last_name, email, phone, isProfessional: is_professional } = contact;
    axiosInstance().post('/contacts/', {
        first_name,
        last_name,
        email,
        phone,
        is_professional
    })
        .then(res => {
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })
        })
        .catch(err => {
            console.error(err.response.data)
        })
};

export const updateContact = (contact) => (dispatch) => {
    const {
        id,
        firstName: first_name,
        lastName: last_name,
        email,
        phone,
        isProfessional: is_professional
    } = contact;

    axiosInstance().put(`/contacts/${id}`, {
        id,
        first_name,
        last_name,
        email,
        phone,
        is_professional
    })
        .then(res => {
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            })
        })
        .catch(err => {
            console.error(err.response)
        })
};

export const deleteContact = (id) => (dispatch) => {
    axiosInstance().delete(`/contacts/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            })
        })
        .catch(err => {
            console.error(err.response)
        })
};

export const filterContacts = (contacts) => (dispatch) => {
    dispatch({
        type: FILTER_CONTACTS,
        payload: contacts
    })
};




export default contactReducer;