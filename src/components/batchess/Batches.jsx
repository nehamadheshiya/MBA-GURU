import React from 'react';
import BatchesHook from './BatchesHook';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { tableCustomStyles } from "../../components/TableStyle";
import { ToastContainer } from 'react-toastify';

const Batches = () => {
  const {
    isFormVisible,
    handleAddButton,
    handleClose,
    data,
    handleClick,
    formValue,
    handleChange,
    centers,
    handleChangeCenter,
    handleEdit,
    handleCloseEdit,
    isFormEdit,
    handleClickEdit,
    isFormDelete,
    handleCloseDelete,
    handleDelete,
    handleDeleteButton,
  } = BatchesHook();

  const columns = [
    {
      name: 'CENTER',
      selector: row => row.center,
    },
    {
      name: 'BATCH NAME',
      selector: row => row.batch_name,
    },
    {
      name: 'STATUS',
      selector: row => row.status,
    },
    {
      name: 'ACTIONS',
       width:"auto",
      selector: row => {
       
        return(
        <div>
          <button onClick={() => handleEdit(row.batch_id,row.center_id,row.batch_name,row.status,)}  className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded">
            <span>Edit</span>
            <PencilIcon className="h-2.5 w-3" />
          </button>
          <button onClick={() => handleDelete(row.batch_id)} className="inline-flex mx-2 items-center space-x-1 px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded">
            <span>Delete</span>
            <TrashIcon className="h-3 w-3" />
          </button>
        </div>
        )
      },
    },
  ];

  return (
    <div>
      <div className='mt-[6%] text-center'>
        <button onClick={handleAddButton} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-green-500/50 dark:shadow-green-800/80 font-medium rounded-md text-sm px-4 py-2.5 text-center me-2 mb-2">
          Add new Batches
        </button>
      </div>
      <ToastContainer />
      <div className='mt-[3%]'>
        <DataTable
          customStyles={tableCustomStyles}
          columns={columns}
          data={data}
          pagination
        />
      </div>

      <Modal show={isFormVisible} onHide={handleClose}>
        <Modal.Header closeButton className="d-flex justify-content-center">
          <Modal.Title className='text-red-900'>Add New Batches</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Center Name</Form.Label>
              <select
                value={formValue.center_id}
                onChange={handleChange}
                name="center_id"
                id="center"
                className="w-full md:w-[100%] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Select Center
                </option>
                {centers.map((center) => (
                  <option key={center.center_id} value={center.center_id}>
                    {center.center_name}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Batch Name</Form.Label>
              <Form.Control
                value={formValue.batch_name}
                name="batch_name"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Check
                type="radio"
                id="flexRadioDefault1"
                value="Activate"
                name="status"
                onChange={handleChange}
                label="Activate"
                checked={formValue.status === 'Activate'}
              />
              <Form.Check
                type="radio"
                id="flexRadioDefault2"
                value="Deactivate"
                name="status"
                onChange={handleChange}
                label="Deactivate"
                checked={formValue.status === 'Deactivate'}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} type="button" className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">
            Close
          </button>
          <button onClick={handleClick} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">
            Submit
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={isFormEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton className="d-flex justify-content-center">
          <Modal.Title className='text-red-900'>Edit New Batches</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Center Name</Form.Label>
              <select
                value={formValue.center_id}
                onChange={handleChange}
                name="center_id"
                id="center"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[200px] p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" disabled>
                  Select Center
                </option>
                {centers.map((center) => (
                  <option key={center.center_id} value={center.center_id}>
                    {center.center_name}
                  </option>
                ))}
              </select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Batch Name</Form.Label>
              <Form.Control
                value={formValue.batch_name}
                name="batch_name"
                onChange={handleChange}
                type="text"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Check
                type="radio"
                id="flexRadioDefault1"
                value="Activate"
                name="status"
                onChange={handleChange}
                label="Activate"
                checked={formValue.status === 'Activate'}
              />
              <Form.Check
                type="radio"
                id="flexRadioDefault2"
                value="Deactivate"
                name="status"
                onChange={handleChange}
                label="Deactivate"
                checked={formValue.status === 'Deactivate'}
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
        {/* onClick={handleDeleteButton} */}
        <button onClick={handleCloseDelete} type="button" class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">No</button>          
        <button  onClick={handleDeleteButton} type="button" class="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2">Yes</button>          
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Batches;
