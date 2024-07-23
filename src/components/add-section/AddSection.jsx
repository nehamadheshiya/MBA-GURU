import React from 'react'
import AddSectionHook from './AddSectionHook';
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer } from 'react-toastify';
import { PencilIcon,TrashIcon } from '@heroicons/react/24/solid';
import { tableCustomStyles } from "../../components/TableStyle";


const AddSection = () => {
  const columns = [
    {
      name: 'SUBJECT ID',
      selector: row => row.subject_id,
      width: "120px",
    },
    {
      name: 'SECTION NAME',
      selector: row => row.section_name,
      width: "300px",
    },
    {
      name: 'SUBJECT',
      selector: row => row.subject,
      width: "auto",
    },
    {
      name: 'TOPIC',
      selector: row => row.topics,
      width: "240px",
    },
    {
      name: 'ACTIONS',
      width: "200px",
      selector: (row) => (
        <div>
          <button
             onClick={() => handleEdit(row.subject_id,row.section_name,row.subject,row.topics)} 
            className="inline-flex items-center space-x-1 px-2 py-1.5 bg-blue-400 hover:bg-blue-600 text-white rounded"
          >
            <span>Edit</span>
            <PencilIcon className="h-3 w-3" />
          </button>
          <button
           onClick={() => handleDelete(row.subject_id)}
            className="inline-flex mx-2 items-center space-x-1 px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded">
            <span>Delete</span>
            <TrashIcon className="h-3 w-3" />
          </button>
        </div>
      ),
    },
  
  ];
  const{isFormVisible,handleAddButton,data,handleClose,
    handleEdit,formValue,handleClick,handleChange,
    isFormEdit,handleCloseEdit,handleClickEdit,handleDelete, isFormDelete,
    handleCloseDelete,handleDeleteButton
  }=AddSectionHook();
  return (
    <div>
      
      <div className='mt-[6%] text-center'>
        <button type="button" onClick={handleAddButton}  class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  shadow-green-500/50  dark:shadow-green-800/80 font-medium rounded-md text-sm px-4 py-2.5 text-center me-2 mb-2">Add Section , Subject and Topics</button>
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
      <Modal  show={isFormVisible} onHide={handleClose}>
        <Modal.Header closeButton className="d-flex justify-content-center" >
          <Modal.Title className='text-red-900 '>Add Section , Subject and Topics</Modal.Title>
        </Modal.Header> 
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Section</Form.Label>
              <Form.Control
                value={formValue.section_name}
                name="section_name"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                value={formValue.subject}
                name="subject"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Topics</Form.Label>
              <Form.Control
                value={formValue.topics}
                name="topics"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
        
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <button onClick={handleClose} type="button" class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">Close</button>          
        <button onClick={handleClick} type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">Submit</button>          
        </Modal.Footer>
      </Modal>

      <Modal className='h-auto' show={isFormEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton className="d-flex justify-content-center">
          <Modal.Title className='text-red-900'>Edit Section , Subject and Topics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Section</Form.Label>
              <Form.Control
                value={formValue.section_name}
                name="section_name"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                value={formValue.subject}
                name="subject"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Topics</Form.Label>
              <Form.Control
                value={formValue.topics}
                name="topics"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
        
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

export default AddSection