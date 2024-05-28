// components/SaleOrderModal.jsx
import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner,
} from "@chakra-ui/react";
import SaleOrderForm from "./SalesOrderForm";
import { useProducts } from "../hooks/useSaleOrders";
import { AuthContext } from "../contexts/AuthContext";


const SaleOrderModal = ({ isOpen, onClose, onSubmit, initialValues }) => {

  
  // const { data: productData, isLoading, isError, error } = useProducts();

  // if (isLoading) {
  //   return <Spinner />;
  // }

  // if (isError) {
  //   return (
  //     <Alert status="error">
  //       <AlertIcon />
  //       {error.message}
  //     </Alert>
  //   );
  // }
  // console.log("product : ", productData);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialValues ? "Edit Sale Order" : "Create Sale Order"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SaleOrderForm
            onSubmit={onSubmit}
            initialValues={initialValues}
           
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderModal;
