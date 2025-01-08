import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import logo from '../../assets/logo.png';

const exportLineExtensionsToPdf = (lineExtensions) => {
  const doc = new jsPDF();
  const img = new Image();
  img.src = logo;

  // Centering elements with resized logo
  doc.addImage(img, 'PNG', doc.internal.pageSize.getWidth() / 2 - 25, 20, 50, 50); // Resize logo to 50x50 pixels
  doc.setFontSize(18);
  doc.text('YAS Holding IT Department', doc.internal.pageSize.getWidth() / 2, 80, { align: 'center' });
  doc.setFontSize(22);
  doc.text('Line Extensions', doc.internal.pageSize.getWidth() / 2, 100, { align: 'center' });

  const tableColumn = ["Extension Number", "Employee", "Department"];
  const tableRows = [];

  // Filter out extensions without an employee name
  const filteredExtensions = lineExtensions.filter(extension => extension.employee.trim() !== "");

  // Sort line extensions by department
  const sortedExtensions = filteredExtensions.sort((a, b) => a.department.localeCompare(b.department));

  sortedExtensions.forEach(extension => {
    const extensionData = [
      extension.extensionNumber,
      extension.employee,
      extension.department
    ];
    tableRows.push(extensionData);
  });

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
    styles: { halign: 'center' } // Center align table data
  });

  doc.save('LineExtensionsConfiguration.pdf');
};

export default exportLineExtensionsToPdf;
