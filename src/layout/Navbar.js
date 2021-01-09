import React, { Fragment } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Link, Typography, Toolbar, AppBar } from '@material-ui/core';

import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
        },
    },
    title: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        },
    },
    link: {
        color: '#fff',
        marginRight: theme.spacing(2)

    }
}));

const Navbar = () => {
    const loggedIn = useSelector(state => state.auth.loggedIn)
    const classes = useStyles();

    const handleClick = () => {
        localStorage.removeItem("token")
    }


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <PermContactCalendarIcon className={classes.menuButton} />
                    <Typography variant="h6" className={classes.title}>
                        Contact Keeper
                    </Typography>
                    {loggedIn || localStorage.token ? (
                        <Link href="/login" variant="body2" className={classes.link} onClick={handleClick}>
                            <Grid spacing={1} container justify='flex-start' style={{ marginTop: '0px' }}>
                                <Grid item>
                                    Logout
                                    </Grid>
                                <Grid item>
                                    <ExitToAppIcon fontSize='small' />
                                </Grid>
                            </Grid>
                        </Link>
                    ) :
                        <Fragment>
                            <Link href="/login" variant="body2" className={classes.link}>
                                Login
                            </Link>
                            <Link href="/register" variant="body2" className={classes.link}>
                                Register
                            </Link>
                        </Fragment>
                    }

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;