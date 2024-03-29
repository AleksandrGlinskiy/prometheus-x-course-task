import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./routes/PrivateRoute";
import BookList from "./components/book-list/BookList";
import Cart from "./components/cart/Cart";
import Signin from "./components/signin/Signin";
import Book from "./components/specific-book/Book";
import ErrorNotFound from "./components/error/ErrorNotFound";
import { CartProvider } from "./hooks/useCart";
import { BooksProvider } from "./hooks/useBooks";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("./books.json");
        const data = await response.json();
        console.log(data);
        setBooks(data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <BooksProvider value={{ books, setBooks }}>
        <CartProvider value={{ cartItems, setCartItems }}>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route
              path="/books"
              element={<PrivateRoute element={<BookList />} path="/books" />}
            />
            <Route
              path="/books/:id"
              element={<PrivateRoute element={<Book />} path="/books/:id" />}
            />
            <Route
              path="/cart"
              element={<PrivateRoute element={<Cart />} path="/cart" />}
            />
            <Route path="*" element={<ErrorNotFound />} />
          </Routes>
        </CartProvider>
      </BooksProvider>
    </>
  );
};

export default App;
