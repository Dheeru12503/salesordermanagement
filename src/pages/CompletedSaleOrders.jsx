// src/pages/CompletedSaleOrders.jsx
import React, { useState } from "react";
import { useSaleOrders } from "../hooks/useSaleOrders";
import SaleOrderList from "../components/SaleOrderList";
import ReviewSaleOrderModal from "../components/ReviewSaleOrderModal";
import { Spinner, Alert, AlertIcon } from "@chakra-ui/react";

const CompletedSaleOrders = () => {
  const { data: saleOrders, isLoading, isError, error } = useSaleOrders();

  const [isModalOpen, setModalOpen] = useState(false);
  const [reviewingOrder, setReviewingOrder] = useState(null);

  const handleReview = (order) => {
    setReviewingOrder(order);
    setModalOpen(true);
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

  const filteredSaleOrders = saleOrders.filter((order) => order.paid === true);
  return (
    <>
      <SaleOrderList
        saleOrders={filteredSaleOrders}
        onEdit={handleReview}
        isCompleted={true}
        CompletedSaleorderWindow={true}
      />
      <ReviewSaleOrderModal
        saleOrders={filteredSaleOrders}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        saleOrder={reviewingOrder}
      />
    </>
  );
};

export default CompletedSaleOrders;
