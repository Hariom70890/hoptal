// components/Dashboard.js
import React, { useState, useEffect } from "react";
import {
   Flex,
   Heading,
   Button,
   SimpleGrid,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   useDisclosure,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   FormControl,
   FormLabel,
   Input,
} from "@chakra-ui/react";
import {  HashLoader } from "react-spinners";
import PatientCard from "./PatientCard";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Dashboard = () => {
   var authToken = localStorage.getItem("authToken");
   const user = localStorage.getItem("roles");
   // -------------------------------------- -------------------------//
   // const swal = require('sweetalert2')
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [overlay, setOverlay] = useState("");
   const [patients, setPatients] = useState([]);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [newPatient, setNewPatient] = useState({
      name: "",
      age: 0,
   });
   const [loading, setLoading] = useState(true);

   const initialRef = React.useRef(null);
   const finalRef = React.useRef(null);

   //    ----------------------------------
   // ---------------------------- EDIT ------------------------- //
   const [editedPatient, setEditedPatient] = useState({
      id: "",
      firstName: "",
      lastName: "",
      age: 0,
   });

   const handleEdit = (patientId) => {
      // Find the patient to edit based on the ID
      const patientToEdit = patients.find(
         (patient) => patient._id === patientId
      );

      if (patientToEdit) {
         const [firstName, lastName] = patientToEdit.name.split(" ");
         const age = patientToEdit.age;
         setEditedPatient({
            id: patientId,
            firstName,
            lastName,
            age,
         });
         if (user === "ADMIN") {
            setIsEditModalOpen(true);
         } else {
            Swal.fire({
               title: 'You are a User and only has the assess to see it',
               html: ('<div>')
                 .addClass('some-class')
                 .text('You are a User and only has the assess to see it'),
               animation: false,
               customClass: 'animated tada'
             })
            // alert("You are a User and only has the assess to see it");
            console.error("Failed to delete patient");
         }
         // Open the edit modal or perform any other actions as needed
      } else {
         console.log("Patient not found");
      }
   };

   const handleInputChangee = (e) => {
      const { name, value } = e.target;
      setEditedPatient((prevPatient) => ({
         ...prevPatient,
         [name]: value,
      }));
   };

   const handleSave = async () => {
      console.log(editedPatient.id);
      try {
         const response = await fetch(
            `http://localhost:4500/patient/${editedPatient.id}`,
            {
               method: "PUT",
               headers: {
                  Authorization: ` ${authToken}`,
                  "Content-Type": "application/json",
                  // Add any other headers or authentication tokens if required
               },
               body: JSON.stringify({
                  name: `${editedPatient.firstName} ${editedPatient.lastName}`,
                  age: `${editedPatient.age}`,
                  // Add any other fields you need to update
               }),
            }
         );
         //  console.log(editedPatient);
         if (response.ok) {
            console.log("Patient updated successfully");
            // Close the modal or perform other actions after successful update
            setIsEditModalOpen(false);
            fetchPatientsFromAPI();
         } else {
            console.error("Failed to update patient");
            // Handle the error or display a meaningful message to the user
         }
      } catch (error) {
         console.error("Error during patient update:", error.message);
         // Handle network errors or other unexpected issues
      }
   };

   //--------------------------------------------------------------------------------

   const fetchPatientsFromAPI = async () => {
      // const authToken = localStorage.getItem(authToken)
      try {
         const response = await fetch("http://localhost:4500/patient", {
            headers: {
               Authorization: `${authToken}`,
            },
         });

         if (!response.ok) {
            throw new Error("Failed to fetch patients");
         }

         const data = await response.json();
         setPatients(data.patient);
      } catch (error) {
         console.error("Error fetching patients:", error.message);
      } finally {
         setLoading(false);
      }
   };
   useEffect(() => {
      fetchPatientsFromAPI();
   }, []);

   const handleViewDetails = (patientId) => {

      console.log("View details for patient:", patientId);
   };

   // <<<<<<<<<<<< ------------------ Deleting Patient --------------->>>>>>>>>>>> //
   const handleDelete = async (patientId) => {
      try {
         if (user === "ADMIN") {
            const response = await fetch(
               `http://localhost:4500/patient/${patientId}`,
               {
                  method: "DELETE",
                  headers: {
                     Authorization: `${authToken}`,
                  },
               }
            );

            if (response.ok) {
               console.log("Patient deleted successfully:", patientId);

               // If you want to update the state to reflect the deletion in the UI,
               // you can call a function passed through props or update the state accordingly.
               fetchPatientsFromAPI();
            } else {
               console.error("Failed to delete patient:", response.statusText);
            }
         } else {
            Swal.fire(
               'Oops...',
               'You are a user and you are not allowed to delete it.  Something went wrong!',
               'error'
             )
            // alert("You are a user and you are not allowed to delete it");
            console.log("User does not have permission to delete.");
         }
      } catch (error) {
         console.error("Error during patient deletion:", error.message);
      }
   };

   // <<<<<<<---------------- Adding a new patient ----------->>>>>>>>>> //

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewPatient((prevPatient) => ({
         ...prevPatient,
         [name]: value,
      }));
      // console.log(newPatient)
   };
   const handleAddPatient = async () => {
      try {
         // Make a request to your backend to create a new patient.
         //  const authToken = "your_auth_token"; // Replace with your actual authentication token
         console.log(newPatient);
         const response = await fetch("http://localhost:4500/patient", {
            method: "POST",
            headers: {
               Authorization: `${authToken}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(newPatient),
         });
         // console.log(response);
         if (response.ok) {
            const newPatient = response.json();
            console.log("New patient added successfully:", newPatient);
            Swal.fire(
               'Good job!',
               'New patient added successfully!',
               'success'
             )
            // alert("New patient added successfully");
            fetchPatientsFromAPI();
            onClose();
            // If you want to update the state to reflect the addition in the UI,
            // you can call a function passed through props or update the state accordingly.
         } else {
            console.error("Failed to add new patient:", response.statusText);
         }
      } catch (error) {
         console.error("Error during patient creation:", error.message);
      }
   };

   // <<<<<<----------------------- overlay modal --------------------------->>>>. //
   const OverlayTwo = () => (
      <ModalOverlay
         bg="none"
         backdropFilter="auto"
         backdropInvert="80%"
         backdropBlur="2px"
      />
   );
   //<<<<<<<<<<------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>> //
   return (
      <Flex direction="column" align="center" p={4}>
         <Heading mb={4}>Patient Dashboard</Heading>
         {user === "ADMIN" && (
            <Button
               onClick={() => {
                  setOverlay(<OverlayTwo />);
                  onOpen();
               }}
               colorScheme="green"
               size="sm"
               mb={4}
            >
               Add New Patient
            </Button>
         )}

         {/* ----------------- New Patient Adding modal ------------------ */}
         <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
         >
            {overlay}
            <ModalContent>
               <ModalHeader>Add a New Patient</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                  <FormControl>
                     <FormLabel>Full name</FormLabel>
                     <Input
                        ref={initialRef}
                        name="name"
                        placeholder="Full name"
                        onChange={handleInputChange}
                     />
                  </FormControl>

                  <FormControl mt={4}>
                     <FormLabel>Age</FormLabel>
                     <Input
                        name="age"
                        placeholder="Your Age"
                        onChange={handleInputChange}
                     />
                  </FormControl>
               </ModalBody>

               <ModalFooter>
                  <Button
                     colorScheme="blue"
                     mr={3}
                     onClick={() => {
                        handleAddPatient();
                     }}
                  >
                     Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>

         {/* ----------------- edit modal --------------  */}
         <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Edit Patient</ModalHeader>
               <ModalBody pb={6}>
                  <FormControl>
                     <FormLabel>First name</FormLabel>
                     <Input
                        ref={initialRef}
                        placeholder="First name"
                        name="firstName"
                        value={editedPatient.firstName}
                        onChange={handleInputChangee}
                     />
                  </FormControl>

                  <FormControl mt={4}>
                     <FormLabel>Last name</FormLabel>
                     <Input
                        placeholder="Last name"
                        name="lastName"
                        value={editedPatient.lastName}
                        onChange={handleInputChangee}
                     />
                  </FormControl>
                  <FormControl mt={4}>
                     <FormLabel>Age</FormLabel>
                     <Input
                        placeholder="Age"
                        name="age"
                        value={editedPatient.age}
                        onChange={handleInputChangee}
                     />
                  </FormControl>
               </ModalBody>

               <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleSave}>
                     Save
                  </Button>
                  <Button onClick={() => setIsEditModalOpen(false)}>
                     Cancel
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
         {/* ---------------------------------------------------- */}
         {loading ? (
            <>
               <HashLoader color="#36d7b7" />
               <h1>Loading patients...</h1>
            </>
         ) : (
            <SimpleGrid columns={[1, 2, 3]} spacing={10}>
               {patients.map((patient) => (
                  <PatientCard
                     key={patient.id}
                     patient={patient}
                     onViewDetails={handleViewDetails}
                     onEdit={(e) => handleEdit(e)}
                     onDelete={handleDelete}
                  />
               ))}
            </SimpleGrid>
         )}
      </Flex>
   );
};

export default Dashboard;
