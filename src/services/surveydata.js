import http from "../http";
class SurveyData {
  getAll() {
    return http.get("/surveys");
  }

  createSurvey(name,data) {
    return http.post(`/surveys?title=${name}&UserId=1`, data);
  }
  get(id) {
    return http.get(`/surveys/${id}`);
  }

  update(id, name, data) {
    return http.put(`/surveys/${id}?title=${name}`, data);
  }
  delete(id) {
    return http.delete(`/surveys/${id}`);
  }
}

export default new SurveyData();