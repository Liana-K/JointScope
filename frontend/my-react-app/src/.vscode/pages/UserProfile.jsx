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
  Card,
  CardHeader,
  CardBody,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile, logout } = useUser();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(
    user || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    }
  );

  if (!isAuthenticated) {
    return (
      <Box bg="gray.50" minH="100vh" py={20}>
        <Container maxW="400px" textAlign="center">
          <Heading mb={4}>User Profile</Heading>
          <Text color="gray.600" mb={8}>
            Please log in to view your profile
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast({
      title: 'Success',
      description: 'Profile updated successfully',
      status: 'success',
      duration: 3,
      isClosable: true,
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully',
      status: 'success',
      duration: 2,
      isClosable: true,
    });
    navigate('/');
  };

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="900px">
        <VStack align="start" spacing={8}>
          {/* Header */}
          <HStack justify="space-between" w="full">
            <Heading>My Profile</Heading>
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </HStack>

          <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={8} w="full">
            {/* Profile Summary Card */}
            <Card>
              <CardHeader>
                <Heading size="md">Account</Heading>
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
                  <VStack spacing={2} w="full">
                    <Button w="full" variant="outline" onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                    <Button
                      w="full"
                      colorScheme="red"
                      variant="outline"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Profile Form */}
            <Card>
              <CardHeader>
                <Heading size="md">{isEditing ? 'Edit Profile' : 'Profile Information'}</Heading>
              </CardHeader>
              <Divider />
              <CardBody>
                <VStack spacing={4}>
                  <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} w="full">
                    <FormControl>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        isReadOnly={!isEditing}
                        bg={isEditing ? 'white' : 'gray.100'}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        isReadOnly={!isEditing}
                        bg={isEditing ? 'white' : 'gray.100'}
                      />
                    </FormControl>
                  </Grid>

                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      isReadOnly={true}
                      bg="gray.100"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      isReadOnly={!isEditing}
                      bg={isEditing ? 'white' : 'gray.100'}
                      placeholder="Enter your phone number"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      isReadOnly={!isEditing}
                      bg={isEditing ? 'white' : 'gray.100'}
                      placeholder="Enter your address"
                    />
                  </FormControl>

                  <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={4} w="full">
                    <FormControl>
                      <FormLabel>City</FormLabel>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        isReadOnly={!isEditing}
                        bg={isEditing ? 'white' : 'gray.100'}
                        placeholder="City"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>State</FormLabel>
                      <Input
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        isReadOnly={!isEditing}
                        bg={isEditing ? 'white' : 'gray.100'}
                        placeholder="State"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>ZIP Code</FormLabel>
                      <Input
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        isReadOnly={!isEditing}
                        bg={isEditing ? 'white' : 'gray.100'}
                        placeholder="ZIP"
                      />
                    </FormControl>
                  </Grid>

                  {isEditing && (
                    <HStack w="full" spacing={4} pt={4}>
                      <Button flex={1} bg="blue.600" color="white" _hover={{ bg: 'blue.700' }} onClick={handleSave}>
                        Save Changes
                      </Button>
                      <Button flex={1} variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </HStack>
                  )}
                </VStack>
              </CardBody>
            </Card>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default UserProfile;
