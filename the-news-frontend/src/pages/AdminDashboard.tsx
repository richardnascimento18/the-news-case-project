import AdminMenu from '../components/Menu/AdminMenu';
import StatisticsSection from '../components/Statistics/StatisticsSection';
import Footer from '../components/Footer/Footer';
import {
  AdminInterface,
  GraphInterface,
  ListInterface,
  StatisticInterface,
} from '../interfaces';
import ListSection from '../components/List/ListSection';
import GraphSection from '../components/Graph/GraphSection';
import axios from 'axios';
import { useEffect, useState } from 'react';
import getAdminDashboardData from '../functions/getAdminDashboardData';
import Loading from '../components/Loading';

function AdminDashboard() {
  const [admin, setAdminObject] = useState<AdminInterface | any>(null);
  const [listArray, setListArray] = useState<ListInterface[]>([]);
  const [statisticsTable, setStatisticsTable] = useState<StatisticInterface[]>(
    [],
  );
  const [graphArray, setGraphArray] = useState<GraphInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData(email: string) {
      try {
        const { admin, statisticsTable, listArray, graphArray } =
          await getAdminDashboardData(email);

        setAdminObject(admin);
        setStatisticsTable(statisticsTable);
        setListArray(listArray);
        setGraphArray(graphArray);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }
    async function checkUser() {
      try {
        const verifyRes = await axios.get('http://localhost:3000/auth/verify', {
          withCredentials: true,
        });
        if (!verifyRes.data.user) {
          window.location.href = '/';
          return;
        } else if (verifyRes.data.user.type === 'user') {
          window.location.href = '/user-dashboard';
          return;
        } else if (verifyRes.data.user.type === 'admin') {
          fetchData(verifyRes.data.user.email);
        }
      } catch (verifyError) {
        window.location.href = '/';
        return;
      }
    }
    checkUser();
  }, []);

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  return (
    <div className="thenews-container flex flex-col items-center">
      <AdminMenu admin={admin} />
      <StatisticsSection statistics={statisticsTable} />
      <ListSection lists={listArray} customStyle="grow-1" />
      <GraphSection graphs={graphArray} />
      <Footer page="admin" />
    </div>
  );
}
export default AdminDashboard;
