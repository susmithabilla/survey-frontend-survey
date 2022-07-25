<template>

  <h2 class="text-center">{{ survey.title }}</h2>
  <div class="p-6 border border-gray-300 sm:rounded-md">
    <div v-for="(question, index) in questions" :key="index">
    <div class="option-section" v-if="question.type === 'text'">
     <label class="block mb-6">
        <span class="text-gray-700">{{ index + 1 }} : {{ question.title }}</span>
        <input :name="index" v-model="responses[index + 1]" type="text" class="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          " />
      </label>
    </div>
     <div class="option-section"  v-if="question.type === 'radiogroup'">
      <div class="mb-6">
        <span class="text-gray-700">{{ index + 1 }} : {{ question.title }}</span>
        <div class="mt-2">
          <div>
            <div class="items-center" v-for="choice in question.choices" :key="choice">
              
              <input :name="index" type="radio" v-model="responses[index + 1]" class="
                  text-indigo-600
                  border-gray-300
                  rounded-full
                  shadow-sm
                  focus:border-indigo-300
                  focus:ring
                  focus:ring-offset-0
                  focus:ring-indigo-200
                  focus:ring-opacity-50
                " />
              <span class="ml-2">{{choice}}</span>
            </div>
          </div>
        </div>
      </div>
     </div>
    
    </div>

    <div class="mb-6">
      <button type="submit" class="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          " @click="submitSurvey()">
        Submit
      </button>
    </div>
      
  </div>


</template>

<script>

import SurveyData from "../../services/survey.service";
import SurveyAnswer from "../../services/surveyAnswers.service";



export default {
  name: "view-survey",
  props: ['id'],
  mounted() {
    SurveyData.get(this.id)
      .then(response => {
        var a = new Array(response.data);
        let result = JSON.parse(JSON.stringify(a[0].data))

        this.survey = response.data;
        this.questions = response.data.data.pages[0].elements;
      })
  },
  watch: {
  },
  data() {

    return {
      survey: Object,
      questions: [],
      answer: "",
      responses: [],
    };
  },
  methods: {
    submitSurvey() {
      console.log("add to list", this.responses);
      var data ={
        response : this.responses
      }
       SurveyAnswer.create(this.survey.title,this.id,data)
        .then(response => {
           this.$router.push('/survey/submit-response');
        })
      
    }
  }
};
</script>


<style scoped>
</style>