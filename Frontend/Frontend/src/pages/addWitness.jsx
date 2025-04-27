import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  Button,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";

const AddWitnessForm = () => {
  const [formData, setFormData] = useState({
    crimeId: "",
    name: "",
    statement: "",
    contactInfo: "",
    isAnonymous: false,
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const crimeId = formData.crimeId; // Get the Crime ID

      const response = await fetch(
        `https://b44-web-060-5yqc.onrender.com/witness/addWitness/${crimeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Witness Added",
          description: "Witness data has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log("Witness Data Submitted:", data);
      } else {
        toast({
          title: "Error",
          description: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while submitting.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Submission Error:", error);
    }
  };

  return (
    <Box maxW="lg" mx="auto" p={6} bg="white" boxShadow="lg" borderRadius="lg">
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Add Witness
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="crimeId">Crime ID</FormLabel>
            <Input
              type="text"
              id="crimeId"
              name="crimeId"
              value={formData.crimeId}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="name">Witness Name</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="statement">Statement</FormLabel>
            <Textarea
              id="statement"
              name="statement"
              value={formData.statement}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="contactInfo">Contact Info</FormLabel>
            <Input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <Checkbox
              id="isAnonymous"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleChange}
            >
              Remain Anonymous
            </Checkbox>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
            mt={4}
          >
            Add Witness
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddWitnessForm;
