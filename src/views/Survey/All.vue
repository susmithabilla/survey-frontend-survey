<template>
  <!-- component -->
  <!-- This is an example component -->
  <h1 v-if="!surveys.length">No Surveys found</h1>
  <div v-else class="max-w-6xl mx-auto">

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="p-4">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"></path>
            </svg>
          </div>
          <input type="text" id="table-search" v-model="search" @input="searchOnTable"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by title..">
        </div>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              S. No
            </th>

            <th scope="col" class="px-6 py-3">
              Title
            </th>
            <th scope="col" class="px-6 py-3">
              Created_by
            </th>
             <th scope="col" class="px-6 py-3">
              Created_on
            </th>
            <th scope="col" class="px-6 py-3">

            </th>

          </tr>
        </thead>
        <tbody v-for="(survey,i) in surveys" :key="survey.id" :survey="survey">
          <!-- <tr v-if="survey.id != currentUser.id" -->
           
             <tr v-if="isSuperAdmin" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4"> 
              {{i+1}}             
            </td>

            <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {{ survey.title }}
            </td>
            <td class="px-6 py-4">
              {{ survey.username }}
            </td>
             <td class="px-6 py-4">
              {{ survey.createdAt.substring(0, 10) }}
            </td>

            <td class="px-6 py-4 text-right">
              <span @click="View(survey)" class="font-medium cursor-pointer text-green-600 dark:text-green-500 hover:underline mr-3">View </span>
              <span @click="Edit(survey)" class="font-medium cursor-pointer text-gray-600 dark:text-gray-500 hover:underline mr-3">Edit </span>
              <span @click="Delete(survey)"
                class="font-medium cursor-pointer text-red-600 dark:red-blue-500 hover:underline mr-3">Delete </span>
              <span class="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline" @click="shareSurvey(survey)">Share </span>
              <button type="button" @click="viewSurvey(survey)" class="text-white bg-blue-700 ml-16 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    View Results
    <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
</button>
            </td>
          </tr>
          <tr v-else-if="currentUser.id == survey.userId" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4">
               {{i+1}}                
            </td>

            <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {{ survey.title }}
            </td>
            <td class="px-6 py-4">
              {{ survey.username }}
            </td>
             <td class="px-6 py-4">
              {{ survey.createdAt.substring(0, 10) }}
            </td>

            <td class="px-6 py-4 text-right">
              <span @click="View(survey)" class="font-medium cursor-pointer text-green-600 dark:text-green-500 hover:underline mr-3">View </span>
              <span @click="Edit(survey)" class="font-medium cursor-pointer text-gray-600 dark:text-gray-500 hover:underline mr-3">Edit </span>
              <span @click="Delete(survey)"
                class="font-medium cursor-pointer text-red-600 dark:red-blue-500 hover:underline mr-3">Delete </span>
              <span class="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline" @click="shareSurvey(survey)">Share </span>
             <button type="button" @click="viewSurvey(survey)" class="text-white bg-blue-700 ml-16 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    View Results
    <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
</button>
</td>
          </tr>

        </tbody>
      </table>
    </div>
<SendEmail :show="showModal" :id="surveyId" @close="getSurveys()"> </SendEmail>
  </div>

 
</template>

<script>
import { isExportNamedDeclaration } from "@babel/types";
import { Icon } from "@iconify/vue";
import MenuAccordion from "../../components/MenuAccordion.vue";
import SurveyData from "../../services/survey.service";
import SendEmail from "./SendEmail.vue"


export default {
  name: 'List-surveys',
  data() {
    return {
      content: '',
      surveys: [],
      showModal: false,
      surveyId : Number
    };
  },
  components: {
    Icon,
    MenuAccordion,
    SendEmail
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  isSuperAdmin() {
      var currentUser =  this.$store.state.auth.user;
      return currentUser.roles.includes("ROLE_SUPERADMIN");
    }
  },
  methods: {
    sidebarToggle: function () {
      document.querySelector(".flex-sidebar").classList.add("hidden");
    },
    getSurveys() {
        this.showModal = false;
      SurveyData.getAll()
        .then(response => {
          this.surveys = response.data;
          // console.log("ssssss",this.surveys.length)
        })
    },
    searchOnTable() {

      SurveyData.findSurvey(this.search)
        .then(response => {
          this.surveys = response.data;
        })
     
    },
    View(survey) {
      this.$router.push({ name: 'view-survey', params: { id: survey.id } });
      // let route = this.$router.resolve({ name: 'take-survey', params: { id: survey.id } });
      // window.open(route.href);
    },
    Edit(survey) {
      this.$router.push({ name: 'edit-survey', params: { id: survey.id } });
    },
    shareSurvey(survey) {

      this.surveyId = survey.id;

      this.showModal = true;
      
    },
    viewSurvey(survey){
this.$router.push({ name: 'survey-response', params: { id: survey.id } });
    },
    Delete(survey) {
      SurveyData.delete(survey.id)
        .then(() => {
          this.getSurveys();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
     toggleModal: function(){
      this.showModal = !this.showModal;
    }
  },
  mounted() {
    this.getSurveys();
  },
};
</script>

<style scoped>
.modalDiv{
  height:160%;
}

/* table {   
counter-reset: rowNumber-1;
}
table tr {
 counter-increment: rowNumber;
}
table tr td:first-child::before {   
content: counter(rowNumber);   
} */
</style>

