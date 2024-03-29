import { useState } from "react";

import { Link } from "react-router-dom";
import { useBooks } from "../../hooks/useBooks";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Navigation from "../nav/Navigation";
import css from "./BookList.module.css";

const BookList = () => {
  const { books } = useBooks();

  const [filterText, setFilterText] = useState("");
  const [filterPrice, setFilterPrice] = useState("All");

 

  const filteredBooksByTitle = (book) => {
    return book.title.toLowerCase().includes(filterText.toLowerCase());
  };

  const filteredBooksByPrice = (book) => {
    switch (filterPrice) {
      case "0-15":
        return book.price >= 0 && book.price < 15;
      case "15-30":
        return book.price >= 15 && book.price < 30;
      case "30+":
        return book.price >= 30;
      default:
        return true;
    }
  };

  const filteredBooks = books.filter(
    (book) => filteredBooksByTitle(book) && filteredBooksByPrice(book)
  );

  const handleChangeByText = (e) => {
    setFilterText(e.target.value.trim());
  
  };

  const handleChangeByPrice = (e) => {
    setFilterPrice(e.target.value);
    
  };

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <main>
        <section className={css.container}>
          <form action="">
            <label htmlFor="">
              <input
                type="text"
                placeholder="Search by book name"
                value={filterText}
                onChange={handleChangeByText}
              />
            </label>

            <label htmlFor="selectPrice">
              <select
                name="price"
                id="selectPrice"
                value={filterPrice}
                onChange={handleChangeByPrice}
              >
                <option value="Price">Price</option>
                <option value="all">All</option>
                <option value="0-15">0-15</option>
                <option value="15-30">15-30</option>
                <option value="30+">30+</option>
              </select>
            </label>
          </form>
          <div>
            <ul className={css.books__gallery}>
              {books && books.length > 0 ? (
                filteredBooks.map(
                  ({ id, author, price, image, title, shortDescription }) => (
                    <li key={id} className={css.book}>
                      <img
                        className={css.book__image}
                        src={
                          image ||
                          "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
                        }
                        alt={shortDescription}
                      />
                      <h2 className={css.book__title}>
                        {title.length > 24
                          ? `${title.substring(0, 24)}...`
                          : title}
                      </h2>
                      <p className={css.book__author}>{author}</p>
                      <div className={css.book__info}>
                        <p className={css.book__price}>
                          Price: <span>${price}</span>
                        </p>

                        <Link to={`${id}`}>
                          <button className={css.book__button}>View</button>
                        </Link>
                      </div>
                    </li>
                  )
                )
              ) : (
                <p>Books not found</p>
              )}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BookList;
