import React from 'react'
import MaterialHook from './MaterialHook';
import { Dropdown } from 'react-bootstrap'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { tableCustomStyles } from "../../components/TableStyle";
import { PencilIcon,TrashIcon } from '@heroicons/react/24/solid';

const Materiall = () => {
  const columns = [
    {
      name: 'MATERIAL ID',
      selector: row => row.matrial_id,
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
      name: 'BATCH CODE',
      selector: row => row.batch_code,
      width: "240px",
      style: {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
      },
      cell: row => <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{row.batch_code}</div>
    },
    {
      name: 'ACTIONS',
      width: "200px",
      selector: (row) => (
        <div>
          <button
             onClick={() => handleEdit(row.matrial_id,row.section_name,row.module,row.topics,row.batch_code)} 
            className="inline-flex items-center space-x-1 px-2 py-1.5 bg-blue-400 hover:bg-blue-600 text-white rounded"
          >
            <span>Edit</span>
            <PencilIcon className="h-3 w-3" />
          </button>
          <button
           onClick={() => handleDelete(row.matrial_id)}
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
    setSelectedSubject,
  }=MaterialHook();
    console.log(setSelectedSubject,"sccccccccccccc");
    
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
                  {sections.map((section, index) => (
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
       <div className='flex mt-6'>
          <div className='mx-4 md:mx-4'>
          <label htmlFor="pdf" className="block mb-2 text-sm font-sm text-gray-900 dark:text-white">
            Select PDF URL
          </label>
              <Dropdown>
                <Dropdown.Toggle  className='bg-white border border-gray-300 text-black text-sm' variant="success" id="dropdown-basic">
                  Select PDF URL
                </Dropdown.Toggle>
                <Dropdown.Menu className='text-sm'>
                  {pdf.map((option, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => toggleLang(option)}
                      active={selectedUrl.includes(option.file_url)}
                    >
                      {option.file_url}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            
          </div>
          <div className='mx-4 md:mx-4'>
          <label htmlFor="batchcode" className="block mb-2 text-sm font-sm text-gray-900 dark:text-white">
            Select Batch
          </label>
          <Dropdown>
            <Dropdown.Toggle className="bg-white border border-gray-300 text-black text-sm" variant="success" id="dropdown-basic">
              Select Batch Code
            </Dropdown.Toggle>
            <Dropdown.Menu className="text-sm">
              {batchYears.batch_code
                .filter(batchItem => batchItem !== null)
                .map((batchItem, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => toggleBatchCode(batchItem)}
                    active={selectedBatchCodes.includes(batchItem)}
                  >
                    {batchItem}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
          <div className='mx-4 md:mx-4 mt-[3%]'>
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
          <Modal.Title className='text-red-900'>Edit Material</Modal.Title>
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
          <option key={index} value={section.section_name}>
            {section.section_name}
          </option>
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
    <form className="max-w-sm my-2 mx-auto">
      <label htmlFor="batchcode" className="block mb-2 text-sm font-sm text-gray-900 dark:text-white">
        Select Batch
      </label>
      <Dropdown>
        <Dropdown.Toggle className="bg-white border border-gray-300 text-black text-sm" variant="success" id="dropdown-basic">
          Select Batch Code
        </Dropdown.Toggle>
        <Dropdown.Menu className="text-sm">
          {batchYears.batch_code
            .filter(batchItem => batchItem !== null)
            .map((batchItem, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => toggleBatchCode(batchItem)}
                active={selectedBatchCodes.includes(batchItem)}
              >
                {batchItem}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
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

export default Materiall;