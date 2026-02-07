import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Image,
  Divider,
  Card,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { addOrder, isAuthenticated, user } = useUser();
  const toast = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Validate form
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'address',
      'city',
      'state',
      'zipCode',
      'cardNumber',
      'expiryDate',
      'cvv',
    ];

    const isEmpty = requiredFields.some((field) => !formData[field]);

    if (isEmpty) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3,
        isClosable: true,
      });
      setIsProcessing(false);
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      // Save order if user is authenticated
      if (isAuthenticated) {
        const order = {
          items: cartItems,
          subtotal,
          shipping,
          tax,
          total,
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
          },
        };
        addOrder(order);
      }

      toast({
        title: 'Order Placed!',
        description: `Order total: $${total.toFixed(2)}`,
        status: 'success',
        duration: 3,
        isClosable: true,
      });
      clearCart();
      navigate(isAuthenticated ? '/dashboard' : '/');
      setIsProcessing(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <Container py={20} textAlign="center">
        <Heading mb={4}>Your cart is empty</Heading>
        <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
      </Container>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="1200px">
        <Heading mb={8}>Checkout</Heading>

        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          {/* Checkout Form */}
          <VStack as="form" onSubmit={handleSubmit} align="stretch" spacing={6}>
            {/* Shipping Information */}
            <Card p={6}>
              <Heading size="md" mb={4}>
                Shipping Address
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">First Name</FormLabel>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Last Name</FormLabel>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                  />
                </FormControl>
                <FormControl isRequired gridColumn={{ base: '1 / -1', md: 'auto' }}>
                  <FormLabel fontSize="sm">Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                </FormControl>
                <FormControl gridColumn={{ base: '1 / -1', md: 'auto' }}>
                  <FormLabel fontSize="sm">Phone</FormLabel>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 000-0000"
                  />
                </FormControl>
                <FormControl isRequired gridColumn="1 / -1">
                  <FormLabel fontSize="sm">Address</FormLabel>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main St"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">City</FormLabel>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">State</FormLabel>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">ZIP Code</FormLabel>
                  <Input
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                  />
                </FormControl>
              </Grid>
            </Card>

            {/* Payment Information */}
            <Card p={6}>
              <Heading size="md" mb={4}>
                Payment Method
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                <FormControl isRequired gridColumn="1 / -1">
                  <FormLabel fontSize="sm">Cardholder Name</FormLabel>
                  <Input
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                </FormControl>
                <FormControl isRequired gridColumn="1 / -1">
                  <FormLabel fontSize="sm">Card Number</FormLabel>
                  <Input
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">Expiry Date</FormLabel>
                  <Input
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">CVV</FormLabel>
                  <Input
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="3"
                  />
                </FormControl>
              </Grid>
            </Card>

            <Button
              type="submit"
              size="lg"
              bg="blue.600"
              color="white"
              _hover={{ bg: 'blue.700' }}
              isLoading={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
            </Button>
          </VStack>

          {/* Order Review */}
          <Box>
            <Card p={6} bg="white">
              <Heading size="md" mb={4}>
                Order Summary
              </Heading>

              <VStack align="stretch" spacing={4} mb={6}>
                {cartItems.map((item) => (
                  <HStack key={item.id} justify="space-between" pb={4} borderBottomWidth="1px">
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" fontSize="sm">
                        {item.name}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        Qty: {item.quantity}
                      </Text>
                    </VStack>
                    <Text fontSize="sm" fontWeight="bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </HStack>
                ))}
              </VStack>

              <Divider mb={4} />

              <VStack align="stretch" spacing={3} fontSize="sm">
                <HStack justify="space-between">
                  <Text>Subtotal</Text>
                  <Text>${subtotal.toFixed(2)}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Shipping</Text>
                  <Text>${shipping.toFixed(2)}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Tax</Text>
                  <Text>${tax.toFixed(2)}</Text>
                </HStack>

                <Divider />

                <HStack justify="space-between" fontSize="lg" fontWeight="bold">
                  <Text>Total</Text>
                  <Text color="blue.600">${total.toFixed(2)}</Text>
                </HStack>
              </VStack>
            </Card>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
