import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Input,
  useToast,
  Divider,
  IconButton,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../.vscode/data/products';
import { useCart } from '../.vscode/context/CartContext';
import { useUser } from '../.vscode/context/UserContext';
import { EditIcon } from '@chakra-ui/icons';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, isAuthenticated } = useUser();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find((p) => p.id === parseInt(productId));
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist(product?.id || 0));

  if (!product) {
    return (
      <Container py={20} textAlign="center">
        <Heading>Product not found</Heading>
        <Button mt={4} onClick={() => navigate('/shop')}>
          Back to Shop
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: 'Added to cart',
      description: `${quantity} item(s) added successfully`,
      status: 'success',
      duration: 2,
      isClosable: true,
    });
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Please login',
        description: 'You need to log in to add items to wishlist',
        status: 'info',
        duration: 3,
        isClosable: true,
      });
      navigate('/login');
      return;
    }
    addToWishlist(product);
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      status: 'success',
      duration: 2,
      isClosable: true,
    });
  };

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="1000px">
        <Button mb={6} variant="ghost" onClick={() => navigate(-1)}>
          ← Back
        </Button>

        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
          {/* Product Image */}
          <Box>
            <Image
              src={product.image}
              alt={product.name}
              borderRadius="lg"
              shadow="md"
              w="100%"
              h="auto"
            />
            <HStack mt={4} gap={2} justify="flex-start">
              {[1, 2, 3].map((i) => (
                <Image
                  key={i}
                  src={product.image}
                  alt=""
                  borderRadius="md"
                  w="80px"
                  h="80px"
                  objectFit="cover"
                  cursor="pointer"
                  _hover={{ opacity: 0.8 }}
                />
              ))}
            </HStack>
          </Box>

          {/* Product Details */}
          <VStack align="start" spacing={6}>
            <Box>
              <Badge colorScheme="blue" mb={2}>
                {product.category}
              </Badge>
              <Heading size="2xl" mb={2}>
                {product.name}
              </Heading>
              <HStack mb={4}>
                <Text color="orange.500" fontWeight="bold" fontSize="lg">
                  ★ {product.rating}
                </Text>
                <Text color="gray.600" fontSize="sm">
                  ({product.reviews} reviews)
                </Text>
              </HStack>
            </Box>

            <Divider />

            <VStack align="start" spacing={3}>
              <Heading size="md" color="blue.600">
                ${product.price}
              </Heading>
              <Text color="gray.700" lineHeight="1.8">
                {product.description}
              </Text>
            </VStack>

            <Divider />

            <Box w="full">
              <Heading size="sm" mb={4}>
                Product Details
              </Heading>
              <Text fontSize="sm" color="gray.700" mb={3}>
                {product.details}
              </Text>
            </Box>

            <Divider />

            <VStack align="start" spacing={4} w="full">
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Quantity
                </Text>
                <HStack>
                  <Button
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    −
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    w="80px"
                    textAlign="center"
                  />
                  <Button size="sm" onClick={() => setQuantity(quantity + 1)}>
                    +
                  </Button>
                </HStack>
              </Box>

              <HStack w="full" spacing={2}>
                <Button
                  flex={1}
                  size="lg"
                  bg="blue.600"
                  color="white"
                  _hover={{ bg: 'blue.700' }}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <IconButton
                  size="lg"
                  icon={<EditIcon />}
                  colorScheme={isWishlisted ? 'red' : 'gray'}
                  variant={isWishlisted ? 'solid' : 'outline'}
                  onClick={handleWishlist}
                  title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                />
              </HStack>

              <Button
                w="full"
                size="lg"
                variant="outline"
                colorScheme="blue"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </Button>
            </VStack>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;
