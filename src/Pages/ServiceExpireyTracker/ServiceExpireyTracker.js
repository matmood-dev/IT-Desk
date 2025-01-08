import React, { useState, useEffect } from 'react';
import { getServices, addService, updateService, deleteService } from '../../firebaseHelpers/firebaseHelpers';
import exportToPdf from '../../Components/ExportToPDF/exportToPdf'; // Correct import path to exportToPdf.js
import styles from '../ServiceExpireyTracker/ServiceExpireyTracker.module.css';

const ServiceExpiryTracker = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    service: '',
    expiryDate: '',
    renewalPrice: ''
  });
  const [editingService, setEditingService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      const servicesData = await getServices();
      const sortedServices = servicesData.sort((a, b) => calculateDaysLeft(a.expiryDate) - calculateDaysLeft(b.expiryDate));
      setServices(sortedServices);
    };

    fetchServices();
  }, []);

  const handleAddService = async () => {
    if (editingService) {
      await updateService(editingService.id, newService);
    } else {
      await addService(newService);
    }
    setNewService({
      service: '',
      expiryDate: '',
      renewalPrice: ''
    });
    setEditingService(null);
    setIsModalOpen(false);

    const servicesData = await getServices();
    const sortedServices = servicesData.sort((a, b) => calculateDaysLeft(a.expiryDate) - calculateDaysLeft(b.expiryDate));
    setServices(sortedServices);
  };

  const handleEditService = (service) => {
    setNewService({
      service: service.service,
      expiryDate: service.expiryDate,
      renewalPrice: service.renewalPrice
    });
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDeleteService = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this service?");
    if (confirmed) {
      await deleteService(id);
      const servicesData = await getServices();
      const sortedServices = servicesData.sort((a, b) => calculateDaysLeft(a.expiryDate) - calculateDaysLeft(b.expiryDate));
      setServices(sortedServices);
    }
  };

  const handleChange = (e) => {
    setNewService({
      ...newService,
      [e.target.name]: e.target.value
    });
  };

  const handleOpenModal = () => {
    setNewService({
      service: '',
      expiryDate: '',
      renewalPrice: ''
    });
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const calculateDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotalPrice = () => {
    return services.reduce((total, service) => total + parseFloat(service.renewalPrice), 0).toFixed(2);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Service Expiry Tracker</h1>
        <p>Track the expiry dates of various services</p>
      </header>
      <main className={styles.main}>
        <button className={styles.addServiceButton} onClick={handleOpenModal}>Add Service</button>
        <button className={styles.exportButton} onClick={() => exportToPdf(services)}>Export to PDF</button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Service</th>
              <th>Expiry Date</th>
              <th>Days Left</th>
              <th>Renewal Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.service}</td>
                <td>{service.expiryDate}</td>
                <td>{calculateDaysLeft(service.expiryDate)}</td>
                <td>{service.renewalPrice} BHD</td>
                <td>
                  <button className={styles.editButton} onClick={() => handleEditService(service)}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteService(service.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total Renewal Price</td>
              <td colSpan="2">{calculateTotalPrice()} BHD</td>
            </tr>
          </tfoot>
        </table>
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.closeButton} onClick={handleCloseModal}>&times;</span>
              <h2>{editingService ? 'Update Service' : 'Add Service'}</h2>
              <div className={styles.addServiceForm}>
                <label htmlFor="service">Service Name</label>
                <input
                  type="text"
                  name="service"
                  id="service"
                  value={newService.service}
                  onChange={handleChange}
                  placeholder="Service Name"
                />
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  id="expiryDate"
                  value={newService.expiryDate}
                  onChange={handleChange}
                  placeholder="Expiry Date"
                />
                <label htmlFor="renewalPrice">Renewal Price</label>
                <input
                  type="number"
                  name="renewalPrice"
                  id="renewalPrice"
                  value={newService.renewalPrice}
                  onChange={handleChange}
                  placeholder="Renewal Price"
                />
                <button className={styles.addButton} onClick={handleAddService}>
                  {editingService ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ServiceExpiryTracker;
