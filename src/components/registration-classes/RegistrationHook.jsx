import React, { useEffect } from 'react'
import { useState } from 'react';
import { BASE_URL } from '@/API/Api';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationHook = () => {
    const [data, setData] = useState([]);
    const [isFormEdit,setIsFormEdit]=useState(false);
    const [isFormDelete,setIsFormDelete]=useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [centers, setCenters] = useState([]);
    const [batches, setBatches] = useState([]); 
    const [subjects, setSubjects] = useState([]);
    const staticModules = ["Regular", "Advance", "Adaptive"];
    const [formValue,setFormValue]=useState({
        registration_id:"",
        center:"",
        faculty_name:"",
        skills:"",
        topics:"",
        max_students:"",
        batches:"",
        details:"",
        date:"",
        start_time:"",
        end_time:"",
        center_id:"",
        module: '',
        subject: '',
      })

const fetchData= async ()=>{
    try{
        const response=await fetch(`${BASE_URL}show-registration-based-class`);
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


const handleChange = (e) => {
  const { name, value } = e.target;
  setFormValue((prevFormValue) => ({
    ...prevFormValue,
    [name]: value,
  }));
};


const handleEdit=(registration_id,center,faculty_name,skills,topics,max_students,batches,details,date,start_time,end_time,type,subject)=>{
  setIsFormEdit(true)
  setFormValue({
      registration_id:registration_id,
      center:center,
      faculty_name:faculty_name,
      skills:skills,
      topics:topics,
      max_students:max_students,
      batches:batches,
      details:details,
      date:date,
      start_time:start_time,
      end_time:end_time,
      module:type,
      subject:subject,
  })
}
 const handleClickEdit = async () => {
    const valueData=new FormData();
      valueData.append("registration_id", formValue.registration_id);
      valueData.append("center", formValue.center);
      valueData.append("faculty_name",formValue.faculty_name);
      valueData.append("skills",formValue.skills);
      valueData.append("topics",formValue.topics);
      valueData.append("max_students",formValue.max_students);
      valueData.append("batches",formValue.batches);
      valueData.append("details",formValue.details);
      valueData.append("date",formValue.date);
      valueData.append("start_time",formValue.start_time);
      valueData.append("end_time",formValue.end_time);
      valueData.append("type",formValue.module);
      valueData.append("subject",formValue.subject);
      console.log(valueData,'valueee')
  
    try {
      const response = await fetch(`${BASE_URL}edit-registration-based-class`, {
        method: "POST",
        body: valueData,
      });
  
      const result = await response.json();
      if (response.ok) {
        setData(prevData => prevData.map(item => 
          item.registration_id === formValue.registration_id ? 
          {
            ...item,
            registration_id: formValue.registration_id,
            center: formValue.center,
            faculty_name: formValue.faculty_name,
            skills: formValue.skills,
            topics: formValue.topics,
            max_students: formValue.max_students,
            batches: formValue.batches,
            details: formValue.details,
            date: formValue.date,
            start_time: formValue.start_time,
            end_time: formValue.end_time,
            type: formValue.module,
            subject: formValue.subject,
          } : item
        ));
        handleCloseEdit();
        setFormValue({
            registration_id:"",
            center:"",
            faculty_name:"",
            skills:"",
            topics:"",
            max_students:"",
            batches:"",
            details:"",
            date:"",
            start_time:"",
            end_time:"",
            module:"",
            subject:""
          });
        toast.success(result.message);
        fetchData();
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
  const handleDelete = (registration_id) => {
    setIsFormDelete(true);
    setFormValue((prev) => ({
      ...prev,
      registration_id: registration_id,
    }));
  };

  const handleDeleteButton=async(e)=>{
    const valueData=new FormData();
    valueData.append("registration_id",formValue.registration_id);
    try{
    const response=await fetch(`${BASE_URL}delete-registration-based-class`,
    {
      method: "POST",
      body: valueData,
    }
    );
    const data = await response.json(); 
    handleCloseDelete()
    setFormValue({
        registration_id:"",
        center:"",
        faculty_name:"",
        skills:"",
        topics:"",
        max_students:"",
        batches:"",
        details:"",
        date:"",
        start_time:"",
        end_time:"",
    });
    fetchData();
      toast.success(data.message);
  
  }
  catch (error) {
    console.error("Error", error);
  } 

  }
  const handleClose = () => setIsFormVisible(false);

  const handleAddButton=()=>{
    setIsFormVisible(true);
    fetchData();
  }

  const handleClick=async(e)=>{
    const valueData=new FormData();
    valueData.append("center", formValue.center);
    valueData.append("faculty_name",formValue.faculty_name);
    valueData.append("skills",formValue.skills);
    valueData.append("topics",formValue.topics);
    valueData.append("max_students",formValue.max_students);
    valueData.append("batches",formValue.batches);
    valueData.append("details",formValue.details);
    valueData.append("date",formValue.date);
    valueData.append("start_time",formValue.start_time);
    valueData.append("end_time",formValue.end_time);
    valueData.append("type",formValue.module);
    valueData.append("subject",formValue.subject);
    try{
      const response=await fetch(`${BASE_URL}registration-based-class`,
      {
        method: "POST",
        body: valueData,
      }
      );
      const data = await response.json(); 
      handleClose();
      setFormValue({
        center:"",
        faculty_name:"",
        skills:"",
        topics:"",
        max_students:"",
        batches:"",
        details:"",
        date:"",
        start_time:"",
        end_time:"",
        module:"",
        subject:"",

      });
       fetchData();
        toast.success(data.message);
    }
    catch (error) {
      console.error("Error", error);
    }
  }

  const fetchCenter = async () => {
    try {
      const response = await fetch(`${BASE_URL}show-center`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setCenters(jsonData.data);
     } catch (error) {
      console.log('error is', error);
    }
  };
  useEffect(() => {
    fetchCenter();
  }, []);

    const fetchBatches = async () => {
      if (formValue.center) {
      try {
          const response = await fetch(`${BASE_URL}center-base-batches`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ center_id: formValue.center })
          });

          const data = await response.json();
          if (data.status) {
            setBatches(data.data);
          } else {
            setBatches([]);
          }
        }
        catch (error) {
          console.error('Error fetching batches:', error);
          setBatches([]);
        }
      }
    };

    useEffect(() => {
      fetchBatches();
    }, [formValue.center]);

    useEffect(() => {
      const fetchSubjects = async () => {
        if (formValue.module) {
          try {
            const response = await fetch('https://inmortaltechnologies.com/mbaguruApp/api/admin/show-module', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ type: formValue.module })
            });
  
            const data = await response.json();
            setSubjects(data.subject);
            setFormValue(prevFormValue => ({ ...prevFormValue, subject: '' })); // Reset subject to empty string
          } catch (error) {
            console.error('Error fetching subjects:', error);
            setSubjects([]);
          }
        }
      };
  
      fetchSubjects();
    }, [formValue.module]);

  

  return{
    fetchData,
    data,
    isFormEdit,
    handleCloseEdit,
    handleEdit,
    formValue,
    handleChange,
    handleClickEdit,
    handleDelete,
    handleCloseDelete,
    isFormDelete,
    handleDeleteButton,
    handleAddButton,
    isFormVisible,
    handleClose,
    handleClick,
    centers,
    batches,
    subjects,
    staticModules,

  }
}

export default RegistrationHook