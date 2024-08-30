import React, { useState } from 'react'
import UploadMatHook from './UploadMatHook'
import Modal from 'react-bootstrap/Modal';
import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form';
import { tableCustomStyles } from "../../components/TableStyle";
import { PencilIcon,TrashIcon,DocumentDuplicateIcon } from '@heroicons/react/24/solid';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadMat = () => { 
    const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      width: "60px",
    },
    {
        name: 'FILE URL',
        selector: row => row.file_url,
        width: '750px',
        cell: row => (
          <div>
            <a href={row.file_url} target="_blank" rel="noopener noreferrer">{row.file_url}</a>
            <CopyToClipboard 
          text={row.file_url}
          onCopy={() => toast.success('Link copied ')}
        >
          <button  style={{ marginLeft: '10px' }}>
          <DocumentDuplicateIcon className="h-3 w-3" />
          </button>
        </CopyToClipboard>
          </div>
        ),
      },
    {
      name: 'SECTION',
      selector: row => row.section_name,
      width: "auto",
    },
    {
      name: 'EDIT',
      width: "200px",
      selector: (row) => (
        <div>
          <button
            onClick={() => handleEdit(row.id,row.file_url,row.section_name)}  
            className="inline-flex items-center space-x-1 px-2 py-1.5 bg-blue-400 hover:bg-blue-600 text-white rounded"
          >
            <span>Edit</span>
            <PencilIcon className="h-3 w-3" />
          </button>
          <button
           onClick={() => handleDelete(row.id)}
            className="inline-flex mx-2 items-center space-x-1 px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded">
            <span>Delete</span>
            <TrashIcon className="h-3 w-3" />
          </button>
        </div>
      ),
    },
  
    ];

    const
    {
        handleFileUpload,
        selectedFile,
        handlebatchChange,
        batchCode,
        handleUpload,
        data,
        handleEdit,
        handleCloseEdit,
        isFormEdit,
        handleClickEdit,
        handleDelete,
        handleCloseDelete,
        isFormDelete,
        handleDeleteButton,
        sections,
    formValue,
    handleChange,
    }=UploadMatHook();

  return (
    <div>
        <div className='mt-[3%] flex '>
            <div className='mx-4 md:mx-4'>
                <label htmlFor="pdf-upload" className="block mb-2 text-sm  text-gray-900 dark:text-white">
                    Upload PDF
                </label>
                <input
                    id="fileInput"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="block w-full text-sm p-1 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
            </div>
            <div className='mx-2 md:mx-4'>
            <form className="max-w-sm mx-auto">
              <label htmlFor="sectionSelect" className="block mb-2 text-sm text-gray-900 dark:text-white">
                Select Sections
              </label>
              <select
                value={formValue.section_name}
                onChange={handleChange}
                id="sectionSelect"
                name="section_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[200px] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select Section</option>
                {sections
                .filter((item)=>item.section_name)
                .map((section, index) => (
                  <option key={index} value={section.section_name}>
                    {section.section_name}
                  </option>
                ))}
              </select>
         </form>
            </div>
            <div className='mx-4 md:mx-4 pt-7'>
                <button onClick={handleUpload} type="button" class="text-white  bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-normal rounded-lg text-sm px-3 py-[7px] text-center me-2 mb-2">Upload</button>  
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

        <Modal show={isFormEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton className="d-flex justify-content-center">
          <Modal.Title className='text-red-900'>Edit New Batches</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="m-2 mt-4">
              <label htmlFor="sectionSelect" className="block mb-2 text-sm text-gray-900 dark:text-white">
                Select Sections
              </label>
              <select
                value={formValue.section_name}
                onChange={handleChange}
                id="sectionSelect"
                name="section_name"
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
          <Form className="m-2 mt-4">
            <label htmlFor="pdf-upload" className="block mb-2 text-sm  text-gray-900 dark:text-white">
              Upload PDF
            </label>  
            <input
              id="fileInput"
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="block w-full text-sm p-1 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </Form>
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

export default UploadMat