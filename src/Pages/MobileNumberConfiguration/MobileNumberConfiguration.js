import React, { useState, useEffect } from 'react';
import { getMobileNumbers, addMobileNumber, updateMobileNumber, deleteMobileNumber } from '../../firebaseHelpers/mobileNumberHelpers';
import styles from './MobileNumberConfiguration.module.css';

const MobileNumberConfiguration = () => {
  const [mobileNumbers, setMobileNumbers] = useState([]);
  const [newNumber, setNewNumber] = useState({
    employeeName: '',
    department: '',
    mobileNumber: '',
    packagePrice: '',
    contractEndDate: ''
  });
  const [editingNumber, setEditingNumber] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMobileNumbers = async () => {
      const mobileNumbersData = await getMobileNumbers();
      setMobileNumbers(mobileNumbersData);
    };

    fetchMobileNumbers();
  }, []);

  const handleAddNumber = async () => {
    if (editingNumber !== null) {
      await updateMobileNumber(editingNumber.id, newNumber);
    } else {
      await addMobileNumber(newNumber);
    }
    setNewNumber({
      employeeName: '',
      department: '',
      mobileNumber: '',
      packagePrice: '',
      contractEndDate: ''
    });
    setEditingNumber(null);
    setIsModalOpen(false);

    const mobileNumbersData = await getMobileNumbers();
    setMobileNumbers(mobileNumbersData);
  };

  const handleEditNumber = (number) => {
    setNewNumber(number);
    setEditingNumber(number);
    setIsModalOpen(true);
  };

  const handleDeleteNumber = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this number?");
    if (confirmed) {
      await deleteMobileNumber(id);
      const mobileNumbersData = await getMobileNumbers();
      setMobileNumbers(mobileNumbersData);
    }
  };

  const handleChange = (e) => {
    setNewNumber({
      ...newNumber,
      [e.target.name]: e.target.value
    });
  };

  const handleOpenModal = () => {
    setNewNumber({
      employeeName: '',
      department: '',
      mobileNumber: '',
      packagePrice: '',
      contractEndDate: ''
    });
    setEditingNumber(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Mobile Number Configuration</h1>
        <p>Manage your mobile numbers</p>
      </header>
      <main className={styles.main}>
        <button className={styles.addButton} onClick={handleOpenModal}>Add Number</button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Mobile Number</th>
              <th>Package Price (BHD)</th>
              <th>Contract End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mobileNumbers.map((number, index) => (
              <tr key={index}>
                <td>{number.employeeName}</td>
                <td>{number.department}</td>
                <td>{number.mobileNumber}</td>
                <td>{number.packagePrice}</td>
                <td>{number.contractEndDate}</td>
                <td>
                  <button className={styles.editButton} onClick={() => handleEditNumber(number)}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteNumber(number.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.closeButton} onClick={handleCloseModal}>&times;</span>
              <h2>{editingNumber !== null ? 'Update Number' : 'Add Number'}</h2>
              <div className={styles.addNumberForm}>
                <label htmlFor="employeeName">Employee Name</label>
                <input
                  type="text"
                  name="employeeName"
                  id="employeeName"
                  value={newNumber.employeeName}
                  onChange={handleChange}
                  placeholder="Employee Name"
                />
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  value={newNumber.department}
                  onChange={handleChange}
                  placeholder="Department"
                />
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  id="mobileNumber"
                  value={newNumber.mobileNumber}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                />
                <label htmlFor="packagePrice">Package Price (BHD)</label>
                <input
                  type="text"
                  name="packagePrice"
                  id="packagePrice"
                  value={newNumber.packagePrice}
                  onChange={handleChange}
                  placeholder="Package Price"
                />
                <label htmlFor="contractEndDate">Contract End Date</label>
                <input
                  type="date"
                  name="contractEndDate"
                  id="contractEndDate"
                  value={newNumber.contractEndDate}
                  onChange={handleChange}
                  placeholder="Contract End Date"
                />
                <button className={styles.addButton} onClick={handleAddNumber}>
                  {editingNumber !== null ? 'Update Number' : 'Add Number'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MobileNumberConfiguration;
