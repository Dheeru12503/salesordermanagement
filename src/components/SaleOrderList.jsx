import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { useSaleOrders } from "../hooks/useSaleOrders";
import EditSaleOrderModal from "./EditSaleOrderModal";
import ReviewSaleOrderModal from "./ReviewSaleOrderModal";

const SaleOrderList = ({
  onEdit,
  saleOrders,
  ActiveSaleorderWindow,
  CompletedSaleorderWindow,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedSaleOrder, setSelectedSaleOrder] = useState(null);

  const handleEditClick = (order) => {
    setSelectedSaleOrder(order);
    setIsEditModalOpen(true);
  };

  const handleReviewClick = (order) => {
    setSelectedSaleOrder(order);
    setIsReviewModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setIsReviewModalOpen(false);
    setSelectedSaleOrder(null);
  };

  const handleSaleOrderUpdate = (updatedOrder) => {
    // TODO: Implement the logic to update the sale order
    onEdit(updatedOrder);
    console.log("Updated Order:", updatedOrder);
    handleModalClose();
  };

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Invoice No</Th>
            <Th>Customer ID</Th>
            <Th>SKU ID</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {saleOrders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.invoice_no}</Td>
              <Td>{order.customer_id}</Td>
              <Td>{order.items[0].sku_id}</Td>
              <Td>{order.items[0].price}</Td>
              <Td>{order.items[0].quantity}</Td>
              <Td>{order.invoice_date}</Td>
              <Td>
                {CompletedSaleorderWindow === true && (
                  <IconButton
                    icon={<ViewIcon />}
                    onClick={() => handleReviewClick(order)}
                  />
                )}
                {ActiveSaleorderWindow === true && (
                  <IconButton
                    icon={<EditIcon />}
                    onClick={() => handleEditClick(order)}
                  />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {selectedSaleOrder && (
        <>
          <EditSaleOrderModal
            isOpen={isEditModalOpen}
            onClose={handleModalClose}
            saleOrder={selectedSaleOrder}
            onSubmit={handleSaleOrderUpdate}
          />
          <ReviewSaleOrderModal
            isOpen={isReviewModalOpen}
            onClose={handleModalClose}
            saleOrder={selectedSaleOrder}
          />
        </>
      )}
    </>
  );
};

export default SaleOrderList;
