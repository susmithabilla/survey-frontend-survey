<template>
  <div class="container">
    <h2>Surveys</h2>
   <button type="button" class="btn btn-outline-primary" @click="createSurvey">Add New Survey</button>
   <Surveys />
  </div>
</template>

<script>
// import UserService from '../services/user.service';
import Surveys from './Survey/listsurvey.vue';
import SurveyData from "../services/surveydata";

export default {
  name: 'Admin',
  data() {
    return {
      content: '',
       surveys: [],
    };
  },
  components: { Surveys},
  mounted() {
   this.getAllSurveys();
  },
   methods: {
    createSurvey(){
       this.$router.push('/survey');
    },
    getAllSurveys(){
       SurveyData.getAll()
        .then(response => {
          this.surveys = response.data;
          console.log("survey..",response.data);
        })
   }
   }
};
</script>
