import React, { useState, useEffect } from 'react'

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

import {
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    OutlinedInput,
    InputAdornment,
    IconButton,
    InputLabel,
    FormControl,
    CircularProgress,
    Snackbar,
    FormHelperText
} from '@material-ui/core';

import { Visibility, VisibilityOff } from '@material-ui/icons'
import { register } from '../redux/auth-reducer'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2)
    }
}));

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

const RegisterPage = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading)
    const error = useSelector(state => state.auth.error)
    const data = useSelector(state => state.auth.data)

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const [values, setValues] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        showPassword: false
    });

    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (data != null) {
            setMessage("User registered succesfully! You can log in now.")
            setOpen(true)
            setErrors(null)
            setValues({
                username: '',
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                showPassword: false
            })
        }
        if (error != null) {
            setErrors(error)
        }

    }, [error, data])

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = () => {
        dispatch(register(values))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Container maxWidth='md'>
            <div className={classes.root}>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    onClose={handleClose}
                >
                    <Alert severity={error != null ? "error" : "success"}>
                        {message}
                    </Alert>
                </Snackbar>
                <Grid container spacing={3} justify='center' direction='column' alignContent='center'>
                    <Grid item >
                        <Typography variant='h4' align='center'>
                            Account <span style={{ color: '#4056a1' }}>Register</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            error={errors && Object.keys(errors).indexOf('username') > -1 ? true : false}
                            helperText={errors && Object.keys(errors).indexOf('username') > -1 ? errors.username[0] : null}
                            fullWidth
                            required
                            id="username"
                            label="User Name"
                            variant="outlined"
                            size='small'
                            value={values.username}
                            onChange={handleChange('username')}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            error={errors && Object.keys(errors).indexOf('first_name') > -1 ? true : false}
                            helperText={errors && Object.keys(errors).indexOf('first_name') > -1 ? errors.first_name[0] : null}
                            fullWidth
                            required
                            id="firstname"
                            label="First Name"
                            variant="outlined"
                            size='small'
                            value={values.firstname}
                            onChange={handleChange('firstname')}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            error={errors && Object.keys(errors).indexOf('last_name') > -1 ? true : false}
                            helperText={errors && Object.keys(errors).indexOf('last_name') > -1 ? errors.last_name[0] : null}
                            fullWidth
                            required
                            id="lastname"
                            label="Last Name"
                            variant="outlined"
                            size='small'
                            value={values.lastname}
                            onChange={handleChange('lastname')}
                        />
                    </Grid>
                    <Grid item >
                        <TextField
                            error={errors && Object.keys(errors).indexOf('email') > -1 ? true : false}
                            helperText={errors && Object.keys(errors).indexOf('email') > -1 ? errors.email[0] : null}
                            fullWidth
                            id="email"
                            label="Email"
                            variant="outlined"
                            size='small'
                            value={values.email}
                            onChange={handleChange('email')}
                        />
                    </Grid>
                    <Grid item>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel
                                htmlFor="outlined-adornment-password"
                                margin='dense'
                                error={errors && Object.keys(errors).indexOf('password') > -1 ? true : false}
                            >
                                Password
                            </InputLabel>
                            <OutlinedInput
                                error={errors && Object.keys(errors).indexOf('password') > -1 ? true : false}
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                size='small'
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility size='small' /> : <VisibilityOff size='small' />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                                margin='dense'
                            />
                            {errors && Object.keys(errors).indexOf('password') > -1 && (
                                <FormHelperText error id="component-error-text">{errors.password[0]}</FormHelperText>
                            )}

                        </FormControl>
                    </Grid>
                    <Grid item >
                        <Button
                            onClick={onSubmit}
                            variant="contained"
                            color="primary"
                            size='medium'
                            fullWidth
                            disabled={loading ? true : false}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Register'}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

export default RegisterPage
