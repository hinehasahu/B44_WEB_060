import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Text, Heading, VStack, HStack, Badge, Card, CardHeader, CardBody, Divider,
  Container, Tag, TagLabel, Avatar, Flex, SimpleGrid, useColorModeValue,
  Icon, Button
} from '@chakra-ui/react';
import { CalendarIcon, TimeIcon, InfoIcon, WarningIcon, CheckCircleIcon, ChatIcon } from '@chakra-ui/icons';

function CaseDetails() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const tagColorScheme = useColorModeValue('blue', 'cyan');

  const mockData = {
    incidentType: "Robbery",
    date: "2023-01-15",
    time: "14:30",
    location: "SampleLoc",
    reportedBy: "Sample1",
    status: "Open",
    verdict: "Pending",
    caseComplexity: "High",
    description: "A robbery occurred at a local store...",
    witnesses: ["Sample1", "Sample2"],
    evidenceFiles: ["Photo1.jpg", "Video1.mp4"],
    lawyerComments: [
      { lawyerId: { name: "Lawyer 1" }, comment: "Initial comment" },
      { lawyerId: { name: "Lawyer 2" }, comment: "Second comment" }
    ]
  };

  useEffect(() => {
    fetch("https://b44-web-060-5yqc.onrender.com/crimeReport/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch case details.");
        }
        return res.json();
      })
      .then((data) => {
        const foundCase = data.find((item) => item._id === id);
        if (!foundCase) {
          throw new Error("Case not found.");
        }
        setCaseData(foundCase);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load case data.");
        setCaseData(mockData); // Optional fallback
        setLoading(false);
      });
  }, [id]);

  const getStatusProps = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return { colorScheme: 'yellow', icon: WarningIcon };
      case 'under investigation': return { colorScheme: 'blue', icon: InfoIcon };
      case 'closed': return { colorScheme: 'green', icon: CheckCircleIcon };
      default: return { colorScheme: 'gray', icon: InfoIcon };
    }
  };

  if (loading) return <Text textAlign="center" mt={10}>Loading...</Text>;
  if (error) return <Text textAlign="center" color="red.500" mt={10}>Error: {error}</Text>;

  const handleLawyerComment = () => {
    console.log("Clicked");
  };

  const statusProps = getStatusProps(caseData.status);

  return (
    <Container maxW="container.lg" py={8}>
      <Card borderRadius="xl" boxShadow="lg" bg={bgColor} borderColor={borderColor} borderWidth="1px" overflow="hidden">
        <CardHeader bg={useColorModeValue('blue.50', 'blue.900')} py={4}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="h2" size="lg">{caseData.incidentType}</Heading>
            <Badge colorScheme={statusProps.colorScheme} fontSize="md" px={3} py={1} borderRadius="full">
              <Icon as={statusProps.icon} mr={1} />
              {caseData.status}
            </Badge>
          </Flex>
        </CardHeader>

        <CardBody py={6}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Card variant="outline" p={4} bg={cardBg}>
              <CardHeader pb={2}>
                <Heading size="md">Case Information</Heading>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={3}>
                  <HStack>
                    <Icon as={CalendarIcon} color="blue.500" />
                    <Text fontWeight="medium">Date:</Text>
                    <Text>{new Date(caseData.date).toLocaleDateString()}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={TimeIcon} color="blue.500" />
                    <Text fontWeight="medium">Time:</Text>
                    <Text>{caseData.time}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={InfoIcon} color="blue.500" />
                    <Text fontWeight="medium">Location:</Text>
                    <Text>{caseData.location}</Text>
                  </HStack>
                  <HStack>
                    <Avatar size="xs" name={caseData.reportedBy} bg="blue.500" />
                    <Text fontWeight="medium">Reported By:</Text>
                    <Text>{caseData.reportedBy}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="medium">Verdict:</Text>
                    <Badge colorScheme={caseData.verdict === "Pending" ? "yellow" : "green"}>
                      {caseData.verdict}
                    </Badge>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>

            <Card variant="outline" p={4} bg={cardBg}>
              <CardHeader pb={2}>
                <Heading size="md">Case Details</Heading>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={3}>
                  <HStack>
                    <Text fontWeight="medium">Complexity:</Text>
                    <Badge colorScheme={caseData.caseComplexity === "High" ? "red" : "green"}>
                      {caseData.caseComplexity}
                    </Badge>
                  </HStack>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Description:</Text>
                    <Text fontSize="sm" p={2} bg={useColorModeValue('gray.100', 'gray.600')} borderRadius="md">
                      {caseData.description}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Witnesses:</Text>
                    <Flex gap={2} flexWrap="wrap">
                      {caseData.witnesses.map((witness, index) => (
                        <Tag key={index} size="md" colorScheme={tagColorScheme} borderRadius="full">
                          <TagLabel>{witness}</TagLabel>
                        </Tag>
                      ))}
                    </Flex>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>Evidence Files:</Text>
                    <Flex gap={2} flexWrap="wrap">
                      {caseData.evidenceFiles.map((file, index) => (
                        <Tag key={index} size="md" variant="subtle" colorScheme="purple" borderRadius="full">
                          <TagLabel>{file}</TagLabel>
                        </Tag>
                      ))}
                    </Flex>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          <Divider my={6} />

          <Card variant="outline" p={4} bg={cardBg}>
            <CardHeader pb={2}>
              <Flex justify="space-between" align="center">
                <Heading size="md">
                  <HStack>
                    <Icon as={ChatIcon} color="blue.500" />
                    <Text>Lawyer's Comments</Text>
                  </HStack>
                </Heading>
                <Button onClick={handleLawyerComment} size="sm" colorScheme="blue" variant="outline">
                  Add Comment
                </Button>
              </Flex>
            </CardHeader>
            <CardBody>
              {caseData.lawyerComments?.length > 0 ? (
                <VStack spacing={4} align="stretch">
                  {caseData.lawyerComments.map((comment, index) => (
                    <Box key={index} p={3} borderRadius="md" bg={useColorModeValue('white', 'gray.800')} borderWidth="1px" borderColor={borderColor}>
                      <Flex gap={3}>
                        <Avatar name={comment.lawyerId.name} size="sm" bg="blue.500" />
                        <Box>
                          <Text fontWeight="bold">{comment.lawyerId.name}</Text>
                          <Text fontSize="sm">{comment.comment}</Text>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <Text textAlign="center" color="gray.500" py={4}>No comments yet</Text>
              )}
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    </Container>
  );
}

export default CaseDetails;
