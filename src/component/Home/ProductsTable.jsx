import React, { useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer
} from '@chakra-ui/react';
// import { AiFillFileWord, AiFillFileExcel } from "react-icons/ai";
import axios from 'axios';
export const ProductsTable = () => {

    const [prod, setProducts] = useState(null);
    React.useEffect(() => {
        const getProducts = async () => {
            try {
                const products = await axios.get("http://localhost:8067/api/v1/product");
                setProducts(products.data);
                console.log(products.data);

            } catch (error) {

            }
        };
        getProducts();
    }, []);
    return (
        <TableContainer w="100%" my={5} shadow="md" borderRadius="lg">
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>
                            Name
                        </Th>
                        <Th>Brand</Th>
                        <Th>Color</Th>
                        <Th isNumeric>Price</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {prod !=null  &&
                        prod?.map(d => (
                            <Tr key={d.id}>
                                <Td>{d.name}</Td>
                                <Td>{d.brand}</Td>
                                <Td>{d.color}</Td>
                                <Td isNumeric>{Number(d.price).toFixed(2)}</Td>
                            </Tr>
                        ))
                     }
                </Tbody>

            </Table>
        </TableContainer>
    )
}
