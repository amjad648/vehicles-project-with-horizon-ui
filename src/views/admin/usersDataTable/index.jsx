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
import { getUsersData } from "../../../services/userServices.js";
import { KeycloakContext } from "../../../keycloakProvider";
import { Box } from "@chakra-ui/react";
import ColumnsTable from "./components/ColumnsTable";

import {
  columnsDataColumns,
} from "./variables/columnsData";
import React from "react";

export default function Settings() {
  const [usersData, setUsersData] = useState([]);
  const keycloak = useContext(KeycloakContext);

  useEffect( () => {
    if (!keycloak || !keycloak.authenticated) return;

    async function fetchUsers () {
     const data = await getUsersData();
     setUsersData( data || [] );
  };

   fetchUsers();
 
}, [keycloak, keycloak.authenticated]);

 console.log('Users data', usersData);

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
          tableData={usersData}
       />
      
    </Box>
  );
}
