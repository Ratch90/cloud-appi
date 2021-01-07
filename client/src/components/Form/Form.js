import React, { useState, useEffect } from 'react'
import {TextField, Button, Typography, Paper} from '@material-ui/core'
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {getUsers,createUser, updateUser} from '../../redux/actions/users';

const Form = ( {currentId,setCurrentId} ) => {

    const user = useSelector( (state) => currentId ? state.users.find((u) => u.id === currentId) : null);

    const [userData, setUserData] = useState({
        id : 0 , firstname : "", lastname : "", email: "", birthDate : "", address : {
            id : 0,
            street : "",
            city : "",
            country : "",
            postalcode : ""
        },
    
    });

    useEffect(() => {

        if (user) {
            setUserData(user);
        }
    },[user])

    const dispatch = useDispatch();

    const classes = useStyles();

    const handleSubmit = (e) => {

        e.preventDefault();

        if (currentId) {
            dispatch(updateUser(currentId,userData));
            dispatch(getUsers());
        }
        else {
            dispatch(createUser(userData));
        }
        
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setUserData({
            id : 0 , firstname : "", lastname : "", email: "", birthDate : "", address : {
                id : 0,
                street : "",
                city : "",
                country : "",
                postalcode : ""
            }});
    }

    const handleAddress = (e) => {
        const newAddress = {...userData.address , [e.target.name] : e.target.value};
        setUserData({...userData, address : newAddress});
        
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h5">{currentId ? 'Editing' : 'Adding'} a User</Typography>
                <TextField name="id" variant="outlined" label="User ID" fullWidth value={userData.id} onChange={ (e) => setUserData({...userData, id : Number(e.target.value)})} />
                <TextField name="firstname" variant="outlined" label="User First Name" fullWidth value={userData.firstname} onChange={ (e) => setUserData({...userData, firstname : e.target.value})} />
                <TextField name="lastname" variant="outlined" label="User Last Name" fullWidth value={userData.lastname} onChange={ (e) => setUserData({...userData, lastname : e.target.value})} />
                <TextField name="email" variant="outlined" label="User Email" fullWidth value={userData.email} onChange={ (e) => setUserData({...userData, email : e.target.value})} />
                <TextField name="birthDate" variant="outlined" label="User Birthdate" fullWidth value={userData.birthDate} onChange={ (e) => setUserData({...userData, birthDate : e.target.value})} />
                <Typography variant="h6">User Address</Typography>
                <TextField name="id" variant="outlined" label="Address ID" fullWidth value={userData.address.id} onChange={(e) => handleAddress(e)} />
                <TextField name="street" variant="outlined" label="Street" fullWidth value={userData.address.street} onChange={(e) => handleAddress(e)} />
                <TextField name="city" variant="outlined" label="City" fullWidth value={userData.address.city} onChange={(e) => handleAddress(e)} />
                <TextField name="country" variant="outlined" label="Country" fullWidth value={userData.address.country} onChange={(e) => handleAddress(e)} />
                <TextField name="postalcode" variant="outlined" label="Postal code" fullWidth value={userData.address.postalcode} onChange={(e) => handleAddress(e)} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>

    )
}

export default Form;
