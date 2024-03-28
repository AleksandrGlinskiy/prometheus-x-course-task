import css from './Header.module.css'
const Header = ({children}) => {
  return (
    <>
    <header>
        <div className={css.container}>
          <div className={css.header}>
            <div className={css.header__title}>
              <h1>X-course task / Hlinskyi Oleksandr</h1>
            </div>
            {children}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
