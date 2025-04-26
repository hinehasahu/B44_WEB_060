import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { Box, Text, VStack, Grid, GridItem, Card, CardHeader, CardBody, Heading, Badge, Flex, Button, Input, useBreakpointValue, Spinner } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

function AllCases() {
  const { user } = useAuth();
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchCases = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found in localStorage.');
      return;
    }

    try {
      const res = await fetch('https://b44-web-060-5yqc.onrender.com/crimeReport/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log('API Response:', data);

      if (res.ok) {
        if (Array.isArray(data.reports)) {
          setCases(data.reports);
          setFilteredCases(data.reports.filter((caseItem) => caseItem.reportedBy === user.id));
        } else {
          console.error('Expected an array of cases but received:', data);
          setError('Invalid data format from server');
        }
        setLoading(false);
      } else {
        console.error('Failed to fetch cases:', data);
        setError('Failed to load cases');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching cases:', err);
      setError('Something went wrong while fetching the cases.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.isLoggedIn) {
      fetchCases();
    }
  }, [user.isLoggedIn, user.id]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCases(cases);
    } else {
      setFilteredCases(
        cases.filter((caseItem) =>
          caseItem.incidentType.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, cases]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (caseId) => {
    navigate(`/cases/${caseId}`);
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text color="red.500" fontSize="xl">
          {error}
        </Text>
      </Flex>
    );
  }

  return (
    <Box p={4}>
      <Flex mb={6} justify="space-between" align="center" direction={{ base: 'column', sm: 'row' }}>
        <Heading size="lg" color="teal.600" mb={{ base: 4, sm: 0 }}>
          Active Cases
        </Heading>
        <Input
          placeholder="Search cases..."
          value={searchTerm}
          onChange={handleSearch}
          width={{ base: '100%', sm: '300px' }}
          leftIcon={<SearchIcon />}
          size="md"
          bg="white"
          borderRadius="md"
        />
      </Flex>

      <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr' }} gap={6}>
        {filteredCases.length === 0 ? (
          <Text>No cases found</Text>
        ) : (
          filteredCases.map((caseItem) => (
            <GridItem key={caseItem._id}>
              <Card boxShadow="lg" borderRadius="md" borderWidth="1px" borderColor="gray.200" transition="all 0.2s" _hover={{ boxShadow: 'xl', transform: 'scale(1.02)' }}>
                <CardHeader>
                  <Flex justify="space-between" align="center">
                    <Heading size="md" color="teal.700">
                      {caseItem.incidentType}
                    </Heading>
                    <Badge colorScheme={caseItem.status === 'Open' ? 'blue' : 'green'}>{caseItem.status}</Badge>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <Box>
                      <Text fontWeight="bold" color="gray.600">Location:</Text>
                      <Text color="gray.500">{caseItem.location}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" color="gray.600">Date:</Text>
                      <Text color="gray.500">{new Date(caseItem.date).toLocaleDateString()}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" color="gray.600">Reported By:</Text>
                      <Text color="gray.500">{caseItem.reportedBy}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" color="gray.600">Description:</Text>
                      <Text color="gray.500">{caseItem.description}</Text>
                    </Box>
                  </VStack>
                  <Button mt={4} colorScheme="teal" variant="outline" onClick={() => handleViewDetails(caseItem._id)} width="full">
                    View Details
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default AllCases;
