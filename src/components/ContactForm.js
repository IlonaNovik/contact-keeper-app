import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact, setCurrent } from '../redux/contact-reducer'

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2)
    },
    title: {
        marginTop: theme.spacing(2)
    },
}));

const ContactForm = () => {
    const dispatch = useDispatch();
    const current = useSelector(state => state.contact.current)

    const classes = useStyles();
    const [disabled, setDisabled] = useState(true)
    const [inputValues, setInputValues] = useState({
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        isProfessional: false
    })

    useEffect(() => {
        if (current) {
            setDisabled(false)
            setInputValues({
                id: current.id,
                firstName: current.first_name,
                lastName: current.last_name,
                email: current.email,
                phone: current.phone,
                isProfessional: current.is_professional
            })
        }
    }, [current])

    const handleChange = (prop) => (event) => {
        setInputValues({ ...inputValues, [prop]: event.target.value });
        if (inputValues.firstName !== "" && inputValues.lastName !== "" &&
            inputValues.email !== "" && inputValues.phone !== "") {
            setDisabled(false)
        }
    };

    const handleRadioChange = (event) => {
        event.target.value === "professional" ?
            setInputValues({ ...inputValues, isProfessional: true })
            :
            setInputValues({ ...inputValues, isProfessional: false })
    }

    const handleClick = (prop) => () => {
        prop === 'add' ? dispatch(addContact(inputValues)) : dispatch(updateContact(inputValues))
        setInputValues({
            id: null,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            isProfessional: false
        })
        setDisabled(true)
    }

    const handleClear = () => {
        dispatch(setCurrent(null))
        setInputValues({
            id: null,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            isProfessional: false
        })
        setDisabled(true)
    }

    return (
        <Grid container spacing={2} direction='column'>
            <Grid item>
                <Typography variant='h5' align='center' className={classes.title}>
                    Add <span style={{ color: '#4056a1' }}>Contact</span>
                </Typography>
            </Grid>
            <Grid item>
                <TextField
                    size='small'
                    fullWidth
                    value={inputValues.firstName}
                    id="firstName"
                    label="firstName"
                    variant="outlined"
                    onChange={handleChange('firstName')}
                />
            </Grid>
            <Grid item>
                <TextField
                    size='small'
                    fullWidth
                    value={inputValues.lastName}
                    id="lastName"
                    label="lastName"
                    variant="outlined"
                    onChange={handleChange('lastName')}
                />
            </Grid>
            <Grid item>
                <TextField
                    size='small'
                    fullWidth
                    value={inputValues.email}
                    id="Email"
                    label="Email"
                    variant="outlined"
                    onChange={handleChange('email')}
                />
            </Grid>
            <Grid item>
                <TextField
                    size='small'
                    fullWidth
                    value={inputValues.phone}
                    id="Phone"
                    label="Phone"
                    variant="outlined"
                    onChange={handleChange('phone')}
                />
            </Grid>
            <Grid item>
                <FormControl component="fieldset">
                    <FormLabel component="legend" style={{ color: 'rgba(0, 0, 0, 0.54)' }} disabled>Contact type</FormLabel>
                    <RadioGroup
                        aria-label="contactType"
                        name="customized-radios"
                        row
                        value={inputValues.isProfessional ? "professional" : 'personal'}
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel value='personal' control={<Radio size='small' color='primary' />} label="Personal" />
                        <FormControlLabel value="professional" control={<Radio size='small' color='primary' />} label="Professional" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item>
                <Button
                    variant='contained'
                    color="primary"
                    size='medium'
                    onClick={handleClick(current ? "update" : "add")}
                    disabled={disabled}
                    fullWidth
                >
                    {current ? 'Update Contact' : 'Add Contact'}
                </Button>
            </Grid>
            {current && (
                <Grid item>
                    <Button
                        variant='contained'
                        color="default"
                        size='medium'
                        onClick={handleClear}
                        disabled={disabled}
                        fullWidth
                    >
                        Clear
                    </Button>
                </Grid>
            )}
        </Grid>
    )
}

export default ContactForm
