<template>
<!-- component -->
<div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        
        <h3 class="text-2xl font-bold text-center">Create Account</h3>
            <div class="mt-4">
                <div>
                    <label class="block" for="Name">Name</label>
                            <input type="text" placeholder="Name"  v-model="user.username"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                </div>
                <div class="mt-4">
                    <label class="block" for="email">Email</label>
                            <input type="text" placeholder="Email"  v-model="user.email"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                </div>
                <div class="mt-4">
                    <label class="block">Password</label>
                            <input type="password" placeholder="Password"  v-model="user.password"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                </div>
                <div class="mt-4">
                    <label class="block">Confirm Password</label>
                            <input type="password" placeholder="Password" 
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                </div>
                <span class="text-xs text-red-400">Password must be same!</span>
                <div class="flex">
                    <button @click="handleRegister()" class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Create
                        Account</button>
                </div>
                <div class="mt-6 text-grey-dark">
                    Already have an account?
                    <p class="text-blue-600 hover:underline" @click="login()">
                        Log in
                    </p>
                </div>
            </div>
    </div>
</div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
    //   this.$validator.validate().then(isValid => {
        // if (isValid) {
            console.log(this.user)
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
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
    }
  }
};
</script>