import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Grid,
  VStack,
  HStack,
  Button,
  Image,
  Text,
  Heading,
  Badge,
  Rating,
  RatingIcon,
  CheckboxGroup,
  Checkbox,
  useBreakpointValue,
  IconButton,
} from '@chakra-ui/react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../.vscode/data/products';
import { useCart } from '../.vscode/context/CartContext';
import { useUser } from '../.vscode/context/UserContext';
import { EditIcon } from '@chakra-ui/icons';

const Shop = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, isAuthenticated } = useUser();
  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const sidebarDisplay = useBreakpointValue({ base: 'none', md: 'block' });

  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category) ||
        selectedCategories.includes('All');

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories]);

  const ProductCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(isInWishlist(product.id));

    const handleWishlist = (e) => {
      e.stopPropagation();
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      addToWishlist(product);
      setIsWishlisted(!isWishlisted);
    };

    return (
      <Box
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="lg"
        overflow="hidden"
        _hover={{ shadow: 'lg' }}
        transition="all 0.2s"
        cursor="pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <Box position="relative">
          <Image
            src={product.image}
            alt={product.name}
            w="100%"
            h="250px"
            objectFit="cover"
          />
          <IconButton
            position="absolute"
            top={2}
            right={2}
            icon={<EditIcon />}
            size="md"
            colorScheme={isWishlisted ? 'red' : 'gray'}
            variant={isWishlisted ? 'solid' : 'outline'}
            onClick={handleWishlist}
            borderRadius="full"
          />
        </Box>
        <Box p={4}>
          <Badge colorScheme="gray" mb={2} fontSize="xs">
            {product.category}
          </Badge>
          <Heading size="sm" mb={2} noOfLines={2}>
            {product.name}
          </Heading>
          <Text fontSize="sm" color="gray.600" mb={2} noOfLines={2}>
            {product.description}
          </Text>
          
          <HStack mb={3} fontSize="sm">
            <Text color="orange.500" fontWeight="bold">
              ★ {product.rating}
            </Text>
            <Text color="gray.500">({product.reviews})</Text>
          </HStack>

          <HStack justify="space-between" align="flex-end">
            <Heading size="md" color="blue.600">
              ${product.price}
            </Heading>
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
              Add to Cart
            </Button>
          </HStack>
        </Box>
      </Box>
    );
  };

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="1200px">
        <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }} gap={6}>
          {/* Sidebar - Filters */}
          <VStack
            align="start"
            spacing={6}
            display={sidebarDisplay}
            bg="white"
            p={4}
            borderRadius="lg"
            height="fit-content"
            position="sticky"
            top="120px"
          >
            <Heading size="md">Filters</Heading>

            <Box w="full">
              <Heading size="sm" mb={3}>
                Categories
              </Heading>
              <CheckboxGroup
                value={selectedCategories}
                onChange={setSelectedCategories}
              >
                <VStack align="start" spacing={2}>
                  {CATEGORIES.map((category) => (
                    <Checkbox key={category} value={category} size="md">
                      <Text fontSize="sm">{category}</Text>
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            </Box>

            <Button
              w="full"
              variant="outline"
              colorScheme="blue"
              size="sm"
              onClick={() => setSelectedCategories([])}
            >
              Clear Filters
            </Button>
          </VStack>

          {/* Main Content */}
          <VStack align="start" spacing={6}>
            <Box w="full">
              <Heading size="lg" mb={2}>
                Shop Furniture
              </Heading>
              <Text color="gray.600" fontSize="sm">
                {filteredProducts.length} products found
                {searchQuery && ` matching "${searchQuery}"`}
              </Text>
            </Box>

            {filteredProducts.length > 0 ? (
              <Grid
                templateColumns={{
                  base: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                }}
                gap={6}
                w="full"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Grid>
            ) : (
              <Box
                w="full"
                py={12}
                textAlign="center"
                bg="white"
                borderRadius="lg"
              >
                <Heading size="md" mb={2} color="gray.400">
                  No products found
                </Heading>
                <Text color="gray.500" fontSize="sm">
                  Try adjusting your filters or search query
                </Text>
              </Box>
            )}
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
};

export default Shop;
