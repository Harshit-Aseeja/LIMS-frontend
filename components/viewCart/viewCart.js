import React, { useState } from "react";
import CartModal from "components/CartModal/cartModal";
import Backdrop from "components/Backdrop/Backdrop";

const viewCart = () => {
  const [showCart, setShowCart] = useState(false);

  const handleShowCart = () => {
    setShowCart(true);
  };

  const hideCart = () => {
    setShowCart(false);
  };

  return (
    <div>
      <button onClick={handleShowCart}>Show Cart</button>
      {showCart && (
        <Backdrop hideBackdrop={hideCart}>
          <CartModal hideBackdrop={hideCart} />
        </Backdrop>
      )}
    </div>
  );
};

export default viewCart;
