import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Card,
  Divider,
  Grid,
  useBreakpointValue,
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';

const PlanLayout = () => {
  const [gridSize, setGridSize] = useState(8);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const gridDisplay = useBreakpointValue({ base: '200px', md: '400px', lg: '500px' });

  const furnitureTypes = [
    { id: 'sofa', label: '🛋️ Sofa', color: 'blue.300' },
    { id: 'table', label: '🪑 Table', color: 'green.300' },
    { id: 'bed', label: '🛏️ Bed', color: 'red.300' },
    { id: 'desk', label: '🖥️ Desk', color: 'yellow.300' },
  ];

  const addItem = (furnitureType) => {
    const newItem = {
      id: Date.now(),
      type: furnitureType,
      x: Math.floor(gridSize / 2),
      y: Math.floor(gridSize / 2),
    };
    setItems([...items, newItem]);
    setSelectedItem(newItem.id);
  };

  const moveItem = (id, dx, dy) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              x: Math.max(0, Math.min(gridSize - 1, item.x + dx)),
              y: Math.max(0, Math.min(gridSize - 1, item.y + dy)),
            }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    if (selectedItem === id) setSelectedItem(null);
  };

  const clearLayout = () => {
    setItems([]);
    setSelectedItem(null);
  };

  const getItemLabel = (type) => {
    const item = furnitureTypes.find((f) => f.id === type);
    return item?.label || '';
  };

  const getItemColor = (type) => {
    const item = furnitureTypes.find((f) => f.id === type);
    return item?.color || 'gray.300';
  };

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="1200px">
        <VStack align="start" spacing={8}>
          <Box>
            <Heading size="lg" mb={2}>
              Plan Your Room Layout
            </Heading>
            <Text color="gray.600">
              Design your perfect furniture arrangement with our interactive planner
            </Text>
          </Box>

          <Grid templateColumns={{ base: '1fr', lg: '1fr 300px' }} gap={8} w="full">
            {/* Main Canvas */}
            <Card p={6} shadow="md">
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    Grid Layout ({gridSize}x{gridSize})
                  </Text>

                  {/* Grid Canvas */}
                  <Box
                    bg="white"
                    border="2px solid #e2e8f0"
                    borderRadius="lg"
                    position="relative"
                    w={gridDisplay}
                    h={gridDisplay}
                    mb={4}
                  >
                    {/* Grid lines */}
                    {Array.from({ length: gridSize + 1 }).map((_, i) => (
                      <Box
                        key={`v-${i}`}
                        position="absolute"
                        left={`${(i / gridSize) * 100}%`}
                        top={0}
                        w="1px"
                        h="100%"
                        bg="gray.100"
                      />
                    ))}
                    {Array.from({ length: gridSize + 1 }).map((_, i) => (
                      <Box
                        key={`h-${i}`}
                        position="absolute"
                        top={`${(i / gridSize) * 100}%`}
                        left={0}
                        w="100%"
                        h="1px"
                        bg="gray.100"
                      />
                    ))}

                    {/* Furniture items */}
                    {items.map((item) => {
                      const cellSize = (parseInt(gridDisplay) || 400) / gridSize;
                      return (
                        <Box
                          key={item.id}
                          position="absolute"
                          left={`${(item.x / gridSize) * 100}%`}
                          top={`${(item.y / gridSize) * 100}%`}
                          w={`${(1 / gridSize) * 100}%`}
                          h={`${(1 / gridSize) * 100}%`}
                          p="2px"
                          cursor="pointer"
                          onClick={() => setSelectedItem(item.id)}
                        >
                          <Box
                            w="100%"
                            h="100%"
                            bg={getItemColor(item.type)}
                            borderRadius="md"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="18px"
                            border={selectedItem === item.id ? '3px solid #2563eb' : 'none'}
                          >
                            {getItemLabel(item.type)}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>

                {/* Controls */}
                {selectedItem !== null && (
                  <Box p={4} bg="blue.50" borderRadius="md">
                    <Text fontSize="sm" fontWeight="bold" mb={3}>
                      Move Selected Item
                    </Text>
                    <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                      {/* Arrow buttons for movement */}
                      <Box />
                      <Button
                        size="sm"
                        onClick={() => moveItem(selectedItem, 0, -1)}
                      >
                        ↑
                      </Button>
                      <Box />
                      <Button
                        size="sm"
                        onClick={() => moveItem(selectedItem, -1, 0)}
                      >
                        ←
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => deleteItem(selectedItem)}
                      >
                        <DeleteIcon />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => moveItem(selectedItem, 1, 0)}
                      >
                        →
                      </Button>
                      <Box />
                      <Button
                        size="sm"
                        onClick={() => moveItem(selectedItem, 0, 1)}
                      >
                        ↓
                      </Button>
                      <Box />
                    </Grid>
                  </Box>
                )}
              </VStack>
            </Card>

            {/* Sidebar - Furniture Options */}
            <VStack align="stretch" spacing={4}>
              <Card p={4}>
                <Heading size="sm" mb={4}>
                  Add Furniture
                </Heading>
                <VStack spacing={2}>
                  {furnitureTypes.map((type) => (
                    <Button
                      key={type.id}
                      w="full"
                      justify="start"
                      variant="outline"
                      onClick={() => addItem(type.id)}
                    >
                      <AddIcon mr={2} />
                      {type.label}
                    </Button>
                  ))}
                </VStack>
              </Card>

              <Card p={4}>
                <Heading size="sm" mb={3}>
                  Items Added
                </Heading>
                <Text fontSize="sm" mb={3} fontWeight="bold">
                  {items.length} items
                </Text>
                <VStack align="stretch" maxH="300px" overflowY="auto" spacing={2}>
                  {items.map((item) => (
                    <Box
                      key={item.id}
                      p={2}
                      bg={selectedItem === item.id ? 'blue.100' : 'gray.50'}
                      borderRadius="md"
                      cursor="pointer"
                      onClick={() => setSelectedItem(item.id)}
                      fontSize="xs"
                    >
                      {getItemLabel(item.type)} at ({item.x}, {item.y})
                    </Box>
                  ))}
                </VStack>

                {items.length > 0 && (
                  <Button
                    w="full"
                    mt={4}
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    onClick={clearLayout}
                  >
                    Clear Layout
                  </Button>
                )}
              </Card>
            </VStack>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default PlanLayout;
