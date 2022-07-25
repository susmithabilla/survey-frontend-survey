<template>
  <div id="surveyCreator" />
</template>

<script>
import { SurveyCreator } from "survey-creator-knockout";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import SurveyData from "../../services/survey.service";

const creatorOptions = {
  showLogicTab: false,
  	showHeaderInEmptySurvey: true,
    haveCommercialLicense: true
};


export default {
  name: "survey-creator",
  mounted() {
    const creator = new SurveyCreator(creatorOptions);

    creator.saveSurveyFunc = (saveNo, callback) => { 
      // window.localStorage.setItem("survey-json", creator.text);
      callback(saveNo, true);
      
       var user = this.$store.state.auth.user;
        SurveyData.create(creator.JSON.title, creator.JSON,user.id, user.username)
        .then(response => {
           this.$router.push('/surveys');
        })
      // saveSurveyJson(
      //     "https://your-web-service.com/",
      //     creator.JSON,
      //     saveNo,
      //     callback
      // );
    };
    creator.render("surveyCreator");
    
  }
};

</script>
<style scoped>
#surveyCreator {
  height: 100vh;
  width: auto;
}

.svc-creator__banner{
  display:none !important;
}
</style>