import {
   Button,
   Flex,
   Input,
   Stack,
   Image,
   Text,
   Checkbox,
   Link,
} from "@chakra-ui/react";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useDispatch } from "react-redux";
import { login } from "../Redux/AuthReducer/action";
import { useToast } from "@chakra-ui/react";
const Login = () => {
   const toast = useToast();
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      username: "",
      password: "",
   });

   const dispatch = useDispatch();
   const { toggle } = useContext(AuthContext);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Disable the submit button during the login process
      setIsSubmitting(true);

      dispatch(login({ formData: formData, callback: handleCallback }));
   };

   const handleCallback = (data) => {
      // console.log(data);
      // Enable the submit button after the login process completes
      setIsSubmitting(false);

      if (data.token) {
         toast({
            position: "top",
            title: `${data?.msg}`,
            status: "success",
            duration: 3000,
            isClosable: true,
         });
         return navigate("/");
      } else {
         toast({
            position: "top",
            title: `${data?.msg}`,
            status: "error",
            duration: 3000,
            isClosable: true,
         });
      }
   };

   return (
      <Flex align="center" justify="center" minH="100vh" bg="gray.100">
         <Stack spacing={8} mx="auto" maxW="md" py={12} px={6}>
            <Image
               src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
               alt="Sample image"
               mb={8}
            />

            <Stack spacing={4}>
               <Text fontSize="xl" textAlign="center">
                  Sign in with
               </Text>
               <Flex justify="center" spacing={4}>
                  <Button
                     h="12"
                     w="12"
                     rounded="full"
                     bg="blue.600"
                     _hover={{ bg: "blue.700" }}
                     shadow="sm"
                  >
                     <BiLogoFacebook size={20} />
                  </Button>
                  <Button
                     h="12"
                     w="12"
                     rounded="full"
                     bg="blue.600"
                     _hover={{ bg: "blue.700" }}
                     shadow="sm"
                  >
                     <AiOutlineTwitter size={20} />
                  </Button>
               </Flex>
            </Stack>

            <Flex align="center" my={6}>
               <Text mx={4} color="gray.600" fontWeight="semibold">
                  Or
               </Text>
               <Flex
                  align="center"
                  width="full"
                  borderTopWidth="1px"
                  borderColor="gray.300"
               />
            </Flex>

            <Input
               type="text"
               id="username"
               name="username"
               value={formData.username}
               onChange={handleChange}
               placeholder="Username"
            />
            <Input
               type="password"
               id="password"
               name="password"
               value={formData.password}
               onChange={handleChange}
               placeholder="Password"
            />

            <Flex justify="space-between" align="center">
               <Checkbox colorScheme="blue">Remember Me</Checkbox>
               <Link
                  color="blue.600"
                  fontSize="sm"
                  _hover={{ color: "blue.700", textDecoration: "underline" }}
               >
                  Forgot Password?
               </Link>
            </Flex>

            <Button
               bg="blue.600"
               color="white"
               _hover={{ bg: "blue.700" }}
               onClick={handleSubmit}
            >
               Login
            </Button>

            <Flex justify="center">
               <Text fontSize="sm" color="gray.600">
                  Don't have an account?{" "}
                  <Link
                     color="red.600"
                     _hover={{ textDecoration: "underline" }}
                     href="/signup"
                  >
                     Register
                  </Link>
               </Text>
            </Flex>
         </Stack>
      </Flex>
   );
};

export default Login;
