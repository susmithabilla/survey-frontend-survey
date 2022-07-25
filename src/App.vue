<template>
  <!-- App -->
  <div v-if="checkUrl">
  <router-view />
  </div>
  <div v-else-if="currentUser" class="flex bg-packed font-lexend dark:bg-gray-900">
 
    <div id="sidebar-scroll"
      class="flex-sidebar lg:flex-auto w-sidebar lg:block hidden bg-white dark:bg-gray-800 border-r-2 dark:border-gray-700 h-screen lg:z-0 z-40 overflow-auto lg:relative fixed">
      <Sidebar />
    </div>
    <div class="flex-auto w-full overflow-auto h-screen" id="body-scroll">

      <Header />
      <router-view />
      <Footer />
    </div>
    

  </div>
  <!-- end app -->
  <div v-else>
    <router-view />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// npm-js
import Scrollbar from "smooth-scrollbar";

export default {
  name: "App",

  components: {
    Header,
    Footer,
    Sidebar,
  },
  computed: {
   
    checkUrl(){
return this.$route.path.includes('/takesurvey') || this.$route.path.includes('/submit-response')
    },
     currentUser() {
      
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_SUPERADMIN');
      }

      return false;
    },
    showGuestBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    }
  },
  mounted() {
     Scrollbar.init(document.querySelector("#body-scroll"));

      setTimeout(() => {
        var alert_dis = document.querySelectorAll(".alert-dismiss");
        alert_dis.forEach((x) =>
          x.addEventListener("click", function () {
            x.parentElement.classList.add("hidden");
          })
        );
      }, 100);

    // var acc = document.getElementsByClassName("accordion");
    // var i;
    // for (i = 0; i < acc.length; i++) {
    //   acc[i].addEventListener("click", function () {
    //     this.classList.toggle("active");
    //     var panel = this.nextElementSibling;
    //     if (panel.style.display === "block") {
    //       panel.style.display = "none";
    //       this.classList.remove("bg-gray-100");
    //       this.classList.add("bg-transparent");
    //     } else {
    //       panel.style.display = "block";
    //       this.classList.add("bg-gray-100");
    //       this.classList.remove("bg-transparent");
    //     }
    //   });
    // }
  },
};
</script>
