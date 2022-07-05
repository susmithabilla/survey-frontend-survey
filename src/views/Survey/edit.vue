<template>
  <div id="surveyCreator" />
</template>

<script>
import { SurveyCreator } from "survey-creator-knockout";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import SurveyData from "../../services/surveydata";
const creatorOptions = {
  showLogicTab: true,
};
export default {
  name: "edit-survey-creator",
  props: ['id'],
  mounted() {
    const creator = new SurveyCreator(creatorOptions);
    console.log("iiiiiiii",this.id);
    if(this.id){
       SurveyData.get(this.id)
        .then(response => {
           console.log("respp",JSON.stringify(response.data["data"]));
           creator.text = JSON.stringify(response.data["data"]);
        })
    }
   
    creator.saveSurveyFunc = (saveNo, callback) => { 
      window.localStorage.setItem("survey-json", creator.text);
      callback(saveNo, true);
     
       SurveyData.update(this.id,creator.JSON.title, creator.text)
        .then(response => {
           this.$router.push('/admin');
        })
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