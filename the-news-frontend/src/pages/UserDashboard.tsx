import { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import GraphSection from '../components/Graph/GraphSection';
import ListSection from '../components/List/ListSection';
import UserMenu from '../components/Menu/UserMenu';
import QuoteSection from '../components/Quote';
import getUserDashboardData from '../functions/getUserDashboardData';
import { GraphInterface, ListInterface, Quote, User } from '../interfaces/';
import Loading from '../components/Loading';
import axios from 'axios';

function UserDashboard() {
  const [userObject, setUserObject] = useState<User | any>(null);
  const [listArray, setListArray] = useState<ListInterface[]>([]);
  const [graphArray, setGraphArray] = useState<GraphInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(email: string) {
      try {
        const { userObject, listArray, graphArray } =
          await getUserDashboardData(email);
        setUserObject(userObject);
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
        } else if (verifyRes.data.user.type === 'admin') {
          window.location.href = '/admin-dashboard';
          return;
        } else if (verifyRes.data.user) {
          await fetchData(verifyRes.data.user.email);
        }
      } catch (verifyError) {
        window.location.href = '/';
        return;
      }
    }
    checkUser();
  }, []);

  const randomQuote: Quote = {
    messageBeginning: 'Success is the ',
    highlightedText: 'sum of small efforts, ',
    messageEnd: 'repeated day in and day out.',
    author: 'Robert Collier',
  };
  if (loading) {
    return <Loading isLoading={loading} />;
  }
  return (
    <div className="thenews-container flex flex-col items-center">
      <UserMenu user={userObject} />
      <QuoteSection quote={randomQuote} />
      <ListSection lists={listArray} />
      <GraphSection graphs={graphArray} />
      <Footer page="user" />
    </div>
  );
}

export default UserDashboard;
