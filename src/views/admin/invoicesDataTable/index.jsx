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
import React, { useState, useEffect, useContext } from "react";
import { getInvoices } from "../../../services/invoiceService";
import { useSearchParams } from "react-router-dom";
import { KeycloakContext } from "../../../keycloakProvider";
// Chakra imports
import { Box } from "@chakra-ui/react";

import ComplexTable from "views/admin/invoicesDataTable/components/ComplexTable";
import {
  columnsDataComplex,
} from "views/admin/invoicesDataTable/variables/columnsData";

export default function Settings() {
  const [invoicesData, setInvoicesData] = useState([]);
  // const { keycloak,initialized } = useKeycloak();
  const keycloak = useContext(KeycloakContext);
  const [searchParams] = useSearchParams();
 
  useEffect( () => {
    // wait until Keycloak finishes loaing
 if (!keycloak || !keycloak.authenticated) return;

  async function fetchInvoices () {
    const filters = {};
    const status = searchParams.get('status');
    const vehicleId = searchParams.get("vehicleId");
    
    if (vehicleId) filters.vehicleId = vehicleId;
     console.log(vehicleId);
  
    // Only add status filter if URL has it
    if (status) filters.statuses = status.toUpperCase();
    const data = await getInvoices(filters);
    setInvoicesData(data || []);
    };

   fetchInvoices();
    
    }, [keycloak, keycloak.authenticated, searchParams]);

    console.log(invoicesData);
  
  return (
   <Box pt={{ base: "150px", md: "80px", xl: "80px" }}
    w="100%" 
    mb='20px'
    px="10px"
    spacing={{ base: "20px", xl: "20px" }}
    >
       
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={invoicesData}
        />
      
    </Box>
  );
}


