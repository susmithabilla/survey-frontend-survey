import { createRouter, createWebHistory } from "vue-router";

// Default Pages
import Dashboard from "../views/Dashboard.vue";
// Component Pages
import Valert from "../views/components/alert.vue";
import Vaccrodion from "../views/components/accordion.vue";
import Vbadges from "../views/components/badges.vue";
import Vbreadcumb from "../views/components/breadcumbs.vue";
import Vbutton from "../views/components/button.vue";
import Vcard from "../views/components/card.vue";
import Survey from "../components/survey.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";


import UserList from "../views/Users/userList.vue";
import NewUser from "../views/Users/create.vue";


import Surveys from "@/views/Survey/All.vue";
import CreateSurvey from "@/views/Survey/Create.vue";
import ViewSurvey from "@/views/Survey/View.vue";
import EditSurvey from "@/views/Survey/Edit.vue";
import EmailSurvey from "@/views/Survey/SendEmail.vue";

var appname = " - Dashboard Admin Template";




const routes = [
  // Routes
  {
    path: "/main",
    name: "Dashboard",
    component: Dashboard,
    meta: { title: "Dashboard " + appname },
  },
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },

  // Components based Routes
  {
    path: "/component/alert",
    name: "Valert",
    component: Valert,
    meta: { title: "Alert" + appname },
  },
  {
    path: "/component/accordion",
    name: "Vaccordion",
    component: Vaccrodion,
    meta: { title: "Accordion" + appname },
  },
  {
    path: "/component/badge",
    name: "Vbadge",
    component: Vbadges,
    meta: { title: "Badge" + appname },
  },
  {
    path: "/component/breadcumb",
    name: "Vbreadcumb",
    component: Vbreadcumb,
    meta: { title: "Breadcumb" + appname },
  },
  {
    path: "/component/button",
    name: "Vbutton",
    component: Vbutton,
    meta: { title: "Button" + appname },
  },
  {
    path: "/component/card",
    name: "Vcard",
    component: Vcard,
    meta: { title: "Card" + appname },
  },
  {
    path: "/survey",
    name: "survey",
    component: Survey
  },
  {
    path: "/users",
    name: "users",
    component: UserList
  },
  {
    path: "/users/new",
    name: "create-user",
    component: NewUser
  },
  {
    path: "/surveys",
    name: "all-surveys",
    component: Surveys,
  },
  {
    path: "/survey/:id",
    name: "view-survey",
    component: ViewSurvey,
    props: true
},
  {
    path: '/survey/create',
    name: 'create-survey',
    component: CreateSurvey
  },
  {
    path: "/survey/edit/:id",
    name: "edit-survey",
    component: EditSurvey,
    props: true
  },
 
{
  path: "/survey/send",
  name: "send-survey",
  component: EmailSurvey,
  props: true
},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

  linkExactActiveClass: "exact-active",
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
