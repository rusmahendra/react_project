import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNav from './include/Sidebar';
function Dashoard() {
    const navigate = useNavigate();
      useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/');
    }
  }, [navigate]);
return (
    <div>
      <SidebarNav/>
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
        </div>




    </div>
);
}
export default Dashoard;