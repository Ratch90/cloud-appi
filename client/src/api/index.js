import axios from 'axios';

const url = 'http://localhost:8080/users';

export const fetchUsers = () => axios.get(url);

export const createUser = (newUser) => axios.post(url,newUser);

export const updateUser = (id, updatedUser) => axios.put(`${url}/${id}`,updatedUser);

export const deleteUser = (id) => axios.delete(`${url}/${id}`);