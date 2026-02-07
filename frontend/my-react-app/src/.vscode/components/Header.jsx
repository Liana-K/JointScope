import React, { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  IconButton,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useBreakpointValue,
  Container,
  HStack,
  VStack,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Divider,
} from '@chakra-ui/react';
import { SearchIcon, HamburgerIcon, ShoppingCartIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useUser();
  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const cartCount = cartItems.length;

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/shop?search=${search}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Plan Layout', path: '/plan-layout' },
  ];

  const NavContent = () => (
    <VStack align="start" spacing={4} w="full">
      {navLinks.map((link) => (
        <Button
          key={link.path}
          as={RouterLink}
          to={link.path}
          variant="ghost"
          fontSize="sm"
          w="full"
          justifyContent="start"
          onClick={onClose}
        >
          {link.label}
        </Button>
      ))}
      {isAuthenticated && (
        <>
          <Divider my={2} />
          <Button
            as={RouterLink}
            to="/dashboard"
            variant="ghost"
            fontSize="sm"
            w="full"
            justifyContent="start"
            onClick={onClose}
          >
            Dashboard
          </Button>
          <Button
            as={RouterLink}
            to="/wishlist"
            variant="ghost"
            fontSize="sm"
            w="full"
            justifyContent="start"
            onClick={onClose}
          >
            Wishlist
          </Button>
          <Button
            as={RouterLink}
            to="/orders"
            variant="ghost"
            fontSize="sm"
            w="full"
            justifyContent="start"
            onClick={onClose}
          >
            Orders
          </Button>
          <Button
            as={RouterLink}
            to="/profile"
            variant="ghost"
            fontSize="sm"
            w="full"
            justifyContent="start"
            onClick={onClose}
          >
            Profile
          </Button>
          <Button
            onClick={handleLogout}
            variant="ghost"
            fontSize="sm"
            w="full"
            justifyContent="start"
            color="red.600"
          >
            Logout
          </Button>
        </>
      )}
      {!isAuthenticated && (
        <>
          <Divider my={2} />
          <Button
            as={RouterLink}
            to="/login"
            variant="ghost"
            fontSize="sm"
            w="full"
            justifyContent="start"
            onClick={onClose}
          >
            Login
          </Button>
        </>
      )}
    </VStack>
  );

  return (
    <Box bg="white" borderBottom="1px solid #e2e8f0" py={4} position="sticky" top={0} zIndex={100}>
      <Container maxW="100%" px={4}>
        <Flex align="center" justify="space-between" gap={4}>
          {/* Logo */}
          <Box
            as={RouterLink}
            to="/"
            fontSize="24px"
            fontWeight="bold"
            cursor="pointer"
            minW="fit-content"
          >
            🏠 HEIL
          </Box>

          {/* Search Bar */}
          <Flex
            display={{ base: 'none', md: 'flex' }}
            align="center"
            flex={1}
            maxW="400px"
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="full"
            px={4}
            py={2}
          >
            <Input
              placeholder="Search for furniture here"
              border="none"
              _focus={{ outline: 'none' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <IconButton
              icon={<SearchIcon />}
              variant="ghost"
              size="sm"
              onClick={handleSearch}
              ml={2}
            />
          </Flex>

          {/* Right Side - Navigation & Cart */}
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                as={RouterLink}
                to={link.path}
                variant="ghost"
                fontSize="sm"
              >
                {link.label}
              </Button>
            ))}
            <Button
              as={RouterLink}
              to="/cart"
              variant="ghost"
              position="relative"
            >
              <ShoppingCartIcon fontSize="18px" />
              {cartCount > 0 && (
                <Badge
                  colorScheme="blue"
                  borderRadius="full"
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  fontSize="10px"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
            {isAuthenticated ? (
              <Menu>
                <MenuButton as={Box} cursor="pointer">
                  <Avatar size="sm" name={user?.firstName} src={user?.avatar} />
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/dashboard">
                    Dashboard
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/wishlist">
                    Wishlist
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/orders">
                    Order History
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/profile">
                    Profile
                  </MenuItem>
                  <Divider my={2} />
                  <MenuItem onClick={handleLogout} color="red.600">
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                as={RouterLink}
                to="/login"
                variant="solid"
                size="sm"
                bg="blue.600"
                color="white"
                _hover={{ bg: 'blue.700' }}
              >
                Login
              </Button>
            )}
          </HStack>

          {/* Mobile Menu */}
          {isMobile && (
            <HStack spacing={2}>
              <Button
                as={RouterLink}
                to="/cart"
                variant="ghost"
                position="relative"
              >
                <ShoppingCartIcon fontSize="18px" />
                {cartCount > 0 && (
                  <Badge
                    colorScheme="blue"
                    borderRadius="full"
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    fontSize="10px"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
              <IconButton
                icon={<HamburgerIcon />}
                variant="ghost"
                onClick={onOpen}
              />
            </HStack>
          )}
        </Flex>

        {/* Mobile Search */}
        <Flex
          display={{ base: 'flex', md: 'none' }}
          align="center"
          mt={4}
          borderWidth="1px"
          borderColor="gray.300"
          borderRadius="full"
          px={4}
          py={2}
        >
          <Input
            placeholder="Search furniture"
            border="none"
            _focus={{ outline: 'none' }}
            size="sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <IconButton
            icon={<SearchIcon />}
            variant="ghost"
            size="sm"
            onClick={handleSearch}
          />
        </Flex>
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody pt={8}>
            <NavContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
