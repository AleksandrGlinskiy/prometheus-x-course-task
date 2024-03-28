import React, { useState } from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "../hooks/useCart";
import { BooksProvider } from "../hooks/useBooks";

import Book from "../components/specific-book/Book";

const CartContext = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [books, setBooks] = useState([]);
  return (
    <BrowserRouter>
      <BooksProvider value={{ books, setBooks }}>
        <CartProvider value={{ cartItems, setCartItems }}>
          {children}
        </CartProvider>
      </BooksProvider>
    </BrowserRouter>
  );
};

describe("Book component", () => {
  test("should increase count when clicking on increase button", async () => {
    const { getByLabelText, getByText } = render(<Book />, {
      wrapper: CartContext,
    });

   
    const countInput = getByLabelText("Count");
    const increaseButton = getByText('+');
    

    
    // await waitFor(() => {
    //   expect(countInput.value).toBe("1");
    // });

  
    fireEvent.click(increaseButton);

    expect(countInput.value).toBe("2");
  });

  test("should decrease count when clicking on decrease button", async () => {
    const { getByLabelText, getByText } = render(<Book />, {
      wrapper: CartContext,
    });

   
    const countInput = getByLabelText("Count");
    const decreaseButton = getByText('-');
    

    fireEvent.change(countInput, { target: { value: '2' } });
     
    fireEvent.click(decreaseButton);

    expect(countInput.value).toBe("1");
  });

  test("should change total price when change count", async () => {
    const { getByLabelText, getByText } = render(<Book />, {
      wrapper: CartContext,
    });
    const countInput = getByLabelText("Count");
    const initialTotalPrice = getByText("Total price:").textContent;;

    fireEvent.change(countInput, { target: { value: "2" } });


    const expectedTotalPrice = "Total price: 20.00";

  

    await waitFor(() => { expect(getByText(expectedTotalPrice)).toBeInTheDocument() });

    expect(getByText("Total price:").textContent).not.toEqual(initialTotalPrice);
  });

    
  
});
