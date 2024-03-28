import css from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <footer>
       <div className={css.container}>
       <div className={css.footer}>
          <p>
            Виконано в <a href="https://prometheus.org.ua/" target="_blank" rel="noopener noreferrer">Prometheus</a> ©
            2024
          </p>
        </div>
       </div>
      </footer>
    </>
  );
};

export default Footer;
