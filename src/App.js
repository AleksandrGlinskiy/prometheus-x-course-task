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
        const response = await fetch("books.json");
        const data = await response.json();

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
          <Routes basename={process.env.PUBLIC_URL}>
            <Route path="prometheus-x-course-task/" element={<Signin />} />
            <Route
              path="prometheus-x-course-task/books"
              element={
                <PrivateRoute
                  element={<BookList />}
                  path="prometheus-x-course-task/books"
                />
              }
            />
            <Route
              path="prometheus-x-course-task/books/:id"
              element={
                <PrivateRoute
                  element={<Book />}
                  path="prometheus-x-course-task/books/:id"
                />
              }
            />
            <Route
              path="prometheus-x-course-task/cart"
              element={
                <PrivateRoute
                  element={<Cart />}
                  path="prometheus-x-course-task/cart"
                />
              }
            />
            <Route path="*" element={<ErrorNotFound />} />
          </Routes>
        </CartProvider>
      </BooksProvider>
    </>
  );
};

export default App;
