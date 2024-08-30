import React from 'react';
import BackUppHook from './BackUppHook';
import DataTable from 'react-data-table-component';
import { tableCustomStyles } from "../../components/TableStyle";
import { ToastContainer } from 'react-toastify';

const BackUpp = () => {

  
  const { handleFileUpload, data, handleUpload,handleDownload, } = BackUppHook();
  const columns = data.length > 0 ? Object.keys(data[0]).map((key) => ({
    name: key,
    selector: row => row[key],
    sortable: true,
  })) : [];

  return (
    <div>
      <div className='mt-[5%] h-auto w-auto bg-gray-50 rounded-lg p-4'>
        <div className='text-center mb-4'>
          <input 
            type='file'
            accept='.xlsx, .xls'
            onChange={handleFileUpload}
          />
          <button 
            onClick={handleUpload} 
            type="button" 
            className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none my-4 md:my-0 focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4  py-2 text-center me-2 mb-2"
          >
            ↑ Upload Back-Up
          </button>
          <button 
           onClick={handleDownload} 
            type="button" 
            className="text-white mx-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-green     -800 font-medium rounded-lg text-sm px-2.5 py-2 text-center me-2 mb-2"
          >
            Download Sample
          </button>
        </div>  
        <ToastContainer />
        {/* {data.length > 0 && (
          <DataTable
            customStyles={tableCustomStyles}
            columns={columns}
            data={data}
            pagination
          />
        )} */}
      </div>
    </div>
  );
};

export default BackUpp;
