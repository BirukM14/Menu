import React, { useEffect, useState } from 'react';
import { api } from './services/api';
import './index.css'
import { useCart } from './CartContext';

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {addToCart} = useCart();

  const fetchFoods = async()=>{
    try {
      const response = await api.get('api/products'); 
      setFoods(response.data);
      console.log("response", response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  // Fetch food items from the backend
  useEffect(() => {
    fetchFoods();
  }, []);

  console.log(foods);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="foodmenu">
      <h2>Food Menu</h2>
      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <p>${food.price && !isNaN(food.price) ? food.price.toFixed(2) : 'N/A'}</p>
            <p>{food.category}</p>
            <p>{food.image}</p>
            <h3>{food.available}</h3>
            <button onClick={() => addToCart(food)}>add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodList;
