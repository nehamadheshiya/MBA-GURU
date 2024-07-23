import React, { useEffect } from 'react'
import { useState } from 'react';
import { BASE_URL } from '@/API/Api';
import {tableCustomStyles} from "../../components/TableStyle";
import DataTable from 'react-data-table-component';
import { useParams } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

const ViewStudent = () => {
    const param = useParams()
    const [data, setData] = useState([]);
    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavType } = controller;
  
    const fetchData = async () => {
        const valueData=new FormData();
        valueData.append("registration_id",param.registration_id);
        try {
            const response = await fetch(`${BASE_URL}student-register-class`, {
              method: "POST",
              body: valueData,
            });
        
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          setData(jsonData.data);
        } catch (error) {
          console.log("error is", error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    const columns = [
        {
          name: 'USER ID',
          selector: row => row.user_id,
        },
        {
          name: 'NAME',
          selector: row => row.name,
        },
        {
          name: 'EMAIL',
          selector: row => row.email,
          width:"200px"
        },
        {
            name: 'PASSWORD',
            selector: row => row.password,
            
          },
          {
            name: 'MOBILE',
            selector: row => row.mobile,
          },
          {
            name: 'BATCH',
            selector: row => row.batch,
          },   
          {
            name: 'COLLEGE',
            selector: row => row.collage,
          },  
      ];
  return (
    <div>
         <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div>
        <h1 className='text-red-900 font-medium text-xl'>Students of Registration Based Class</h1>
        </div>
        <div className='mt-[7%] text-center'>
        <DataTable
          customStyles={tableCustomStyles}
          columns={columns}
          data={data}
          pagination
        />
      </div>
      </div>
     
    </div>
    
       
    </div>
  )
}

export default ViewStudent