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
    Snackbar,
    CircularProgress
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons'

import { useHistory } from 'react-router-dom'
import { login } from '../redux/auth-reducer'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2)
    },
}));

const Alert = (props) => (<MuiAlert elevation={6} variant="filled" {...props} />);

const LoginPage = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loginLoading)
    const error = useSelector(state => state.auth.loginError)
    const data = useSelector(state => state.auth.loginData)

    const history = useHistory();
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [message, setMessage] = useState("");
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false
    });

    useEffect(() => {
        if (error != null) {
            setMessage(error['detail'])
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [error])

    useEffect(() => {
        if (data != null) {
            history.push("/")
        }
        if (loading || values.username === "" || values.password === "") {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [data, loading, values])

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        if (values.username !== "" && values.password !== "") {
            setDisabled(false)
        }
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClick = () => {
        dispatch(login(values))
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
                    <Alert severity="error">
                        {message}
                    </Alert>
                </Snackbar>
                <Grid container spacing={3} justify='center' direction='column' alignContent='center'>
                    <Grid item >
                        <Typography variant='h4' align='center'>
                            User <span style={{ color: '#4056a1' }}>Login</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
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
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" margin='dense'>Password</InputLabel>
                            <OutlinedInput
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
                        </FormControl>
                    </Grid>
                    <Grid item >
                        <Button
                            onClick={handleClick}
                            variant="contained"
                            color="primary"
                            size='medium'
                            fullWidth
                            disabled={disabled}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Login'}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

export default LoginPage
