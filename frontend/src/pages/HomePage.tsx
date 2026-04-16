import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function HomePage() {
  const { cart, cartCount } = useCart()
  const [searchParams] = useSearchParams()
  const showThankYou = searchParams.get('thankYou') === 'true'
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      {showThankYou && (
        <div style={{ background: '#d4edda', color: '#155724', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h2>Дякуємо за покупку!</h2>
          <p>Ваше замовлення оформлено. Наш менеджер зв'яжеться з вами найближчим часом.</p>
        </div>
      )}
      <h1>Бібліотека</h1>
      <p>Ласкаво просимо до нашої онлайн-бібліотеки</p>
      
      <nav style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link to="/books" style={{ padding: '10px 20px', border: '1px solid #333' }}>
          Каталог книг
        </Link>
        <Link to="/books/add" style={{ padding: '10px 20px', border: '1px solid #333' }}>
          Додати книгу
        </Link>
      </nav>

      {cartCount > 0 && (
        <div style={{ marginTop: '30px', padding: '20px', background: '#f0f0f0', borderRadius: '8px', display: 'inline-block', textAlign: 'left' }}>
          <h3>Ваш кошик</h3>
          <p>Товарів: {cartCount}</p>
          <p>Сума: {total} ₴</p>
          <Link to="/cart" style={{ color: '#0066cc', textDecoration: 'underline' }}>
            Перейти до кошика →
          </Link>
        </div>
      )}
    </div>
  )
}