import { useNavigate } from 'react-router-dom';
import { Home, Users, Package, LogOut, Sidebar } from 'lucide-react';
function Sdebar() {
        const navigate = useNavigate();

       const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
       navigate('/');
    }
return (
   <nav className="sidebar">
        <h2>My Admin</h2>

        <a onClick={() => navigate('/dashboard')} className="sidebar-link active">
          <Home size={18} /> Dashboard
        </a>

        <div className="sidebar-link" onClick={() => navigate('/users')} >
          <Users size={18} /> Users
        </div>

        <a href="#products" className="sidebar-link">
          <Package size={18} /> Products
        </a>

        <div className="sidebar-link logout" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </div>
      </nav>

);

}
export default Sdebar;
