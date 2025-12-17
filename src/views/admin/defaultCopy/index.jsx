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
import {
  Text,
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { DeleteIcon } from "@chakra-ui/icons";

import React, { useState, useEffect, useContext } from "react";
import { fetchDashboardAnalytics } from "services/dashboardServices.js";
import { ProfileIcon, CreditIcon, StatsIcon } from "components/icons/Icons";
import { NavLink } from "react-router-dom";
import {
     MdAddTask,
     MdFileCopy,
    } from "react-icons/md";
// ⬅️ ADD THIS
import { KeycloakContext } from "../../../keycloakProvider";

export default function UserReports() {
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  // ⬅️ REPLACE useKeycloak WITH THIS
  const keycloak = useContext(KeycloakContext);

  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    if (!keycloak || !keycloak.authenticated) return;

    async function loadData() {
      const data = await fetchDashboardAnalytics();
      setDashboardData(data || []);
    }

    loadData();

  }, [keycloak, keycloak.authenticated]);

  console.log('Dashboard data',dashboardData);

  const approvedInvoices = dashboardData?.invoiceCountsByStatus?.APPROVED || 0;
  const pendingInvoices = dashboardData?.invoiceCountsByStatus?.PENDING || 0;
  const rejectedInvoices = dashboardData?.invoiceCountsByStatus?.REJECTED || 0;
  const draftInvoices = dashboardData?.invoiceCountsByStatus?.DRAFT || 0;

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} mt="25px">
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="30px" mb="5px">
        <Box
          as={NavLink}
          to="/admin/vehicles-data"
          w="100%"
          borderRadius="16px"
          border="1px solid"
          borderColor="gray.200"
          _hover={{ bg: "gray.100", cursor: "pointer" }}
        >
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={StatsIcon} color={brandColor} />
                }
              />
            }
            name="Total Vehicles"
            value={dashboardData.totalVehicles}
          />
        </Box>

        <Box
          as={NavLink}
          to="/admin/users"
          w="100%"
          borderRadius="16px"
          border="1px solid"
          borderColor="gray.200"
          _hover={{ bg: "gray.100", cursor: "pointer" }}
        >
         <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={ProfileIcon} color={brandColor} />
              }
            />
          }
          name="Total Users"
          value={dashboardData.totalUsers}
         />
        </Box>

        <Box
          as={NavLink}
          to="/admin/invoices"
          w="100%"
          borderRadius="16px"
          border="1px solid"
          borderColor="gray.200"
          _hover={{ bg: "gray.100", cursor: "pointer" }}
        >
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={CreditIcon} color={brandColor} />
                }
              />
            }
            name="Total Invoices"
            value={dashboardData.totalInvoices}
          />
        </Box>
      </SimpleGrid>

      {/* INVOICE STATUS */}
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Text color={textColor} fontSize="md" fontWeight="600" ms="15px">
          INVOICE STATUS
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="30px" mb="20px">
          {/* APPROVED */}
          <Box
            as={NavLink}
            to="/admin/invoices?status=approved"
            w="100%"
            borderRadius="16px"
            border="1px solid"
            borderColor="gray.200"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={<Icon w="28px" h="28px" as={MdAddTask} color={brandColor} />}
                />
              }
              name="Approved Invoices"
              value={approvedInvoices}
            />
          </Box>

          {/* PENDING */}
          <Box
            as={NavLink}
            to="/admin/invoices?status=pending"
            w="100%"
            borderRadius="16px"
            border="1px solid"
            borderColor="gray.200"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={<Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />}
                />
              }
              name="Pending Invoices"
              value={pendingInvoices}
            />
          </Box>

          {/* DRAFT */}
          <Box
            as={NavLink}
            to="/admin/invoices?status=draft"
            w="100%"
            borderRadius="16px"
            border="1px solid"
            borderColor="gray.200"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={<Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />}
                />
              }
              name="Draft Invoices"
              value={draftInvoices}
            />
          </Box>

          {/* REJECTED */}

          <Box
            as={NavLink}
            to="/admin/invoices?status=rejected"
            w="100%"
            borderRadius="16px"
            border="1px solid"
            borderColor="gray.200"
            _hover={{ bg: "gray.100", cursor: "pointer" }}
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={<Icon w="30px" h="30px" as={DeleteIcon} color={brandColor} />}
                />
              }
              name="Rejected Invoices"
              value={rejectedInvoices}
            />
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

// // Chakra imports
// import {
//   Text,
//   Box,
//   Icon,
//   SimpleGrid,
//   useColorModeValue,
// } from "@chakra-ui/react";
// // Assets
// import MiniStatistics from "components/card/MiniStatistics";
// import IconBox from "components/icons/IconBox";
// import { DeleteIcon } from "@chakra-ui/icons";
// import React from "react";
// import {
//   MdAddTask,
//   MdFileCopy,
// } from "react-icons/md";
// import {useState, useEffect} from 'react';
// import { useKeycloak } from "@react-keycloak/web";
// import { fetchDashboardAnalytics } from "services/dashboardServices.js";
// import { ProfileIcon } from "components/icons/Icons";
// import { CreditIcon } from "components/icons/Icons";
// import { StatsIcon } from "components/icons/Icons";
// import { NavLink } from "react-router-dom";


// export default function UserReports() {
//   // Chakra Color Mode
//   const brandColor = useColorModeValue("brand.500", "white");
//   const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
//   const textColor = useColorModeValue("secondaryGray.900", "white");

