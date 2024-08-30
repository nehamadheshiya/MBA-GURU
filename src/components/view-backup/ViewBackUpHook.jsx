import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@/API/Api';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewBackUpHook = () => {
  const [data, setData] = useState([]);
  const [from_date, setFromDate] = useState('');
  const [to_date, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFormEdit,setIsFormEdit]=useState(false);
  const [isFormDelete,setIsFormDelete]=useState(false);

  const [formValue,setFormValue]=useState({
    schedule_id:"",
    class_type:"",
    start_time:"",
    end_time:"",
    center:"",
    date:"",
    day:"",
    batch_code:"",
    skill:"",
    topic:"",
    faculty:"",
    batch_code:"",
    no_of_backup_slots:"",

  })

  const handleDateSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch( `${BASE_URL}show-backup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from_date: from_date,
          to_date: to_date,
        })
      });

      const result = await response.json();
      // console.log('Fetched data:', result.date);

      if (result && result.status) {
        setData(result.date);
      } else {
        console.error('Failed to fetch data:', result.message);

      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Provide UI feedback here if necessary
    }
    setLoading(false);
  };
  

  // Function to validate input dates
  const isValidInput = () => {
    return from_date && to_date && from_date <= to_date;
  };
  const handleEdit=(schedule_id,class_type,start_time,end_time,center,date,day,batch_code,skill,topic,faculty,no_of_backup_slots)=>{
    setIsFormEdit(true)
    setFormValue({
      schedule_id:schedule_id,
      class_type:class_type,
      start_time:start_time,
      end_time:end_time,
      center:center,
      date:date,
      day:day,
      batch_code:batch_code,
      skill:skill,
      topic:topic,
      faculty:faculty,
      no_of_backup_slots:  no_of_backup_slots,
    })
  }
  const handleChange=(e)=>{
    const { name, value } = e.target;
    setFormValue((prevState)=> ({
      ...prevState,
      [name]: value,      
    }))
  }
  const handleCloseEdit = () => setIsFormEdit(false);

 const handleDelete = (schedule_id) => {
    setIsFormDelete(true);
    setFormValue((prev) => ({
      ...prev,
      schedule_id: schedule_id,
    }));
  };

  const handleCloseDelete = () => setIsFormDelete(false);

  const handleClickEdit = async () => {
    const valueData = new FormData();
    valueData.append("schedule_id", formValue.schedule_id);
    valueData.append("class_type", formValue.class_type);
    valueData.append("start_time", formValue.start_time);
    valueData.append("end_time", formValue.end_time);
    valueData.append("center", formValue.center);
    valueData.append("date", formValue.date);
    valueData.append("day", formValue.day);
    valueData.append("batch_code", formValue.batch_code);
    valueData.append("skill", formValue.skill);
    valueData.append("topic", formValue.topic);
    valueData.append("faculty", formValue.faculty);
    valueData.append("no_of_backup_slots", formValue.no_of_backup_slots);
    try {
      const response = await fetch(`${BASE_URL}edit-backup`, {
        method: "POST",
        body: valueData,
      });
  
      const result = await response.json();
      if (response.ok) {
        setData(prevData => prevData.map(item => 
          item.schedule_id === formValue.schedule_id ? 
          {
            ...item,
            class_type: formValue.class_type,
            start_time: formValue.start_time,
            end_time: formValue.end_time,
            center: formValue.center,
            date: formValue.date,
            day: formValue.day,
            batch_code: formValue.batch_code,
            skill: formValue.skill,
            topic: formValue.topic,
            faculty: formValue.faculty,
            zoom_id: formValue.zoom_id,
            meeting_id: formValue.meeting_id,
            no_of_backup_slots:formValue.no_of_backup_slots,
          } : item
        ));
        handleCloseEdit();
        setFormValue({
          schedule_id: "",
          class_type: "",
          start_time: "",
          end_time: "",
          center: "",
          date: "",
          day: "",
          batch_code: "",
          skill: "",
          topic: "",
          faculty: "",
          no_of_backup_slots:"",
        });
        toast.success(result.message);
        handleDateSubmit();
      } else {
        console.error("Failed to update:", result);
        toast.error("Failed to update");
      }
    } catch (error) {
      console.error("Error", error);
      toast.error("An error occurred while updating");
    }
  };
  

  const handleDeleteButton=async(e)=>{
    const valueData=new FormData();
    valueData.append("schedule_id",formValue.schedule_id);
    // console.log(valueData,'value')
    try{
    const response=await fetch(`${BASE_URL}delete-backup`,
    {
      method: "POST",
      body: valueData,
       // mode: "no-cors",
    }
    );
    const data = await response.json(); 
    handleCloseDelete()
    setFormValue({
      schedule_id:"",
      class_type:"",
      start_time:"",
      end_time:"",
      center:"",
      date:"",
      day:"",
      batch_code:"",
      skill:"",
      topic:"",
      faculty:"",
    });
  
      toast.success(data.message);
      handleDateSubmit();
  
  }
  catch (error) {
    console.error("Error", error);
  }  
  }
  
  return {
    handleDateSubmit,
    data,
    from_date,
    to_date,
    setFromDate,
    setToDate,
    loading,
    isValidInput,
    isFormEdit,
    handleCloseEdit,
    handleChange,
    formValue,
    handleEdit,
    handleClickEdit,
    handleDelete,
    handleCloseDelete,
    isFormDelete,
    handleDeleteButton,
  };
};

export default ViewBackUpHook;
