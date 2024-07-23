import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import {Input, } from "@material-tailwind/react";
import { useState } from 'react';
import {tableCustomStyles} from "../../components/TableStyle";
import AppUserDetailHook from './AppUserDetailHook';
import { PlusIcon } from '@heroicons/react/24/solid';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { PencilIcon,TrashIcon } from '@heroicons/react/24/solid';
import { ToastContainer } from 'react-toastify';

const AppUserDetail = () => {

  const columns = [
    {
      name: 'USERID',
      selector: row => row.userid,
      width:"100px"
    },
    {
      name: 'NAME',
      selector: row => row.name,
      width:"200px"
    },
    {
      name: 'EMAIL',
      selector: row => row.email,
      width:"250px"
    },
    {
      name: 'PASSWORD',
      selector: row => row.password,
      width:"150px"
    }, 
    {
      name: 'BATCH CODE',
      selector: row => row.batch_code,
      width:"150px"
    }, 
    {
      name: 'ADMISSION DATE',
      selector: row => row.admission_date,
      width:"150px"
    }, 
    {
      name: 'DATE OF BIRTH',
      selector: row => row.dateofbirth,
      width:"150px"
    }, 
    {
      name: 'ADDRESS',
      selector: row => row.address,
      width:"150px"
    },  
    {
      name: 'CENTER CODE',
      selector: row => row.centercode,
      width:"150px"
    }, 
    {
      name: 'CAT YEAR',
      selector: row => row.catyear,
      width:"150px"
    }, 
    {
      name: 'COLLEGE',
      selector: row => row.college,
      width:"150px"
    }, 
    {
      name: 'Actions',
      width:"200px",
      selector: (row) => (
        <div>
          <button onClick={() => handleEdit(row.userid,row.name,row.email,row.password,row.batch_code,row.admission_date,row.dateofbirth,row.address,row.centercode,row.catyear,row.college)} className="inline-flex  items-center space-x-1 px-2 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded">
              <span>Edit</span>
              <PencilIcon className="h-2.5 w-3 " />
         </button>
         {/* onClick={() => handleDelete(row)} */}
         <button onClick={() => handleDelete(row.userid)} className="inline-flex mx-2 items-center space-x-1 px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded">
            <span>Delete</span>
            <TrashIcon className="h-3 w-3 " />
          </button>
        </div>
      ),
    },
   
  ]; 

 
 
  const {data,handleFilter,records,isFormVisible,handleAddButton,handleClose,handleCloseMore,handleMoreButton,isFormVisibleMore,handleChange,handleClick,formValue,handleEdit,handleDelete,handleCloseEdit,handleCloseDelete,isFormDelete,isFormEdit,handleEditButton,formClose,handleDeleteButton,handleClickEdit,}=AppUserDetailHook()
  // console.log(records)
  return (
    <div >
       
      <div className='md:flex justify-between'>
       <div className="mr-auto my-3 md:my-6 md:mr-4 w-36 md:w-56">
            <Input label="Search" onChange={handleFilter} />
        </div>
        {/* <div className='mr-auto my-3 md:my-6 md:mr-4'>
          <button onClick={handleMoreButton} type="button" class="text-white bg-gradient-to-r from-gray-800 via-gray-900 to-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-700 dark:focus:ring-gray-200 shadow-lg shadow-gray-700/50 dark:shadow-lg dark:shadow-gray-200/80 font-medium rounded-md text-sm px-4 py-2.5 text-center me-2 mb-2">MORE</button>
          <button onClick={handleAddButton} type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-md text-sm px-4 py-2.5 text-center me-2 mb-2"><PlusIcon className="w-4 h-4  inline-block" /> ADD</button>
        </div> */}
        </div> 
      <div> 
      </div> 
      <ToastContainer />
        <div className=' '>
         <DataTable
            customStyles={tableCustomStyles}
            columns={columns}
            data={records}
            pagination
          />
        </div>

        <Modal show={isFormVisibleMore} onHide={handleCloseMore}>
        <Modal.Header closeButton className="d-flex justify-content-center" >
          <Modal.Title className='text-red-900 text-lg'>Import/Export</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Import File</Form.Label>
              <Form.Control
                type="file"
                autoFocus
              />
            </Form.Group>
          
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <button onClick={handleCloseMore} type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-md text-sm px-3 py-2.5 text-center me-2 mb-2">Import Student</button>  
          <button onClick={handleCloseMore} type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-md text-sm px-3 py-2.5 text-center me-2 mb-2">Export Student</button>
              
        </Modal.Footer>
      </Modal>

        <Modal size="lg" show={isFormVisible} onHide={handleClose}>
        <Modal.Header closeButton className="d-flex justify-content-center" >
          <Modal.Title className='text-red-900 '>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                value={formValue.name}
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="enter your name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={formValue.email}
                name="email"
                onChange={handleChange}
                type="email"
                placeholder="enter your email"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={formValue.password}
                name="password"
                onChange={handleChange}
                type="text"
                placeholder="enter your password"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                value={formValue.mobile}
                name="mobile"
                onChange={handleChange}
                type="text"
                placeholder="enter your contact"
                autoFocus
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Admission Date</Form.Label>
              <Form.Control
                type="date"
                autoFocus
              />
            </Form.Group> */}
            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <button onClick={formClose} type="button" class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">Close</button>          
        <button onClick={handleClick} type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">Submit</button>          
        </Modal.Footer>
      </Modal>

      <Modal show={isFormEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton className="d-flex justify-content-center" >
          <Modal.Title className='text-red-900 '>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Student ID</Form.Label> */}
              <Form.Control
                value={formValue.id}
                name="id"
                type="hidden"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                value={formValue.name}
                name="name"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={formValue.email}
                name="email"
                onChange={handleChange}
                type="email"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={formValue.password}
                name="password"
                onChange={handleChange}
                type="text"
                placeholder="enter your password"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                value={formValue.mobile}
                name="mobile"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Batch Code</Form.Label>
              <Form.Control
                value={formValue.batch_code}
                name="batch_code"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Admission Date</Form.Label>
              <Form.Control
                value={formValue.admission_date}
                name="admission_date"
                onChange={handleChange}
                type="date"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                value={formValue.dateofbirth}
                name="dateofbirth"
                onChange={handleChange}
                type="date"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={formValue.address}
                name="address"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Center Code</Form.Label>
              <Form.Control
                value={formValue.centercode}
                name="centercode"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>CAT Year</Form.Label>
              <Form.Control
                value={formValue.catyear}
                name="catyear"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>College</Form.Label>
              <Form.Control
                value={formValue.college}
                name="college"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <button onClick={handleCloseEdit} type="button" class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">Close</button>          
        <button onClick={handleClickEdit} type="button" class="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">Save</button>          
        </Modal.Footer>
      </Modal>

      <Modal show={isFormDelete} onHide={handleCloseDelete}>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Are you sure you want to delete it ?</Form.Label>
              {/* <Form.Control
                value={formValue.id}
                name="id"
                onChange={handleChange}
                type="text"
                autoFocus
              /> */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <button onClick={handleCloseDelete} type="button" class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">No</button>          
        <button onClick={handleDeleteButton} type="button" class="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">Yes</button>          
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default AppUserDetail