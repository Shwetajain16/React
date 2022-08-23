import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const signIn = (formData) => API.post('/user/signin', formData);

export const signUp = (formData) => API.post('/user/signup', formData);

export const createTicket = (newTicket) => API.post('/tickets', newTicket);

export const fetchTickets = () => API.get('/tickets');

export const updateTicket = (id, updatedTicket) => API.patch(`/tickets/${id}`, updatedTicket);

export const deleteTicket = (deleteTicket) =>API.post(`/tickets/delete`,deleteTicket);

export const fetchTicketsBySearch = (searchQuery) => API.get(`/tickets/search?searchQuery=${searchQuery.search || 'none'}`);
