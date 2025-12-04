/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { useState, useEffect } from "react";
import { fetchVehicles } from "../../../services/vehicleService";
import { useKeycloak } from "@react-keycloak/web";
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "./components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "./variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "./variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React from "react";

export default function Settings() {
  const [vehiclesData, setVehiclesData] = useState([]);
  const { keycloak,initialized } = useKeycloak();

  useEffect( () => {
    if (!initialized || !keycloak.authenticated) return;

    async function getVehiclesData () {
     const data = await fetchVehicles();
     setVehiclesData( data || [] );
  };

   getVehiclesData();
 
}, []);

 console.log(vehiclesData);

  // Chakra Color Mode
  return (
    <Box pt={{ base: "150px", md: "80px", xl: "80px" }}
    w="100%" 
    mb='20px'
    px="10px"
    spacing={{ base: "20px", xl: "20px" }}
    >
      
       
       <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={vehiclesData}
       />
        {/* <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
       
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
      
    </Box>
  );
}
