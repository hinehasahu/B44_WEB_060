import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  VStack,
  Container,
  useColorModeValue,
  Select
} from '@chakra-ui/react';

function ReportCrime() {
  const [formData, setFormData] = useState({
    reportedBy: '',
    incidentType: '',
    date: '',
    time: '',
    location: '',
    description: '',
    caseComplexity: 'Medium',
    evidenceFiles: [],
    witnesses: [],
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.userId) {
          setFormData((prev) => ({ ...prev, reportedBy: decoded.userId }));
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((file) => file.name); // only names for now
    setFormData((prev) => ({
      ...prev,
      evidenceFiles: files,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.reportedBy ||
      !formData.incidentType ||
      !formData.date ||
      !formData.time ||
      !formData.location ||
      !formData.description
    ) {
      setError('All required fields must be filled.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://b44-web-060-5yqc.onrender.com/crimeReport/registerCrime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit crime report");
      }

      alert("Crime report submitted successfully!");
      setFormData({
        reportedBy: formData.reportedBy, // keep the same user
        incidentType: '',
        date: '',
        time: '',
        location: '',
        description: '',
        caseComplexity: 'Medium',
        evidenceFiles: [],
        witnesses: [],
      });

    } catch (err) {
      setError(err.message || "An error occurred while submitting the report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch" bg={bgColor} borderRadius="xl" boxShadow="lg" p={6} borderColor={borderColor} borderWidth="1px">
        <Heading size="lg" textAlign="center">Report a Crime</Heading>

        {error && <Box color="red.500" textAlign="center">{error}</Box>}

        <FormControl isRequired>
          <FormLabel>Reported By (User ID)</FormLabel>
          <Input name="reportedBy" value={formData.reportedBy} isReadOnly />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Incident Type</FormLabel>
          <Input name="incidentType" value={formData.incidentType} onChange={handleChange} placeholder="e.g., Robbery" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Date</FormLabel>
          <Input name="date" type="date" value={formData.date} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Time</FormLabel>
          <Input name="time" type="time" value={formData.time} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Location</FormLabel>
          <Input name="location" value={formData.location} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" value={formData.description} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Case Complexity</FormLabel>
          <Select name="caseComplexity" value={formData.caseComplexity} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Evidence Files</FormLabel>
          <Input name="evidenceFiles" type="file" multiple onChange={handleFileChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Witnesses (IDs)</FormLabel>
          <Input
            name="witnesses"
            value={formData.witnesses.join(',')}
            onChange={(e) =>
              setFormData({
                ...formData,
                witnesses: e.target.value.split(',').map((id) => id.trim()),
              })
            }
            placeholder="Comma-separated ObjectIds"
          />
        </FormControl>

        <Button colorScheme="blue" isLoading={loading} onClick={handleSubmit}>
          Submit Report
        </Button>
      </VStack>
    </Container>
  );
}

export default ReportCrime;
