import { useEffect, useState } from "react";

function AdminFoodItems() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [foodItems, setFoodItems] = useState([]);

  async function addFood() {
    if (name === "" || price === "") {
      alert("Please enter food name and price");
      return;
    }

    try {
      const response = await fetch(
        "https://project-backend-nk3b.onrender.com/api/food-items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            price: Number(price)
          })
        }
      );

      if (response.ok) {
        alert("Food item added successfully!");

        setName("");
        setPrice("");

        loadFoodItems();
      } else {
        alert("Failed to add food item");
      }
    } catch (error) {
      alert("Cannot connect to backend");
    }
  }

  async function loadFoodItems() {
    try {
      const response = await fetch(
        "https://project-backend-nk3b.onrender.com/api/food-items"
      );

      const data = await response.json();

      setFoodItems(data);
    } catch (error) {
      alert("Cannot load food items");
    }
  }

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <h1>FoodOrderApp</h1>

      <h2>Manage Food Items</h2>

      <h3>Add New Food Item</h3>

      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Food name"
      />

      <br />
      <br />

      <input
        type="number"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        placeholder="Price"
      />

      <br />
      <br />

      <button onClick={addFood}>Add Food</button>

      <h3>Food Items</h3>

      {foodItems.length === 0 ? (
        <p>No food items found.</p>
      ) : (
        foodItems.map((food) => (
          <div key={food.id}>
            <p>
              {food.name} - ₹{food.price}
            </p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default AdminFoodItems;