import { useState, useEffect } from 'react';
import { BASE_URL } from '@/API/Api';
import { Dropdown } from 'react-bootstrap'; 
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MaterialHook = () => {
    const[batchYears,setBatchYears]=useState({ year: [], batch_code: [] });
    const[section_name,setSection_Name]=useState("");
    const [selectedBatchCodes, setSelectedBatchCodes] = useState([]);
    const[pdf,setPdf]=useState([])
    const [selectedUrl, setSelectedUrl] = useState([]);
    const [data, setData] = useState([]);
    const [topics, setTopics] = useState([]);
    const [module, setModule] = useState('');
    const[matrial_id,setMaterialId]=useState('');
    const [isFormEdit,setIsFormEdit]=useState(false);
    const [isFormDelete,setIsFormDelete]=useState(false);
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');

    const handleModule=(e)=>{
      setModule(e.target.value);
    }
    const handleSection=(e)=>{
      setSection_Name(e.target.value);
      console.log(e.target.value);
    }
    const toggleLang = (option) => {
      if (selectedUrl.includes(option.file_url)) {
        setSelectedUrl(
          selectedUrl.filter((item) => item !== option.file_url)
        );
      } else {
        setSelectedUrl([...selectedUrl, option.file_url]);
      }
    };

    const toggleBatchCode = (batchCode) => {
      if (selectedBatchCodes.includes(batchCode)) {
        setSelectedBatchCodes(
          selectedBatchCodes.filter((item) => item !== batchCode)
        );
      } else {
        setSelectedBatchCodes([...selectedBatchCodes, batchCode]);
      }
    };
  
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
      
      const handlePdf=(e)=>{
        setSelectedUrl(e.target.value);
      }
   

      const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("matrial_id", matrial_id);
        formData.append("section_name", selectedSection);
        formData.append("module", selectedSubject);  
        formData.append("batch_code", selectedBatchCodes);  
        formData.append("pdf_url", selectedUrl); 
        formData.append("topics", selectedTopic);  
        try {
          const response = await fetch(`${BASE_URL}save-material`, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          console.log(data);
          toast.success(data.message);
          setSelectedSection("")
          setSelectedBatchCodes([])
          setSelectedUrl([])
          setSelectedTopic("")
          fetchData();
        } catch (error) {
          console.error("Error", error);
        }
      };

      const fetchData= async ()=>{
        try{
          const response=await fetch(`${BASE_URL}get-material-data`);
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
        const fetchPdf = async () => {
          if (selectedSection) {
            try {
              const response = await fetch(`${BASE_URL}section-wise-url`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ section_name: selectedSection })
              });
    
              const data = await response.json();
              console.log(data.data,"befffooreee");
              setPdf(data.data);
              fetchData();
            } catch (error) {
              console.error('Error fetching subjects:', error);
            }
          }
        };
    
        fetchPdf();
      }, [selectedSection]);

      const handleTopics = (event) => {
        const selectedTopic = event.target.value;
        console.log('Selected topic:', selectedTopic);
        setSelectedTopic(selectedTopic);
        
      };

      useEffect(() => {
        const fetchTopics = async () => {
          if (selectedSubject) {
            try {
              const response = await fetch(`${BASE_URL}matrial-topic`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({selectedSubject})
              });
    
              if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
              }
    
              const data = await response.json();
              console.log('Fetched data:', data);
              if (Array.isArray(data.data)) {
                setTopics(data.data);
                setSelectedTopic(selectedTopic);
                // setSelectedTopic('');
                //changes for select subject
              } else {
                console.error('Unexpected data format:', data);
                setTopics([]);
              }
            } catch (error) {
              console.error('Error fetching subjects:', error);
            }
          }
        };
        fetchTopics();
      }, [selectedSubject]);

      const handleCloseEdit = () => setIsFormEdit(false);
      useEffect(() => {
        if (isFormEdit) {
          // console.log(batchCode, "batchcodeeeeeee");
        }
      }, [section_name, isFormEdit]);

      const handleEdit = (matrial_id, section_name, module, topics, batch_code) => {
        setIsFormEdit(true);
        setMaterialId(matrial_id);
        setSelectedSection(section_name);
        setSelectedSubject(module);
        setSelectedTopic(topics);
        
        // Split the batch codes and filter out invalid codes
        const cleanedBatchCodes = batch_code.split(',').filter(code => code && code.match(/^\d{4}CAT$/));
        setSelectedBatchCodes(cleanedBatchCodes);
      
        // Map the section name if needed
        const mappedValue = sectionNameToValue[section_name];
        if (mappedValue) {
          setSection_Name(mappedValue);
        } else {
          console.error('Invalid section name:', section_name);
        }
      };
      
      const handleClickEdit = async () => {
        const formData = new FormData();
        formData.append("matrial_id", matrial_id);
        formData.append("section_name", selectedSection);  // Ensure this is the correct state variable
        formData.append("module", selectedSubject);  // Ensure this is the correct state variable
        formData.append("topics", selectedTopic);
        
        const batchCodesString = selectedBatchCodes.join(',');
        formData.append("batch_code", batchCodesString);
      
        try {
          const response = await fetch(`${BASE_URL}edit-matrial`, {
            method: "POST",
            body: formData,
          });
      
          const result = await response.json();
          if (response.ok) {
            handleCloseEdit();
            toast.success(result.message);
            setSelectedSection("");  // Reset state
            setSelectedSubject("");  // Reset state
            setSelectedBatchCodes([]);
            setSelectedTopic("");
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

    const handleDelete = (matrial_id) => {
      setIsFormDelete(true);
      setMaterialId(matrial_id);
    };

    const handleDeleteButton=async()=>{
      const valueData=new FormData();
      valueData.append("matrial_id",matrial_id);
      try{
      const response=await fetch(`${BASE_URL}delete-material`,
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

    useEffect(() => {
      if (selectedSection) {
        // Fetch subjects based on selected section
        fetch('https://inmortaltechnologies.com/mbaguruApp/api/admin/section-subject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ section_name: selectedSection }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.status) {
              setSubjects(data.data);
            }
          })
          .catch(error => {
            console.error('Error fetching subjects:', error);
          });
      } else {
        setSubjects([]);
      }
    }, [selectedSection]);
  
    const handleSectionChange = (event) => {
      setSelectedSection(event.target.value);
      setSelectedSubject('');  // Reset subject selection
    };
    
    const handleSubjectChange = (event) => {
      setSelectedSubject(event.target.value);
    };
  return{
    batchYears,
    selectedBatchCodes,
    toggleBatchCode,
    pdf,
    handlePdf,
    selectedUrl,
    toggleLang,
    handleModule,
    module,
    section_name,
    handleSection,
    handleSubmit,
    data,
    isFormEdit,
    handleCloseEdit,
    topics,
    handleTopics,
    selectedTopic,
    handleEdit,
    isFormEdit,
    handleClickEdit,
    handleDelete,
    handleCloseDelete,
    isFormDelete,
    handleDeleteButton,
    sections,
    handleSectionChange,
    handleSubjectChange,
    subjects,
    selectedSubject,
    selectedSection,
    setSelectedSection,
    setSelectedSubject,
  }
}

export default MaterialHook