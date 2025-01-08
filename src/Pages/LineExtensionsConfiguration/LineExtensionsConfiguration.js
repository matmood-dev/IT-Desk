import React, { useState, useEffect } from 'react';
import { getLineExtensions, addLineExtension, updateLineExtension, deleteLineExtension } from '../../firebaseHelpers/lineExtensionHelpers';
import exportLineExtensionsToPdf from '../../Components/ExportToPDF/exportLineExtensionsToPdf'; // Correct import path to exportLineExtensionsToPdf.js
import styles from './LineExtensionsConfiguration.module.css';

const LineExtensionsConfiguration = () => {
  const [lineExtensions, setLineExtensions] = useState([]);
  const [newExtension, setNewExtension] = useState({
    extensionNumber: '',
    employee: '',
    department: '',
    username: '',
    password: ''
  });
  const [editingExtension, setEditingExtension] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLineExtensions = async () => {
      const lineExtensionsData = await getLineExtensions();
      const sortedExtensions = lineExtensionsData.sort((a, b) => a.extensionNumber - b.extensionNumber);
      setLineExtensions(sortedExtensions);
    };

    fetchLineExtensions();
  }, []);

  const handleAddExtension = async () => {
    if (editingExtension !== null) {
      await updateLineExtension(editingExtension.id, newExtension);
    } else {
      await addLineExtension(newExtension);
    }
    setNewExtension({
      extensionNumber: '',
      employee: '',
      department: '',
      username: '',
      password: ''
    });
    setEditingExtension(null);
    setIsModalOpen(false);

    const lineExtensionsData = await getLineExtensions();
    const sortedExtensions = lineExtensionsData.sort((a, b) => a.extensionNumber - b.extensionNumber);
    setLineExtensions(sortedExtensions);
  };

  const handleEditExtension = (extension) => {
    setNewExtension(extension);
    setEditingExtension(extension);
    setIsModalOpen(true);
  };

  const handleDeleteExtension = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this extension?");
    if (confirmed) {
      await deleteLineExtension(id);
      const lineExtensionsData = await getLineExtensions();
      const sortedExtensions = lineExtensionsData.sort((a, b) => a.extensionNumber - b.extensionNumber);
      setLineExtensions(sortedExtensions);
    }
  };

  const handleChange = (e) => {
    setNewExtension({
      ...newExtension,
      [e.target.name]: e.target.value
    });
  };

  const handleOpenModal = () => {
    setNewExtension({
      extensionNumber: '',
      employee: '',
      department: '',
      username: '',
      password: ''
    });
    setEditingExtension(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Line Extensions Configuration</h1>
        <p>Manage your line extensions</p>
      </header>
      <main className={styles.main}>
        <button className={styles.addButton} onClick={handleOpenModal}>Add Extension</button>
        <button className={styles.addButton} onClick={() => exportLineExtensionsToPdf(lineExtensions)}>Export to PDF</button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Extension Number</th>
              <th>Employee</th>
              <th>Department</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lineExtensions.map((extension, index) => (
              <tr key={index}>
                <td>{extension.extensionNumber}</td>
                <td>{extension.employee}</td>
                <td>{extension.department}</td>
                <td>{extension.username}</td>
                <td>{extension.password}</td>
                <td>
                  <button className={styles.editButton} onClick={() => handleEditExtension(extension)}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteExtension(extension.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.closeButton} onClick={handleCloseModal}>&times;</span>
              <h2>{editingExtension !== null ? 'Update Extension' : 'Add Extension'}</h2>
              <div className={styles.addExtensionForm}>
                <label htmlFor="extensionNumber">Extension Number</label>
                <input
                  type="text"
                  name="extensionNumber"
                  id="extensionNumber"
                  value={newExtension.extensionNumber}
                  onChange={handleChange}
                  placeholder="Extension Number"
                />
                <label htmlFor="employee">Employee</label>
                <input
                  type="text"
                  name="employee"
                  id="employee"
                  value={newExtension.employee}
                  onChange={handleChange}
                  placeholder="Employee"
                />
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  value={newExtension.department}
                  onChange={handleChange}
                  placeholder="Department"
                />
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={newExtension.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={newExtension.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <button className={styles.addButton} onClick={handleAddExtension}>
                  {editingExtension !== null ? 'Update Extension' : 'Add Extension'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LineExtensionsConfiguration;
