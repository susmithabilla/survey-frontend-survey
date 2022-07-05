<template>
    <div id="app">
        <vue-bootstrap4-table :rows="rows" :columns="columns" :config="config">

     <template slot="actions" slot-scope="props"><b-button size="sm" @click="editSurvey(props.row)">
          Edit
        </b-button><b-button variant="danger" size="sm" @click="deletesurvey(props.row)">
          Delete
        </b-button></template>
        
        </vue-bootstrap4-table>
    </div>
</template>

<script>
import VueBootstrap4Table from 'vue-bootstrap4-table';
import SurveyData from "../../services/surveydata";
 
export default {
    name: 'App',
    data: function() {
        return {
            rows: [],
            columns: [{
                    label: "Survey Name",
                    name: "title",
                    filter: {
                        type: "simple",
                        placeholder: "Enter survey name"
                    },
                    sort: true,
                },
                // {
                //     label: "Created By",
                //     name: "name.first_name",
                //     filter: {
                //         type: "simple",
                //         placeholder: "Enter user name"
                //     },
                //     sort: true,
                // },
                {
                    label: "Actions",
                    name: "actions",
                  
                },
               ],
            config: {
                checkbox_rows: false,
                rows_selectable: true,
                // card_title: "Surveys",
                show_refresh_button: false,
                show_reset_button: false,
                global_search:  {
                        placeholder:  "Enter custom Search text",
                        visibility:  false,
                        case_sensitive:  false
                    },
                pagination: true, // default true
                    pagination_info: true, // default true
                    num_of_visibile_pagination_buttons: 7, // default 5
                    per_page: 5, // default 10
                    per_page_options:  [5,  10,  20,  30],
            }
        }
    },
    components: {
        VueBootstrap4Table
    },
    methods:{
       retrieveSurveys(){
       SurveyData.getAll()
        .then(response => {
          this.rows = response.data;
          console.log("survey1111..",response.data);
        })
    },
    editSurvey(survey){
      
      this.$router.push({ name: 'edit-survey', params: { id: survey.id } });
    },
     deletesurvey(survey){
      SurveyData.delete(survey.id)
        .then(() => {
           this.retrieveSurveys();
          // this.$router.push({ name: 'Home' });
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
   
    },
    mounted() {
      this.retrieveSurveys();
    },
}
</script>