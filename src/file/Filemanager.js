import React, { useState, useEffect } from 'react';
import FileBrowser from 'react-keyed-file-browser';
import 'react-keyed-file-browser/dist/react-keyed-file-browser.css';
import axios from 'axios';

function MyFileManager() {
  const [files, setFiles] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = () => {
    axios.get('http://localhost/nodeapi/list.php')
      .then(res => setFiles(res.data))
      .catch(err => console.log(err));
  };

  const handleDelete = (file) => {
    axios.post('http://localhost/nodeapi/delete.php', { key: file.key })
      .then(() => fetchFiles());
  };

  const handleRename = ({ oldKey, newKey }) => {
    axios.post('http://localhost/nodeapi/rename.php', { oldKey, newKey })
      .then(() => fetchFiles());
  };

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!uploadFile) return;

    const formData = new FormData();
    formData.append("file", uploadFile);

    axios.post('http://localhost/nodeapi/upload.php', formData)
      .then(() => {
        setUploadFile(null);
        fetchFiles();
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>React Keyed File Browser</h2>

      <div style={{ marginBottom: 10 }}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <FileBrowser
        files={files}
        onDeleteFile={handleDelete}
        onRenameFile={handleRename}
      />
    </div>
  );
}

export default MyFileManager;
