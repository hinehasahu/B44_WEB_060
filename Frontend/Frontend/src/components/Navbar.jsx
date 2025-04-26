import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Button,
  IconButton,
  useDisclosure,
  Stack,
  Collapse,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box bg="blue.800" color="white" px={4} py={3} boxShadow="md" position="sticky" top={0} zIndex={50}>
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
        <Heading as="h1" size="lg" letterSpacing="wide" fontWeight="bold">
          <Link to="/">Crime Tracker</Link>
        </Heading>

        <IconButton
          aria-label="Toggle Navigation"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: "none" }}
          onClick={onToggle}
          size="lg"
          variant="ghost"
          color="white"
        />

        <Flex
          as="nav"
          display={{ base: "none", md: "flex" }}
          align="center"
          gap={6}
        >
          <Link to="/">
            <Button
              variant="link"
              color="white"
              _hover={{ color: "blue.300" }}
              fontSize="lg"
              _active={{
                transform: "scale(0.98)",
                color: "blue.400",
              }}
              transition="all 0.2s"
            >
              Home
            </Button>
          </Link>
          <Link to="/report">
            <Button
              variant="link"
              color="white"
              _hover={{ color: "blue.300" }}
              fontSize="lg"
              _active={{
                transform: "scale(0.98)",
                color: "blue.400",
              }}
              transition="all 0.2s"
            >
              Crime Report
            </Button>
          </Link>
          <Link to="/allCases">
            <Button
              variant="link"
              color="white"
              _hover={{ color: "blue.300" }}
              fontSize="lg"
              _active={{
                transform: "scale(0.98)",
                color: "blue.400",
              }}
              transition="all 0.2s"
            >
              All Cases
            </Button>
          </Link>
          
          {user?.isLoggedIn ? (
            <>
              <Text color="white" fontSize="sm">
                👋 Hello, {user.role === "Admin" ? "Admin" : "User"}
              </Text>
              <Button
                colorScheme="red"
                onClick={handleLogout}
                variant="outline"
                size="sm"
                fontWeight="bold"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button colorScheme="teal" variant="outline" size="sm">
                Login
              </Button>
            </Link>
          )}
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Stack spacing={4} display={{ md: "none" }}>
            <Link to="/">
              <Button
                padding={'10px'}
                variant="link"
                color="white"
                _hover={{ color: "blue.300" }}
                fontSize="lg"
                _active={{
                  transform: "scale(0.98)",
                  color: "blue.400",
                }}
                transition="all 0.2s"
              >
                Home
              </Button>
            </Link>
            <Link to="/report">
              <Button
              padding={'10px'}
                variant="link"
                color="white"
                _hover={{ color: "blue.300" }}
                fontSize="lg"
                _active={{
                  transform: "scale(0.98)",
                  color: "blue.400",
                }}
                transition="all 0.2s"
              >
                Crime Report
              </Button>
            </Link>
            <Link to="/allCases">
              <Button
                
                variant="link"
                color="white"
                _hover={{ color: "blue.300" }}
                fontSize="lg"
                _active={{
                  transform: "scale(0.98)",
                  color: "blue.400",
                }}
                transition="all 0.2s"
              >
                All Cases
              </Button>
            </Link>

            {user?.isLoggedIn ? (
              <>
                <Text color="white" fontSize="sm">
                  👋 Hello, {user.role === "Admin" ? "Admin" : "User"}
                </Text>
                <Button
                  colorScheme="red"
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  fontWeight="bold"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button colorScheme="teal" variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </Stack>
        </Collapse>
      </Flex>
    </Box>
  );
};

export default Navbar;
