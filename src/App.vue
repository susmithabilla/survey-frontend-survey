<template>
  <div id="app">
    <nav class="navbar navbar-expand bgNav">
       <img src="../public/survey-check1.png" alt="..." height="50">
      <a href="/" class="navbar-brand">SurveyCreator</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
      </div>

      <div class="navbar-nav ml-auto">
       
        <li class="nav-item">
          <router-link to="/login" class="menuItems nav-link">
             Login
          </router-link>
        </li>
         <li class="nav-item">
          <router-link to="/register" class="nav-link">
             <button class="btn btn-outline-success btn-sm my-2 my-sm-0" type="submit"><font-awesome-icon icon="user-plus" /> Sign Up</button>
          </router-link>
        </li>
      </div>

    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return false;
    }
  },
  methods: {
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

</style>
