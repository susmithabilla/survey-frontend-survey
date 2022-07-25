import axios from 'axios';

const API_URL = 'http://localhost:8080/api/surveys';


class SurveyService {

  getAll(){
    return axios.get(API_URL);
  }

  create(title,data,uid,name) {
    return axios.post(API_URL+`?title=${title}&userId=${uid}&username=${name}`, data);
  }
  get(sid) {
    return axios.get(API_URL+`/${sid}`);
  }

  update(sid,title,data, uid, name) {
    return axios.put(API_URL+`/${sid}?title=${title}&userId=${uid}&username=${name}`, data);
  }
  delete(id) {
    return axios.delete(API_URL+`/${id}`);
  }

  findSurvey(title){
    return axios.get(API_URL + `?title=${title}`);
  }
}

export default new SurveyService();
