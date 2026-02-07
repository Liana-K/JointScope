import React from 'react';
import {
  Box,
  Container,
  Grid,
  VStack,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Card,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    },
    {
      name: 'David Park',
      role: 'Customer Support Lead',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    },
  ];

  return (
    <Box bg="white">
      {/* Hero Section */}
      <Box bg="gray.900" color="white" py={16}>
        <Container maxW="container.lg">
          <VStack align="start" spacing={6}>
            <Heading size="2xl">About HEIL Furniture</Heading>
            <Text fontSize="lg" maxW="600px">
              Bringing quality and style to homes across the nation since 2015. We believe furniture
              should be beautiful, functional, and accessible to everyone.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Mission & Vision */}
      <Container maxW="container.lg" py={16}>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={12} mb={16}>
          <VStack align="start" spacing={4}>
            <Heading size="lg">Our Mission</Heading>
            <Text color="gray.700" lineHeight="1.8">
              At HEIL, our mission is to provide exceptional furniture that transforms houses into
              homes. We focus on quality craftsmanship, sustainable materials, and designs that
              stand the test of time. Every piece in our collection is carefully selected to combine
              elegance with functionality.
            </Text>
          </VStack>

          <VStack align="start" spacing={4}>
            <Heading size="lg">Why Choose Us?</Heading>
            <VStack align="start" spacing={3} fontSize="sm" color="gray.700">
              <Text>✓ Premium quality furniture from top manufacturers</Text>
              <Text>✓ Affordable pricing without compromising quality</Text>
              <Text>✓ Easy online shopping experience</Text>
              <Text>✓ Fast and reliable delivery</Text>
              <Text>✓ Excellent customer support</Text>
              <Text>✓ Sustainable and eco-friendly options</Text>
            </VStack>
          </VStack>
        </Grid>

        {/* Team Section */}
        <VStack spacing={12} align="stretch">
          <Box>
            <Heading size="lg" mb={2}>
              Meet Our Team
            </Heading>
            <Text color="gray.600">
              Passionate professionals dedicated to bringing quality furniture to your home
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {teamMembers.map((member) => (
              <Card key={member.name} overflow="hidden" shadow="md">
                <Image
                  src={member.image}
                  alt={member.name}
                  w="100%"
                  h="250px"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Heading size="sm">{member.name}</Heading>
                  <Text fontSize="xs" color="gray.600" mt={1}>
                    {member.role}
                  </Text>
                </Box>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Stats */}
        <Grid templateColumns={{ base: 1, md: 4 }} gap={6} py={16} mt={8}>
          {[
            { number: '10K+', label: 'Happy Customers' },
            { number: '500+', label: 'Furniture Items' },
            { number: '50+', label: 'Brands' },
            { number: '24/7', label: 'Customer Support' },
          ].map((stat) => (
            <Box key={stat.label} textAlign="center">
              <Heading size="xl" color="blue.600" mb={2}>
                {stat.number}
              </Heading>
              <Text color="gray.600" fontSize="sm">
                {stat.label}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box bg="blue.50" py={12}>
        <Container maxW="container.lg" textAlign="center">
          <Heading size="lg" mb={4}>
            Ready to Transform Your Space?
          </Heading>
          <Text color="gray.600" mb={8}>
            Browse our collection and find the perfect furniture for your home
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
    </Box>
  );
};

export default About;
