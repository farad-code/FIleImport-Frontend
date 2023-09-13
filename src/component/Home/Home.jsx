import React from 'react'
import { Stack, Flex, Text, Button, Icon, MenuButton, Menu, MenuList, MenuItem, Radio } from "@chakra-ui/react"
import { ProductsTable } from './ProductsTable'
import { BiImport } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom"



export const Home = () => {
  const navigate = useNavigate();

  return (
    <Stack w="100%" align="center" mt={5}>
      <Stack w="80%" >
        <Text fontWeight={700} fontSize="1.4rem">Products</Text>
        <Flex gap={12} mt={5}>
          <Stack w="20%" h={20} p={10} bgColor="#F5F6FA" borderRadius="lg">

          </Stack>

          <Stack w="20%" h={20} p={10} bgColor="#F5F6FA" borderRadius="lg">

          </Stack>

          <Stack w="20%" h={20} p={10} bgColor="#F5F6FA" borderRadius="lg">

          </Stack>


          <Stack w="20%" h={20} p={10} bgColor="#F5F6FA" borderRadius="lg">

          </Stack>
        </Flex>
        <Flex mt={10} justify="space-between">
          <Flex w="80%" gap={5}>
            <Button variant="outline" leftIcon={<Icon
              as={BiImport}
              w={6}
              h={6}
              color="black"
              cursor="pointer"
            />}
              onClick={() => {
                const from = location.state?.from?.pathname || "/file";
                navigate(from);
              }}
            >
              import products
            </Button>

            <Menu>
              <MenuButton as={Button} w="15%">
                Less than 5,000
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Radio colorScheme='red' value='1'>
                    Less than 5,000
                  </Radio>
                </MenuItem>
                <MenuItem>
                  <Radio colorScheme='red' value='1'>
                    More than 5,000
                  </Radio>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Menu>
            <MenuButton as={Button} rightIcon={<Icon
              as={MdKeyboardArrowDown}
              w={6}
              h={6}

              color="black"
              cursor="pointer"
            />} w="15%">
              download as
            </MenuButton>
            <MenuList>
              <MenuItem>CSV</MenuItem>
              <MenuItem>PDF</MenuItem>
              <MenuItem>WORD</MenuItem>
              <MenuItem>EXCEL</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <ProductsTable />
      </Stack>
    </Stack>
  )
}
