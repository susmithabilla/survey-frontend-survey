<template>
    <div v-if="show" class="modal w-full modalDiv left-0 flex items-center justify-center">
        <div @click.self="close_modal()" class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
        <div
            class="modal-container modalContainer bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">



            <form class="modal-content py-4 text-left px-6" @submit.prevent="sendEmail">
                <p class="text-xl text-center">Enter Emails</p>
                <input type="text" name="subject" value="Take our survey"
                    placeholder="Enter emails separated by semicolon(;)" hidden>
                <input type="text" name="message" :value="setUrl" hidden>
                <input type="email" v-model="email" name="to_email"
                    placeholder="Enter emails separated by semicolon(;)">



                <input type="submit" value="Send">
                <button @click="close_modal()"
                    class="px-6 py-2 mr-4 font-medium text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-400 focus:bg-gray-400 focus:outline-none">
                    Cancel
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
    name: 'send-mail',
    props: {
        show: Boolean,
        id: Number,

    },
    data() {
        return {
            product_name: '',
            email: '',

        }
    },
    computed: {
        setUrl() {
            return location.origin + "/takesurvey/"+this.id;

        }
    },
    methods: {
        close_modal() {
            this.$emit("close")
        },
        sendEmail(e) {
            try {
                this.product_name = "Take survey";
                document.getElementsByName("message")[0]._value = "testt link";


                emailjs.sendForm("service_project2022", "template_fbpkdoq", e.target,
                    'WOtI46tV3gGSu9VIl', {
                    message: "https://google.com",
                    subject: this.product_name,
                    // to_email: this.email,
                }).then(response => {
                    // this.surveys = response.data;
                    alert("Email Sent!!");
                    this.$emit("close");
                })

            } catch (error) {
                console.log({ error })
            }
            // Reset form field
            this.name = ''
            this.email = ''
            this.message = ''
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