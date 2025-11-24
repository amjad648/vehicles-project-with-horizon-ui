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
  Avatar,
  Text,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import {useState, useEffect} from 'react';
import { useKeycloak } from "@react-keycloak/web";
import { fetchDashboardAnalytics } from "services/dashboardServices.js";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { ProfileIcon, PlusSquareIcon } from "components/icons/Icons";
import { DocumentIcon } from "components/icons/Icons";
import { CreditIcon } from "components/icons/Icons";
import { StatsIcon } from "components/icons/Icons";


export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const { keycloak,initialized } = useKeycloak();
  const [dashboardData, setDashboardData] = useState([]);

  useEffect( () => {
    // wait until Keycloak finishes loading
  if (!initialized || !keycloak.authenticated) return;

   async function getDashboardData () {
    const data = await fetchDashboardAnalytics();
    setDashboardData(data || []);
    };

   getDashboardData();

    }, [initialized]);

    console.log(dashboardData);

   const approvedInvoices = dashboardData?.invoiceCountsByStatus?.APPROVED;
   const pendingInvoices = dashboardData?.invoiceCountsByStatus?.PENDING;
   const rejectedInvoices = dashboardData?.invoiceCountsByStatus?.REJECTED;
   const draftInvoices = dashboardData?.invoiceCountsByStatus?.DRAFT;

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} mt='25px'>
      
      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 3,  }}
        gap='30px'
        mb='5px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={StatsIcon} color={brandColor} />
              }
            />
          }
          name='Total Vehicles'
          value={dashboardData.totalVehicles}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={ProfileIcon} color={brandColor} />
              }
            />
          }
          name='Total Users'
          value={dashboardData.totalUsers}
        />
          <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={CreditIcon} color={brandColor} />}
            />
          }
          name='Total Invoices'
          value={dashboardData.totalInvoices}
        />
        </SimpleGrid>
     
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Text color={textColor} fontSize='md' fontWeight='600' ms='15px'>
          INVOICE STATUS
        </Text>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap='30px' mb='20px'>
      
    
         <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='28px' h='28px' as={MdAddTask} color={brandColor}/>}
            />
          }
          name='Approved Invoices'
          value={approvedInvoices}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Pending Invoices'
          value={pendingInvoices}
        />
         <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Draft Invoices'
          value={draftInvoices}
        />
       
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='30px' h='30px' as={DeleteIcon} color={brandColor} />
              }
            />
          }
          name='Rejected Invoices'
          value={rejectedInvoices}
        />
      </SimpleGrid>
      </Box>
    </Box>
     
  );
}
