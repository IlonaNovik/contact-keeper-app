import React, { useState, useEffect } from 'react'

import { FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { filterContacts } from '../redux/contact-reducer'
import { useDispatch, useSelector } from 'react-redux';

const SearchField = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contact.contacts)

    const [text, setText] = useState("")

    useEffect(() => {
        if (text !== "") {
            let filter = contacts.filter(item => {
                if (item.first_name.toLowerCase().includes(text) ||
                    item.last_name.toLowerCase().includes(text) ||
                    item.email.toLowerCase().includes(text) ||
                    item.phone.toLowerCase().includes(text)) {
                    return item
                }
            })
            dispatch(filterContacts(filter))
        } else {
            dispatch(filterContacts(contacts))
        }
    }, [text])

    const handleChange = event => {
        setText(event.target.value)
    }
    return (
        <div>
            <FormControl fullWidth >
                <InputLabel htmlFor="standard-adornment-amount">Search Contact</InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value={text}
                    onChange={handleChange}
                    startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                />
            </FormControl>
        </div>
    )
}

export default SearchField
