import { Link } from "react-router-dom";
import css from "./Navigation.module.css"

const Navigation = () => {
  const userName = localStorage.getItem("username");
  const handleClickSignOut = () => {
    localStorage.removeItem("username");
  };
  return (
    <nav className={css.info}>
      <Link to="/prometheus-x-course-task/cart">
        <img
          className={css.info__item}
          src="https://cdn-icons-png.flaticon.com/512/3081/3081822.png"
          width="50"
          alt="cart"
        />
      </Link>
      <div className={css.info__item}>
        <Link to="/prometheus-x-course-task/">
          <button
            className={css.button}
            type="button"
            onClick={handleClickSignOut}
          >
            Sign-Out
          </button>
        </Link>
      </div>
      <span className={css.info__item}>{userName}</span>
    </nav>
  );
};

export default Navigation;
