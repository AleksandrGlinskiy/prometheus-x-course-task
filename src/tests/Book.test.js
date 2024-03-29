import React, { useState } from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "../hooks/useCart";
import { BooksProvider } from "../hooks/useBooks";

import Book from "../components/specific-book/Book";

const mockState = [
  {
    id: 1,
    author: "David Flanagan",
    price: 10.99,
  },
];

const BookWithContext = () => {
  const [cartItems, setCartItems] = useState([]);
  const [books, setBooks] = useState(mockState);

  const route = "/books/1";

  return (
    <MemoryRouter initialEntries={[route]}>
      <BooksProvider value={{ books, setBooks }}>
        <CartProvider value={{ cartItems, setCartItems }}>
          <Routes>
            <Route path="/books/:id" element={<Book />} />
          </Routes>
        </CartProvider>
      </BooksProvider>
    </MemoryRouter>
  );
};

describe("Book component", () => {
  test("should increase count when clicking on increase button", async () => {
    render(<BookWithContext />);

    const countInput = screen.getByLabelText("Count");
    const increaseButton = screen.getByText("+");

    await waitFor(() => {
      expect(countInput.value).toBe("1");
    });

    fireEvent.click(increaseButton);

    expect(countInput.value).toBe("2");
  });

  test("should decrease count when clicking on decrease button", async () => {
    render(<BookWithContext />);

    const countInput = screen.getByLabelText("Count");
    const decreaseButton = screen.getByText("-");

    
    fireEvent.change(countInput, { target: { value: "2" } });

    fireEvent.click(decreaseButton);

    expect(countInput.value).toBe("1");
  });

  test("should change total price when change count", async () => {
    render(<BookWithContext />);

    
    const increaseButton = screen.getByText("+");
    const initialTotalPrice = screen.getByTitle("Total price").textContent;

    fireEvent.click(increaseButton);
    const currentTotalPrice = screen.getByTitle("Total price").textContent;

    
    expect(currentTotalPrice).not.toEqual(initialTotalPrice);
  });
});
