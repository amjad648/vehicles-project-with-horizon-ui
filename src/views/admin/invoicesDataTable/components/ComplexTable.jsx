/* eslint-disable */


import {
  Box,
  Flex,
  Icon,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import * as React from 'react';
// Assets
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';
import { getInvoiceById } from "../../../../services/invoiceService.js";
import { Spinner } from "@chakra-ui/react";
import InvoiceModal from "./InvoiceModal.jsx"
const columnHelper = createColumnHelper();

export default function ComplexTable(props) {
const { isOpen, onOpen, onClose } = useDisclosure();
const [selectedInvoice, setSelectedInvoice] = React.useState(null);
const [loadingInvoice, setLoadingInvoice] = React.useState(false);
const [error, setError] = React.useState(false);   

const openInvoiceModal = async (invoiceId) => {
  try {
    setError(false);                // reset error
    setSelectedInvoice(null);      // Reset so old invoice doesn't show
    setLoadingInvoice(true);      // show spinner
    onOpen();                     // open modal immediately

    const invoiceData = await getInvoiceById(invoiceId);
    setSelectedInvoice(invoiceData);   // save fresh invoice
    
  } catch (err) {
    console.error("Failed to fetch invoice:", err);
    setError(true);               // show error message in modal
    setSelectedInvoice(null);     // prevent showing old invoice
  } finally {
    setLoadingInvoice(false);     // hide spinner after fetch
  }
};

  const { tableData } = props;
  const [sorting, setSorting] = React.useState([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  let defaultData = tableData;
  const columns = [
     columnHelper.accessor('invoiceId', {
      id: 'invoiceId',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          INVOICE ID
        </Text>
      ),
      cell: (info) => {
        // const row = info.row.original; // full invoice object
        const invoiceId = info.getValue();
        return(
        <Flex 
        align="center"
        cursor="pointer"
        onClick={() => openInvoiceModal(invoiceId)}
        >
          <Text color={textColor} 
          fontSize="sm" 
          fontWeight="700"
          _hover={{ textDecoration: "underline" }}
          >
            {invoiceId}
          </Text>
        </Flex>
        );
      },
    }),
    columnHelper.accessor('vehicleDisplayName', {
      id: 'vehicleDisplayName',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          VEHICLE NAME
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('vehicleId', {
      id: 'vehicleId',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          VEHICLE ID
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          STATUS
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Icon
            w="24px"
            h="24px"
            me="5px"
            color={
              info.getValue() === 'APPROVED'
                ? 'green.500'
                : info.getValue() === 'REJECTED'
                ? 'red.500'
                : info.getValue() === 'DRAFT'
                ? 'orange.500'
                : null
            }
            as={
              info.getValue() === 'APPROVED'
                ? MdCheckCircle
                : info.getValue() === 'REJECTED'
                ? MdCancel
                : info.getValue() === 'DRAFT'
                ? MdOutlineError
                : null
            }
          />
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('serviceDate', {
      id: 'serviceDate',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
         SERVICE DATE
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('totalCost', {
      id: 'totalCost',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          TOTAL COST
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('taskCount', {
      id: 'taskCount',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
         TASKS
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    {
      id: "actions",
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: "10px", lg: "12px" }}
          color="gray.400"
        >
          ACTIONS
        </Text>
      ),
      cell: (info) => {
        const row = info.row.original; // full invoice object
        return (
          <Flex gap="10px">
            <Button
              size="sm"
              variant="brand"
              onClick={() => console.log("Edit Invoice", row.invoiceId)}
            >
              Edit
            </Button>
    
            <Button
              size="sm"
              colorScheme="red"
              onClick={() => console.log("Delete Invoice", row.invoiceId)}
            >
              Delete
            </Button>
          </Flex>
        );
      },
    }
    

  ];
  const [data, setData] = React.useState(() => [...defaultData]);
  React.useEffect(() => {
    setData(tableData || []);
  }, [tableData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <>
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          INVOICES TABLE
        </Text>
        <Menu />
      </Flex>
      <Box overflowX="auto" w="100%">
        <Table variant="simple"  color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        fontSize={{ sm: '10px', lg: '12px' }}
                        color="gray.400"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted()] ?? null}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table
              .getRowModel()
              .rows.slice(0, 11)
              .map((row) => {
                return (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td
                          key={cell.id}
                          fontSize={{ sm: '14px' }}
                          minW={{ sm: '100px', md: '150px', lg: 'auto' }}
                          borderColor="transparent"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
    </Card>

    <InvoiceModal
  isOpen={isOpen}
  onClose={onClose}
  invoice={selectedInvoice}
  loading={loadingInvoice}
  error={error}  
/>

</>

  );
}
