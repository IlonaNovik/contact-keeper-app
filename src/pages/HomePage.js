import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, LinearProgress } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../redux/contact-reducer'

import ContactCard from "../components/ContactCard";
import ContactForm from "../components/ContactForm";
import SearchField from "../components/SearchField";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2)
    }
}));

const HomePage = () => {
    const dispatch = useDispatch();
    const filterContacts = useSelector(state => state.contact.filterContacts)
    const loading = useSelector(state => state.contact.loading)

    const classes = useStyles();

    useEffect(() => {
        dispatch(getContacts());

        // eslint-disable-next-line
    }, [])

    return (
        <Container maxWidth='md'>
            <div className={classes.root}>
                <Grid container spacing={3} justify='space-between'>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <ContactForm />
                    </Grid>
                    {loading ?
                        (<Grid item xs={12} sm={6} md={6} lg={6}>
                            <LinearProgress />
                        </Grid>)
                        :
                        (<Grid item xs={12} sm={6} md={6} lg={6}>
                            <SearchField />
                            {filterContacts.map((item, index) => (
                                <ContactCard key={index} contactData={item} />
                            ))}
                        </Grid>)
                    }
                </Grid>
            </div>
        </Container>
    )
}

export default HomePage;