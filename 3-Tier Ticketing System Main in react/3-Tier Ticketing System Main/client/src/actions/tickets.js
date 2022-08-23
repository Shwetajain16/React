import * as api from '../api/index.js';
import {FETCH_BY_SEARCH, CREATE,FETCH_ALL,UPDATE,DELETE} from '../constants/actionTypes';

export const createTicket = (ticket) => async (dispatch) => {
    try {
      const { data } = await api.createTicket(ticket);
  
      dispatch({ type: CREATE, payload: data });
    } catch (error) {
   
    }
  };


  export const getTickets = () => async (dispatch) => {
    try {
      const { data } = await api.fetchTickets();
     
      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
  
    }
  };

  export const updateTicket = (id, ticket) => async (dispatch) => {
    try {
      const { data } = await api.updateTicket(id, ticket);
  
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
  
    }
  };

  export const deletedTicket = (ticket) => async (dispatch)=>{
    try{
 
      const {data} = await api.deleteTicket(ticket);
      
      dispatch({type:DELETE,payload: data})
  
    }catch(error){

    }
  }

  export const getTicketsBySearch = (searchQuery) => async (dispatch) => {
    try {
      
     
      const {data} = await api.fetchTicketsBySearch(searchQuery);

      dispatch({ type: FETCH_BY_SEARCH, payload:  data  });
    
    } catch (error) {
  
    }
  };