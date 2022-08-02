import axios from "axios";

var baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "http://ec2-3-15-46-217.us-east-2.compute.amazonaws.com/api/";
} else {
  baseurl = "/api/";
}
 
export default axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    crossDomain: true
  }
});