// src/hooks/useSaleOrders.js
import { useMutation, useQuery } from "@tanstack/react-query";

const fetchSaleOrders = async () => {
  const response = await fetch("http://localhost:5000/saleOrders"); // Replace with your actual API endpoint
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useSaleOrders = () => {
  return useQuery({
    queryKey: ["saleOrders"],
    queryFn: fetchSaleOrders,
  });
};

// fetching list of Produdct

const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/product");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Optionally, add caching busting here:
    // const withCacheBusting = new URL(response.url);
    // withCacheBusting.searchParams.append('cachebust', Date.now());
    // return response.json();
    return await response.json(); // Await the JSON parsing for clarity
  } catch (error) {
    console.error("Error fetching products:", error);
    // Handle the error appropriately, e.g., display an error message or retry
    throw error; // Re-throw to allow upper layers to handle it
  }
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    // Consider adding options to control caching behavior,
    // if applicable to your useQuery implementation
  });
};


// to create post here API

export const createSaleOrder = async (order) => {
  const response = await fetch("http://localhost:5000/saleOrders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};



///  this code for update the data in server 


export const updateSaleOrder = async (updatedOrder) => {
  console.log(updatedOrder.id)
  const response = await fetch(
    `http://localhost:5000/saleOrders/${updatedOrder.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};


