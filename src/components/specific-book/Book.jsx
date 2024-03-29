import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useBooks } from "../../hooks/useBooks";
import { useCart } from "../../hooks/useCart";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Navigation from "../nav/Navigation";
import css from "./Book.module.css";

const Book = () => {
  const { setCartItems } = useCart();
  const { books } = useBooks();
  const { id = "" } = useParams();
  const [count, setCount] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  
  const book = useMemo(
    () => books.find((item) => item.id.toString() === id) || {},
    [books, id]
  );
  useEffect(() => {
    const savedCartCount = localStorage.getItem("cartCount");
    if (savedCartCount) {
      setCartCount(parseInt(savedCartCount));
    }
  }, []);

  const {
    author,
    price,
    level,
    tags,
    image,
    title,
    shortDescription,
    description,
  } = book;

  const handleCountChange = (e) => {
    if (e.target.value < 1) {
      setCount(1);
    } else if (e.target.value > 42) {
      setCount(42);
    } else setCount(parseInt(e.target.value));
  };

  const validateCount = (value) => {
    if (value === "") return "";
    else if (isNaN(value) || value < 1) return 1;
    else if (value > 42) return 42;
    else return value;
  };

  const handleInputStepDown = (e) => {
    setCount(validateCount(count - 1));
  };
  const handleInputStepUp = (e) => {
    setCount(validateCount(count + 1));
  };

  const getTotalPrice = () => {
    return (count * price).toFixed(2);
  };

  const addToCart = () => {
    setCartItems((prev) => {
      const existingBook = prev.find((item) => item.id === book.id);
      if (existingBook) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, count: item.count + count } : item
        );
      } else {
        return [...prev, { ...book, count }];
      }
    });

    setCartCount(cartCount + 1);
    localStorage.setItem("cartCount", (cartCount + 1).toString());
  };

  return (
    <>
      <Header>
        <Navigation />
      </Header>

      <main>
        <div className={css.container}>
          <div className={css.main}>
            <div className={css.image}>
              <img
                className={css.book__image}
                src={
                  image ||
                  "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
                }
                alt={shortDescription}
              />
            </div>

            <div className={css.description}>
              <ul>
                <li className={css.name__title}>
                  <span className={css.name__chapters}>Book name:</span> {title}
                </li>
                <li className={css.name__characters}>
                  <span className={css.name__chapters}>Book author:</span>{" "}
                  {author}
                </li>
                <li className={css.name__characters}>
                  <span className={css.name__chapters}>Book level:</span>{" "}
                  {level}
                </li>
                <li className={css.name__characters}>
                  <span className={css.name__chapters}>Book tags:</span>{" "}
                  {tags?.join(", ")}
                </li>
              </ul>
            </div>
            <div className={css.quantity}>
              <p className={css.quantity__chapters}>
                Price:$ <span className={css.price}>{price}</span>
              </p>
              <form className={css.quantity__chapters} action="">
                <label htmlFor="count">Count</label>
                <input
                  type="number"
                  id="count"
                  name="count"
                  value={count}
                  min={1}
                  max={42}
                  onChange={handleCountChange}
                  className={css.input}
                />
                <div className={css.button__field}>
                  <button
                    type="button"
                    className={css.button__step}
                    onClick={handleInputStepUp}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className={css.button__step}
                    onClick={handleInputStepDown}
                  >
                    -
                  </button>
                </div>
              </form>
              <p className={css.quantity__chapters} title="Total price">
                Total price: {getTotalPrice()}
              </p>
              <button
                className={css.button__add}
                type="button"
                onClick={addToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
          <p>
            <span className={css.name__chapters}>Description:</span>{" "}
            {description}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Book;
