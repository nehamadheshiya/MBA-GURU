import React, { useState , useEffect} from 'react'
import DataTable from 'react-data-table-component';
import { tableCustomStyles } from "../../components/TableStyle";
const Backupstudent = () => {
    const [data, setData] = useState([]);
    const columns = [
        {
          name: 'ID',
          selector: row => row.id,
          width: "50px",
        },
        {
            name: 'USER NAME',
            selector: row => row.user_name,
            width: "150px",
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
          width: "150px",
        },
        {
          name: 'SKILL',
          selector: row => row.skill,
          width: "200px",
        },
        {
          name: 'TOPIC',
          selector: row => row.topics,
          width: "140px",
        },
        {
          name: 'FACULTY',
          selector: row => row.faculty,
          width: "120px",
        },  
        // {
        //   name: 'ACTIONS',
        //   width:"200px",
        //   selector: (row) => (
        //     <div>
        //       <button onClick={() => handleEdit(row.schedule_id,row.class_type,row.start_time,row.end_time,row.center,row.date,row.day,row.batch_code,row.skill,row.topic,row.faculty,row.no_of_backup_slots)} className="inline-flex  items-center space-x-1 px-2 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded">
        //           <span>Edit</span>
        //           <PencilIcon className="h-2.5 w-3 " />
        //      </button>
        //      <button onClick={() => handleDelete(row.schedule_id)} className="inline-flex mx-2 items-center space-x-1 px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded">
        //         <span>Delete</span>
        //         <TrashIcon className="h-3 w-3 " />
        //       </button>
        //     </div>
        //   ),
        // },
      ];
      const fetchData= async ()=>{
        try{
          const response=await fetch("https://inmortaltechnologies.com/mbaguruApp/api/admin/show-student-booking");
          if(!response.ok){
            throw new Error('Network response was not ok');
          }
          const jsonData=await response.json();
          console.log(jsonData.data)
          setData(jsonData.data);
        }catch(error){
          console.log("error is", error)
        }
      } ;
      useEffect(()=>{
        fetchData();
      },[])
  return (
    <div>
    <div className='mt-[7%]'>
        <DataTable
            customStyles={tableCustomStyles}
            columns={columns}
            data={data}
            pagination
        />
      </div>
    </div>
  )
}

export default Backupstudent