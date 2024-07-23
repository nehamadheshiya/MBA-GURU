import React, { useEffect } from 'react'
import { useState } from 'react';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppUserDetailHook = () => {
  const [data, setData] = useState([]);
  const [records,setRecords]=useState(data);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormVisibleMore, setIsFormVisibleMore] = useState(false);
  const [isFormEdit,setIsFormEdit]=useState(false);
  const [isFormDelete,setIsFormDelete]=useState(false);

  const [formValue,setFormValue]=useState({
    id:"",
    name:"",
    email:"",
    password:"",
    mobile:"",
    batch_code:"",
    admission_date:"",
    dateofbirth:"",
    address:"",
    centercode:"",
    catyear:"",
    college:"",
  })
 
  const handleAddButton=()=>{
    setIsFormVisible(true);
    fetchData();
  }
  
  const handleMoreButton=()=>{
    setIsFormVisibleMore(true);
  }

  const handleDelete=(id)=>{
    setIsFormDelete(true)
    setFormValue({
      id: id,
    })
    // alert(id)
  }

  const handleClose = () => setIsFormVisible(false);
  const handleCloseMore = () => setIsFormVisibleMore(false);
  const handleCloseEdit = () => setIsFormEdit(false);
  const handleCloseDelete = () => setIsFormDelete(false);


    const fetchData= async ()=>{
      try{
        const response=await fetch("https://inmortaltechnologies.com/mbaguruApp/api/admin/get-user-detail");
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

  useEffect(() => {
    setRecords(data);
  }, [data]);

  const handleFilter=(event)=>{
    const newData=data.filter(row=>{
        return row.name.toLowerCase().startsWith(event.target.value.toLowerCase())
    })
    // we can use 'includes' also instead of startsWith
    setRecords(newData)
  }
 
  const handleChange=(e)=>{
    const { name, value } = e.target;
    setFormValue((prevState)=> ({
      ...prevState,
      [name]: value,      
    }))
  }
  const formClose=()=>{
    handleClose();
  }
  const handleClick=async(e)=>{
    const valueData=new FormData();
      valueData.append("name", formValue.name);
      valueData.append("email", formValue.email);
      valueData.append("mobile",formValue.mobile);
      valueData.append("password",formValue.password);
    try{
      const response=await fetch("https://inmortaltechnologies.com/mbaguruApp/api/admin/user-registration",
      {
        method: "POST",
        body: valueData,
         // mode: "no-cors",
      }
      );
      const data = await response.json(); 
      handleClose();

      setFormValue({
        email: "",
        name: "",
        mobile: "",
        password: "",
      });
       fetchData();
        toast.success(data.message);
    }
    catch (error) {
      console.error("Error", error);
    }
  }

  const handleEdit=(id,name,email,password,mobile,batch_code,admission_date,dateofbirth,address,centercode,catyear,college)=>{
    setIsFormEdit(true)
    setFormValue({
      id: id,
      name: name,
      email: email,
      password:password,
      mobile:mobile,
      batch_code:batch_code,
      admission_date:admission_date,
      dateofbirth:dateofbirth,
      address:address,
      centercode:centercode,
      catyear:catyear,
      college:college,
    })
  }

  const handleClickEdit=async(e)=>{
    const valueData=new FormData();
      valueData.append("name", formValue.name);
      valueData.append("email", formValue.email);
      valueData.append("userid",formValue.id);
      valueData.append("mobile",formValue.mobile);
      valueData.append("batch_code",formValue.batch_code);
      valueData.append("admission_date",formValue.admission_date);
      valueData.append("dateofbirth",formValue.dateofbirth);
      valueData.append("address",formValue.address);
      valueData.append("centercode",formValue.centercode);
      valueData.append("catyear",formValue.catyear);
      valueData.append("college",formValue.college);
      console.log(valueData,'valueee')
    try{
      const response=await fetch("https://inmortaltechnologies.com/mbaguruApp/api/admin/edit-user",
      {
        method: "POST",
        body: valueData,
         // mode: "no-cors",
      }
      );
      const data = await response.json(); 
      handleCloseEdit()
      setFormValue({
        id:"",
        email: "",
        name: "",
        password:"",
        mobile:"",
        batch_code:"",
        admission_date:"",
        dateofbirth:"",
        address:"",
        centercode:"",
        catyear:"",
        college:"",
      });
     
        toast.success(data.message);
        fetchData();
    }
   
    catch (error) {
      console.error("Error", error);
    }
  }

  const handleDeleteButton=async(e)=>{
    const valueData=new FormData();
    valueData.append("user_id",formValue.id);
    console.log(valueData,'value')
  try{
    const response=await fetch("https://inmortaltechnologies.com/mbaguruApp/api/admin/delete-user",
    {
      method: "POST",
      body: valueData,
       // mode: "no-cors",
    }
    );
    const data = await response.json(); 
    handleCloseDelete()
    setFormValue({
      id:"",
    });
  
      toast.success(data.message);
      fetchData();
  }
  catch (error) {
    console.error("Error", error);
  }  
  }
  
  return{
    data,
    records,
    handleFilter,
    isFormVisible,
    handleAddButton,
    handleClose,
    handleCloseMore,
    isFormVisibleMore,
    handleMoreButton,
    handleChange,
    handleClick,
    formValue,
    handleEdit,
    handleDelete,
    isFormEdit,
    isFormDelete,
    handleCloseEdit,
    handleCloseDelete,
    handleDeleteButton,
    handleClickEdit,
    formClose,
  }
}

export default AppUserDetailHook