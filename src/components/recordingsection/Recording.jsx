import React from 'react'
import { Dropdown } from 'react-bootstrap'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { tableCustomStyles } from "../../components/TableStyle";
import { PencilIcon,TrashIcon } from '@heroicons/react/24/solid';
import Recordings from '@/pages/dashboard/recordings';
import RecordingHook from './RecordingHook';

const Recording = () => {
  const columns = [
    {
      name: 'RECORDING ID',
      selector: row => row.recording_id ,
      width: "120px",
    
    },
    {
      name: 'SECTION NAME',
      selector: row => row.section_name,
      width: "300px",
    },
    {
      name: 'MODULE',
      selector: row => row.module,
      width: "auto",
    },
    {
      name: 'TOPIC',
      selector: row => row.topics,
      width: "240px",
    },
    {
      name: 'IMAGE',
      selector: row => row.thumbnail_image,
      cell: row => (
        <img
          src={row.thumbnail_image} // Set the URL here
          alt="img"
          style={{ width: '50px', height: '40px' }} // Adjust size as needed
        />
      ),
      width: "100px",
    },
    {
      name: 'RECORDING URL',
      selector: row => row.recording_url,
      width: "400px",
    },
    
    {
      name: 'ACTIONS',
      width: "200px",
      selector: (row) => (
        <div>
          <button
             onClick={() => handleEdit(row.recording_id,row.section_name,row.module,row.topics,row.thumbnail_image,row.recording_url)} 
            className="inline-flex items-center space-x-1 px-2 py-1.5 bg-blue-400 hover:bg-blue-600 text-white rounded"
          >
            <span>Edit</span>
            <PencilIcon className="h-3 w-3" />
          </button>
          <button
           onClick={() => handleDelete(row.recording_id)}
            className="inline-flex mx-2 items-center space-x-1 px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded">
            <span>Delete</span>
            <TrashIcon className="h-3 w-3" />
          </button>
        </div>
      ),
    },
  
  ];
  const {batchYears, pdf, selectedBatchCodes,
    toggleBatchCode,sections, handleSectionChange,
    handleSubjectChange,
    subjects,
    selectedSubject,
    selectedSection,
    handlePdf,selectedUrl,toggleLang,handleModule,module,section_name,
    handleSection,handleSubmit,data,handleCloseEdit,handleClickEdit,isFormEdit,handleEdit,topics,handleTopics,selectedTopic, handleDelete,
    handleCloseDelete,handleDeleteButton,
    isFormDelete,
    recording_url,
    setSelectedSubject,
    handleChange,
    thumbnailImage,
    handleChangeImage,
    handleImageChange,
    
  }=RecordingHook();
    
    
  return (
    <div className=''>
      <div className='flex'>
         <div className='mx-4 md:mx-4'>
                <form className="max-w-sm mx-auto">
                <label htmlFor="sections" className="block mb-2 text-sm text-gray-900 dark:text-white">
                  Select Sections
                </label>
                <select
                  value={selectedSection}
                  onChange={handleSectionChange}
                  id="sections"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[200px] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Section</option>
                  {sections
                  .filter((section) => section.section_name)
                  .map((section, index) => (
                    <option key={index} value={section.section_name}>
                      {section.section_name}
                  </option>
                  ))}
                </select>
              </form>
          </div>

        <div className='mx-4 md:mx-4'>
            <form className="max-w-sm mx-auto ">
            <label htmlFor="module" className="block mb-2 text-sm text-gray-900 dark:text-white">
              Select Subject
            </label>
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              id="module"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[200px] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled={!selectedSection}
            >
              <option value="" disabled>
                Select Subject
              </option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject.subject}>
                  {subject.subject}
                </option>
              ))}
            </select>
          </form>
        </div>

        <div className='mx-4 md:mx-4'>
      <form className="max-w-sm mx-auto">
        <label htmlFor="sections" className="block mb-2 text-sm text-gray-900 dark:text-white">
          Select Topics
        </label>
        <select
          value={selectedTopic}
          onChange={handleTopics}
          id="topics"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[200px] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" disabled>
            Select Topics
          </option>
          {Array.isArray(topics) && topics.map((item, index) => (
            <option key={index} value={item.topics}>
              {item.topics}
            </option>
          ))}
        </select>
      </form>
      </div>

      </div>
       <div className=' mt-3'>
       <div className='mx-4 md:mx-4'>
        <Form.Group className="w-[350px] md:w-[500px]" controlId="exampleForm.ControlInput1">
              <Form.Label className='text-sm'>Video URL</Form.Label>
              <Form.Control
                value={recording_url} 
                name="recording_url"
                onChange={handleChange}
                type="text"
                autoFocus
              />

        </Form.Group>
       </div>
      </div>  
      <div className='mt-6 flex'>
      <div className='mx-4 md:mx-4'>
        <input
          id="fileInput"
         type="file"
         name="thumbnail_image"
         onChange={handleChangeImage}
         />
       </div>
      
          <div className='mx-1 md:mx-2 '>
              <button onClick={handleSubmit} type="button" class="text-white  bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-normal rounded-lg text-sm px-3 py-[7px] text-center me-2 mb-2">Submit</button>  
          </div>
      </div>

         <div className='mt-[4%]'>
        <DataTable
        customStyles={tableCustomStyles}
        columns={columns}
        data={data}
        pagination
      />
        <ToastContainer />
        </div>


        <Modal className='h-auto' show={isFormEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton className="d-flex justify-content-center">
          <Modal.Title className='text-red-900'>Edit Recording</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <form className="max-w-sm mx-auto">
      <label htmlFor="sections" className="block mb-2 text-sm text-gray-900 dark:text-white">
        Select Sections
      </label>
      <select
        value={selectedSection}
        onChange={handleSectionChange}
        id="sections"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[200px] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Select Section</option>
        {sections.map((section, index) => (
          section.section_name ? (
            <option key={index} value={section.section_name}>
              {section.section_name}
            </option>
          ) : null 
        ))}

      </select>
    </form>
    <form className="max-w-sm mx-auto ">
      <label htmlFor="module" className="block mb-2 text-sm text-gray-900 dark:text-white">
        Select Subject
      </label>
      <select
        value={selectedSubject}
        onChange={handleSubjectChange}
        id="module"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[200px] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        disabled={!selectedSection}
      >
        <option value="" disabled>
          Select Subject
        </option>
        {subjects.map((subject, index) => (
          <option key={index} value={subject.subject}>
            {subject.subject}
          </option>
        ))}
      </select>
    </form>
    <form className="max-w-sm mx-auto">
      <label htmlFor="sections" className="block mb-2 text-sm text-gray-900 dark:text-white">
        Select Topics
      </label>
      <select
        value={selectedTopic}
        onChange={handleTopics}
        id="topics"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[200px] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled>
          Select Topics
        </option>
        {Array.isArray(topics) && topics.map((item, index) => (
          <option key={index} value={item.topics}>
            {item.topics}
          </option>
        ))}
      </select>
    </form>
    <form className="max-w-sm mx-auto mb-4 mt-2">
          <label htmlFor="thumbnailImage" className="block mb-2 text-sm text-gray-900 dark:text-white">
             Thumbnail Image
          </label>
          <input
           name="thumbnail_image"
            type="file"
            id="thumbnailImage"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </form>
        <form className="max-w-sm mx-auto mb-4">
          <label htmlFor="recordingURL" className="block mb-2 text-sm text-gray-900 dark:text-white">
            Recording URL
          </label>
          <input
            type="text"
            id="recordingURL"
            value={recording_url} 
            name="recording_url"
            onChange={handleChange}
            autoFocus
            placeholder="Enter recording URL"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </form>
  </Modal.Body>
  <Modal.Footer>
    <button onClick={handleCloseEdit} type="button" className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">
      Close
    </button>
    <button onClick={handleClickEdit} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">
      Submit
    </button>
  </Modal.Footer>
        </Modal>

        <Modal show={isFormDelete} onHide={handleCloseDelete}>
          <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Are you sure you want to delete it ?</Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          <button onClick={handleCloseDelete} type="button" class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">No</button>          
          <button  onClick={handleDeleteButton} type="button" class="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">Yes</button>          
          </Modal.Footer>
        </Modal>
       
    </div>
  )
}

export default Recording;