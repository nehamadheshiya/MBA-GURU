import { useState, useEffect } from 'react';
import { BASE_URL } from '@/API/Api';
import { Dropdown } from 'react-bootstrap'; 
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecordingHook = () => {
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
    // const [recording_url, setRecording_url] = useState({ recording_url: '' });
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const[recording_id,setRecording_id]=useState('');
    const [recording_url, setRecordingUrl] = useState('');


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

    const handleChangeImage = (e) => {
      const file = e.target.files[0]; // Get the first selected file
      setThumbnailImage(file); // Update state with the selected file
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setThumbnailImage(file); // Update state with the selected file
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

    const fetchData= async ()=>{
      try{
        const response=await fetch(`${BASE_URL}show-recording`);
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
        formData.append("section_name", selectedSection);
        formData.append("module", selectedSubject);  
        formData.append("recording_url", recording_url); 
        formData.append("topics", selectedTopic);  
        formData.append("thumbnail_image", thumbnailImage);  
        try {
          const response = await fetch(`${BASE_URL}add-recording`, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          console.log(data);
          fetchData();
          toast.success(data.message);
          setSelectedSection("")
          setSelectedTopic("")
          setRecordingUrl("")
          setThumbnailImage(null); 
          document.getElementById('fileInput').value = '';
        } catch (error) {
          console.error("Error", error);
        }
      };

     

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

      const handleEdit = (recording_id,section_name,module,topics,thumbnail_image,recording_url) => {
        setIsFormEdit(true);
        setRecording_id(recording_id);
        setSelectedSection(section_name);
        setSelectedSubject(module);
        setSelectedTopic(topics);
        setThumbnailImage(thumbnail_image);
        setRecordingUrl(recording_url);
      
      };
      
      const handleClickEdit = async () => {
        const formData = new FormData();
        formData.append("recording_id", recording_id);
        formData.append("section_name", selectedSection);  // Ensure this is the correct state variable
        formData.append("module", selectedSubject);  // Ensure this is the correct state variable
        formData.append("topics", selectedTopic); 
        formData.append("thumbnail_image", thumbnailImage); 
        formData.append("recording_url", recording_url);       
        try {
          const response = await fetch(`${BASE_URL}edit-recording`, {
            method: "POST",
            body: formData,
          });
      
          const result = await response.json();
          if (response.ok) {
            handleCloseEdit();
            setSelectedSection("");  // Reset state
            setSelectedSubject("");  // Reset state
            setSelectedTopic("");
            setRecordingUrl("");
            setThumbnailImage(null); 
            fetchData();
            toast.success(result.message);
          } else {
            console.error("Failed to update:", result);
            toast.error("Failed to update");
          }
        } catch (error) {
          console.error("Error", error);
          toast.error("An error occurred while updating");
        }
      };

      const handleChange = (e) => {
        setRecordingUrl(e.target.value);
      };
      
    
    const handleCloseDelete = () => setIsFormDelete(false);

    const handleDelete = (recording_id) => {
      setIsFormDelete(true);
      setRecording_id(recording_id);
    };

    const handleDeleteButton=async()=>{
      const valueData=new FormData();
      valueData.append("recording_id",recording_id);
      try{
      const response=await fetch(`${BASE_URL}delete-recording`,
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
    recording_url,
    handleChange,
    thumbnailImage,
    handleChangeImage,
    handleImageChange,
  }
}

export default RecordingHook