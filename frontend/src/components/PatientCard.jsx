// components/PatientCard.js
import React from "react";
import {
   Box,
   Text,
   Button,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   useDisclosure,
   Image,
   WrapItem,
   Avatar,
} from "@chakra-ui/react";
// import {  Typography} from '@mui/material';

const PatientCard = ({ patient, onViewDetails, onEdit, onDelete }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [scrollBehavior, setScrollBehavior] = React.useState("inside");

   const btnRef = React.useRef(null);

   return (
      <>
         <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
            <Text fontSize="lg" fontWeight="bold">
               {patient.name}
            </Text>
            <Text>{patient.age} years old</Text>
            <Button
               onClick={() => {
                  onViewDetails(patient._id);
                  onOpen();
               }}
               colorScheme="blue"
               size="sm"
               mt={2}
               mr={2}
            >
               View Details
            </Button>
            <Button
               onClick={() => onEdit(patient._id)}
               colorScheme="teal"
               size="sm"
               mt={2}
               mr={2}
            >
               Edit
            </Button>
            <Button
               onClick={() => onDelete(patient._id)}
               colorScheme="red"
               size="sm"
               mt={2}
            >
               Delete
            </Button>
         </Box>
         <Modal
            onClose={onClose}
            finalFocusRef={btnRef}
            isOpen={isOpen}
            scrollBehavior={scrollBehavior}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modal Title</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Box
                     display="flex"
                     justifyContent="center"
                     alignItems="center"
                     marginBottom={2}
                  >
                    
                     <WrapItem>
                        <Avatar
                           size="2xl"
                           name="Segun Adebayo"
                           src="https://tse2.mm.bing.net/th?id=OIP.rmim2jYzNpSCslo60INohQHaF9&pid=Api&P=0&h=180"
                        />{" "}
                     </WrapItem>
                  </Box>
                  <Text variant="h1" fontSize={"x-large"} fontWeight={"15px"}>
                     Full Name: {patient.name}
                  </Text>
                  <Text fontSize={"larger"} fontWeight={"15px"}>
                     Age: {patient.age} Years old
                  </Text>
                  <Text variant="body2">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Cupiditate, doloribus magnam saepe laudantium eligendi
                     molestiae quaerat tempora alias provident praesentium
                     tempore nihil odit voluptatibus ipsa.
                  </Text>
               </ModalBody>
               <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default PatientCard;
