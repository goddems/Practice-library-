import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { cart, removeFromCart, clearCart, cartCount } = useCart()
  const navigate = useNavigate()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Кошик порожній</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>Додайте книги до кошика</p>
        <Link to="/books" style={{ color: '#0066cc', textDecoration: 'underline' }}>Перейти до каталогу</Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#333', textDecoration: 'none' }}>← На головну</Link>
      <h1>Кошик ({cartCount})</h1>
      
      <div style={{ marginTop: '20px' }}>
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', gap: '20px', padding: '20px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
            <div style={{ width: '80px', height: '120px', flexShrink: 0, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                '📖'
              )}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 5px' }}>{item.title}</h3>
              <p style={{ color: '#666', margin: '0 0 10px' }}>{item.author}</p>
              <p style={{ margin: 0 }}>Кількість: {item.quantity}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 10px' }}>{item.price * item.quantity} ₴</p>
              <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: '1px solid #ccc', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}>
                Видалити
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'right' }}>
        <p style={{ fontSize: '24px', margin: '0 0 20px' }}>Разом: <strong>{total} ₴</strong></p>
        <button onClick={clearCart} style={{ background: '#ff4444', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>
          Очистити кошик
        </button>
        <button onClick={() => navigate('/checkout')} style={{ background: '#28a745', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer' }}>
          Оформити замовлення
        </button>
      </div>
    </div>
  )
}