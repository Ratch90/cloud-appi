import React from 'react'
import {Card, CardActions, CardContent, Button, Typography} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {useDispatch} from 'react-redux';
import {getUsers,deleteUser} from '../../../redux/actions/users';

import useStyles from './styles';

const User = ({ user,setCurrentId }) => {

    
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleDelete = () => {
        dispatch(deleteUser(user.id));
        dispatch(getUsers());
    }

    return (
        <div>
            <Card className={classes.card}>
                <div className={classes.details}>
                    <Typography variant="body2">{user.id}</Typography>
                    <Typography className={classes.title} gutterBottom variant="h5" component="h2">{user.firstname} {user.lastname}</Typography>
                    <Typography variant="body2">{user.birthDate}</Typography>
                    
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{user.email}</Typography>
                <div className={classes.details}>
                    <Typography variant="body2">{user.address.street} {user.address.city} {user.address.country} {user.address.postalcode}</Typography>
                </div>
                <CardActions className={classes.cardActions}>
                    <Button 
                        size="small"
                        color="primary"
                        onClick={() => {setCurrentId(user.id)}}>
                        <EditIcon fontSize="small" />
                    </Button>
                    <Button 
                        size="small"
                        color="primary" onClick={handleDelete}>
                        <DeleteIcon fontSize="small" />
                    </Button>
                 </CardActions>
            </Card>
        </div>
       
    );
}

export default User;
