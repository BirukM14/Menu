import { useState, useEffect } from "react";
import AddFoodItem from "./Addfood";
import { api } from "./services/api";
import { Navigate } from "react-router-dom";

const FoodManager = () => {
  const [loading, setLoading] = useState(false);  // For loading state
  const [error, setError] = useState(null);      // For error state

  // Fetch all food items from the API

  // Add a new food item via the API
  const postFoodItem = async (newItem) => {
    try {
      const response = await api.post("/api/products", ...newItem);

      if (response) {
        Navigate('./foodlist')
        // Refresh the food list after adding a new item
      } else {
        alert("Failed to add food item!");
      }
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };

  // Fetch food items when the component mounts

  // Handle the loading, error, and data display
  if (loading) {
    return <div>Loading food items...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Food Ordering System</h1>
      <AddFoodItem onAdd={postFoodItem} />
    </div>
  );
};

export default FoodManager;
