import { React,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/login.css';


function Login()
{

  const [email, setEmail] = useState('email');
  const [password, setPassword] = useState('password');
  const handleSubmit = async (e) => {
    e.preventDefault();
   const apiurl = 'http://localhost/nodeapi/login.php';
   const response = await fetch(apiurl,{
    method : 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email,password}),
   });
   const data = await response.json();
    if(data.status === 'success') {
        // Redirect to the dashboard or another page
        localStorage.setItem('isLoggedIn',true);
        window.location.href = '/dashboard';
      } else {
        // Handle login failure (e.g., show an error message)
        alert('Login failed: ' + data.message);
      }
  };
  return(
<div>
   <div className='login-container'>
        <div className="text-center "> <h4>Admin Login</h4></div>
        <hr></hr>
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
   </div>
      </div>
  );
}

export default Login;