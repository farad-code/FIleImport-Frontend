import React, { useState } from 'react'
import { Stack, Flex, Text, Icon, InputGroup, InputLeftElement, Input, Button } from "@chakra-ui/react"
import { AiFillFileText, AiFillFileWord, AiFillFileExcel } from "react-icons/ai";
import { FaFileCsv } from "react-icons/fa";

import { BiSearch } from "react-icons/bi";
import TableData from './TableData';
import axios from 'axios';



export const File = () => {
    const [file, setFile] = useState(null);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fileType, setFileType] = useState("");
    const [upload, setUpload] = useState(false);
    const[load,setLoad] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
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
    const fileSize = (size) => {
        let kiloytes = (size / 1024);
        if (size >= 1024 && size < 1048576) {
            return kiloytes.toFixed(2) + " KB";
        }
        if (size >= 1048576) {
            return (kiloytes / 1024).toFixed(2) + " MB";
        }
        if (size <= 1024) {
            return size + " bytes";
        }
    }
  

    const uploadFile = async () => {
        try {
            setLoading(true);
            setUpload(false);
            const formData = new FormData();
            formData.append('file', file);
             await axios.post("http://localhost:8067/api/v1/product", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

                onUploadProgress: progressEvent => {
                    const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );
                    setUploadProgress(progress);
                }
            });
            setLoad(!load)
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <Stack w="100%" justify="center" align="center" mb={20}>
            <Stack w="80%" mt={10} p={0} gap={0}>
                <Text fontSize="1.4rem" fontWeight={700} fontFamily="sans-serif">Files and assets</Text>
                <Flex>
                    <Text fontSize="0.8rem" fontWeight={400}>Documents and attachments that have been uploaded as part of this project</Text>
                </Flex>
                <Stack border="2px dashed #E9E9E9" gap={0} h="22vh" w="100%" borderRadius="lg" mt={10} align="center" justify="center">
                    <Stack >
                        <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                            <Input
                                type="file"
                                id="file-upload"
                                accept=".docx,.xlsx,.xls,.csv"
                                display="none"
                                onChange={(event) => {
                                    const selectedFile = event.target.files[0];
                                    setFile(selectedFile);
                                    setShow(true);
                                    setUpload(true);
                                    setFileType(selectedFile.name.split(".")[1]);
                                }}
                            />
                            <Icon
                                as={AiFillFileText}
                                w={14}
                                h={14}
                                color="gray"
                                cursor="pointer"
                            />
                        </label>
                    </Stack>

                    <Flex gap={1} mt={5}>
                        <Text fontSize="0.8rem" fontWeight={700} textDecor="underline" cursor="pointer"> Click to upload</Text>
                        <Text fontSize="0.8rem" fontWeight={400}> or drag and drop</Text>
                    </Flex>
                    <Text fontSize="0.7rem" fontWeight={400}>Maximum size file 50MB</Text>
                </Stack>
                {
                    show && <Stack border="2px solid #F9FAFC" p={5} mt={5} borderRadius="lg">
                        <Flex gap={3}>
                            <Stack border="2px solid #F9FAFC" shadow="sm" h={10} align="center" justify="center" p={3} borderRadius="lg">
                                <Icon
                                    as={fileTypeUploadedIcon(fileType)}
                                    w={6}
                                    h={6}
                                    color={fileType == "docx" || fileType == "docs" ? "blue" : fileType == "xlsx" || fileType == "xls" ? "green" : "green"}
                                    cursor="pointer"
                                />
                            </Stack>
                            <Stack gap={0} w="95%">
                                {file != null && <Text fontSize="0.8rem" fontWeight={500}>{file.name}</Text>}
                                <Text fontSize="0.8rem" fontWeight={500}>{fileSize(file.size)}</Text>
                                {
                                    loading && <Flex gap={10}>
                                        <Flex w="100%" bgColor="#F4F5F7" borderRadius="2xl" h={2} mt={2}>
                                            <Flex w={uploadProgress + "%"} bgColor="#121928" borderRadius="2xl">
                                                <Text></Text>
                                            </Flex>
                                        </Flex>
                                        <Text>{uploadProgress}%</Text>
                                    </Flex>
                                }
                            </Stack>
                        </Flex>
                    </Stack>
                }
                {upload && <Button variant="outline" w="10%" mt={5} onClick={uploadFile}>Upload</Button>}
                <Flex mt={10} justify="space-between">
                    <Stack gap={0}>
                        <Text fontWeight={700}>Attached files</Text>
                        <Text fontSize="0.8rem">Files and assets that have been attached to this project</Text>
                    </Stack>
                    <Flex w="30%">
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <Icon
                                    as={BiSearch}
                                    w={6}
                                    h={6}
                                    color="gray"
                                    cursor="pointer"
                                />
                            </InputLeftElement>
                            <Input type="search" placeholder='Search' focusBorderColor='black' />
                        </InputGroup>
                    </Flex>
                </Flex>
                <Stack bgColor="#F9FAFC" borderRadius="lg" py={3} px={5} mt={5}>
                    <Flex>
                        <Button fontSize="0.9rem" variant='outline' w="10%" borderRightRadius="none">View all</Button>
                        <Button fontSize="0.9rem" variant='outline' w="10%" borderRadius="none">Your files</Button>
                        <Button fontSize="0.9rem" variant='outline' w="10%" borderLeftRadius="none">Recent files</Button>

                    </Flex>
                </Stack>
                <TableData load={load} />
            </Stack>
        </Stack>
    )
}
