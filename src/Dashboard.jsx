import { useEffect, useState } from "react"; 
import "./Dashboard.css"; 
import { useNavigate } from "react-router-dom"; 
function Dashboard() { 
  const navigate = useNavigate(); 
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); 
  const [cart, setCart] = useState([]); 
  const [foodItems, setFoodItems] = useState([]); useEffect(() => { 
    fetch("https://project-backend-nk3b.onrender.com/api/food-items").then((response) => response.json()).then((data) => { setFoodItems(data); }).catch(() => { alert("Cannot load food items"); }); }, []); 
  const restaurants = [{ name: "Pizza Palace", items: [{ name: "Margherita Pizza", price: 199 }, { name: "Veg Burger", price: 149 }, { name: "Pasta", price: 179 }] }, { name: "Spice Kitchen", items: [{ name: "Biryani", price: 220 }, { name: "Noodles", price: 160 }, { name: "Paneer Curry", price: 180 }] }, { name: "Sweet Treats", items: [{ name: "Chocolate Cake", price: 120 }, { name: "Ice Cream", price: 80 }, { name: "Brownie", price: 100 }] }]; 
  function addToCart(item) {
  const existingItem = cart.find(
    (cartItem) => cartItem.name === item.name
  );

  if (existingItem) {
    setCart(
      cart.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  } else {
    setCart([...cart, { ...item, quantity: 1 }]);
  }

  alert(item.name + " added to cart!");
}
  return (
  <div className="dashboard-content"> 
  <h1>FoodOrderApp</h1> 
  <h2>Dashboard</h2> 
  <div className="top-bar"> 
    <button onClick={() => navigate("/orders")}> Order History </button> 
    </div> 
    <p>Welcome to FoodOrderApp!</p> 
    <h3>Restaurants</h3> 
    <div className="restaurant-container"> {restaurants.map((restaurant) => (<div className="restaurant-card" key={restaurant.name}> 
      <img src={restaurant.name === "Pizza Palace" ? "https://images.unsplash.com/photo-1579751626657-72bc17010498" : restaurant.name === "Spice Kitchen" ? "https://images.unsplash.com/photo-1601050690597-df0568f70950": "https://images.unsplash.com/photo-1578985545062-69928b1d9587"} alt={restaurant.name} /> 
    <h4>{restaurant.name}</h4> 
    <button onClick={() => setSelectedRestaurant(restaurant)}> View Menu </button> 
    </div>
    ))} 
    </div> 
    <h3>Food Items Added by Admin</h3> {foodItems.length === 0 ? (<p>No food items available.</p>) : (foodItems.map((food) => (
      <div className="food-card" key={food.id}> <p> {food.name} - ₹{food.price} </p> 
      <button onClick={() => addToCart(food)}> Add to Cart </button> 
      </div>
      )))} {selectedRestaurant && (<div> <h3>{selectedRestaurant.name} Menu</h3> {selectedRestaurant.items.map((item) => (<div className="food-card" key={item.name}> 
      <p> {item.name} - ₹{item.price} </p> 
      <button onClick={() => addToCart(item)}> Add to Cart </button> 
      </div>
      ))} <button onClick={() => setSelectedRestaurant(null)}> Close Menu </button> 
      </div>
      )} <hr /> 
      <h3 className="cart-title">🛒 Cart</h3> {cart.length === 0 ? (<p>Your cart is empty.</p>) : (<div> {cart.map((item, index) => (<div key={index}> 
        <p>
  {item.name} - ₹{item.price}
</p>

<button
  onClick={() => {
    if (item.quantity > 1) {
      setCart(
        cart.map((cartItem, i) =>
          i === index
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  }}
> −</button>

<span style={{ margin: "0 15px" }}>
  {item.quantity}
</span>

<button
  onClick={() => {
    setCart(
      cart.map((cartItem, i) =>
        i === index
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  }}
>
  +
</button>
        <button className="remove-button" onClick={() => { const newCart = cart.filter((_, i) => i !== index); setCart(newCart); }} > Remove </button> <br /> <br /> 
        </div>
        ))} 
        <h4 className="cart-total"> Total: ₹{" "} 
          {cart.reduce((total, item) => total + item.price * item.quantity,0)}
          </h4> 
        <button className="place-order-button" onClick={async () => { if (cart.length === 0) { alert("Your cart is empty!"); return; }   
         const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
             try { 
               const response = await fetch("https://project-backend-nk3b.onrender.com/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ total: total, status: "PLACED" }) }); if (response.ok) { alert("Order placed successfully!"); setCart([]); 

             } else { 
            alert("Order failed!"); } } catch (error) { alert("Cannot connect to backend"); } }} > Place Order
         </button> 
            </div>
            )} 
            </div>
            ); 
          } 
          export default Dashboard;