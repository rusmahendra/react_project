import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './file/Dashboard';
import User from './file/User';
import FileManager from './file/Filemanager';



function App() {
  return(
<BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/users" element={<User />} />
       <Route path="/filemanager" element={<FileManager />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
