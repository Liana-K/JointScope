import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../.vscode/data/products';
import { useCart } from '../.vscode/context/CartContext';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const featuredProducts = PRODUCTS.slice(0, 6);

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="gray.900" color="white" py={20}>
        <Container maxW="container.lg">
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={12} align="center">
            <VStack align="start" spacing={6}>
              <Heading size="2xl" lineHeight="1.2">
                Transform Your Space with Premium Furniture
              </Heading>
              <Text fontSize="lg" color="gray.300" maxW="500px">
                Discover our curated collection of beautiful, high-quality furniture designed to
                elevate your home. From classic to contemporary, we have something for every room.
              </Text>
              <HStack spacing={4}>
                <Button
                  size="lg"
                  bg="blue.600"
                  color="white"
                  _hover={{ bg: 'blue.700' }}
                  onClick={() => navigate('/shop')}
                >
                  Shop Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.100' }}
                  onClick={() => navigate('/plan-layout')}
                >
                  Plan Layout
                </Button>
              </HStack>
            </VStack>
            <Box display={{ base: 'none', md: 'block' }}>
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop"
                alt="Hero"
                borderRadius="lg"
              />
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.lg" py={20}>
        <VStack spacing={12}>
          <Box textAlign="center">
            <Heading size="xl" mb={4}>
              Why Shop with HEIL?
            </Heading>
            <Text color="gray.600" maxW="600px" mx="auto">
              We're committed to providing the best furniture shopping experience
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            {[
              {
                title: 'Premium Quality',
                description: 'Carefully selected furniture from top manufacturers',
                icon: '⭐',
              },
              {
                title: 'Best Prices',
                description: 'Competitive pricing without compromising quality',
                icon: '💰',
              },
              {
                title: 'Fast Delivery',
                description: 'Quick and reliable shipping to your doorstep',
                icon: '🚚',
              },
              {
                title: 'Easy Returns',
                description: '30-day hassle-free return policy',
                icon: '↩️',
              },
              {
                title: '24/7 Support',
                description: 'Our team is always ready to help',
                icon: '📞',
              },
              {
                title: 'Design Tools',
                description: 'Plan your layout with our interactive tools',
                icon: '🎨',
              },
            ].map((feature, idx) => (
              <Box
                key={idx}
                textAlign="center"
                p={6}
                borderRadius="lg"
                border="1px solid #e2e8f0"
                _hover={{ shadow: 'md', borderColor: 'blue.300' }}
                transition="all 0.2s"
              >
                <Text fontSize="3xl" mb={2}>
                  {feature.icon}
                </Text>
                <Heading size="sm" mb={2}>
                  {feature.title}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  {feature.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Featured Products Section */}
      <Box bg="gray.50" py={20}>
        <Container maxW="container.lg">
          <VStack spacing={12} align="stretch">
            <Box>
              <Heading size="xl" mb={2}>
                Featured Products
              </Heading>
              <Text color="gray.600">
                Check out our latest collection of beautiful furniture
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {featuredProducts.map((product) => (
                <Box
                  key={product.id}
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="lg"
                  overflow="hidden"
                  bg="white"
                  _hover={{ shadow: 'lg' }}
                  transition="all 0.2s"
                  cursor="pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    w="100%"
                    h="250px"
                    objectFit="cover"
                  />
                  <Box p={4}>
                    <Text fontSize="xs" color="gray.500" mb={1}>
                      {product.category}
                    </Text>
                    <Heading size="sm" mb={2} noOfLines={2}>
                      {product.name}
                    </Heading>
                    <Text fontSize="sm" color="gray.600" mb={3} noOfLines={2}>
                      {product.description}
                    </Text>
                    <HStack justify="space-between">
                      <Text fontSize="lg" fontWeight="bold" color="blue.600">
                        ${product.price}
                      </Text>
                      <Button
                        size="sm"
                        bg="blue.600"
                        color="white"
                        _hover={{ bg: 'blue.700' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        Add
                      </Button>
                    </HStack>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>

            <Button
              mx="auto"
              size="lg"
              bg="blue.600"
              color="white"
              _hover={{ bg: 'blue.700' }}
              onClick={() => navigate('/shop')}
            >
              View All Products
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg="blue.600" color="white" py={16}>
        <Container maxW="container.lg" textAlign="center">
          <Heading size="lg" mb={4}>
            Ready to Transform Your Home?
          </Heading>
          <Text fontSize="lg" mb={8} color="blue.100">
            Browse our complete collection and find the perfect furniture for every room
          </Text>
          <Button
            size="lg"
            bg="white"
            color="blue.600"
            _hover={{ bg: 'gray.100' }}
            onClick={() => navigate('/shop')}
          >
            Start Shopping Today
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
