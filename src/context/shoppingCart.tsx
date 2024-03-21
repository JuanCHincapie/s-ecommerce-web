import { createContext, useEffect, useState } from "react";

export const ShoppingCartContext = createContext({});

export const ShoppingCartProvider = ({ children }: any) => {
  const getShoppingCart = ()=> {
    let cart = localStorage.getItem('cart');
    let currentCart = [];
    if(cart != null) {
      currentCart = JSON.parse(cart) || [];
    }
    return currentCart || [];
  }

  const [shoppingCart, setShoppingCart] = useState(getShoppingCart());
    
  useEffect(()=> {
    localStorage.setItem('cart', JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  const quantityChange = (cardProduct: any) => {
    let cart = localStorage.getItem('cart');
    let currentCart = [];
    if(cart != null) {
      currentCart = JSON.parse(cart) || [];
    }

    if(cardProduct.quantity > 0){
      const item = currentCart.find((f: any) => f.productId == cardProduct.productId);
      if(!!item) {
        item.quantity = cardProduct.quantity;
        item.totalPrice = cardProduct.quantity * cardProduct.price
      } else{
        currentCart.push({
          ...cardProduct,     
          totalPrice: cardProduct.quantity * cardProduct.price
        });
      }
    }

    setShoppingCart(currentCart);    
  }

  const deleteItem = (productId: number) => {
    let cart = localStorage.getItem('cart');
    let currentCart = [];
    if(cart != null) {
      currentCart = JSON.parse(cart) || [];
    }
    
    currentCart = currentCart.filter((f: any) => f.productId != productId);
    setShoppingCart(currentCart);
  }

  return (
    <ShoppingCartContext.Provider value={{
      shoppingCart,
      setShoppingCart,
      quantityChange,
      deleteItem
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

