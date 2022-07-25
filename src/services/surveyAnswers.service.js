import axios from 'axios';

const API_URL = 'http://localhost:8080/api/surveys/answers';


class SurveyAnswer {

  getAll(){
    return axios.get(API_URL);
  }

  create(name,sid, data) {
    return axios.post(API_URL+`?name=${name}&surveyId=${sid}`, data);
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

export default new SurveyAnswer();
