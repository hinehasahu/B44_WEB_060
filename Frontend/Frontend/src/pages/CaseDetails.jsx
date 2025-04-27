import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Container,
  Tag,
  TagLabel,
  Avatar,
  Flex,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  TimeIcon,
  InfoIcon,
  WarningIcon,
  CheckCircleIcon,
  ChatIcon,
} from "@chakra-ui/icons";
import { useAuth } from "../context/authContext";
import CaseWitnessList from "./CaseWitnessList";

function CaseDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [reporterName, setReporterName] = useState("");
  const [newComment, setNewComment] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal hooks

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const tagColorScheme = useColorModeValue("blue", "cyan");

  useEffect(() => {
    if (user.isLoggedIn) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const id = decoded.id || decoded._id || decoded.userId || decoded.sub;
          setUserId(id);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    }
  }, [user.isLoggedIn]);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(
          `https://b44-web-060-5yqc.onrender.com/crimeReport/case/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log("Raw API response:", data);

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch case details.");
        }

        console.log("data.reports:", data.reports);
        setCaseData(data.reports);

        const reporter = data.reports.reportedBy;
        if (reporter && typeof reporter === "object" && reporter.name) {
          setReporterName(reporter.name);
        } else if (typeof reporter === "string") {
          setReporterName("Reporter ID: " + reporter.slice(-6));
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Unable to load case data.");
        setLoading(false);
      }
    };

    if (user.isLoggedIn) {
      fetchCaseDetails();
    }
  }, [id, user.isLoggedIn]);

  const getStatusProps = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return { colorScheme: "yellow", icon: WarningIcon };
      case "under investigation":
        return { colorScheme: "blue", icon: InfoIcon };
      case "closed":
        return { colorScheme: "green", icon: CheckCircleIcon };
      default:
        return { colorScheme: "gray", icon: InfoIcon };
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://b44-web-060-5yqc.onrender.com/crimeReport/addLawyerComment/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment: newComment, lawyerId: userId }),
        }
      );

      const result = await response.json();
      if (result.success) {
        console.log("Comment added successfully");

        setNewComment("");
        onClose();
        fetchCaseDetails();
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading)
    return (
      <Text textAlign="center" mt={10}>
        Loading...
      </Text>
    );
  if (error)
    return (
      <Text textAlign="center" color="red.500" mt={10}>
        Error: {error}
      </Text>
    );

  const statusProps = getStatusProps(caseData.status);

  return (
    <Container maxW="container.lg" py={8}>
      <Card
        borderRadius="xl"
        boxShadow="lg"
        bg={bgColor}
        borderColor={borderColor}
        borderWidth="1px"
        overflow="hidden"
      >
        <CardHeader bg={useColorModeValue("blue.50", "blue.900")} py={4}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="h2" size="lg">
              {caseData.incidentType}
            </Heading>
            <Badge
              colorScheme={statusProps.colorScheme}
              fontSize="md"
              px={3}
              py={1}
              borderRadius="full"
            >
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
                    <Avatar size="xs" name={reporterName} bg="blue.500" />
                    <Text fontWeight="medium">Reported By:</Text>
                    <Text>
                      {reporterName.includes("Reporter ID")
                        ? "Anonymous User"
                        : reporterName}
                    </Text>
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
                    <Badge
                      colorScheme={
                        caseData.caseComplexity === "High" ? "red" : "green"
                      }
                    >
                      {caseData.caseComplexity}
                    </Badge>
                  </HStack>
                  <Box>
                    <Text fontWeight="medium" mb={1}>
                      Description:
                    </Text>
                    <Text
                      fontSize="sm"
                      p={2}
                      bg={useColorModeValue("gray.100", "gray.600")}
                      borderRadius="md"
                    >
                      {caseData.description}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={1}>
                      Witnesses:
                    </Text>
                    <Flex gap={2} flexWrap="wrap">
                      {caseData.witnesses.map((witness, index) => (
                        <Tag
                          key={index}
                          size="md"
                          colorScheme={tagColorScheme}
                          borderRadius="full"
                        >
                          <TagLabel>{witness}</TagLabel>
                        </Tag>
                      ))}
                    </Flex>
                    {/* case witness */}
                    <CaseWitnessList caseId={caseData._id} />{" "}
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
                <Button
                  onClick={onOpen}
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                >
                  Add Comment
                </Button>
              </Flex>
            </CardHeader>
            <CardBody>
              {caseData.lawyerComments?.length > 0 ? (
                <VStack spacing={4} align="stretch">
                  {caseData.lawyerComments.map((comment, index) => (
                    <Box
                      key={index}
                      p={3}
                      borderRadius="md"
                      bg={useColorModeValue("white", "gray.800")}
                      borderWidth="1px"
                      borderColor={borderColor}
                    >
                      <Flex gap={3}>
                        <Avatar
                          name={comment.lawyerId?.name || "Lawyer"}
                          size="sm"
                          bg="blue.500"
                        />
                        <Box>
                          <Text fontWeight="bold">
                            {comment.lawyerId?.name || "Anonymous Lawyer"}
                          </Text>
                          <Text fontSize="sm">{comment.comment}</Text>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <Text textAlign="center" color="gray.500" py={4}>
                  No comments yet
                </Text>
              )}
            </CardBody>
          </Card>
        </CardBody>
      </Card>

      {/* Modal for adding a comment */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Add your comment here"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              size="sm"
              minHeight="120px"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddComment}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default CaseDetails;
