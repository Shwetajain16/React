import {
    FETCH_BY_SEARCH,
    CREATE,
    FETCH_ALL,
    UPDATE,
    DELETE,
  } from "../constants/actionTypes";
  
  export default (tickets = [], action) => {
    switch (action.type) {
      case FETCH_ALL:
        return action.payload;
  
      case CREATE:
        return [action.payload,...tickets];
  
      case UPDATE:
        return tickets.map((ticket) =>
          ticket._id === action.payload._id ? action.payload : ticket
        );
      case DELETE:
        return tickets.map((ticket) =>
          ticket._id === action.payload._id ? action.payload : ticket
        );
  
      case FETCH_BY_SEARCH:
        return action.payload;
      default:
        return tickets;
    }
  };
  