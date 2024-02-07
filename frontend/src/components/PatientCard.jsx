// components/PatientCard.js
import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";

const PatientCard = ({ patient, onViewDetails, onEdit, onDelete }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <Text fontSize="lg" fontWeight="bold">{patient.name}</Text>
      <Text>{patient.age} years old</Text>
      <Button onClick={() => onViewDetails(patient._id)} colorScheme="blue" size="sm" mt={2} mr={2}>View Details</Button>
      <Button onClick={() => onEdit(patient._id)} colorScheme="teal" size="sm" mt={2} mr={2}>Edit</Button>
      <Button onClick={() => onDelete(patient._id)} colorScheme="red" size="sm" mt={2}>Delete</Button>
    </Box>
  );
};

export default PatientCard;
