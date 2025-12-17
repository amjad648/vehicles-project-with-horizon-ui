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
import { useState, useEffect, useContext } from "react";
import { fetchVehicles } from "../../../services/vehicleService";
import { KeycloakContext } from "../../../keycloakProvider";
import { Box } from "@chakra-ui/react";
import ColumnsTable from "./components/ColumnsTable";
import { useSearchParams } from "react-router-dom";
import {
  columnsDataColumns,
} from "./variables/columnsData";
import React from "react";

export default function Settings() {
  const [vehiclesData, setVehiclesData] = useState([]);
  const keycloak = useContext(KeycloakContext);
  const [searchParams] = useSearchParams();

  useEffect( () => {
    if (!keycloak || !keycloak.authenticated) return;

    async function getVehiclesData () {
    const filters = {};
    const userId = searchParams.get('userId');

    if(userId) filters.userId = userId;

     const data = await fetchVehicles(filters);
     setVehiclesData( data || [] );
  };

   getVehiclesData();
 
}, [keycloak, keycloak.authenticated, searchParams]);

 console.log('Vehicles data',vehiclesData);

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
      
    </Box>
  );
}




// import { useState, useEffect, useContext } from "react";
// import { fetchVehicles } from "../../../services/vehicleService";
// import { KeycloakContext } from "../../../keycloakProvider";
// import { Box } from "@chakra-ui/react";
// import ColumnsTable from "./components/ColumnsTable";

// import {
//   columnsDataColumns,
// } from "./variables/columnsData";
// import React from "react";

// export default function Settings() {
//   const [vehiclesData, setVehiclesData] = useState([]);
//   const keycloak = useContext(KeycloakContext);

//   useEffect( () => {
//     if (!keycloak || !keycloak.authenticated) return;

//     async function getVehiclesData () {
//      const data = await fetchVehicles();
//      setVehiclesData( data || [] );
//   };

//    getVehiclesData();
 
// }, [keycloak, keycloak.authenticated]);

//  console.log('Vehicles data',vehiclesData);

//   // Chakra Color Mode
//   return (
//     <Box pt={{ base: "150px", md: "80px", xl: "80px" }}
//     w="100%" 
//     mb='20px'
//     px="10px"
//     spacing={{ base: "20px", xl: "20px" }}
//     >
      
       
//        <ColumnsTable
//           columnsData={columnsDataColumns}
//           tableData={vehiclesData}
//        />
      
//     </Box>
//   );
// }
