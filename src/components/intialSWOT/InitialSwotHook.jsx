import { useState, useEffect } from 'react';
import { BASE_URL } from '@/API/Api';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InitialSwotHook = () => {
  const [show, setShow] = useState(false);
  const [module_value, setModuleValue] = useState("");
  const [reasonForChange, setReasonForChange] = useState("");
  const[mathsReasoning,setMathsReasoning]=useState("");
  const[english,setEnglish]=useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);
  const[batchCode,setBatchCode]=useState("");
  const[year,setYear]=useState("");
  const[basicModule,setBasicModule]=useState("");
  const[advancedModule,setAdvancedModule]=useState("");
  const[batchYears,setBatchYears]=useState({ year: [], batch_code: [] });

  const handleClose = () => setShow(false);
  const handleShow = (id, module, reason,eng_mark,math_mark,basic,advanced) => {
    setSelectedId(id);
    setModuleValue(module);
    setReasonForChange(reason);
    setShow(true);
    setEnglish(eng_mark);
    setMathsReasoning(math_mark);
    setBasicModule(basic);
    setAdvancedModule(advanced);
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}show-initial-swot`);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const jsonData = await response.json();
  //     setData(jsonData.data);
  //   } catch (error) {
  //     console.log("error is", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleSubmit=async()=>{
    try {
      const response = await fetch(`${BASE_URL}student-batch-year-filter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          batch_code: batchCode,
          year: year,
        })
      
      });

      const result = await response.json();
      console.log('Fetched data:', result); 

      if (result && result.status) {
        setData(result.data); 
      } else {
        console.error('Failed to fetch data:', result.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleCloseEdit=()=>{
    handleClose();
  }

  const handleChange = (e) => {
    setModuleValue(e.target.value);
  };

  const handleYearChange=(e)=>{
    setYear(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}student-batch-year`); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); 
        if (data && data.year && data.batch_code) {
          console.log(data.batch_code,"hookkk")
          setBatchYears(data);
          console.log(batchYears);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlebatchChange=(e)=>{
    setBatchCode(e.target.value);
  }
 
  const handleClickEdit = async (e) => {
    const valueData = new FormData();
    valueData.append("module", module_value);
    valueData.append("reason", reasonForChange);
    valueData.append("id", selectedId);
    valueData.append("eng_mark", english);
    valueData.append("math_mark", mathsReasoning);
    valueData.append("basic", basicModule);
    valueData.append("advanced", advancedModule);
    try {
      const response = await fetch(`${BASE_URL}edit-initial-swot`, {
        method: "POST",
        body: valueData,
      });

      const result = await response.json(); 
      if (response.ok) {
        setData(prevData => prevData.map(item => 
          item.id === selectedId ? { ...item, module: module_value, reason: reasonForChange,eng_mark:english,math_mark:mathsReasoning,basic:basicModule,advanced:advancedModule} : item
        ));
        handleClose();
      } else {
        console.error("Failed to update:", result);
      }
      toast.success(result.message);
      handleSubmit()
    } catch (error) {
      console.error("Error", error);
    }
  };

  const downloadCSV = () => {
    if (!data.length) {
      alert('No data to download');
      return;
    }

    const headers = Object.keys(data[0]).join(',') + '\n';
    const rows = data
      .map(row =>
        Object.values(row)
          .map(value => `"${value}"`)
          .join(',')
      )
      .join('\n');

    const csvContent = 'data:text/csv;charset=utf-8,' + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'students_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    data,
    show,
    handleClose,
    handleShow,
    module_value,
    setModuleValue,
    handleChange,
    handleClickEdit,
    reasonForChange,
    setReasonForChange,
    setData,
    batchCode,
    year,
    batchYears,
    handleYearChange,
    handlebatchChange,
    handleSubmit,
    mathsReasoning,
    english,
    setEnglish,
    setMathsReasoning,
    handleCloseEdit,
    basicModule,
    advancedModule,
    setBasicModule,
    setAdvancedModule,
    downloadCSV,
  };
};

export default InitialSwotHook;
