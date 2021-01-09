import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Card,
    CardActions,
    CardActionArea,
    CardContent,
    Button,
    Chip
} from '@material-ui/core';

import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

import { useDispatch } from 'react-redux';
import { deleteContact, setCurrent } from '../redux/contact-reducer'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2)
    },
    icon: {
        marginTop: '5px',
        color: 'rgba(0, 0, 0, 0.54)'
    },
    chip: {
        fontSize: '12px'
    }
}));

const ContactCard = ({ contactData }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id, first_name: firstName, last_name: lastName, email, phone, is_professional: isProfessional } = contactData;

    const handleDelete = () => dispatch(deleteContact(id))
    const handleEdit = () => dispatch(setCurrent(contactData))

    return (
        contactData && (
            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent style={{ paddingBottom: '10px' }}>
                        <Grid container spacing={1} justify='flex-start'>
                            <Grid item >
                                <Typography gutterBottom component="h6">
                                    {firstName} {lastName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Chip
                                    label={isProfessional ? 'professional' : 'personal'}
                                    size='small'
                                    className={classes.chip}
                                    style={{ backgroundColor: !isProfessional ? "#4056a1" : '#38b000', color: '#fff' }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} direction="row" alignItems="center" >
                            <Grid item xs={1}>
                                <EmailIcon fontSize='small' className={classes.icon} />
                            </Grid>
                            <Grid item xs={11}>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {email}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <PhoneIcon fontSize='small' className={classes.icon} />
                            </Grid>
                            <Grid item xs={11}>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {phone}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={handleEdit}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        color='secondary'
                        style={{ color: '#fff' }}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </CardActions>
            </Card>
        )
    )
}

ContactCard.propTypes = {
    contactData: PropTypes.object.isRequired,
}

export default ContactCard;