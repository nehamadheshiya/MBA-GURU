import React from 'react';
import RegistrationHook from './RegistrationHook';
import DataTable from 'react-data-table-component';
import {tableCustomStyles} from "../../components/TableStyle";
import { PencilIcon,TrashIcon } from '@heroicons/react/24/solid';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegistrationCls = () => {
  const navigate = useNavigate();

    const columns = [
        {
          name: 'USERID',
          selector: row => row.registration_id,
          width:"100px"
        },
        {
          name: 'CENTER',
          selector: row => row.center,
          width:"250px",
        },
        {
          name: 'BATCHES',
          selector: row => row.batches,
          width:"200px",
          style: {
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          },
          cell: row => <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{row.batches}</div>
        },
        {
          name: 'FACULTY',
          selector: row => row.faculty_name,
          width:"150px"
        },
        // {
        //   name: 'SKILLS',
        //   selector: row => row.skills,
        //   width:"150px"
        // },
        {
          name: 'TOPICS',
          selector: row => row.topics,
          width:"180px",
          style: {
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          },
          cell: row => <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{row.topics}</div>
        },
          {
            name: 'MAX STUDENTS',
            selector: row => row.max_students,
            width:"150px"
          },
  
          {
            name: 'DETAILS',
            selector: row => row.details,
            width:"150px"
          },
          {
            name: 'MODULE',
            selector: row => row.type,
            width:"150px"
          },
          {
            name: 'SKILLS',
            selector: row => row.subject,
            width:"200px"
          },
          {
            name: 'DATE',
            selector: row => row.date,
            width:"150px"
          },
          {
            name: 'START TIME',
            selector: row => row.start_time,
            width:"150px"
          },
          {
            name: 'END TIME',
            selector: row => row.end_time,
            width:"150px"
          },
        {
          name: 'ACTIONS',
          width:"auto",
          selector: (row) => (
            <div>
              <button onClick={() => handleEdit(row.registration_id,row.center,row.faculty_name,row.skills,row.topics,row.max_students,row.batches,row.details,row.date,row.start_time, row.end_time,row.type,row.subject)} className="inline-flex  items-center space-x-1 px-2.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded">
                  <span>Edit</span>
                  {/* <PencilIcon className="h-2.5 w-3 " /> */}
             </button>
              <button onClick={() => handleDelete(row.registration_id)} className="inline-flex mx-2 items-center space-x-1 px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded">
                <span>Delete</span>
                {/* <TrashIcon className="h-3 w-3 " /> */}
              </button>
              <button onClick={() => handleView(row.registration_id)} className="inline-flex  items-center space-x-1 px-2 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded">
                <span>View Student</span>
              </button>
            </div>
          ),
        },
       
    ]; 

    const handleView=(registration_id)=>{
      navigate(`/viewstudent/${registration_id}`, { replace: true });
    }

   
    

    const{fetchData,data,handleEdit,formClose,handleClick,handleClose,isFormVisible,handleAddButton,handleDelete,handleDeleteButton,handleCloseDelete,isFormEdit,handleCloseEdit,formValue,handleChange,handleClickEdit,isFormDelete,centers,batches,modules,
      subjects,staticModules,handleChangeBatches}=RegistrationHook();
      
  return (
    <div>
        <div className='mt-[6%] text-center'>
    {/* onClick={handleAddButton}*/}
        <button onClick={handleAddButton} type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  shadow-green-500/50  dark:shadow-green-800/80 font-medium rounded-md text-sm px-4 py-2.5 text-center me-2 mb-2">Add new Registration Based Class</button>
        </div>
       <div className='mt-[3%] ' >
       <DataTable
            customStyles={tableCustomStyles}
            columns={columns}
            data={data}
            pagination
          />
       </div>
       <ToastContainer />
       {/* //addddd */}
       <Modal  show={isFormVisible} onHide={handleClose}>
        <Modal.Header closeButton className="d-flex justify-content-center" >
          <Modal.Title className='text-red-900 '>Add new Registration Based Class</Modal.Title>
        </Modal.Header> 
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Center Name</Form.Label>
              <select
                value={formValue.center}
                onChange={handleChange}
                name="center"
                id="center"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[100%] py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Select Center
                </option>
                {centers.map((item) => (
                  <option key={item.center_name} value={item.center_name}>
                    {item.center_name}
                  </option>
                ))}
              </select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Batches</Form.Label>
          <select
            value={formValue.batches}
            onChange={handleChange}
            name="batches"
            id="batches"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[100%] py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" disabled>
              Select Batch
            </option>
            {batches.map((item) => (
            <option key={item.batch_id} value={item.batch}>
              {item.batch}
            </option>
          ))}
          </select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Module</Form.Label>
            <select
              value={formValue.module}
              onChange={handleChange}
              name="module"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[100%] py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Select Module
              </option>
              {staticModules.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Subject</Form.Label>
        <select
          value={formValue.subject}
          onChange={handleChange}
          name="subject"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[100%] py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" disabled>
            Select Subject
          </option>
          {subjects && subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Faculty</Form.Label>
              <Form.Control
                value={formValue.faculty_name}
                name="faculty_name"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Skills</Form.Label>
              <Form.Control
                value={formValue.skills}
                name="skills"
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
                type="email"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Max Students</Form.Label>
              <Form.Control
                value={formValue.max_students}
                name="max_students"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Details</Form.Label>
              <Form.Control
                value={formValue.details}
                name="details"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date</Form.Label>
              <Form.Control
                value={formValue.date}
                name="date"
                onChange={handleChange}
                type="date"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                value={formValue.start_time}
                name="start_time"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                value={formValue.end_time}
                name="end_time"
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

  
       <Modal   show={isFormEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton className="d-flex justify-content-center" >
          <Modal.Title className='text-red-900 '>Edit Registartions </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control
                value={formValue.registration_id}
                name="registration_id"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Center Name</Form.Label>
              <select
                value={formValue.center}
                onChange={handleChange}
                name="center"
                id="center"
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[100%] py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Select Center
                </option>
                {centers.map((item) => (
                  <option key={item.center_name} value={item.center_name}>
                    {item.center_name}
                  </option>
                ))}
              </select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Batches</Form.Label>
          <select
          multiple
            value={formValue.batches}
            onChange={handleChangeBatches}
            name="batches"
            id="batches"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[100%] py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" disabled>
              Select Batch
            </option>
            {batches.map((item) => (
            <option key={item.batch_id} value={item.batch}>
              {item.batch}
            </option>
          ))}
          </select>
          </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Module</Form.Label>
            <select
              value={formValue.module}
              onChange={handleChange}
              name="module"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[100%] py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Select Module
              </option>
              {staticModules.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Subject</Form.Label>
        <select
          value={formValue.subject }
          onChange={handleChange}
          name="subject"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[100%] py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" disabled>
            Select Subject
          </option>
          {subjects && subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
       </Form.Group>
       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Faculty</Form.Label>
              <Form.Control
                value={formValue.faculty_name}
                name="faculty_name"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Skills</Form.Label>
              <Form.Control
                value={formValue.skills}
                name="skills"
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
                type="email"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Max Students</Form.Label>
              <Form.Control
                value={formValue.max_students}
                name="max_students"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Details</Form.Label>
              <Form.Control
                value={formValue.details}
                name="details"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date</Form.Label>
              <Form.Control
                value={formValue.date}
                name="date"
                onChange={handleChange}
                type="date"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                value={formValue.start_time}
                name="start_time"
                onChange={handleChange}
                type="time"
                // placeholder='24-hour format'
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                value={formValue.end_time}
                name="end_time"
                onChange={handleChange}
                type="time"
                // placeholder='24-hour format'
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

export default RegistrationCls