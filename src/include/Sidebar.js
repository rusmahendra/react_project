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

        <a href="#dashboard" className="sidebar-link active">
          <Home size={18} /> Dashboard
        </a>

        <a href="#users" className="sidebar-link">
          <Users size={18} /> Users
        </a>

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
