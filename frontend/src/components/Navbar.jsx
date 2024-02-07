import React from "react";
import {
   Box,
   Flex,
   Spacer,
   IconButton,
   Input,
   InputGroup,
   InputLeftElement,
   Badge,
   Text,
   Avatar,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
} from "@chakra-ui/react";
import {
   HamburgerIcon,
   SearchIcon,
   BellIcon,
   EmailIcon,
   ChevronDownIcon,
} from "@chakra-ui/icons";

const ChakraUIAppBar = () => {
   return (
      <Box bg="teal.500" p={4}>
         <Flex>
            <IconButton
               aria-label="Open Menu"
               size="lg"
               mr={2}
               icon={<HamburgerIcon />}
            />
            <Text fontSize="xl" fontWeight="bold" textAlign={"center"}>
            Patient Dashboard
            </Text>
         </Flex>
         {/* <Spacer /> */}
         <InputGroup>
            {/* <InputLeftElement
               pointerEvents="none"
               children={<SearchIcon color="gray.300" />}
            /> */}
            {/* <Input type="text" placeholder="Search..." /> */}
         </InputGroup>
         <Spacer />
         <Box>
            <IconButton
               aria-label="Show Messages"
               size="lg"
               colorScheme="teal"
               icon={<EmailIcon />}
               mr={4}
            />
            <IconButton
               aria-label="Show Notifications"
               size="lg"
               colorScheme="teal"
               icon={<Badge colorScheme="red">3</Badge>}
               mr={4}
            />
            <Menu>
               <MenuButton
                  as={IconButton}
                  size="lg"
                  colorScheme="teal"
                  icon={<Avatar size="sm" />}
               />
               <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>My account</MenuItem>
               </MenuList>
            </Menu>
         </Box>
      </Box>
   );
};

export default ChakraUIAppBar;
