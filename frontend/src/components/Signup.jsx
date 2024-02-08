import React, { useState } from "react";
import { Button, Flex,Select, Input, Stack, Image, Text, Checkbox, Link } from "@chakra-ui/react";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    role: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    try {
      // Replace with your backend API endpoint
      const signupEndpoint = "https://ehr-dashboard.onrender.com/users/signup";
  
      const response = await fetch(signupEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Signup successful:", data);
        alert("Signup successful!");
        // You can redirect the user to the login page or perform other actions after successful signup
      } else {
        console.error("Signup failed:", data.message);
        alert("Signup failed. Please try again.");
        // Handle error or display a meaningful message to the user
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert("An error occurred. Please try again later.");
      // Handle network errors or other unexpected issues
    }
  };
  

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bg="gray.100"
    >
      <Stack spacing={8} mx="auto" maxW="md" py={12} px={6}>
        <Image src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt="Sample image" mb={8} />

        <Stack spacing={4}>
          <Text fontSize="xl" textAlign="center">Sign up with</Text>
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
          <Text mx={4} color="gray.600" fontWeight="semibold">Or</Text>
          <Flex
            align="center"
            width="full"
            borderTopWidth="1px"
            borderColor="gray.300"
          />
        </Flex>

        <Input
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <Input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <Select
          name="role"
          value={userInfo.role}
          onChange={handleInputChange}
          placeholder="Select Role"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </Select>

        <Flex justify="space-between" align="center">
          <Checkbox colorScheme="blue">I agree to the terms</Checkbox>
        </Flex>

        <Button
          bg="blue.600"
          color="white"
          _hover={{ bg: "blue.700" }}
          onClick={handleSignup}
        >
          Signup
        </Button>

        <Flex justify="center">
          <Text fontSize="sm" color="gray.600">Already have an account? <Link href="/login" color="red.600" _hover={{ textDecoration: "underline" }}>Login</Link></Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Signup;
