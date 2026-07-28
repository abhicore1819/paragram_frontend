import axios from "axios";
import {
  Diff,
  FileTerminal,
  LucideSearch,
  MonitorDot,
  MoveDiagonalIcon,
} from "lucide-react";
const FormHanlder = ({ username, password, confirm_password, dob, email }) => {
  const birth_date = new Date(dob);
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
    // ===== password validation =====
    if (confirm_password) {
      if (password !== confirm_password) {
        return "both password doesn't match";
      }
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      return "password must contain atleast one upper case and lower case letter";
    }

    if (password.length < 6) {
      return "password must be 6 characters long";
    }
    // ===== password validation =====

    // ===== age validation =====
    if (year_diff < 18) {
      return "age restricted";
    }

    if (year_diff === 18) {
      if (month_diff > 0 || (month_diff === 0 && day_diff > 0)) {
        return "age restricted";
      }
    }

    return "allowed";
    // ===== age validation =====
  } catch (error) {
    console.log("error:-", error);
    return "error";
  }
};

export default FormHanlder;
