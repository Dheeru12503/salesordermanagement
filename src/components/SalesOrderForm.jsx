import React, { useState } from "react";
import {
  Input,
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Spinner,
  Switch,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Select from "react-select";
import { useProducts } from "../hooks/useSaleOrders";

const SaleOrderForm = ({ onSubmit }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [skuData, setSkuData] = useState({});
  const [selectedSKUs, setSelectedSKUs] = useState([]);
  const [formData, setFormData] = useState({
    invoice_no: "",
    customer_id: "",
    invoice_date: "",
    paid: false,
  });

  const { data: productData, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (

      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }

  const handleProductChange = (selectedOptions) => {
    const selected = selectedOptions.map((option) => option.value);
    setSelectedProducts(selected);

    let skus = {};
    selected.forEach((product) => {
      if (productData[product] && productData[product].sku) {
        skus = {
          ...skus,
          ...productData[product].sku.reduce((acc, sku) => {
            acc[sku.id] = { ...sku, selling_rate: "", total_items: "" };
            return acc;
          }, {}),
        };
      }
    });
    setSkuData(skus);
  };

  const handleInputChange = (skuId, field, value) => {
    setSkuData((prev) => ({
      ...prev,
      [skuId]: {
        ...prev[skuId],
        [field]: value,
      },
    }));
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAdd = (skuId) => {
    setSelectedSKUs((prev) => [...prev, skuId]);
  };

  const handleDelete = (skuId) => {
    setSelectedSKUs((prev) => prev.filter((id) => id !== skuId));
  };

  const handleSubmit = () => {
    const filledItems = selectedSKUs
      .filter(
        (skuId) => skuData[skuId].selling_rate && skuData[skuId].total_items
      )
      .map((skuId) => ({
        sku_id: skuId,
        price: parseFloat(skuData[skuId].selling_rate),
        quantity: parseInt(skuData[skuId].total_items, 10),
      }));

    const submissionData = {
      invoice_no: formData.invoice_no,
      customer_id: formData.customer_id,
      invoice_date: formData.invoice_date,
      paid: formData.paid,
      items: filledItems,
    };

    console.log("Selected SKUs: ", filledItems);
    onSubmit(submissionData);
  };

  const productOptions = Object.keys(productData).map((product) => ({
    value: product,
    label: productData[product].name,
  }));

  if (!productData) {
    return <Spinner />;
  }

  return (
    <VStack spacing={4} align="stretch" width="80%" mx="auto" color="tomato">
      <Select
        isMulti
        
        options={productOptions}
        onChange={handleProductChange}
        placeholder="Select products"
      />
      <FormControl>
        <FormLabel>Invoice No</FormLabel>
        <Input
          value={formData.invoice_no}
          onChange={(e) => handleFormChange("invoice_no", e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Customer ID</FormLabel>
        <Input
          value={formData.customer_id}
          onChange={(e) => handleFormChange("customer_id", e.target.value)}
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
        <FormLabel htmlFor="paid-switch">Paid</FormLabel>
        <Switch
          id="paid-switch"
          isChecked={formData.paid}
          onChange={(e) => handleFormChange("paid", e.target.checked)}
        />
      </FormControl>

      <Box overflowY="auto" maxHeight="400px" width="100%">
        {Object.keys(skuData).map((skuId) => (
          <Box
            key={skuId}
            p={4}
            borderWidth={1}
            borderRadius={8}
            mb={4}
            width="100%"
          >
            <Text fontSize="xl" fontWeight="bold">
              {skuData[skuId].name}
            </Text>
            <Text>Remaining Items: {skuData[skuId].quantity_in_inventory}</Text>
            <Text>Real Rate: ${skuData[skuId].selling_price}</Text>
            <HStack spacing={4}>
              <Input
                placeholder="Selling Rate"
                value={skuData[skuId].selling_rate}
                onChange={(e) =>
                  handleInputChange(skuId, "selling_rate", e.target.value)
                }
                isDisabled={selectedSKUs.includes(skuId)}
              />
              <Input
                placeholder="Total Items"
                value={skuData[skuId].total_items}
                onChange={(e) =>
                  handleInputChange(skuId, "total_items", e.target.value)
                }
                isDisabled={selectedSKUs.includes(skuId)}
              />
              {!selectedSKUs.includes(skuId) ? (
                <Button onClick={() => handleAdd(skuId)}>Add</Button>
              ) : (
                <Button onClick={() => handleDelete(skuId)}>Delete</Button>
              )}
            </HStack>
          </Box>
        ))}
      </Box>
      <Button colorScheme="teal" onClick={handleSubmit}>
        Submit
      </Button>
    </VStack>
  );
};

export default SaleOrderForm;
