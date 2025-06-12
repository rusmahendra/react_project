import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import SidebarNav from '../include/Sidebar';
import axios from 'axios';
import { Eye, Edit, Trash2 } from 'lucide-react';
import '../css/style.css';

function User() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/');
    } else {
      fetchUsers();
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/nodeapi/users.php');
      setUsers(response.data);
      setFilteredUsers(response.data); // initially show all
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const result = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
    );
    setFilteredUsers(result);
  }, [search, users]);

  const handleView = (row) => alert(`Viewing: ${row.name}`);
  const handleEdit = (row) => alert(`Editing: ${row.name}`);
  const handleDelete = (row) => {
    if (window.confirm(`Delete ${row.name}?`)) {
      alert(`Deleted: ${row.name}`);
    }
  };

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Phone', selector: row => row.phone },
     { name: 'Role', selector: row => row.role },
    {
      name: 'Actions',
      cell: row => (
        <div className="table-actions">
          <button className="icon-btn view" onClick={() => handleView(row)}>
            <Eye size={16} />
          </button>
          <button className="icon-btn edit" onClick={() => handleEdit(row)}>
            <Edit size={16} />
          </button>
          <button className="icon-btn delete" onClick={() => handleDelete(row)}>
            <Trash2 size={16} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="dashboard-container">
      <SidebarNav />
      <div className="main-content">
        <h1>Users</h1>

        <input
          type="text"
          placeholder="Search by name, email or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <DataTable
          columns={columns}
          data={filteredUsers}
          progressPending={loading}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
}

export default User;
