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
  CardBody,
  Image,
  Badge,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';

const Wishlist = () => {
  const navigate = useNavigate();
  const { isAuthenticated, wishlist, removeFromWishlist } = useUser();
  const { addToCart } = useCart();
  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  if (!isAuthenticated) {
    return (
      <Box bg="gray.50" minH="100vh" py={20}>
        <Container maxW="400px" textAlign="center">
          <Heading mb={4}>My Wishlist</Heading>
          <Text color="gray.600" mb={8}>
            Please log in to view your wishlist
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

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <Box bg="gray.50" minH="100vh" py={20}>
        <Container maxW="600px" textAlign="center">
          <Heading mb={4}>Your Wishlist is Empty</Heading>
          <Text color="gray.600" mb={8}>
            Start adding items to your wishlist to save them for later
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
        <Heading mb={8}>My Wishlist ({wishlist.length})</Heading>

        <Grid templateColumns={{ base: '1fr', md: `repeat(${gridColumns}, 1fr)` }} gap={6}>
          {wishlist.map((product) => (
            <Card key={product.id} overflow="hidden" _hover={{ shadow: 'lg' }} transition="all 0.2s">
              <Image
                src={product.image}
                alt={product.name}
                w="100%"
                h="200px"
                objectFit="cover"
              />
              <CardBody>
                <VStack align="start" spacing={3} h="full">
                  <Box>
                    <Badge colorScheme="blue" mb={2}>
                      {product.category}
                    </Badge>
                    <Heading size="md" mb={1}>
                      {product.name}
                    </Heading>
                    <Text color="gray.600" fontSize="sm">
                      {product.description}
                    </Text>
                  </Box>

                  <HStack justify="space-between" w="full" mt="auto">
                    <Text fontWeight="bold" fontSize="lg" color="blue.600">
                      ${product.price.toFixed(2)}
                    </Text>
                    <Text fontSize="sm" color="orange.500">
                      ★ {product.rating}
                    </Text>
                  </HStack>

                  <HStack w="full" spacing={2}>
                    <Button
                      flex={1}
                      leftIcon={<AddIcon />}
                      size="sm"
                      bg="blue.600"
                      color="white"
                      _hover={{ bg: 'blue.700' }}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="red"
                      leftIcon={<DeleteIcon />}
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      Remove
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Wishlist;
