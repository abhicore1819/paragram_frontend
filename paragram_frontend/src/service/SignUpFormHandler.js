import axios from "axios";
import {
  Diff,
  FileTerminal,
  LucideSearch,
  MonitorDot,
  MoveDiagonalIcon,
} from "lucide-react";
const SignupFormHanlder = (form) => {

  const birth_date = new Date(form.dob);
  const birth_year = birth_date.getFullYear();
  const birth_month = birth_date.getMonth();
  const birth_day = birth_date.getDate();
  const present_year = new Date().getFullYear();
  const present_month = new Date().getMonth();
  const present_day = new Date().getDate();
  const year_diff = present_year - birth_year;
  const month_diff = birth_month - present_month;
  const day_diff = birth_day - present_day;

  try {
    // password validation
    if (form.password !== form.confirm_password) {
      return "both password doesn't match";
    } 
    
    else if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(form.password)){
      return "password must contain atleast one upper case and lower case letter"
    }

    else if (form.password.length < 6){
      return "password must be 6 characters long"
    }

    else {
      
      return "allowed";
    }
    // password validation

    // age validation
    if (year_diff > 18) {
      return "allowed";
    } else if (year_diff === 18) {
      if (month_diff > 0 || day_diff > 0) {
        return "age restricted";
      } else {
        return "allowed";
      }
    } else {
      return "age restricted";
    }
    // age validation
  } catch (error) {
    console.log("error:-", error);
  }
};

export default SignupFormHanlder;
