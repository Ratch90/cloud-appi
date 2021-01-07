/* eslint-disable import/no-anonymous-default-export */
export default (state = [],action) => {
    switch (action.type) {
        case 'FETCH_ALL':
             return action.payload
        case 'CREATE' : 
             return [...state, action.payload]
        case 'UPDATE' : 
             return state.map((user) => user.id === action.payload.id ? action.payload : user)
        case 'DELETE' : 
             return state.filter((user) => user.id !== action.payload.id)
        default:
            return state;
    }
 }