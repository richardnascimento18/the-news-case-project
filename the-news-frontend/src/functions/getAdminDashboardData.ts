import axios from 'axios';

async function getAdminDashboardData(email: string) {
  const { data }: any = await axios.get(
    'http://localhost:3000/admin?email=' + email,
    {
      withCredentials: true,
    },
  );

  return data.objects;
}

export default getAdminDashboardData;
