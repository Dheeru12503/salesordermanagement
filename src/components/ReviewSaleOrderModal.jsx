// src/components/ReviewSaleOrderModal.jsx
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
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const ReviewSaleOrderModal = ({ isOpen, onClose, saleOrder }) => {
  if (!saleOrder) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Review Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Customer ID</FormLabel>
            <Input value={saleOrder.customer_id} isReadOnly />
          </FormControl>
          {saleOrder.items.map((item, index) => (
            <div key={index}>
              <FormControl>
                <FormLabel>SKU ID</FormLabel>
                <Input value={item.sku_id} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input value={item.price} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input value={item.quantity} isReadOnly />
              </FormControl>
            </div>
          ))}
          <FormControl>
            <FormLabel>Invoice No</FormLabel>
            <Input value={saleOrder.invoice_no} isReadOnly />
          </FormControl>
          <FormControl>
            <FormLabel>Invoice Date</FormLabel>
            <Input
              value={new Date(saleOrder.invoice_date).toLocaleDateString()}
              isReadOnly
            />
          </FormControl>
          <FormControl>
            <FormLabel>Paid</FormLabel>
            <Input value={saleOrder.paid ? "Yes" : "No"} isReadOnly />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewSaleOrderModal;
