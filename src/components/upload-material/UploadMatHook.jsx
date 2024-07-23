import { useState, useEffect } from 'react';
import { BASE_URL } from '@/API/Api';
import * as XLSX from 'xlsx';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadMatHook = () => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const[batchCode,setBatchCode]=useState("");
  const [isFormEdit,setIsFormEdit]=useState(false);
  const[id,setId]=useState("");
  const [isFormDelete,setIsFormDelete]=useState(false);
  const [sections, setSections] = useState([]);
  const [formValue, setFormValue] = useState({ section_name: '' });

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
      // setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

 

    const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected for upload.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("section_name",formValue.section_name );  
    try {
      const response = await fetch(`${BASE_URL}material-upload`, {
        method: "POST",
        body: formData,
        // mode: "no-cors",
      });
      const data = await response.json();
      // console.log(data);
      toast.success(data.message);
      setSelectedFile(null);
      setBatchCode('');
      fetchData();
      document.getElementById("fileInput").value = "";
    } catch (error) {
      console.error("Error", error);
    }
  };

    const fetchData= async ()=>{
      try{
        const response=await fetch(`${BASE_URL}get-material-upload`);
        if(!response.ok){
          throw new Error('Network response was not ok');
        }
        const jsonData=await response.json();
        // console.log(jsonData.data)
        setData(jsonData.data);
      }catch(error){
        console.log("error is", error)
      }
    } ;
    useEffect(()=>{
      fetchData();
    },[])

  const handleCloseEdit = () => setIsFormEdit(false);
  const handlebatchChange = (event) => {
    setBatchCode(event.target.value);
  };

  const handleEdit = (id, file_url, section_name) => {
    setIsFormEdit(true);
    setId(id);
    setSelectedFile(file_url);
    setFormValue(prevFormValue => ({
      ...prevFormValue,
      section_name
    }));
   
  };
  
  useEffect(() => {
    if (isFormEdit) {
      console.log(batchCode, "batchcodeeeeeee");
    }
  }, [batchCode, isFormEdit]);

  const handleClickEdit = async () => {
    const valueData=new FormData();
      valueData.append("id", id);
      valueData.append("pdf", selectedFile);
      valueData.append("section_name", batchCode);
    try {
      console.log('ooooppsssss')
      const response = await fetch(`${BASE_URL}edit-material-upload`, {
        method: "POST",
        body: valueData,
      });
  
      const result = await response.json();
      console.log(result,"rrrrrrrrrrr")
      if (response.ok) {
        handleCloseEdit();
        setSelectedFile([]); 
        setBatchCode("");
        toast.success(result.message);
        fetchData()
      } else {
        console.error("Failed to update:", result);
        toast.error("Failed to update");
      }
    } catch (error) {
      console.error("Error", error);
      toast.error("An error occurred while updating");
    }
  };
  const handleCloseDelete = () => setIsFormDelete(false);

  const handleDelete = (id) => {
  setIsFormDelete(true);
  setId(id);
  };
  const handleDeleteButton=async()=>{
    const valueData=new FormData();
    valueData.append("id",id);
    try{
    const response=await fetch(`${BASE_URL}delete-material-upload`,
    {
      method: "POST",
      body: valueData,
    }
    );
    const data = await response.json(); 
    handleCloseDelete()
    fetchData();
      toast.success(data.message);
  }
  catch (error) {
    console.error("Error", error);
  } 
  
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  useEffect(() => {
    fetch(`${BASE_URL}section-name`)
      .then(response => response.json())
      .then(data => {
        if (data.status) {
            console.log(data.data,"datatttt")
          setSections(data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching sections:', error);
      });
  }, []);
 
  return{
    selectedFile,
    handleFileUpload,
    handlebatchChange,
    batchCode,
    handleUpload,
    data,
    handleEdit,
    handleCloseEdit,
    isFormEdit,
    handleClickEdit,
    id,
    isFormDelete,
    handleDelete,
    handleCloseDelete,
    handleDeleteButton,
    sections,
    formValue,
    handleChange,
  }

}

export default UploadMatHook