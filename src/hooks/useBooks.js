import { createContext, useContext } from "react";

const BooksContext = createContext(null);

export const BooksProvider = BooksContext.Provider;

export const useBooks = () => useContext(BooksContext);
