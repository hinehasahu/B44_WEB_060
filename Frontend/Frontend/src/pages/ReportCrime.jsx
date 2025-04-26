import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  Box, Text, Heading, VStack, HStack, FormControl, FormLabel, Input, Textarea,
  Container, Select, Button, SimpleGrid, useColorModeValue, FormErrorMessage,
  Card, CardHeader, CardBody, IconButton, Flex, useToast
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, AttachmentIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/authContext';

function ReportCrime() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('gray.50', 'gray.700');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user.isLoggedIn && token) {
      try {
        const decoded = jwtDecode(token);
        const id = decoded.userID || decoded._id || decoded.id || decoded.sub;
        const name = decoded.name || decoded.username || "Current User";
        setUserId(id);
        setUserName(name);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      toast({
        title: "Authentication required",
        description: "Please log in to report a crime",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
    }
  }, [user.isLoggedIn, navigate, toast]);

  const [formData, setFormData] = useState({
    incidentType: "",
    date: "",
    time: "",
    location: "",
    userID: "",
    status: "Pending",
    verdict: "Pending",
    caseComplexity: "Medium",
    description: "",
    witnesses: [],
    evidenceFiles: []
  });

  useEffect(() => {
    if (userId) {
      setFormData(prev => ({ ...prev, userID: userId }));
    }
  }, [userId]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.incidentType) newErrors.incidentType = "Incident type is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const [witness, setWitness] = useState("");
  const addWitness = () => {
    if (witness.trim()) {
      setFormData(prev => ({
        ...prev,
        witnesses: [...prev.witnesses, witness.trim()]
      }));
      setWitness("");
    }
  };
  const removeWitness = (index) => {
    setFormData(prev => ({
      ...prev,
      witnesses: prev.witnesses.filter((_, i) => i !== index)
    }));
  };

  const [evidenceFile, setEvidenceFile] = useState("");
  const addEvidenceFile = () => {
    if (evidenceFile.trim()) {
      setFormData(prev => ({
        ...prev,
        evidenceFiles: [...prev.evidenceFiles, evidenceFile.trim()]
      }));
      setEvidenceFile("");
    }
  };
  const removeEvidenceFile = (index) => {
    setFormData(prev => ({
      ...prev,
      evidenceFiles: prev.evidenceFiles.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Form error",
        description: "Please fill all required fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!userId) {
      toast({
        title: "Authentication error",
        description: "Unable to identify current user. Please log in again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://b44-web-060-5yqc.onrender.com/crimeReport/registerCrime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to submit crime report");
      }

      toast({
        title: "Crime report submitted",
        description: "Your crime report has been successfully registered",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate('/dashboard');
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Submission error",
        description: error.message || "Failed to submit report. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <Container maxW="container.lg" py={8}>
      <Card borderRadius="xl" boxShadow="lg" bg={bgColor} borderColor={borderColor} borderWidth="1px" overflow="hidden">
        <CardHeader bg={useColorModeValue('blue.50', 'blue.900')} py={4}>
          <Heading as="h2" size="lg">Report a Crime</Heading>
        </CardHeader>

        <CardBody py={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              {/* First Half of the Form */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Card variant="outline" p={4} bg={cardBg}>
                  <CardHeader pb={2}>
                    <Heading size="md">Incident Information</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <FormControl isRequired isInvalid={!!errors.incidentType}>
                        <FormLabel>Incident Type</FormLabel>
                        <Select
                          name="incidentType"
                          value={formData.incidentType}
                          onChange={handleChange}
                          placeholder="Select incident type"
                        >
                          <option value="Robbery">Robbery</option>
                          <option value="Assault">Assault</option>
                          <option value="Theft">Theft</option>
                          <option value="Fraud">Fraud</option>
                          <option value="Vandalism">Vandalism</option>
                          <option value="Other">Other</option>
                        </Select>
                        <FormErrorMessage>{errors.incidentType}</FormErrorMessage>
                      </FormControl>

                      <FormControl isRequired isInvalid={!!errors.date}>
                        <FormLabel>Date of Incident</FormLabel>
                        <Input type="date" name="date" value={formData.date} onChange={handleChange} max={todayDate} />
                        <FormErrorMessage>{errors.date}</FormErrorMessage>
                      </FormControl>

                      <FormControl isRequired isInvalid={!!errors.time}>
                        <FormLabel>Time of Incident</FormLabel>
                        <Input type="time" name="time" value={formData.time} onChange={handleChange} />
                        <FormErrorMessage>{errors.time}</FormErrorMessage>
                      </FormControl>

                      <FormControl isRequired isInvalid={!!errors.location}>
                        <FormLabel>Location</FormLabel>
                        <Input type="text" name="location" value={formData.location} onChange={handleChange} />
                        <FormErrorMessage>{errors.location}</FormErrorMessage>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Reported By</FormLabel>
                        <Input type="text" value={userName} isReadOnly bg={useColorModeValue('gray.100', 'gray.600')} />
                      </FormControl>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Second Half of the Form */}
                <Card variant="outline" p={4} bg={cardBg}>
                  <CardHeader pb={2}>
                    <Heading size="md">Case Details</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <FormControl>
                        <FormLabel>Case Complexity</FormLabel>
                        <Select name="caseComplexity" value={formData.caseComplexity} onChange={handleChange}>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </Select>
                      </FormControl>

                      <FormControl isRequired isInvalid={!!errors.description}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Describe the incident in detail"
                        />
                        <FormErrorMessage>{errors.description}</FormErrorMessage>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Witnesses</FormLabel>
                        <HStack>
                          <Input value={witness} onChange={(e) => setWitness(e.target.value)} placeholder="Add a witness" />
                          <IconButton icon={<AddIcon />} onClick={addWitness} colorScheme="blue" />
                        </HStack>
                        <VStack mt={2} spacing={2} align="stretch">
                          {formData.witnesses.map((w, i) => (
                            <Flex key={i} align="center" bg={useColorModeValue('gray.100', 'gray.600')} p={2} borderRadius="md">
                              <Text flex="1">{w}</Text>
                              <IconButton icon={<DeleteIcon />} onClick={() => removeWitness(i)} size="sm" variant="ghost" colorScheme="red" />
                            </Flex>
                          ))}
                        </VStack>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Evidence Files</FormLabel>
                        <HStack>
                          <Input value={evidenceFile} onChange={(e) => setEvidenceFile(e.target.value)} placeholder="Add evidence file" />
                          <IconButton icon={<AttachmentIcon />} onClick={addEvidenceFile} colorScheme="purple" />
                        </HStack>
                        <VStack mt={2} spacing={2} align="stretch">
                          {formData.evidenceFiles.map((file, i) => (
                            <Flex key={i} align="center" bg={useColorModeValue('gray.100', 'gray.600')} p={2} borderRadius="md">
                              <Text flex="1">{file}</Text>
                              <IconButton icon={<DeleteIcon />} onClick={() => removeEvidenceFile(i)} size="sm" variant="ghost" colorScheme="red" />
                            </Flex>
                          ))}
                        </VStack>
                      </FormControl>
                    </VStack>
                  </CardBody>
                </Card>
              </SimpleGrid>

              <Flex justify="flex-end" mt={4}>
                <Button type="button" variant="outline" mr={3} onClick={() => navigate('/dashboard')}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue" isLoading={isSubmitting} loadingText="Submitting">
                  Submit Report
                </Button>
              </Flex>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default ReportCrime;
