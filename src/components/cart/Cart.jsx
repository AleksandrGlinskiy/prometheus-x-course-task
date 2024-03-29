import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Navigation from "../nav/Navigation";
import css from "./Cart.module.css";

const Cart = () => {
  const { cartItems, setCartItems } = useCart();

  const calculateTotalCost = () => {
    return cartItems.reduce(
      (acc, current) => acc + current.count * current.price,
      0
    );
  };

  const handleClickPurchase = () => {
    setCartItems([]);
    localStorage.removeItem("cartCount");
  };

  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <div className={css.container}>
        <button
          className={css.purchase}
          type="button"
          disabled={!cartItems.length}
          onClick={handleClickPurchase}
        >
          Purchase
        </button>
        {cartItems.length > 0 ? (
          <div>
            <table className={css.table}>
              <thead>
                <tr>
                  <th>Book name</th>
                  <th>Count</th>
                  <th>Price for selected books</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Link
                        className={css.link}
                        to={`/prometheus-x-course-task/books/${item.id}`}
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td>{item.count}</td>

                    <td>${item.count * item.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className={css.table__total}>
                  <td colSpan="2">Total price for all books: </td>
                  <td>${calculateTotalCost().toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className={css.cart__img}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3081/3081822.png"
              width="250"
              alt="cart"
            />
            <p>Cart empty...</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
