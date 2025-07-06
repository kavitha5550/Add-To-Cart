import React, { useReducer } from 'react';

const ProductList = [
  { id: 1, name: "kajal", price: 100 },
  { id: 2, name: "lipstick", price: 240 },
  { id: 3, name: "eyeliner", price: 50 }
];

const MyAction = (state, action) => {
  if (action.type === "add") {
    const product = action.payload;
    const itemExist = state.cart.find((item) => item.id === product.id);

    if (itemExist) {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }
  }
 
  if(action.type==="remove"){
    return {...state,cart:[]}
    
  }
};



const ProductComponent = () => {
  const [state, dispatch] = useReducer(MyAction, { cart: [] });

  return (
    <div>
      <center>
        <h1>Product Cart</h1>
        <hr />

        {/* Product List */}
        {ProductList.map((product) => (
          <div key={product.id}>
            {product.name} - ₹{product.price} &nbsp;
            <button onClick={() => dispatch({ type: "add", payload: product })}>
              Add to Cart
            </button><br></br>
            <button onClick={()=>dispatch({type:"remove",remove:product})}>clear</button>
          </div>
        ))}

        {/* Cart Display */}
        <h2>Cart Items</h2>
        {state.cart.length === 0 && <p>No items in cart</p>}
        {state.cart.map((item) => (
          <div key={item.id}>
            {item.name} × {item.quantity} = ₹{item.price * item.quantity}
          </div>
        ))}
      </center>
    </div>
  );
};

export default ProductComponent;
