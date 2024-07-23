import React from 'react'
import DataTable from 'react-data-table-component';
import { tableCustomStyles } from "../../components/TableStyle";
import ViewEditHook from './ViewEditHook';
import { PencilIcon,TrashIcon } from '@heroicons/react/24/solid';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer } from 'react-toastify';
const ViewEdit = () => {
  const columns = [
    {
      name: 'ID',
      selector: row => row.schedule_id,
      width: "50px",
    },
    {
      name: 'CLASS TYPE',
      selector: row => row.class_type,
    },
    {
      name: 'START TIME',
      selector: row => row.start_time,
      width: "120px",
    },
    {
      name: 'END TIME',
      selector: row => row.end_time,
      width: "120px",
    },
    {
      name: 'CENTER',
      selector: row => row.center,
      width: "auto",
    },
    {
      name: 'DATE',
      selector: row => row.date,
      width: "120px",
    },
    {
      name: 'DAY',
      selector: row => row.day,
      width: "120px",
    },
    {
      name: 'BATCH CODE',
      selector: row => row.batch_code,
      width: "120px",
    },
    {
      name: 'SKILL',
      selector: row => row.skill,
      width: "200px",
    },
    {
      name: 'TOPIC',
      selector: row => row.topic,
      width: "140px",
    },
    {
      name: 'FACULTY',
      selector: row => row.faculty,
      width: "120px",
    },
    {
      name: 'ZOOM ID',
      selector: row => row.zoom_id,
      width: "250px",
    },
    {
      name: 'MEETING ID',
      selector: row => row.meeting_id,
      width: "300px",
    },
    {
      name: 'Actions',
      width:"200px",
      selector: (row) => (
        <div>
          <button onClick={() => handleEdit(row.schedule_id,row.class_type,row.start_time,row.end_time,row.center,row.date,row.day,row.batch_code,row.skill,row.topic,row.faculty,row.zoom_id,row.meeting_id,)} className="inline-flex  items-center space-x-1 px-2 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded">
              <span>Edit</span>
              <PencilIcon className="h-2.5 w-3 " />
         </button>
         <button onClick={() => handleDelete(row.schedule_id)} className="inline-flex mx-2 items-center space-x-1 px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded">
            <span>Delete</span>
            <TrashIcon className="h-3 w-3 " />
          </button>
        </div>
      ),
    },
  ];
  const {
    handleDateSubmit,
    data,
    from_date,
    to_date,
    setFromDate,
    setToDate,
    handleEdit,
    isFormEdit,
    handleCloseEdit,
    formValue,
    handleChange,
    handleClickEdit,
    handleDelete,
    handleCloseDelete,
    isFormDelete,
    handleDeleteButton,

  }=ViewEditHook();

  // console.log(data,"dattata")
  return (
    <div>
      <div className='mt-[5%]'>
        <div date-rangepicker className="flex items-center ">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-700 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            value={from_date}
            onChange={(e) => setFromDate(e.target.value)}
            name="start"
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date start"
          />
        </div>
        <span className="mx-4 text-gray-700">to</span>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-700 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            value={to_date}
            onChange={(e) => setToDate(e.target.value)}
            name="end"
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date end"
          />
        </div>
        <div className="relative mx-4 mt-2">
          <button
            onClick={handleDateSubmit}
            type="button"
            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2"
          >
            Submit
          </button>
        </div>
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
    <Modal  show={isFormEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton className="d-flex justify-content-center" >
          <Modal.Title className='text-red-900 '>Edit Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control
                value={formValue.schedule_id}
                name="schedule_id"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Class Type</Form.Label>
              <Form.Control
                value={formValue.class_type}
                name="class_type"
                onChange={handleChange}
                type="text"
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
                type="email"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Center</Form.Label>
              <Form.Control
                value={formValue.center}
                name="center"
                onChange={handleChange}
                type="text"
                placeholder="enter your password"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date</Form.Label>
              <Form.Control
                value={formValue.date}
                name="date"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Day</Form.Label>
              <Form.Control
                value={formValue.day}
                name="day"
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
              <Form.Label>Skill</Form.Label>
              <Form.Control
                value={formValue.skill}
                name="skill"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Topic</Form.Label>
              <Form.Control
                value={formValue.topic}
                name="topic"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Faculty</Form.Label>
              <Form.Control
                value={formValue.faculty}
                name="faculty"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Zoom ID</Form.Label>
              <Form.Control
                value={formValue.zoom_id}
                name="Zoom ID"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Meeting ID</Form.Label>
              <Form.Control
                value={formValue.meeting_id}
                name="meeting_id"
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
        <button  onClick={handleDeleteButton} type="button" class="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">Yes</button>          
        </Modal.Footer>
        {/* onClick={handleDeleteButton} */}
      </Modal>

      </div>
    </div>
  )
}

export default ViewEdit