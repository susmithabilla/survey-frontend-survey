<template>
  <!-- component -->
  <!-- This is an example component -->
  <h1 v-if="!surveys.length">No Surveys Responses Found</h1>
  <div v-else class="max-w-6xl mx-auto">

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
       
      <div class="p-4">
         <button type="button" @click="downloadReport()" class="text-white bg-green-700 ml-16 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-small rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    Download Survey Results
    </button>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              S. No
            </th>

            <th scope="col" class="px-6 py-3">
              User
            </th>
            <th scope="col" class="px-6 py-3">
              Submitted_on
            </th>
             
            <th scope="col" class="px-6 py-3">

            </th>
            <th scope="col" class="px-6 py-3">

            </th>

          </tr>
        </thead>
        <tbody v-for="(survey,index) in surveys" :key="survey.id" :survey="survey">
          <!-- <tr v-if="survey.id != currentUser.id" -->
           
             <tr v-if="isSuperAdmin" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4">  
                {{ index+1 }}            
            </td>

            <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              Anonymous User {{ index+1 }}
            </td>
            <td class="px-6 py-4">
              {{ survey.createdAt.substring(0, 10) }}
            </td>
             <td class="px-6 py-4">
              
            </td>

            <td class="px-6 py-4 text-right">
             <button type="button" @click="viewSurvey(survey)" class="text-white bg-blue-700 ml-16 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    View Details
    </button>
            </td>
          </tr>
          <tr v-else-if="currentUser.id == survey.userId" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="px-6 py-4">              
            </td>

            <td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              Anonymous User {{ index+1 }}
            </td>
            <td class="px-6 py-4">
              {{ survey.createdAt.substring(0, 10) }}
            </td>
             <td class="px-6 py-4">
              
            </td>

            <td class="px-6 py-4 text-right">
             <button type="button" @click="viewSurvey(survey)" class="text-white bg-blue-700 ml-16 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    View Details
    </button>

            </td>
          </tr>

         


        </tbody>
      </table>
    </div>

     <DisplayDetails :show="showModal" :id="surveyId" @close="getSurveys()" :survey='surveyObj'/>

    
  </div>

 
</template>

<script>
import { isExportNamedDeclaration } from "@babel/types";
import { Icon } from "@iconify/vue";
import MenuAccordion from "../../components/MenuAccordion.vue";
import SurveyResponse  from "../../services/surveyAnswers.service";
import exportFromJSON from "export-from-json";
import DisplayDetails from './Details.vue'



export default {
  name: 'List-results',
  data() {
    return {
      content: '',
      surveys: [],
      showModal: false,
      surveyId : Number,
      surveyObj: null
    };
  },
  components: {
    Icon,
    MenuAccordion,
    DisplayDetails
    
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
         SurveyResponse.getAll()
                .then(response => {
                    this.surveys = response.data;
                    console.log("resultsss..", response.data);
                })
    },
    downloadReport() {

            var test = [];

            for (var i in this.surveys) {
                for (var j in this.surveys[i].data) {
                    test.push(this.surveys[i].data[j])
                }


            }

            const data = test;
            const fileName = "survey-results";
            const exportType = exportFromJSON.types.csv;

            if (data) exportFromJSON({ data, fileName, exportType });
        },
       
   viewSurvey(survey) {
            console.log("sssss",survey.id);
            this.surveyId = survey.id;
            this.surveyObj = survey;
            this.showModal = true;
            console.log("ttttt",this.showModal)
        },
        
//         hideDetail(){
// this.showModal = 0;
//         },
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

