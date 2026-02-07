import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../.vscode/context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { login, isAuthenticated } = useUser();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        login(email, password);
        toast({
          title: 'Welcome back!',
          description: 'You have been logged in successfully',
          status: 'success',
          duration: 3,
          isClosable: true,
        });
        navigate('/dashboard');
        setIsLoading(false);
      } else {
        toast({
          title: 'Error',
          description: 'Please fill in all fields',
          status: 'error',
          duration: 3,
          isClosable: true,
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <Container maxW="400px" py={20}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" mb={2}>
            🏠 HEIL
          </Heading>
          <Text color="gray.600" fontSize="sm">
            Welcome back to our furniture store
          </Text>
        </Box>

        <Box as="form" onSubmit={handleLogin}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel fontSize="sm">Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                borderRadius="md"
                size="md"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm">Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                borderRadius="md"
                size="md"
              />
            </FormControl>

            <Link fontSize="sm" color="blue.500" alignSelf="flex-end">
              Forgot password?
            </Link>

            <Button
              type="submit"
              width="full"
              bg="gray.900"
              color="white"
              _hover={{ bg: 'gray.800' }}
              isLoading={isLoading}
            >
              LOGIN
            </Button>
          </VStack>
        </Box>

        <Box textAlign="center">
          <Text fontSize="sm">
            Don't have an account?{' '}
            <Link color="blue.500" fontWeight="bold">
              Sign up
            </Link>
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Login;
