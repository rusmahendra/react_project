import { useNavigate } from 'react-router-dom';
function Sdebar() {
        const navigate = useNavigate();

       const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
       navigate('/');
    }
return (
  <nav style={{ display: 'flex', gap: '20px', padding: '10px', background: '#f0f0f0' }}>
            <a href="#dashboard">Dashboard</a>
            <a href="#users">Users</a>
            <a href="#products">Products</a>
            <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
        </nav>

);

}
export default Sdebar;
