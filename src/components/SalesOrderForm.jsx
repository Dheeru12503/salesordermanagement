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
} from "@chakra-ui/react";
import Select from "react-select";

const SaleOrderForm = ({ productData, onSubmit, initialValues }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [skuData, setSkuData] = useState({});
  const [formData, setFormData] = useState({
    invoice_no: "",
    customer_id: "",
    invoice_date: "",
    paid: false,
  });

  const handleProductChange = (selectedOptions) => {
    const selected = selectedOptions.map((option) => option.value);
    setSelectedProducts(selected);

    // Extract SKUs for selected products
    let skus = {};
    selected.forEach((product) => {
      if (productData.product[product] && productData.product[product].sku) {
        skus = {
          ...skus,
          ...productData.product[product].sku.reduce((acc, sku) => {
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

  const handlePaidChange = (skuId, value) => {
    setSkuData((prev) => ({
      ...prev,
      [skuId]: {
        ...prev[skuId],
        paid: value,
      },
    }));
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const filledItems = Object.keys(skuData)
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

    onSubmit(submissionData);
  };

  const productOptions = Object.keys(productData.product).map((product) => ({
    value: product,
    label: productData.product[product].name,
  }));

  if (!productData || !productData.product) {
    return <Spinner />;
  }

  return (
    <VStack spacing={4} align="stretch" width="80%" mx="auto">
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
      <Select
        isMulti
        options={productOptions}
        onChange={handleProductChange}
        placeholder="Select products"
      />
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
              />
              <Input
                placeholder="Total Items"
                value={skuData[skuId].total_items}
                onChange={(e) =>
                  handleInputChange(skuId, "total_items", e.target.value)
                }
              />
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
