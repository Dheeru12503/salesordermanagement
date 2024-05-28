// src/pages/ActiveSaleOrders.jsx
import React, { useState } from "react";
import SaleOrderList from "../components/SaleOrderList";
import SaleOrderModal from "../components/SaleOrderModal";
import { createSaleOrder, updateSaleOrder, useSaleOrders } from "../hooks/useSaleOrders";
import { Spinner, Alert, AlertIcon, Button } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ActiveSaleOrders = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const { data: saleOrders, isLoading, isError, error } = useSaleOrders();

  // Declare the useMutation hook outside of any condition
  const { mutate } = useMutation({
    mutationFn: createSaleOrder
  });

  const { mutate: updateorder } = useMutation({
    mutationFn: updateSaleOrder,
  });
 

  // Delare the usequeryinvalidation here

  const queryClient = useQueryClient();

  const handleEdit = (order) => {
    updateorder(order, {
      onSuccess: () => {
        // Handle successful mutation, To refetch sale orders or update local state
        queryClient.invalidateQueries({ queryKey: ["saleOrders"] });

        setModalOpen(false);
      },
      onError: (error) => {
        // Handle error case
        console.error(error);
      },
    });
    setEditingOrder(order);
  };

  const handleSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        // Handle successful mutation, To refetch sale orders or update local state
        queryClient.invalidateQueries({ queryKey: ["saleOrders"] });

        setModalOpen(false);
      },
      onError: (error) => {
        // Handle error case
        console.error(error);
      },
    });
  };

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

  // Filter saleOrders to only include those where `paid` is false
  const filteredSaleOrders = saleOrders.filter((order) => order.paid === false);

  return (
    <div>
      <SaleOrderList
        saleOrders={filteredSaleOrders}
        onEdit={handleEdit}
        isCompleted={false}
        ActiveSaleorderWindow={true}
      />

      <Button onClick={() => setModalOpen(true)}>+ Sale Order</Button>
      <SaleOrderModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingOrder}
      />
    </div>
  );
};

export default ActiveSaleOrders;
