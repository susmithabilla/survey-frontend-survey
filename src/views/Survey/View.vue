<template>


  <div class="p-6 border border-gray-300 sm:rounded-md">
     <div v-for="(question, index) in questions" :key="index">
     <p>Question : {{ index + 1 }}</p>
     <p>{{question.type}}</p>
     </div>
    <!-- <form method="POST" action="https://herotofu.com/start">
      <label class="block mb-6">
        <span class="text-gray-700">Your name</span>
        <input
          name="name"
          type="text"
          class="
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
          "
          placeholder="Joe Bloggs"
        />
      </label>
      <label class="block mb-6">
        <span class="text-gray-700">Email address</span>
        <input
          name="email"
          type="email"
          class="
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
          "
          placeholder="joe.bloggs@example.com"
        />
      </label>
      <label class="block mb-6">
        <span class="text-gray-700">When is your birthday?</span>
        <input
          name="birthday"
          type="date"
          class="
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
          "
        />
      </label>
      <label class="block mb-6">
        <span class="text-gray-700"
          >What kind of present you expect this year?</span
        >
        <select
          name="present"
          class="
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
          "
        >
          <option>Chocolate cake</option>
          <option>Dancing cat</option>
          <option>Custom meme about me</option>
          <option>Zoom backgrounds for the rest of my life</option>
        </select>
      </label>
      <div class="mb-6">
        <div class="mt-2">
          <div>
            <label class="inline-flex items-center">
              <input
                name="season"
                type="radio"
                class="
                  text-indigo-600
                  border-gray-300
                  rounded-full
                  shadow-sm
                  focus:border-indigo-300
                  focus:ring
                  focus:ring-offset-0
                  focus:ring-indigo-200
                  focus:ring-opacity-50
                "
                checked
              />
              <span class="ml-2">I like summer</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                name="season"
                type="radio"
                class="
                  text-indigo-600
                  border-gray-300
                  rounded-full
                  shadow-sm
                  focus:border-indigo-300
                  focus:ring
                  focus:ring-offset-0
                  focus:ring-indigo-200
                  focus:ring-opacity-50
                "
              />
              <span class="ml-2">I'm more into winter</span>
            </label>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <button
          type="submit"
          class="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
        >
          Send Answers
        </button>
      </div>

    </form> -->
  </div>


</template>

<script>

import SurveyData from "../../services/survey.service";



export default {
    name: "view-survey",
    props: ['id'],
    mounted() {
        console.log("iiiiiiii", this.id)
        SurveyData.get(this.id)
            .then(response => {
                 var a = new Array(response.data);
                    let result = JSON.parse(JSON.stringify(a[0].data))
                console.log("survey view..", result); 
                console.log("survey view22222..", result.title);  

                this.survey =   response.data;
                this.questions = response.data.data.pages[0].elements;                         
            })
    },
    data() {

        return {
            survey: Object,
            questions:[]
        };
    }
};
</script>


<style scoped>
</style>