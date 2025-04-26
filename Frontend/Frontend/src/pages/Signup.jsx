import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, Select, Text, RadioGroup, Radio, HStack, useToast } from "@chakra-ui/react";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Citizen",
    contactInfo: "",
    location: "",
    contactNo: "",
    isAnonymous: false,
  });

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(
      form.email,
      form.password,
      form.name,
      form.role,
      form.contactInfo,
      form.location,
      form.contactNo,
      form.isAnonymous
    );
  
    const message = res.message?.toLowerCase() || "";
  
    if (message.includes("sucessfully")) {
      // typo-aware check
      toast({
        title: "Signup Successful!",
        description: "You can now sign in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => navigate("/login"), 1500);
    } else if (message.includes("already")) {
      toast({
        title: "Already Registered",
        description: "You can sign in now.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      setTimeout(() => navigate("/login"), 2000);
    } else {
      toast({
        title: "Signup Failed",
        description: res.message || "Something went wrong.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  
  

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bg="gray.100">
      <Box bg="white" p={6} rounded="xl" boxShadow="md" width="full" maxWidth="md">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4} color="green.600">
          Sign Up
        </Text>

        {error && (
          <Box bg="red.100" border="1px" borderColor="red.400" color="red.700" p={4} rounded="md" mb={4} fontSize="sm">
            {error}
          </Box>
        )}

        {successMsg && (
          <Box bg="green.100" border="1px" borderColor="green.400" color="green.700" p={4} rounded="md" mb={4} fontSize="sm">
            {successMsg}
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
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
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="role">Role</FormLabel>
            <Select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="Citizen">Citizen</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Admin">Admin</option>
            </Select>
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="contactInfo">Contact Info</FormLabel>
            <Input
              id="contactInfo"
              name="contactInfo"
              type="text"
              placeholder="Contact info"
              value={form.contactInfo}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="location">Location</FormLabel>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="contactNo">Contact No</FormLabel>
            <Input
              id="contactNo"
              name="contactNo"
              type="text"
              placeholder="Contact No"
              value={form.contactNo}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Anonymous?</FormLabel>
            <RadioGroup
              name="isAnonymous"
              value={form.isAnonymous ? "yes" : "no"}
              onChange={(value) => setForm({ ...form, isAnonymous: value === "yes" })}
            >
              <HStack spacing={4}>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            width="full"
            bg="green.600"
            _hover={{ bg: "green.700" }}
            color="white"
            fontWeight="semibold"
            py={2}
            px={4}
            rounded="md"
          >
            Sign Up
          </Button>
        </form>

        <Box mt={4} textAlign="center">
          <Text fontSize="sm">
            Already have an account?{" "}
            <Link to="/login">
              <Text as="span" color="green.600" fontWeight="semibold" _hover={{ textDecoration: "underline" }}>
                Login
              </Text>
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
