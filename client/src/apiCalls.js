import axios from 'axios';

export const loginCall = async (userCredential) => {
  const res = await axios.post('/api/auth/login', userCredential);
  return res;
};
