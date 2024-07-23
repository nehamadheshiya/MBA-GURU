import { useState } from 'react';
import * as XLSX from 'xlsx';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useCalendar = () => { // Renamed to follow the convention of custom hooks
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);  // Store the selected file
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected for upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("https://inmortaltechnologies.com/mbaguruApp/api/admin/import-schedule", {
        method: "POST",
        body: formData,
        // mode: "no-cors",
      });
      const data = await response.json();
      console.log(data);
      toast.success(data.message);
    } catch (error) {
      console.error("Error", error);
    }
  };
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/calendarSchedule.xlsx';
    link.download = 'calendarSchedule.xlsx';
    document.body.appendChild(link);
    
    link.click();
    document.body.removeChild(link);
  }
  return { 
    data, 
    handleFileUpload,
    handleUpload,
    handleDownload,
  };
};

export default useCalendar;
