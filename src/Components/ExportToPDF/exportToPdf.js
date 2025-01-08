import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import logo from '../../assets/logo.png';

const exportToPdf = (services) => {
  const doc = new jsPDF();
  const img = new Image();
  img.src = logo;

  // Centering elements with resized logo
  doc.addImage(img, 'PNG', doc.internal.pageSize.getWidth() / 2 - 25, 20, 50, 50); // Resize logo to 50x50 pixels
  doc.setFontSize(18);
  doc.text('YAS Holding IT Department', doc.internal.pageSize.getWidth() / 2, 80, { align: 'center' });
  doc.setFontSize(22);
  doc.text('Service Expiry Tracker', doc.internal.pageSize.getWidth() / 2, 100, { align: 'center' });

  const tableColumn = ["Service", "Expiry Date", "Days Left", "Renewal Price"];
  const tableRows = [];

  services.forEach(service => {
    const serviceData = [
      service.service,
      service.expiryDate,
      calculateDaysLeft(service.expiryDate),
      `${service.renewalPrice} BHD`
    ];
    tableRows.push(serviceData);
  });

  const totalRenewalPrice = services.reduce((total, service) => total + parseFloat(service.renewalPrice), 0).toFixed(2);
  const totalRow = ["", "", "Total Renewal Price", `${totalRenewalPrice} BHD`];
  tableRows.push(totalRow);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 110,
    theme: 'grid',
    headStyles: {
      fillColor: '#008aad', // Change header color to #008aad
      textColor: '#ffffff', // Set text color to white for better contrast
      halign: 'center' // Center align table header
    },
    styles: { halign: 'center' }, // Center align table data
    footStyles: { fillColor: '#ffffff', textColor: '#000000', fontStyle: 'bold' } // Style the footer row
  });

  doc.save('ServiceExpiryTracker.pdf');
};

const calculateDaysLeft = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default exportToPdf;
