import axios from 'axios';

async function getUserDashboardData(email: string) {
  const { data }: any = await axios.get(
    'http://localhost:3000/user?email=' + email,
    {
      withCredentials: true,
    },
  );

  return data.objects;
}

export default getUserDashboardData;
