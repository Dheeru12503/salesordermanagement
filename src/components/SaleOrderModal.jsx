// components/SaleOrderModal.jsx
import React from "react";
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
const productData = {
  product: {
    Earphones: {
      id: 701,
      display_id: 55,
      owner: 6001,
      name: "Earphones",
      category: "Electronics",
      characteristics: "High-Quality Sound and Noise-Cancellation",
      features: "Wireless, Noise-Cancelling, and Comfortable Fit",
      brand: "Top Audio Brands",
      sku: [
        {
          id: 901,
          selling_price: 249,
          max_retail_price: 299,
          amount: 1,
          unit: "piece",
          quantity_in_inventory: 200,
          product: 701,
          name: "Apple AirPods Pro",
        },
        {
          id: 91,
          selling_price: 249,
          max_retail_price: 299,
          amount: 1,
          unit: "piece",
          quantity_in_inventory: 200,
          product: 711,
          name: "Apple AirPods ",
        },
        {
          id: 981,
          selling_price: 249,
          max_retail_price: 299,
          amount: 1,
          unit: "piece",
          quantity_in_inventory: 200,
          product: 701,
          name: "Apple AirPods Pro",
        },
        {
          id: 961,
          selling_price: 249,
          max_retail_price: 299,
          amount: 1,
          unit: "piece",
          quantity_in_inventory: 200,
          product: 701,
          name: "Apple AirPods Pro",
        },
        // Other SKUs...
      ],
      updated_on: "2024-05-24T12:46:41.995873Z",
      adding_date: "2024-05-24T12:46:41.995828Z",
    },
  },
};

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
            productData={productData}
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
