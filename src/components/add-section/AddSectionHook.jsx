import { useState, useEffect } from 'react';
import { BASE_URL } from '@/API/Api';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddSectionHook() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormEdit,setIsFormEdit]=useState(false);
    const [isFormDelete,setIsFormDelete]=useState(false);
    const [data, setData] = useState([]);
    const [formValue,setFormValue]=useState({
        subject_id:"",
        section_name:"",
        topics:"",
        subject:"",
    })
    
  const handleAddButton=()=>{
    setIsFormVisible(true);
  }
const handleClose = () => setIsFormVisible(false);
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };

  const fetchData= async ()=>{
    try{
      const response=await fetch(`${BASE_URL}show-section-subject`);
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      const jsonData=await response.json();
      console.log(jsonData.data)
      setData(jsonData.data);
    }catch(error){
      console.log("error is", error)
    }
  } ;
  useEffect(()=>{
    fetchData();
  },[])
  const handleCloseEdit = () => setIsFormEdit(false);

  const handleEdit = (subject_id,section_name,subject,topics) => {
    setIsFormEdit(true);
    setFormValue({
      subject_id: subject_id,
      section_name: section_name,
      subject: subject,
      topics: topics,
    });
  };
  
  const handleClickEdit = async () => {
    const formData = new FormData();
    formData.append("subject_id", formValue.subject_id);
    formData.append("section_name", formValue.section_name);  
    formData.append("subject", formValue.subject);  
    formData.append("topics", formValue.topics);
  
    try {
      const response = await fetch(`${BASE_URL}edit-section-subject`, {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        fetchData();
        handleCloseEdit()
        toast.success(result.message);
        setFormValue({
          section_name: "",
          subject: "",
          topics: "",
        })

      } else {
        console.error("Failed to update:", result);
        toast.error("Failed to update");
      }
    } catch (error) {
      console.error("Error", error);
      toast.error("An error occurred while updating");
    }
  };

  const handleDelete = (subject_id) => {
    setIsFormDelete(true);
    setFormValue({
      subject_id: subject_id,
    });
  };

  const handleCloseDelete = () => setIsFormDelete(false);
  const handleDeleteButton=async()=>{
    const valueData=new FormData();
    valueData.append("subject_id",formValue.subject_id);
    try{
    const response=await fetch(`${BASE_URL}delete-section-subject`,
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

  const handleClick=async()=>{
    const valueData=new FormData();
    valueData.append("section_name", formValue.section_name);
    valueData.append("topics",formValue.topics);
    valueData.append("subject",formValue.subject);

    try{
      const response=await fetch(`${BASE_URL}add-section-topic`,
      {
        method: "POST",
        body: valueData,
      }
      );
      const data = await response.json(); 
      handleClose();
      setFormValue({  
        section_name:"",
        topics:"",
        subject:"",
      });
    //    fetchData();
        toast.success(data.message);
    }
    catch (error) {
      console.error("Error", error);
    }
  }
  return{
    isFormVisible,
    handleAddButton,
    handleClose,
    formValue,
    handleClick,
    handleChange,
    handleEdit,
    data,
    isFormEdit,
    handleCloseEdit,
    handleClickEdit,
    handleDelete,
    isFormDelete,
    handleCloseDelete,
    handleDeleteButton,
  }
}

export default AddSectionHook
