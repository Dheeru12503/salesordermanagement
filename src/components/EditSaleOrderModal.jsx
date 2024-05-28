import React, { useState, useEffect } from "react";
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
  Switch,
} from "@chakra-ui/react";

const EditSaleOrderModal = ({ isOpen, onClose, saleOrder, onSubmit }) => {
  const [formData, setFormData] = useState({
    id:"",
    invoice_no: "",
    customer_id: "",
    invoice_date: "",
    paid: false,
    items: [],
  });

  useEffect(() => {
    if (saleOrder) {
      setFormData({
        id:saleOrder.id ||"",
        invoice_no: saleOrder.invoice_no || "",
        customer_id: saleOrder.customer_id || "",
        invoice_date: saleOrder.invoice_date || "",
        paid: saleOrder.paid || false,
        items: saleOrder.items || [],
      });
    }
  }, [saleOrder]);

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = formData.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  if (!saleOrder) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Customer ID</FormLabel>
            <Input
              value={formData.customer_id}
              onChange={(e) => handleFormChange("customer_id", e.target.value)}
            />
          </FormControl>
          {formData.items.map((item, index) => (
            <div key={index}>
              <FormControl>
                <FormLabel>SKU ID</FormLabel>
                <Input
                  value={item.sku_id}
                  onChange={(e) =>
                    handleItemChange(index, "sku_id", e.target.value)
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                />
              </FormControl>
            </div>
          ))}
          <FormControl>
            <FormLabel>Invoice No</FormLabel>
            <Input
              value={formData.invoice_no}
              onChange={(e) => handleFormChange("invoice_no", e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Invoice Date</FormLabel>
            <Input
              type="date"
              value={formData.invoice_date}
              onChange={(e) => handleFormChange("invoice_date", e.target.value)}
            />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="paid-switch" mb="0">
              Paid
            </FormLabel>
            <Switch
              id="paid-switch"
              isChecked={formData.paid}
              onChange={(e) => handleFormChange("paid", e.target.checked)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditSaleOrderModal;
