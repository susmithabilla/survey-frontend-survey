<template>

  <h1 class="text-center">{{ survey.title }}</h1>
  <div class="p-8 border border-gray-300 sm:rounded-md" style="
    margin-left: 15%;
    margin-right: 15%;">
    <div v-for="(question, index) in questions" :key="index">
      <label class="block mb-6">
        <span class="text-gray-700">{{ index + 1 }} : {{ question.title }}</span>
      </label>

      <div class="option-section" v-if="question.type === 'text'">
        <div class="mb-6 mt-2">
          <input :name="index" v-model="responses[`${index + 1} || ${question.type} || ${question.title} `]" type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="" required>
        </div>

      </div>
      <div class="option-section" v-if="question.type === 'radiogroup'">

        <div class="mb-6 mt-2">

          <div class="items-center" v-for="choice in question.choices" :key="choice">

            <input :name="choice" :value="choice"
              v-model="responses[`${index + 1}||${question.type} ||${question.title} || ${choice}`]" type="radio" class="
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
            <span class="ml-2">{{ choice }}</span>
          </div>


        </div>
      </div>
      <div class="option-section" v-if="question.type === 'dropdown'">

        <div class="mb-6 mt-2">
          <select id="countries" :name="index"
            v-model="responses[`${index + 1} || ${question.type} ||${question.title} `]"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>

      </div>
      <div class="option-section" v-if="question.type === 'checkbox'">
        <div class="mb-6">

          <div class="mt-2">
            <div>
              <div class="items-center" v-for="(choice, i) in question.choices" :key="i">
                <div class="flex items-center mb-4">
                  <input id="default-checkbox" type="checkbox" :name="choice" :value="choice"
                    v-model="responses[`${index + 1} ||${question.type} || ${question.title} || ${choice}`]"
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label :for="choice" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
                      choice
                  }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="option-section"  v-if="question.type === 'rating'">
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
     </div> -->

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
import surveyResponseObj from "./surveyResponse.json";



export default {
  name: "view-survey",
  props: ['id'],
  mounted() {
    SurveyData.get(this.id)
      .then(response => {
        var a = new Array(response.data);
        let result = JSON.parse(JSON.stringify(a[0].data));
        this.survey = response.data;
        console.log("Surveyy..", this.survey);
        this.questions = response.data.data.pages[0].elements;
        console.log("questionsss..", this.questions);
      })
  },
  computed: {

  },
  watch: {
  },
  data() {

    return {
      survey: Object,
      questions: [],
      answer: "",
      responses: [],
      userResponse: surveyResponseObj,
      answer: ''
    };
  },
  methods: {
    radioBtnValue(event, index, question) {
      console.log("radioooooooo", event.target);
      console.log("radioooooooo1111111", event.target.value);
      this.responses[`${index + 1} || ${question.title} `] = event.target.value;

    },
    handleAnswer(e) {
      console.log('answer event ftw', e);
      // this.answers[this.currentQuestion]=e.answer;
      // if((this.currentQuestion+1) === this.questions.length) {
      //   this.handleResults();
      //   this.questionStage = false;
      //   this.resultsStage = true;
      // } else {
      //   this.currentQuestion++;
      // }
    },
    submitSurvey() {
      this.surveyResponse = JSON.parse(JSON.stringify(this.responses));
      console.log("---------", this.responses);
      console.log("add to list", this.userResponse);
      let a = [];

      var t = this.responses;
      for (var f in t) {
        let q = f.split("||");
        if (q[1].trim() == "checkbox") {

          a.push({

            answer: q[3],
            question: q[2],
            type: q[1],
            questionNumber: q[0]
          })

        }
        else if (q[1].trim() == "radiogroup") {
          a.push({

            answer: q[3],
            question: q[2],
            type: q[1],
            questionNumber: q[0]
          })

        }
        else if (q[1].trim() == "text") {

          a.push({

            answer: this.responses[f],
            question: q[2],
            type: q[1],
            questionNumber: q[0]
          })

        }
      }
      console.log("zzzzzzzzzzzzzz", a);

      const count = a.reduce(function (acc, curr) {
        if (acc[curr.questionNumber]) {
          acc[curr.questionNumber] = ++acc[curr.questionNumber]
        }
        else {
          acc[curr.questionNumber] = 1
        }
        return acc;
      }, {})

      let fA = [];
      Object.entries(count).map(item => {
        if (item[1] > 1) {
          let rr = a.filter(obj => obj.questionNumber == item[0])
          let string1 = rr.map(obj => obj.answer).join(',')
          rr[0].answer = string1;
          fA.push(rr[0])
        }
        else {
          fA.push(a.filter(obj => obj.questionNumber == item[0])[0])
        }
      })

      console.log(fA)

      SurveyAnswer.create(this.survey.title, this.id, fA)
        .then(response => {
          this.$router.push('/survey/submit-response');
        })

    }
  }
};
</script>


<style scoped>
</style>