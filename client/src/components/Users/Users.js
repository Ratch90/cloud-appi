import React from 'react'
import User from './User/User'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux';
import useStyles from './styles'

const Users = ( {setCurrentId} ) => {

    const classes = useStyles();

    const users = useSelector((state) => state.users) || [];

      
    return (
        users.length < 1 ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {users.map((user) => (
                    <Grid item key={user.id} xs={12} sm={6} md={6}>
                        <User user={user} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Users;
