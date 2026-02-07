import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Badge,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { isAuthenticated, orderHistory } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const tableDisplay = useBreakpointValue({ base: 'none', md: 'table' });
  const cardDisplay = useBreakpointValue({ base: 'block', md: 'none' });

  if (!isAuthenticated) {
    return (
      <Box bg="gray.50" minH="100vh" py={20}>
        <Container maxW="400px" textAlign="center">
          <Heading mb={4}>Order History</Heading>
          <Text color="gray.600" mb={8}>
            Please log in to view your order history
          </Text>
          <Button
            size="lg"
            bg="blue.600"
            color="white"
            _hover={{ bg: 'blue.700' }}
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
        </Container>
      </Box>
    );
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'green';
      case 'Pending':
        return 'yellow';
      case 'Shipped':
        return 'blue';
      case 'Cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  if (orderHistory.length === 0) {
    return (
      <Box bg="gray.50" minH="100vh" py={20}>
        <Container maxW="600px" textAlign="center">
          <Heading mb={4}>No Orders Yet</Heading>
          <Text color="gray.600" mb={8}>
            You haven't placed any orders yet. Start shopping to create your first order!
          </Text>
          <Button
            size="lg"
            bg="blue.600"
            color="white"
            _hover={{ bg: 'blue.700' }}
            onClick={() => navigate('/shop')}
          >
            Start Shopping
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="1000px">
        <HStack justify="space-between" mb={8}>
          <Heading>Order History</Heading>
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </HStack>

        {/* Table View for Desktop */}
        <Box display={tableDisplay} overflowX="auto" bg="white" borderRadius="lg" shadow="md">
          <Table>
            <Thead bg="gray.100">
              <Tr>
                <Th>Order ID</Th>
                <Th>Date</Th>
                <Th>Items</Th>
                <Th>Total</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orderHistory.map((order) => (
                <Tr key={order.id} borderBottom="1px solid #e2e8f0">
                  <Td fontWeight="bold">#{order.id}</Td>
                  <Td>{new Date(order.date).toLocaleDateString()}</Td>
                  <Td>{order.items?.length || 0} item(s)</Td>
                  <Td fontWeight="bold">${order.total?.toFixed(2) || '0.00'}</Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Button size="sm" variant="outline" onClick={() => handleViewDetails(order)}>
                      View
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Card View for Mobile */}
        <VStack display={cardDisplay} spacing={4}>
          {orderHistory.map((order) => (
            <Card key={order.id} w="full">
              <CardBody>
                <VStack align="start" spacing={3} w="full">
                  <HStack justify="space-between" w="full">
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="bold">Order #{order.id}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {new Date(order.date).toLocaleDateString()}
                      </Text>
                    </VStack>
                    <Badge colorScheme={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </HStack>
                  <Divider />
                  <HStack justify="space-between" w="full">
                    <Text color="gray.600">
                      {order.items?.length || 0} item(s)
                    </Text>
                    <Text fontWeight="bold" fontSize="lg">
                      ${order.total?.toFixed(2) || '0.00'}
                    </Text>
                  </HStack>
                  <Button w="full" size="sm" onClick={() => handleViewDetails(order)}>
                    View Details
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </Container>

      {/* Order Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedOrder && (
              <VStack align="start" spacing={4}>
                <Box w="full">
                  <Text fontWeight="bold" mb={2}>
                    Order Information
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Order ID: #{selectedOrder.id}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Date: {new Date(selectedOrder.date).toLocaleDateString()}
                  </Text>
                  <Badge colorScheme={getStatusColor(selectedOrder.status)} mt={2}>
                    {selectedOrder.status}
                  </Badge>
                </Box>

                <Divider />

                <Box w="full">
                  <Text fontWeight="bold" mb={3}>
                    Items Ordered
                  </Text>
                  <VStack align="start" spacing={2} w="full">
                    {selectedOrder.items?.map((item) => (
                      <HStack key={item.id} justify="space-between" w="full">
                        <VStack align="start" spacing={0}>
                          <Text>{item.name}</Text>
                          <Text fontSize="sm" color="gray.600">
                            Qty: {item.quantity}
                          </Text>
                        </VStack>
                        <Text fontWeight="bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <Divider />

                <Box w="full">
                  <Text fontWeight="bold" mb={2}>
                    Order Summary
                  </Text>
                  <VStack align="start" spacing={1} fontSize="sm">
                    <HStack justify="space-between" w="full">
                      <Text>Subtotal:</Text>
                      <Text>
                        ${(selectedOrder.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0).toFixed(2)}
                      </Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Shipping:</Text>
                      <Text>${selectedOrder.shipping?.toFixed(2) || '0.00'}</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Tax:</Text>
                      <Text>${selectedOrder.tax?.toFixed(2) || '0.00'}</Text>
                    </HStack>
                    <Divider my={2} />
                    <HStack justify="space-between" w="full" fontWeight="bold">
                      <Text>Total:</Text>
                      <Text>${selectedOrder.total?.toFixed(2) || '0.00'}</Text>
                    </HStack>
                  </VStack>
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default OrderHistory;
