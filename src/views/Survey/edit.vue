<template>
  <div class="content" id="surveyCreator" />
</template>

<script>
import { SurveyCreator } from "survey-creator-knockout";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import SurveyData from "../../services/survey.service";

const creatorOptions = {
  showLogicTab: true,
  haveCommercialLicense: true
};

var defaultJSON = {
  pages: [
    {
      name: 'page1',
      elements: [
        {
          type: 'text',
          name: "q1"
        }
      ]
    }
  ]
};

export default {
  name: "edit-survey-creator",
  props: ['id'],
   data() {
        return {
            survey: Object,
        };
    },
  mounted() {
    const creator = new SurveyCreator(creatorOptions);
    if (this.id) {
      SurveyData.get(this.id)
        .then(response => {
          creator.text = JSON.stringify(response.data["data"]);
        })
    }

    creator.saveSurveyFunc = (saveNo, callback) => {
      callback(saveNo, true);
      var u = this.$store.state.auth.user;
      SurveyData.update(this.id, creator.JSON.title,creator.JSON,u.id, u.username)
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

.svc-creator__banner {
  display: none !important;
}
</style>