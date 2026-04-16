import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const HeaderComponent = () => {
  const { cartCount } = useCart();
  
  return (
    <header className="header">
      {/* Top bar */}
      <div className="header-top">
        <nav className="top-nav">
          <Link to="/promo">Акції</Link>
          <Link to="/club">Бали ЄКЛУБ</Link>
          <Link to="/authors">Автори</Link>
          <Link to="/publishers">Видавництва</Link>
          <Link to="/events">Івенти</Link>
          <Link to="/blog">Блог</Link>
        </nav>
      </div>

      {/* Main header */}
      <div className="header-main">
        <div className="header-left">
          <button className="menu-toggle">☰</button>
          <Link to="/" className="logo">
            КНИГАРНЯ <span className="logo-icon">Є</span>
          </Link>
        </div>

        <div className="search-bar">
          <Link to="/catalog" className="catalog-btn">Каталог</Link>
          <input type="text" placeholder="Пошук книг..." className="search-input" />
          <button className="search-btn">🔍</button>
        </div>

        <div className="header-right">
          <div className="phone-info">
            <div>(0800) 33-05-66</div>
            <div>(044) 333-42-20</div>
          </div>
          <div className="header-icons">
            <button className="icon-btn" title="Історія">🕐</button>
            <button className="icon-btn" title="Вхід">👤</button>
            <button className="icon-btn" title="Обране">♡</button>
            <Link to="/cart" className="icon-btn cart-btn" title="Кошик">
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
