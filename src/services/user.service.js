import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://ec2-3-15-46-217.us-east-2.compute.amazonaws.com/api/test/';

const USER_URL = 'http://ec2-3-15-46-217.us-east-2.compute.amazonaws.com/api/auth';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
  getGuestBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getAll(){
    return axios.get(USER_URL);
  }

  findUser(name){
    return axios.get(USER_URL + `?username=${name}`);
  }

  delete(id){
    return axios.delete(USER_URL + `/${id}`);
  }

  updateRole(id, data){
    return axios.put(USER_URL+ `/${id}`, data);
  }
}

export default new UserService();
