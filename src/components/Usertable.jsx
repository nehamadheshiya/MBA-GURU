import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import {Input, } from "@material-tailwind/react";
import { useState } from 'react';
import {tableCustomStyles} from "../components/TableStyle";
// A super simple expandable component.
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

// const API = "https://jsonplaceholder.typicode.com/users";

const columns = [
	{
		name: 'ID',
		selector: row => row.id,
        width:"50px",  
	},
	{
		name: 'NAME',
		selector: row => row.name,
        sortable:true
	},
    {
		name: 'EMAIL',
		selector: row => row.email,
        width:"150px", 
	},
    {
		name: 'PASSWORD',
		selector: row => row.password,
	},
    {
		name: 'MOBILE',
		selector: row => row.mobile,
        width:"110px", 
	},
    {
		name: 'DOB',
		selector: row => row.dob,
	},
    {
		name: 'ADMISSION',
		selector: row => row.admission,
	},
    {
		name: 'ADDRESS',
		selector: row => row.address,
	},
    {
		name: 'ACTION',
		selector: row => row.action,
	},
];


const data = [
    {
      id: 1,
      name: 'Beetlejuice',
      email: 'neha@gmail.com',
      password:'1234',
      mobile:'8989898989',
      dob:'20/07/2002',
      admission:'25/04/2020',
      address:'Lucknow',
      action:'edit/delete'
  },
  {
    id: 2,
    name: 'juice',
    email: 'neha@gmail.com',
    password:'1234',
    mobile:'8989898989',
    dob:'20/07/2002',
    admission:'25/04/2020',
    address:'Lucknow',
    action:'edit/delete',
    _cellProps: {
        all: 'font-semibold',
        name: 'text-red',
      },
},
{
    id: 3,
    name: 'Neha',
    email: 'neha@gmail.com',
    password:'1234',
    mobile:'8989898989',
    dob:'20/07/2002',
    admission:'25/04/2020',
    address:'Lucknow',
    action:'edit/delete'
},
{
    id: 4,
    name: 'Khushi',
    email: 'neha@gmail.com',
    password:'1234',
    mobile:'8989898989',
    dob:'20/07/2002',
    admission:'25/04/2020',
    address:'Lucknow',
    action:'edit/delete'
},
{
    id: 5,
    name: 'Beetlejuice',
    email: 'neha@gmail.com',
    password:'1234',
    mobile:'8989898989',
    dob:'20/07/2002',
    admission:'25/04/2020',
    address:'Lucknow',
    action:'edit/delete'
},
{
    id: 6,
    name: 'Krishna',
    email: 'neham@gmail.com',
    password:'1234',
    mobile:'8989898989',
    dob:'20/07/2002',
    admission:'25/04/2020',
    address:'Lucknow',
    action:'edit/delete'
},
 {
    id: 7,
    name: 'Harry',
    email: 'neha@gmail.com',
    password:'1234',
    mobile:'8989898989',
    dob:'20/07/2002',
    admission:'25/04/2020',
    address:'Lucknow',
    action:'edit/delete'
}, {
    id: 8,
    name: 'Beetlejuice',
    email: 'neha@gmail.com',
    password:'1234',
    mobile:'8989898989',
    dob:'20/07/2002',
    admission:'25/04/2020',
    address:'Lucknow',
    action:'edit/delete'
}, {
    id: 9,
    name: 'Mind',
    email: 'neha@gmail.com',
    password:'1234',
    mobile:'8989898989',
    dob:'20/07/2002',
    admission:'25/04/2020',
    address:'Lucknow',
    action:'edit/delete'
}, {
    id: 10,
    name: 'Beetlejuice',
    email: 'neha@gmail.com',
    password:'1234',
    mobile:'8989898989',
    dob:'20/07/2002',
    admission:'25/04/2020',
    address:'Lucknow',
    action:'edit/delete'
},
{
    id: 11,
    name: 'Nidhi',
    email: 'neha@gmail.com',
    password:'1234',
    mobile:'8989898989',
    dob:'20/07/2002',
    admission:'25/04/2020',
    address:'Lucknow',
    action:'edit/delete'
},

{
    id: 12,
    name: 'Beetlejuice',
    email: 'neha@gmail.com',
    password:'1234',
    mobile:'8989898989',
    dob:'20/07/2002',
    admission:'25/04/2020',
    address:'Lucknow',
    action:'edit/delete'
},


]

const Usertable = () => {
    const [records,setRecords]=useState(data);
    

    const handleFilter=(event)=>{
        const newData=data.filter(row=>{
            console.log(data)
            return row.name.toLowerCase().startsWith(event.target.value.toLowerCase())
        })
        // we can use 'includes' also instead of startsWith
        setRecords(newData)
    }

  return (
    <>
        <div className="mr-auto my-3 md:my-6 md:mr-4 w-36 md:w-56">
            <Input label="Search" onChange={handleFilter} />
        </div>
  
       <DataTable
            customStyles={tableCustomStyles}
			columns={columns}
			data={records}
            fixedHeader
            pagination
		/>
         {/* expandableRowsComponent={ExpandedComponent}
         expandableRows */}
    </> 
  )
}

export default Usertable