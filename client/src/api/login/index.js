import axios from 'axios';
import react from 'react';

const BASE_URL = 'localhost:5000/api/auth/';
const tryLogin = (email, pass) => {
  const url = `${BASE_URL}login`;
  axios.post(url, { email, pass }).then((res) => {
    return res;
  });
};

export default tryLogin;
