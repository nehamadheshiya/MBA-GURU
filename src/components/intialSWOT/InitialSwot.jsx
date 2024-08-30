import React from 'react';
import DataTable from 'react-data-table-component';
import { tableCustomStyles } from "../../components/TableStyle";
import InitialSwotHook from './InitialSwotHook';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer } from 'react-toastify';
import { PencilIcon } from '@heroicons/react/24/solid';

const InitialSwot = () => {
  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      width: "100px",
    },
    {
      name: 'NAME',
      selector: row => row.name,
      width: "160px",
    },
    {
      name: 'ENGLISH',
      selector: row => row.eng_mark,
      width: "100px",
    },
    {
      name: 'MATHS & REASONING',
      selector: row => row.math_mark,
      width: "170px",
      cell: row => <div className="custom-name-column">{row.math_mark}</div>,
    },
    {
      name: 'COMMUNICATION',
      selector: row => row.communication_mark,
      width: "150px",
      cell: row => <div className="custom-name-column">{row.communication_mark}</div>,
    },
    {
      name: 'GOAL CLARITY',
      selector: row => row.goalclarity,
      width: "140px",
      cell: row => <div className="custom-name-column">{row.goalclarity}</div>,
    },
    {
      name: 'BASIC MODULE',
      selector: row => row.basic,
      width: "260px",
    },
    {
      name: 'ADVANCED MODULE',
      selector: row => row.advanced,
      width: "auto",
    },
    {
      name: 'REASON',
      selector: row => row.reason,
      width: "150px",
    },
    {
      name: 'EDIT',
      width: "100px",
      selector: (row) => (
        <div>
          <button
            onClick={() => handleShow(row.id, row.module, row.reason,row.eng_mark,row.math_mark,row.basic,row.advanced)}  
            className="inline-flex items-center space-x-1 px-2 py-1.5 bg-blue-400 hover:bg-blue-600 text-white rounded"
          >
            <span>Edit</span>
            <PencilIcon className="h-3 w-3" />
          </button>
        </div>
      ),
    },
  
  ];

  const {
    data,
    show,
    handleClose,
    handleShow,
    module_value,
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
    setMathsReasoning,
    setEnglish,   
    handleCloseEdit,
    basicModule,
    advancedModule,
    setBasicModule,
    setAdvancedModule,
    downloadCSV,
  } = InitialSwotHook();
console.log(batchYears,"vvvvvvvvv")
  return (
   <div>
     <div className='mt-[3%] flex '>
       <div className='mx-2 md:mx-4'>
        <form class="max-w-sm mx-auto">
           <label for="batchcode" class="block mb-2 text-sm font-sm text-gray-900 dark:text-white">Select Batch</label>
          <select value={batchCode} onChange={handlebatchChange} id="batchcode" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[200px] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Select Batch Code</option>
            {batchYears.batch_code
              .filter(batchItem => batchItem !== null && batchItem !=="null`") 
              .map((batchItem) => (
                <option key={batchItem} value={batchItem}>{batchItem}</option>
            ))}
          </select>
        </form>
      </div> 

      <div className='mx-2 md:mx-4'>
        <form class="max-w-sm mx-auto">
        <label for="year" class="block mb-2 text-sm font-sm text-gray-900 dark:text-white">Select Year</label>
          <select value={year} onChange={handleYearChange} id="year" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[200px] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Select Year</option>
            {
            batchYears.year
              .filter(yearItem => yearItem !== null && yearItem !== undefined && yearItem !== "null" && yearItem !== "undefined")
              .map((yearItem) => (
                <option key={yearItem} value={yearItem}>
                  {yearItem}
                </option>
              ))
            }
          </select>
        </form>
      </div> 

      <div className='mx-2 md:mx-4 pt-7'>
        <button onClick={handleSubmit} type="button" class="text-white  bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-normal rounded-lg text-sm px-3 py-[7px] text-center me-2 mb-2">Submit</button>  
      </div>
      <div className='mx-2 md:mx-4 pt-7'>
        <button onClick={downloadCSV} type="button" class="text-white  bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-normal rounded-lg text-sm px-3 py-[7px] text-center me-2 mb-2">Download CSV</button>  
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>  
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Maths & Reasoning</Form.Label>
              <Form.Control
                value={mathsReasoning}
                onChange={(e) => setMathsReasoning(e.target.value)}
                name="Maths & Reasoning"
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>English</Form.Label>
              <Form.Control
                value={english}
                onChange={(e) => setEnglish(e.target.value)}
                name="English"
                type="text"
                autoFocus
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Basic Module</Form.Label>
              <Form.Control
                value={basicModule}
                onChange={(e) => setBasicModule(e.target.value)}
                name="English"
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Advanced Module</Form.Label>
              <Form.Control
                value={advancedModule}
                onChange={(e) => setAdvancedModule(e.target.value)}
                name="English"
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Module</Form.Label>
              <select value={module_value} onChange={handleChange} className="form-select text-sm" aria-label="Default select example">
                <option className='text-sm'  value="Maths & Reasoning">Maths & Reasoning</option>
                <option className='text-sm' value="English">English</option>
                <option className='text-sm' value="English Advanced">English Advanced</option>
                <option className='text-sm' value="Maths & Reasoning Advanced">Maths & Reasoning Advanced</option>
              </select>
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Reason for change</Form.Label>
              <Form.Control
                value={reasonForChange}
                onChange={(e) => setReasonForChange(e.target.value)}
                as="textarea"
                rows={1}
                placeholder="Enter reason"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        {/* onClick={() => handleEdit(row.userid,row.name,row.email)} */}
        <button onClick={handleCloseEdit} type="button" class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">Close</button>          
          <button onClick={handleClickEdit} type="button" className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">Save</button>
        </Modal.Footer>
      </Modal>
    </div>
   </div>
  );
};

export default InitialSwot;
