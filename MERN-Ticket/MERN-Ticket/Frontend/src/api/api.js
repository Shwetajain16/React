import axios from 'axios';

const API = axios.create({baseURL: process.env.REACT_APP_BASE_URI});
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  return req;
  });

export const signIn = (formData) => API.post('/user/signin', formData);

export const signUp = (formData) => API.post('/user/signup', formData);

export const createTicket = (Tickets) => API.post('/tickets',Tickets);

export const fetchTickets = () => API.get('/tickets');

export const updateTicket = (id, updatedTicket) => API.patch(`/tickets/${id}`, updatedTicket);

export const deleteTicket = (_id) =>API.post(`/tickets/delete/${_id}`);

export const getTicket = async (_id) => {
  _id = _id || '';
  return await API.get(`/tickets/${_id}`);
}


