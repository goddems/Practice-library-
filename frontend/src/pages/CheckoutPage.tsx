import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CheckoutPage() {
  const { cart, cartCount, clearCart } = useCart()
  const navigate = useNavigate()
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    fullName: '',
    cardNumber: '',
    password: '',
    cvv: '',
  })

  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.phone || !formData.fullName || 
        !formData.cardNumber || !formData.password || !formData.cvv) {
      setError('Заповніть всі поля')
      return
    }

    clearCart()
    navigate('/?thankYou=true')
  }

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Кошик порожній</h2>
        <Link to="/books" style={{ color: '#0066cc', textDecoration: 'underline' }}>
          Перейти до каталогу
        </Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px' }}>
      <Link to="/cart" style={{ display: 'inline-block', marginBottom: '20px', color: '#333', textDecoration: 'none' }}>
        ← Назад до кошика
      </Link>
      <h1>Оформлення замовлення</h1>
      
      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <p style={{ margin: 0 }}>Сума замовлення: <strong>{total} ₴</strong></p>
        <p style={{ margin: '5px 0 0', color: '#666' }}>Товарів: {cartCount}</p>
      </div>

      {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="example@mail.com"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Номер телефону *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="+380XXXXXXXXX"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>ПІБ *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="Іванов Іван Іванович"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Номер картки *</label>
          <input
            type="text"
            value={formData.cardNumber}
            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="XXXX XXXX XXXX XXXX"
            maxLength={19}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Пароль *</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="Введіть пароль"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>CVV код *</label>
          <input
            type="text"
            value={formData.cvv}
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="XXX"
            maxLength={3}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '14px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '10px'
          }}
        >
          Підтвердити замовлення
        </button>
      </form>
    </div>
  )
}