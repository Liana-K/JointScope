import React from 'react';
import {
  Box,
  Container,
  Grid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
  VStack,
  HStack,
  Heading,
  Text,
  Divider,
  Input,
  useBreakpointValue,
  Card,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';
import { useCart } from '../.vscode/context/CartContext';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const tableDisplay = useBreakpointValue({ base: 'none', md: 'table' });
  const cardDisplay = useBreakpointValue({ base: 'block', md: 'none' });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <Box bg="gray.50" minH="100vh" py={20}>
        <Container maxW="600px" textAlign="center">
          <Heading mb={4}>Your cart is empty</Heading>
          <Text color="gray.600" mb={8}>
            Start shopping to add items to your cart
          </Text>
          <Button
            size="lg"
            bg="blue.600"
            color="white"
            _hover={{ bg: 'blue.700' }}
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="1200px">
        <Heading mb={8}>Shopping Cart ({cartItems.length} items)</Heading>

        <Grid templateColumns={{ base: '1fr', lg: '1fr 350px' }} gap={6}>
          {/* Cart Items - Desktop Table */}
          <Box display={tableDisplay} bg="white" borderRadius="lg" overflow="hidden" shadow="sm">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Product</Th>
                  <Th isNumeric>Price</Th>
                  <Th>Quantity</Th>
                  <Th isNumeric>Total</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems.map((item) => (
                  <Tr key={item.id} borderBottomWidth="1px">
                    <Td>
                      <HStack spacing={4}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          w="80px"
                          h="80px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="bold" fontSize="sm">
                            {item.name}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            {item.category}
                          </Text>
                        </VStack>
                      </HStack>
                    </Td>
                    <Td isNumeric>
                      <Text fontWeight="bold">${item.price}</Text>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          −
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value) || 1)
                          }
                          w="50px"
                          textAlign="center"
                          size="sm"
                        />
                        <Button
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </HStack>
                    </Td>
                    <Td isNumeric>
                      <Text fontWeight="bold" color="blue.600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </Td>
                    <Td>
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {/* Cart Items - Mobile Cards */}
          <VStack display={cardDisplay} spacing={4} align="stretch">
            {cartItems.map((item) => (
              <Card key={item.id} p={4}>
                <VStack align="start" spacing={4}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    w="100%"
                    h="150px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Box w="full">
                    <Heading size="sm" mb={1}>
                      {item.name}
                    </Heading>
                    <Text fontSize="xs" color="gray.600" mb={3}>
                      {item.category}
                    </Text>
                    <HStack justify="space-between" mb={3}>
                      <Text fontWeight="bold">${item.price}</Text>
                      <Text color="blue.600" fontWeight="bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </HStack>
                    <HStack spacing={2} mb={3}>
                      <Button
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        w="50px"
                        textAlign="center"
                        size="sm"
                      />
                      <Button
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </HStack>
                    <Button
                      w="full"
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </Box>
                </VStack>
              </Card>
            ))}
          </VStack>

          {/* Order Summary */}
          <Box bg="white" p={6} borderRadius="lg" height="fit-content" shadow="sm">
            <Heading size="md" mb={6}>
              Order Summary
            </Heading>

            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between">
                <Text>Subtotal</Text>
                <Text fontWeight="bold">${subtotal.toFixed(2)}</Text>
              </HStack>

              <HStack justify="space-between">
                <Text>Shipping</Text>
                <Text fontWeight="bold">${shipping.toFixed(2)}</Text>
              </HStack>

              <HStack justify="space-between">
                <Text>Tax</Text>
                <Text fontWeight="bold">${tax.toFixed(2)}</Text>
              </HStack>

              <Divider />

              <HStack justify="space-between">
                <Text fontSize="lg" fontWeight="bold">
                  Total
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="blue.600">
                  ${total.toFixed(2)}
                </Text>
              </HStack>

              <Button
                w="full"
                size="lg"
                bg="blue.600"
                color="white"
                _hover={{ bg: 'blue.700' }}
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>

              <Button
                w="full"
                variant="outline"
                colorScheme="blue"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </Button>

              <Button
                w="full"
                variant="ghost"
                colorScheme="red"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </VStack>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default ShoppingCart;
