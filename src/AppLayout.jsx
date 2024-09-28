import { useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

const AppLayout = () => {
  const location = useLocation();
  const noSidebar = ['/login', '/signup', '/verifyEmail'];
  return <div>{!noSidebar.includes(location.pathname) && <Sidebar />}</div>;
};

export default AppLayout;
