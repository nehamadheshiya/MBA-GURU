import React, { useEffect } from 'react';
import { useState } from 'react';
import { BASE_URL } from '@/API/Api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BatchesHook = () => {
  const [data, setData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [centers, setCenters] = useState([]); 
  const [isFormEdit,setIsFormEdit]=useState(false);
  const [isFormDelete,setIsFormDelete]=useState(false);
  const [formValue, setFormValue] = useState({
    center_id: "",
    batch_name: "",
    status: '',
    batch_id:"",
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}show-batches`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (error) {
      console.log("error is", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddButton = () => {
    setIsFormVisible(true);
  };

  const handleClick = async (e) => {
    const valueData = new FormData();
    valueData.append("center_id", formValue.center_id);
    valueData.append("batch_name", formValue.batch_name);
    valueData.append("status", formValue.status);
    try {
      const response = await fetch(`${BASE_URL}add-batches`, {
        method: "POST",
        body: valueData,
      });
      const data = await response.json();
      handleClose();
      setFormValue({
        center_id: "",
        batch_name: "",
        status: "Deactivate",
      });
      toast.success(data.message);
      fetchData();
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleClose = () => setIsFormVisible(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  const handleChangeCenter = (e) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCloseEdit = () => setIsFormEdit(false);
  const handleCloseDelete = () => setIsFormDelete(false);

  const handleEdit=(batch_id,center_id,batch_name,status)=>{
    setIsFormEdit(true)
    setFormValue({
      center_id:center_id,
      batch_id:batch_id,
      batch_name:batch_name,
      status:status,
    })
}
const handleClickEdit = async () => {
  const valueData=new FormData();
    valueData.append("center_id", formValue.center_id);
    valueData.append("batch_id", formValue.batch_id);
    valueData.append("batch_name", formValue.batch_name);
    valueData.append("status",formValue.status)

  try {
    const response = await fetch(`${BASE_URL}edit-batches`, {
      method: "POST",
      body: valueData,
    });

    const result = await response.json();
    if (response.ok) {
      setData(prevData => prevData.map(item => 
        item.center_id === formValue.center_id ? 
        {
          ...item,
          batch_id: formValue.batch_id,
          center_id: formValue.center_id,
          batch_name: formValue.batch_name,
          status: formValue.status,
        } : item
      ));
      handleCloseEdit();
      setFormValue({
        batch_id:"",
        center_id: "",
        batch_name: "",
        status: '',
        });
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

const handleDelete = (batch_id) => {
  setIsFormDelete(true);
  setFormValue((prev) => ({
    ...prev,
    batch_id: batch_id,
  }));
};
const handleDeleteButton=async()=>{
  const valueData=new FormData();
  valueData.append("batch_id",formValue.batch_id);
  try{
  const response=await fetch(`${BASE_URL}delete-batches`,
  {
    method: "POST",
    body: valueData,
  }
  );
  const data = await response.json(); 
  handleCloseDelete()
  // setFormValue({
  //     registration_id:"",
  // });
  fetchData();
    toast.success(data.message);
}
catch (error) {
  console.error("Error", error);
} 

}

  return {
    isFormVisible,
    handleAddButton,
    handleClose,
    formValue,
    handleChange,
    data,
    handleClick,
    centers, 
    handleChangeCenter,
    handleCloseEdit,
    isFormEdit,
    handleEdit,
    handleClickEdit,
    handleCloseDelete,
    isFormDelete,
    handleDelete,
    handleDeleteButton,
  };
};

export default BatchesHook;
