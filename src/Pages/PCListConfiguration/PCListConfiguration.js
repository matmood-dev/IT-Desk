// PCListConfiguration.js
import React, { useState, useEffect } from 'react';
import { getPCList, addPC, updatePC, deletePC } from '../../firebaseHelpers/pcListHelpers'; // Adjust the import based on your project structure
import PCListFilters from './PCListFilter'; // Import the new filters component
import styles from './PCListConfiguration.module.css';

const PCListConfiguration = () => {
  const [pcList, setPCList] = useState([]);
  const [newPC, setNewPC] = useState({
    pcName: '',
    user: '',
    department: '',
    pcRating: '',
    os: '',
    vncLink: ''
  });
  const [editingPC, setEditingPC] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    department: '',
    os: '',
    pcRating: ''
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPCList = async () => {
      const pcListData = await getPCList();
      setPCList(pcListData.sort((a, b) => a.pcName.localeCompare(b.pcName)));
    };

    fetchPCList();
  }, []);

  const handleAddPC = async () => {
    const pcWithVncLink = {
      ...newPC,
      vncLink: `com.realvnc.vncviewer.connect://${newPC.pcName}`
    };
    if (editingPC !== null) {
      await updatePC(editingPC.id, pcWithVncLink);
    } else {
      await addPC(pcWithVncLink);
    }
    setNewPC({
      pcName: '',
      user: '',
      department: '',
      pcRating: '',
      os: '',
      vncLink: ''
    });
    setEditingPC(null);
    setIsModalOpen(false);

    const pcListData = await getPCList();
    setPCList(pcListData.sort((a, b) => a.pcName.localeCompare(b.pcName)));
  };

  const handleEditPC = (pc) => {
    setNewPC(pc);
    setEditingPC(pc);
    setIsModalOpen(true);
  };

  const handleDeletePC = async (pcId) => {
    const confirmed = window.confirm("Are you sure you want to delete this PC?");
    if (confirmed) {
      await deletePC(pcId);
      const pcListData = await getPCList();
      setPCList(pcListData.sort((a, b) => a.pcName.localeCompare(b.pcName)));
    }
  };

  const handleChange = (e) => {
    setNewPC({
      ...newPC,
      [e.target.name]: e.target.value
    });
  };

  const handleOpenModal = () => {
    setNewPC({
      pcName: '',
      user: '',
      department: '',
      pcRating: '',
      os: '',
      vncLink: ''
    });
    setEditingPC(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredPCList = pcList.filter((pc) => {
    return (
      (filters.department === '' || pc.department === filters.department) &&
      (filters.os === '' || pc.os === filters.os) &&
      (filters.pcRating === '' || pc.pcRating === filters.pcRating) &&
      (search === '' || pc.user.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>PC List Configuration</h1>
        <p>Manage your PC list</p>
      </header>
      <main className={styles.main}>
        <PCListFilters pcList={pcList} filters={filters} setFilters={setFilters} search={search} setSearch={setSearch} />
        <button className={styles.addButton} onClick={handleOpenModal}>Add PC</button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>PC Name</th>
              <th>User</th>
              <th>Department</th>
              <th>PC Rating</th>
              <th>Operating System</th>
              <th>Actions</th>
              <th>VNC Connection</th>
            </tr>
          </thead>
          <tbody>
            {filteredPCList.map((pc, index) => (
              <tr key={index}>
                <td>{pc.pcName}</td>
                <td>{pc.user}</td>
                <td>{pc.department}</td>
                <td>{pc.pcRating}</td>
                <td>{pc.os}</td>
                <td>
                  <button className={styles.editButton} onClick={() => handleEditPC(pc)}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleDeletePC(pc.id)}>Delete</button>
                </td>
                <td>
                  <button className={styles.vncLinkButton} onClick={() => window.location.href = pc.vncLink}>Connect</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.closeButton} onClick={handleCloseModal}>&times;</span>
              <h2>{editingPC !== null ? 'Update PC' : 'Add PC'}</h2>
              <div className={styles.addPCForm}>
                <label htmlFor="pcName">PC Name</label>
                <input
                  type="text"
                  name="pcName"
                  id="pcName"
                  value={newPC.pcName}
                  onChange={handleChange}
                  placeholder="PC Name"
                />
                <label htmlFor="user">User</label>
                <input
                  type="text"
                  name="user"
                  id="user"
                  value={newPC.user}
                  onChange={handleChange}
                  placeholder="User"
                />
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  value={newPC.department}
                  onChange={handleChange}
                  placeholder="Department"
                />
                <label htmlFor="pcRating">PC Rating</label>
                <input
                  type="text"
                  name="pcRating"
                  id="pcRating"
                  value={newPC.pcRating}
                  onChange={handleChange}
                  placeholder="PC Rating"
                />
                <label htmlFor="os">Operating System</label>
                <input
                  type="text"
                  name="os"
                  id="os"
                  value={newPC.os}
                  onChange={handleChange}
                  placeholder="Operating System"
                />
                <button className={styles.addButton} onClick={handleAddPC}>
                  {editingPC !== null ? 'Update PC' : 'Add PC'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PCListConfiguration;