//   const { keycloak,initialized } = useKeycloak();
//   const [dashboardData, setDashboardData] = useState({});

//   useEffect( () => {
//     // wait until Keycloak finishes loading
//   if (!initialized || !keycloak.authenticated) return;

//    async function getDashboardData () {
//     const data = await fetchDashboardAnalytics();
//     setDashboardData(data || {});
//     };

//    getDashboardData();

//     }, [initialized, keycloak.authenticated]);

//     console.log(dashboardData);

//    const approvedInvoices = dashboardData?.invoiceCountsByStatus?.APPROVED || 0;
//    const pendingInvoices = dashboardData?.invoiceCountsByStatus?.PENDING || 0;
//    const rejectedInvoices = dashboardData?.invoiceCountsByStatus?.REJECTED || 0;
//    const draftInvoices = dashboardData?.invoiceCountsByStatus?.DRAFT || 0;

//   return (
//     <Box pt={{ base: "130px", md: "80px", xl: "80px" }} mt='25px'>
      
//       <SimpleGrid
//         columns={{ base: 1, md: 2, xl: 3,  }}
//         gap='30px'
//         mb='5px'>
//       <Box 
//     as={NavLink}
//     to="/admin/vehicles-data"
//     w="100%"
//     borderRadius="16px"
//     border="1px solid"
//     borderColor="gray.200"
//     _hover={{ bg: "gray.100", cursor: "pointer" }}
//     >
//       <MiniStatistics
//           startContent={
//             <IconBox
//               w='56px'
//               h='56px'
//               bg={boxBg}
//               icon={
//                 <Icon w='32px' h='32px' as={StatsIcon} color={brandColor} />
//               }
//             />
//           }
//           name='Total Vehicles'
//           value={dashboardData.totalVehicles}
//         />
//          </Box>
       
//         <MiniStatistics
//           startContent={
//             <IconBox
//               w='56px'
//               h='56px'
//               bg={boxBg}
//               icon={
//                 <Icon w='32px' h='32px' as={ProfileIcon} color={brandColor} />
//               }
//             />
//           }
//           name='Total Users'
//           value={dashboardData.totalUsers}
//         />
//          <Box 
//     as={NavLink}
//     to="/admin/invoices"
//     w="100%"
//     borderRadius="16px"
//     border="1px solid"
//     borderColor="gray.200"
//     _hover={{ bg: "gray.100", cursor: "pointer" }}
//        >
//           <MiniStatistics
//           startContent={
//             <IconBox
//               w='56px'
//               h='56px'
//               bg={boxBg}
//               icon={
//                 <Icon w='32px' h='32px' as={CreditIcon} color={brandColor} />}
//             />
//           }
//           name='Total Invoices'
//           value={dashboardData.totalInvoices}
//         />
//         </Box>
//         </SimpleGrid>
     
//       <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
//       <Text color={textColor} fontSize='md' fontWeight='600' ms='15px'>
//           INVOICE STATUS
//         </Text>

//       <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap='30px' mb='20px'>
      
    
//       <Box 
//     as={NavLink}
//     to="/admin/invoices?status=approved"
//     w="100%"
//     borderRadius="16px"
//     border="1px solid"
//     borderColor="gray.200"
//     _hover={{ bg: "gray.100", cursor: "pointer" }}
//        >
//          <MiniStatistics
//           startContent={
//             <IconBox
//               w='56px'
//               h='56px'
//               bg={boxBg}
//               icon={<Icon w='28px' h='28px' as={MdAddTask} color={brandColor}/>}
//             />
//           }
//           name='Approved Invoices'
//           value={approvedInvoices}
//         />
//         </Box>
//         <Box 
//     as={NavLink}
//     to="/admin/invoices?status=pending"
//     w="100%"
//     borderRadius="16px"
//     border="1px solid"
//     borderColor="gray.200"
//     _hover={{ bg: "gray.100", cursor: "pointer" }}
//        >
//         <MiniStatistics
//           startContent={
//             <IconBox
//               w='56px'
//               h='56px'
//               bg={boxBg}
//               icon={
//                 <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
//               }
//             />
//           }
//           name='Pending Invoices'
//           value={pendingInvoices}
//         />
//         </Box>
//         <Box 
//     as={NavLink}
//     to="/admin/invoices?status=draft"
//     w="100%"
//     borderRadius="16px"
//     border="1px solid"
//     borderColor="gray.200"
//     _hover={{ bg: "gray.100", cursor: "pointer" }}
//        >
//          <MiniStatistics
//           startContent={
//             <IconBox
//               w='56px'
//               h='56px'
//               bg={boxBg}
//               icon={
//                 <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
//               }
//             />
//           }
//           name='Draft Invoices'
//           value={draftInvoices}
//         />
//        </Box>
       
//        <Box 
//     as={NavLink}
//     to="/admin/invoices?status=rejected"
//     w="100%"
//     borderRadius="16px"
//     border="1px solid"
//     borderColor="gray.200"
//     _hover={{ bg: "gray.100", cursor: "pointer" }}
//        >
//         <MiniStatistics
//           startContent={
//             <IconBox
//               w='56px'
//               h='56px'
//               bg={boxBg}
//               icon={
//                 <Icon w='30px' h='30px' as={DeleteIcon} color={brandColor} />
//               }
//             />
//           }
//           name='Rejected Invoices'
//           value={rejectedInvoices}
//         />
//         </Box>

//       </SimpleGrid>
//       </Box>
//     </Box>
     
//   );
// }
