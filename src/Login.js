import { useState } from 'react';
import './css/style.css';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState( );
   

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost/nodeapi/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json(); // Get the response data

    if (data.status == "success") {
      localStorage.setItem('isLoggedIn', 'true');
      setMessage('Login successfuly Please Wait...');
 

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } else {
      setMessage(data.message);
      setLoginSuccess(false);
    }
  };
  return (
    <div className='main_container'>
      <div className='login_container'>
        <h2 className="adminheading">Admin Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #dcdde1',
              fontSize: '16px',
              outline: 'none',
              transition: 'border 0.2s'
            }}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #dcdde1',
              fontSize: '16px',
              outline: 'none',
              transition: 'border 0.2s'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px',
              borderRadius: '6px',
              border: 'none',
              background: '#4f8cff',
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            Login
          </button>
        </form>
        {message && (
          <p style={{
            marginTop: '18px',
            color: loginSuccess ? '#27ae60' : '#e84118',
            fontWeight: 500
          }}>{message}</p>
        )}
      </div>
    </div>
  );
}
export default Login;