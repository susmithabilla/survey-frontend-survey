<template>
  <div class=" justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 sm:w-1/3">

      <h3 class="text-2xl text-center">Create User</h3>
      <div class="mt-4">
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" for="Name">Name</label>
          <input type="text" placeholder="Enter username" v-model="user.username"
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
        </div>
        <div class="mt-4">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" for="email">Email</label>
          <input type="text" placeholder="Enter user email" v-model="user.email"
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
        </div>
        <div class="mt-4">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Password</label>
          <input type="password" placeholder="Enter password" v-model="user.password"
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
        </div>
        <div class="mt-4">

          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select
            role</label>
          <select id="countries" v-model="user.roles"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

        </div>

        <div class="flex">
          <button @click="handleRegister()"
            class="w-full px-6 py-2 mt-4 mr-4 text-white bg-green-600 rounded-lg hover:bg-green-900">Save</button>
          <button @click="cancel()"
            class="w-full px-6 py-2 mt-4 text-white bg-gray-600 rounded-lg hover:bg-gray-900">Cancel</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import User from '../../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      console.log("uuuuuu",)
      //   this.$validator.validate().then(isValid => {
      // if (isValid) {
      console.log(this.user)
      this.$store.dispatch('auth/register', this.user).then(
        data => {
          this.message = data.message;
          this.$router.push('/users');
          //   this.successful = true;
        },
        error => {
          this.message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
      // }
      //   });
    },
    cancel() {
      this.$router.push('/users');
    }
  }
};
</script>