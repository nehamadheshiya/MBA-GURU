import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { tableCustomStyles } from "../../components/TableStyle";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Presntstudent = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      name: 'SCEDULE ID',
      selector: row => row.schedule_id,
      width: "100px",
    },
    {
      name: 'USER NAME',
      selector: row => row.name,
      width: "170px",
    },
    {
      name: 'EMAIL',
      selector: row => row.email,
      width: "250px",
    },
    {
      name: 'STATUS',
      selector: row => row.is_mark,
      width: "120px",
    },
    {
      name: 'CLASS TYPE',
      selector: row => row.class_type,
      width: "170px",
    },
    {
      name: 'CENTER',
      selector: row => row.center,
      width: "120px",
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
      width: "150px",
    },
    {
      name: 'SKILL',
      selector: row => row.skill,
      width: "200px",
    },
    {
      name: 'TOPIC',
      selector: row => row.topic,
    },
    {
      name: 'FACULTY',
      selector: row => row.faculty,
      width: "120px",
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
      name: 'HOURS',
      selector: row => {
        const hours = parseFloat(row.hours);
        return isNaN(hours) ? '0.00' : hours.toFixed(2);
      },
      width: "120px",
    },
    {
      name: 'Actions',
      width: "200px",
      selector: (row, index) => (
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer focus:outline-none"
              checked={row.isChecked}
              onChange={() => handleToggle(index)} // Update specific row on change
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {/* {row.isChecked ? 'P' : 'A'} */}
            </span>
          </label>
        </div>
      ),
    },
  ];

  const handleToggle = (index) => {
    const updatedData = data.map((row, idx) => {
      if (idx === index) {
        const newIsChecked = !row.isChecked;
        // Persist the state in local storage
        localStorage.setItem(row.email, JSON.stringify(newIsChecked));

        // Call the API to send the email
        sendEmail(row.email, newIsChecked);

        return { ...row, isChecked: newIsChecked };
      }
      return row;
    });
    setData(updatedData);
  };

  const sendEmail = async (email, isChecked) => {
    try {
      const response = await fetch('https://inmortaltechnologies.com/mbaguruApp/api/admin/edit-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, isChecked }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Email sent successfully:', result);
        toast(result.message);
        fetchData();
      } else {
        console.error('Error sending email:', result.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://inmortaltechnologies.com/mbaguruApp/api/admin/present-students");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      const dataWithToggle = jsonData.data.map(row => {
        const savedIsChecked = JSON.parse(localStorage.getItem(row.email)) || false;
        return { ...row, isChecked: savedIsChecked };
      });
      setData(dataWithToggle);
    } catch (error) {
      console.log("error is", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className='mt-[7%]'>
        <DataTable
          customStyles={tableCustomStyles}
          columns={columns}
          data={data}
          pagination
        />
         <ToastContainer />
      </div>
    </div>
  );
}

export default Presntstudent;
