import React, { useState, useEffect } from 'react';
import { getCameras, addCamera, updateCamera, deleteCamera } from '../../firebaseHelpers/cctvHelpers';
import exportCCTVToPdf from '../../Components/ExportToPDF/exportCCTVToPdf'; // Import the export function
import styles from './CCTVConfiguration.module.css';

const CCTVConfiguration = () => {
  const [cameras, setCameras] = useState([]);
  const [newCamera, setNewCamera] = useState({
    name: '',
    ipAddress: '',
    SN: '',
    port: '',
    username: '',
    password: ''
  });
  const [editingCamera, setEditingCamera] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCameras = async () => {
      const camerasData = await getCameras();
      setCameras(camerasData);
    };

    fetchCameras();
  }, []);

  const handleAddCamera = async () => {
    if (editingCamera) {
      await updateCamera(editingCamera.id, newCamera);
    } else {
      await addCamera(newCamera);
    }
    setNewCamera({
      name: '',
      ipAddress: '',
      SN: '',
      port: '',
      username: '',
      password: ''
    });
    setEditingCamera(null);
    setIsModalOpen(false);

    const camerasData = await getCameras();
    setCameras(camerasData);
  };

  const handleEditCamera = (camera) => {
    setNewCamera({
      name: camera.name,
      ipAddress: camera.ipAddress,
      SN: camera.SN,
      port: camera.port,
      username: camera.username,
      password: camera.password
    });
    setEditingCamera(camera);
    setIsModalOpen(true);
  };

  const handleDeleteCamera = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this camera?");
    if (confirmed) {
      await deleteCamera(id);
      const camerasData = await getCameras();
      setCameras(camerasData);
    }
  };

  const handleChange = (e) => {
    setNewCamera({
      ...newCamera,
      [e.target.name]: e.target.value
    });
  };

  const handleOpenModal = () => {
    setNewCamera({
      name: '',
      ipAddress: '',
      SN: '',
      port: '',
      username: '',
      password: ''
    });
    setEditingCamera(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>CCTV Configuration</h1>
        <p>Manage your CCTV cameras</p>
      </header>
      <main className={styles.main}>
        <button className={styles.addCameraButton} onClick={handleOpenModal}>Add Camera</button>
        <button className={styles.exportButton} onClick={() => exportCCTVToPdf(cameras)}>Export to PDF</button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Camera Name</th>
              <th>IP Address</th>
              <th>SN</th>
              <th>Port</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cameras.map((camera) => (
              <tr key={camera.id}>
                <td>{camera.name}</td>
                <td>{camera.ipAddress}</td>
                <td>{camera.SN}</td>
                <td>{camera.port}</td>
                <td>{camera.username}</td>
                <td>{camera.password}</td>
                <td>
                  <button className={styles.editButton} onClick={() => handleEditCamera(camera)}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteCamera(camera.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.closeButton} onClick={handleCloseModal}>&times;</span>
              <h2>{editingCamera ? 'Update Camera' : 'Add Camera'}</h2>
              <div className={styles.addCameraForm}>
                <label htmlFor="name">Camera Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={newCamera.name}
                  onChange={handleChange}
                  placeholder="Camera Name"
                />
                <label htmlFor="ipAddress">IP Address</label>
                <input
                  type="text"
                  name="ipAddress"
                  id="ipAddress"
                  value={newCamera.ipAddress}
                  onChange={handleChange}
                  placeholder="IP Address"
                />
                <label htmlFor="SN">SN</label>
                <input
                  type="text"
                  name="SN"
                  id="SN"
                  value={newCamera.SN}
                  onChange={handleChange}
                  placeholder="SN"
                />
                <label htmlFor="port">Port</label>
                <input
                  type="text"
                  name="port"
                  id="port"
                  value={newCamera.port}
                  onChange={handleChange}
                  placeholder="Port"
                />
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={newCamera.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={newCamera.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <button className={styles.addButton} onClick={handleAddCamera}>
                  {editingCamera ? 'Update Camera' : 'Add Camera'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CCTVConfiguration;
