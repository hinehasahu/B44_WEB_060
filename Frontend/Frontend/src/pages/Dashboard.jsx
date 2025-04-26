import React from "react";
import { Box, Button, Heading, Text, Flex, Grid, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Box p={6} minH="100vh" bg="gray.50">
      {/* Hero Section */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        mb={12}
        bg="blue.800"
        color="white"
        borderRadius="md"
        p={10}
      >
        <Heading as="h1" size="3xl" mb={4}>
          Crime Management System
        </Heading>
        <Text fontSize="xl" mb={6}>
          Efficiently manage crime reports, track investigations, and ensure public safety.
        </Text>
        <Stack direction={{ base: "column", md: "row" }} spacing={4} justify="center">
          <Link to="/report">
            <Button colorScheme="teal" size="lg">
              Report a Crime
            </Button>
          </Link>
          <Link to="/allCases">
            <Button colorScheme="blue" size="lg">
              View All Cases
            </Button>
          </Link>
        </Stack>
      </Flex>

      {/* Overview Section */}
      <Heading as="h2" size="2xl" textAlign="center" mb={8}>
        How It Works
      </Heading>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
        <OverviewCard
          title="Report a Crime"
          description="Easily report crimes to start an investigation and track the case."
          link="/report"
        />
        <OverviewCard
          title="View All Cases"
          description="Browse and manage all crime cases efficiently."
          link="/allCases"
        />
      </Grid>

      {/* Statistics Section */}
      <Box textAlign="center" mt={12}>
        <Heading as="h3" size="xl" mb={6}>
          Statistics & Overview
        </Heading>
        <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={6}>
          <StatCard title="Total Cases" value="13" />
          <StatCard title="Resolved Cases" value="10" />
          <StatCard title="Pending Cases" value="11" />
          <StatCard title="Witness Statements" value="25" />
          <StatCard title="Active Investigations" value="5" />
          <StatCard title="Reports Today" value="3" />
        </Grid>
      </Box>
    </Box>
  );
};

const OverviewCard = ({ title, description, link }) => (
  <Box
    bg="white"
    p={6}
    borderRadius="md"
    boxShadow="lg"
    _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
    transition="transform 0.3s ease-in-out"
  >
    <Flex direction="column" align="center" justify="center" textAlign="center">
      <Heading as="h4" size="md" mb={2}>{title}</Heading>
      <Text mb={4}>{description}</Text>
      <Link to={link}>
        <Button colorScheme="blue" variant="outline">
          Learn More
        </Button>
      </Link>
    </Flex>
  </Box>
);

const StatCard = ({ title, value }) => (
  <Box bg="white" p={6} borderRadius="md" boxShadow="sm" textAlign="center">
    <Heading as="h4" size="md" mb={2}>
      {title}
    </Heading>
    <Text fontSize="2xl" fontWeight="bold" color="blue.500">
      {value}
    </Text>
  </Box>
);

export default HomePage;
