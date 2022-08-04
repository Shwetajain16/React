import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  return req;
  });

export const signIn = (formData) => API.post('/user/signin', formData);

export const signUp = (formData) => API.post('/user/signup', formData);

export const createComplaint = (Complaint) => API.post('/complaint',Complaint);

export const fetchComplaint = () => API.get('/complaint');

export const updateComplaint = (id, updatedComplaint) => API.patch(`/complaint/${id}`,updatedComplaint);


export const deleteComplaint = (_id) =>API.post(`/complaint/delete/${_id}`);

export const getComplaint = async (_id) => {
  _id = _id || '';
  return await API.get(`/complaint/${_id}`);
}


