
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Flex,
  Divider,
  Spinner,
  Button,
  Badge,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
export default function InvoiceDetailsModal({
  isOpen,
  onClose,
  invoice,
  loading,
  error,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(4px)" />

      <ModalContent borderRadius="20px" p="4" boxShadow="2xl">
        <ModalHeader fontSize="2xl" fontWeight="700" color="gray.800">
          Invoice Details
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
  {loading ? (
    <Flex justify="center" py="12">
      <Spinner size="xl" thickness="4px" speed="0.7s" />
    </Flex>
    ) : error ? (
      <Text color="red.500" fontSize="lg" textAlign="center" fontWeight="600">
        Invoice not found or server error.
      </Text>
   ) : invoice ? (
     <VStack align="stretch" spacing="6">
      {/* =======================================================
          SECTION 1: INVOICE SUMMARY
          ======================================================== */}
      <Box
        p="5"
        bg="gray.50"
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
        boxShadow="sm"
        >
        <Flex justify="space-between" align="center">
          <Box>
          {console.log(invoice)}
            <Text fontSize="lg" fontWeight="700" color="gray.700">
              Invoice ID
            </Text>
            <Text color="gray.600">{invoice.invoiceId}</Text>
          </Box>

          <Box textAlign="right">
            <Text fontSize="lg" fontWeight="700" color="gray.700">
              Status
            </Text>
            <Badge
              colorScheme={
                invoice.status === "APPROVED"
                  ? "green"
                  : invoice.status === "REJECTED"
                  ? "red"
                  : "orange"
              }
              px="3"
              py="1"
              borderRadius="md"
              fontSize="md"
            >
              {invoice.status}
            </Badge>
          </Box>
        </Flex>

        <Divider my="4" />

        <Flex justify="space-between">
          <Box>
            <Text fontWeight="600" color="gray.700">
              Service Date
            </Text>
            <Text color="gray.600">{invoice.serviceDate}</Text>
          </Box>

          <Box textAlign="right">
            <Text fontWeight="600" color="gray.700">
              Total Cost
            </Text>
            <Text fontSize="2xl" color="blue.600" fontWeight="700">
              Rs. {invoice.totalCost}
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* =======================================================
          SECTION 2: VEHICLE INFORMATION
      ======================================================== */}
      <Box>
        <Text fontSize="xl" fontWeight="600" mb="3" color="gray.800">
          Vehicle Information
        </Text>

        <SimpleGrid columns={2} spacing="6">
          <Box>
            <Text fontWeight="600">Vehicle Name:</Text>
            <Text color="gray.600">{invoice.vehicleDisplayName}</Text>
          </Box>

          <Box>
            <Text fontWeight="600">Vehicle ID:</Text>
            <Text color="gray.600">{invoice.vehicleId}</Text>
          </Box>
        </SimpleGrid>
      </Box>

      <Divider />

      {/* =======================================================
          SECTION 3: TASKS BREAKDOWN (MODERN DESIGN)
      ======================================================== */}
      <Box>
        <Text fontSize="xl" fontWeight="600" mb="3" color="gray.800">
          Tasks Breakdown
        </Text>

        <SimpleGrid columns={2} spacing="6">
          {/* ---------------- LEFT: LABOUR TASKS ---------------- */}
          <Box>
            <Text fontWeight="700" fontSize="lg" mb="3">
              Labour Tasks
            </Text>

            {invoice.labourTasks?.length > 0 ? (
              invoice.labourTasks.map((task, idx) => (
                <Flex
                  key={idx}
                  justify="space-between"
                  p="4"
                  bg="white"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="gray.200"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md" }}
                  mb="3"
                >
                  <Box>
                    <Text fontWeight="600">{task.name}</Text>
                  </Box>

                  <Text fontWeight="700" color="blue.600">
                    Rs. {task.cost}
                  </Text>
                </Flex>
              ))
            ) : (
              <Text color="gray.500">No labour tasks found.</Text>
            )}
          </Box>

          {/* ---------------- RIGHT: PART TASKS ---------------- */}
          <Box>
            <Text fontWeight="700" fontSize="lg" mb="3">
              Parts & Materials
            </Text>

            {invoice.partTasks?.length > 0 ? (
              invoice.partTasks.map((task, idx) => (
                <Flex
                  key={idx}
                  justify="space-between"
                  p="4"
                  bg="white"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="gray.200"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md" }}
                  mb="3"
                >
                  <Box>
                    <Text fontWeight="600">{task.name}</Text>
                  </Box>

                  <Text fontWeight="700" color="blue.600">
                    Rs. {task.cost}
                  </Text>
                </Flex>
              ))
            ) : (
              <Text color="gray.500">No parts/materials found.</Text>
            )}
          </Box>
        </SimpleGrid>
      </Box>

      <Divider />

      {/* =======================================================
          SECTION 4: FILES
      ======================================================== */}
      <Box>
        <Text fontSize="xl" fontWeight="600" mb="3" color="gray.800">
          Attached Files
        </Text>

        {invoice.files?.map((file, idx) => (
          <Flex
            key={idx}
            p="4"
            bg="gray.50"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            justify="space-between"
            align="center"
            boxShadow="sm"
            mb="3"
          >
            <Box>
              <Text fontWeight="600">{file.fileName}</Text>
              <Text color="gray.600">{file.mimeType}</Text>
              <Text color="gray.600">{file.sizeBytes} bytes</Text>
            </Box>

            <Button colorScheme="blue" size="sm">
              View
            </Button>
          </Flex>
        ))}
      </Box>
    </VStack>
  ) : (
    <Text color="red.500" textAlign="center">
      No invoice found.
    </Text>
  )}
</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" borderRadius="10px" px="6" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}