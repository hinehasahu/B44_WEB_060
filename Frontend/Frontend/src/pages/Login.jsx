import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, Text, useToast } from "@chakra-ui/react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form.email, form.password);

    if (res.success) {
      navigate("/"); 
    } else {
      setError(res.message || "User not found. Please sign up.");
      toast({
        title: "Error",
        description: res.message || "User not found. Please sign up.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.100"
    >
      <Box
        bg="white"
        p={6}
        rounded="xl"
        boxShadow="md"
        width="full"
        maxWidth="md"
      >
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4} color="blue.600">
          Login
        </Text>

        {error && (
          <Box
            bg="red.100"
            border="1px"
            borderColor="red.400"
            color="red.700"
            p={4}
            rounded="md"
            mb={4}
            fontSize="sm"
          >
            {error}
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              focusBorderColor="blue.300"
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              focusBorderColor="blue.300"
            />
          </FormControl>

          <Button
            type="submit"
            width="full"
            bg="blue.600"
            _hover={{ bg: "blue.700" }}
            color="white"
            fontWeight="semibold"
            py={2}
            px={4}
            rounded="md"
          >
            Login
          </Button>
        </form>

        <Box mt={4} textAlign="center">
          <Text fontSize="sm">
            Don’t have an account?{" "}
            <Link to="/signup">
              <Text as="span" color="blue.600" fontWeight="semibold" _hover={{ textDecoration: "underline" }}>
                Sign up
              </Text>
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
