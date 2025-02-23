import axios from 'axios';

async function logOut() {
  console.log('logging out');
  const { data }: any = await axios.get('http://localhost:3000/auth/logout', {
    withCredentials: true,
  });
  if (data.message === 'Logged out') {
    window.location.href = '/';
  }
}

export default logOut;
