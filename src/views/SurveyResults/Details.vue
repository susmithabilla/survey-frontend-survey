<template>
    <div v-if="show && survey.id == id" class="modal w-full modalDiv left-0 flex items-center justify-center" style="
    margin-top: -30%;">
        <div @click.self="close_modal()" class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
        <div class="modal-container modalContainer bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
            style="
    padding: 30px;">
            <div v-for="(survey, index) in survey.data" :key="index">
                <p>{{ survey.questionNumber }}: {{ survey.question }}</p>
                <p class="py-4">A : {{ survey.answer }}</p>
            </div>
            <button @click="close_modal()"
                class="px-4 py-2 mr-4 font-small text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-400 focus:bg-gray-400 focus:outline-none">
                Close
            </button>




        </div>
    </div>
</template>

<script>


export default {
    name: 'view-details',
    props: {
        show: Boolean,
        id: Number,
        survey: Object

    },
    data() {
        return {
            product_name: '',
            email: '',

        }
    },
    computed: {
        setUrl() {
            return location.origin + "/takesurvey/" + this.id;

        }
    },
    methods: {
        close_modal() {
            this.$emit("close")
        },

    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}


label {
    float: left;
}

input[type=text],
[type=email],
textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 8px;
    margin-bottom: 16px;
    resize: vertical;
}

input[type=submit] {
    margin-right: 10px;
    background-color: #4CAF50;
    color: white;
    padding: 8px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

input[type=submit]:hover {
    background-color: #45a049;
}
</style>