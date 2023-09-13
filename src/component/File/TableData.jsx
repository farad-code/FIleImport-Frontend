import React, { useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Flex,
    Icon,
    Box,
    Avatar,
    Checkbox
} from '@chakra-ui/react';
import { AiFillFileWord,AiFillFileExcel } from "react-icons/ai";
import axios from 'axios';
import { FaFileCsv } from 'react-icons/fa';


const TableData = ({load}) => {
    const[files,setFiles]= useState(null);
    useEffect(()=>{
        const fetchFileDetails = async ()=>{
            const filedetails = await axios.get("http://localhost:8067/api/v1/file-details");
            setFiles(filedetails.data);
            console.log(filedetails.data);
        }
        fetchFileDetails();
    },[load])

    const fileTypeIcon = {
        "docx": AiFillFileWord,
        "xlsx": AiFillFileExcel,
        "xls": AiFillFileExcel,
        "docs": AiFillFileWord,
        "csv": FaFileCsv
    }
    const fileTypeUploadedIcon = (fileType) => {
        return fileTypeIcon[fileType];
    }
    return (
        <TableContainer my={10}>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>
                            <Checkbox colorScheme='red' mr={5}>
                            </Checkbox>
                            File name
                        </Th>
                        <Th>Date Uploaded</Th>
                        <Th>Uploaded By</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                   
                   {
                    files != null && files.map(file =>{
                       
                       return <Tr key={file.id}>
                        <Td>
                            <Flex gap={4}>
                                <Checkbox colorScheme='red' >
                                </Checkbox>
                                <Flex border="2px solid #F9FAFC" shadow="sm" h={10} align="center" justify="center" p={3} borderRadius="lg">
                                    <Icon
                                        as={fileTypeUploadedIcon(file.fileType)}
                                        w={6}
                                        h={6}
                                        color={file.fileType == "docx" ? "blue" : "green"}
                                        cursor="pointer"
                                    />

                                </Flex>
                                <Flex direction={{ base: "column" }}>
                                    <Box fontSize="0.8rem" fontWeight={600}>{file.filename}</Box>
                                    <Box fontSize="0.8rem" fontWeight={600} color="gray">{file.fileSize}</Box>
                                </Flex>
                            </Flex>
                        </Td>
                        <Td >Jan 4, 2022</Td>
                        <Td>
                            <Flex gap={2}>
                                <Avatar name='Kent Dodds' src='https://bit.ly/sage-adebayo' size="sm" />
                                <Flex direction={{ base: "column" }}>
                                    <Box fontWeight={800} fontSize="0.8rem">Pablo Graham</Box>
                                    <Box fontSize="0.8rem" fontWeight={600} color="gray">graham@untitledui.com</Box>

                                </Flex>
                            </Flex>
                        </Td>

                        <Td>
                            <Button variant="outline" mr={5}>Delete</Button>
                            <Button variant="outline">Edit</Button>
                        </Td>

                    </Tr>
                    })
                   }

                </Tbody>

            </Table>
        </TableContainer>
    )  
}

export default TableData