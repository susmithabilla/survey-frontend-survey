<template>
  <div id="app">
    <nav class="navbar navbar-expand bgNav">
       <img class="logo" src="../public/survey-check4.png" alt="..." height="50">
      <a href="/" class="navbar-brand">SurveyCreator</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
        
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>
        <li v-if="showGuestBoard" class="nav-item">
          <router-link to="/mod" class="nav-link">Guest Board</router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/adduser" class="nav-link">Users</router-link>
        </li>
        <li v-else class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
       
        <li class="nav-item">
          <router-link to="/login" class="menuItems nav-link">
             Login
          </router-link>
        </li>
         <li class="nav-item">
          <router-link to="/register" class="nav-link">
             <button class="btn btn-primary btn-sm my-2 my-sm-0" type="submit"><font-awesome-icon icon="user-plus" /> Sign Up</button>
          </router-link>
        </li>
      </div>

       <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>

    </nav>

    <div class="container appData">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showGuestBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_GUEST');
      }

      return false;
    }
  },
  methods: {
     logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>


<style>

.bgNav{
  background-color: #28a745!important;
}

.bgNav .navbar-brand{
  font-weight:600;
  color:white;
}

.bgNav .navbar-nav .nav-link {
color: rgb(255 255 255 / 83%) !important;
}

.logo{
  margin-right: 10px;
}

body{
    background-color: #d3d3d370;
}

.appData{
  margin-top: 4%;
}

</style>
