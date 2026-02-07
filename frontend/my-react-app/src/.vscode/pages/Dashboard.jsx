import React from 'react';
import {
  Box,
  Container,
  Grid,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Avatar,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../.vscode/context/UserContext';
import { useCart } from '../.vscode/context/CartContext';
import { EditIcon } from '@chakra-ui/icons';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, orderHistory, wishlist } = useUser();
  const { cartItems, getTotalPrice } = useCart();

  if (!isAuthenticated) {
    return (
      <Box bg="gray.50" minH="100vh" py={20}>
        <Container maxW="400px" textAlign="center">
          <Heading mb={4}>Dashboard</Heading>
          <Text color="gray.600" mb={8}>
            Please log in to view your dashboard
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

  const totalOrders = orderHistory.length;
  const totalSpent = orderHistory.reduce((sum, order) => sum + (order.total || 0), 0);
  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="1200px">
        {/* Header Section */}
        <HStack mb={8} justify="space-between" align={{ base: 'start', md: 'center' }}>
          <VStack align="start" spacing={2}>
            <Heading size="lg">Welcome, {user?.firstName}!</Heading>
            <Text color="gray.600">Joined on {new Date(user?.joinedDate).toLocaleDateString()}</Text>
          </VStack>
          <Button
            leftIcon={<EditIcon />}
            bg="blue.600"
            color="white"
            _hover={{ bg: 'blue.700' }}
            onClick={() => navigate('/profile')}
          >
            Edit Profile
          </Button>
        </HStack>

        {/* Stats Section */}
        <Grid templateColumns={{ base: '1fr', md: gridColumns }} gap={6} mb={8}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Total Orders</StatLabel>
                <StatNumber>{totalOrders}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Total Spent</StatLabel>
                <StatNumber>${totalSpent.toFixed(2)}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Wishlist Items</StatLabel>
                <StatNumber>{wishlist.length}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        {/* Main Content Grid */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={8}>
          {/* User Profile Card */}
          <Card>
            <CardHeader>
              <Heading size="md">Profile</Heading>
            </CardHeader>
            <Divider />
            <CardBody>
              <VStack align="center" spacing={4}>
                <Avatar size="2xl" name={user?.firstName} src={user?.avatar} />
                <VStack align="center" spacing={1}>
                  <Text fontWeight="bold" fontSize="lg">
                    {user?.firstName} {user?.lastName}
                  </Text>
                  <Text color="gray.600" fontSize="sm">
                    {user?.email}
                  </Text>
                </VStack>
                <Divider />
                <VStack align="start" w="full" spacing={2}>
                  <Text fontSize="sm" color="gray.600">
                    <strong>Phone:</strong> {user?.phone || 'Not set'}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    <strong>Address:</strong> {user?.address || 'Not set'}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    <strong>City:</strong> {user?.city || 'Not set'}
                  </Text>
                </VStack>
                <Button w="full" variant="outline" onClick={() => navigate('/profile')}>
                  View Full Profile
                </Button>
              </VStack>
            </CardBody>
          </Card>

          {/* Right Column */}
          <VStack spacing={6}>
            {/* Recent Orders */}
            <Card w="full">
              <CardHeader display="flex" justifyContent="space-between" alignItems="center">
                <Heading size="md">Recent Orders</Heading>
                <Button size="sm" variant="ghost" onClick={() => navigate('/orders')}>
                  View All
                </Button>
              </CardHeader>
              <Divider />
              <CardBody>
                {orderHistory.length === 0 ? (
                  <VStack spacing={4}>
                    <Text color="gray.600">No orders yet</Text>
                    <Button
                      size="sm"
                      bg="blue.600"
                      color="white"
                      _hover={{ bg: 'blue.700' }}
                      onClick={() => navigate('/shop')}
                    >
                      Start Shopping
                    </Button>
                  </VStack>
                ) : (
                  <VStack align="start" spacing={4} w="full">
                    {orderHistory.slice(-3).reverse().map((order) => (
                      <Card key={order.id} w="full" bg="gray.50" borderWidth="1px" borderColor="gray.200">
                        <CardBody>
                          <HStack justify="space-between">
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="bold">Order #{order.id}</Text>
                              <Text fontSize="sm" color="gray.600">
                                {new Date(order.date).toLocaleDateString()}
                              </Text>
                            </VStack>
                            <VStack align="end" spacing={1}>
                              <Badge colorScheme={order.status === 'Completed' ? 'green' : 'yellow'}>
                                {order.status}
                              </Badge>
                              <Text fontWeight="bold">
                                ${order.total?.toFixed(2) || '0.00'}
                              </Text>
                            </VStack>
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                )}
              </CardBody>
            </Card>

            {/* Quick Actions */}
            <Card w="full">
              <CardHeader>
                <Heading size="md">Quick Actions</Heading>
              </CardHeader>
              <Divider />
              <CardBody>
                <Grid templateColumns="1fr 1fr" gap={4}>
                  <Button
                    bg="blue.600"
                    color="white"
                    _hover={{ bg: 'blue.700' }}
                    onClick={() => navigate('/shop')}
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    bg="purple.600"
                    color="white"
                    _hover={{ bg: 'purple.700' }}
                    onClick={() => navigate('/wishlist')}
                  >
                    Wishlist ({wishlist.length})
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/cart')}
                  >
                    Review Cart ({cartItems.length})
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/orders')}
                  >
                    Order History
                  </Button>
                </Grid>
              </CardBody>
            </Card>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
