import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/CartContext'

interface Book {
  id: number
  title: string
  author: string
  price: number
  category?: string
  description?: string
  imageUrl?: string
  year?: number
}

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    axios.get(`http://localhost:3000/books/${id}`)
      .then(res => {
        setBook(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching book:', err)
        setError('Не вдалося завантажити інформацію про книгу')
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    if (book) {
      addToCart(book)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  if (loading) {
    return <div className="book-detail-loading">Завантаження...</div>
  }

  if (error || !book) {
    return (
      <div className="book-detail-error">
        <p>{error || 'Книгу не знайдено'}</p>
        <Link to="/books" className="back-link">Повернутися до каталогу</Link>
      </div>
    )
  }

  return (
    <div className="book-detail-page">
      <Link to="/books" className="back-link">← Повернутися до каталогу</Link>
      
      <div className="book-detail-container">
        <div className="book-detail-image">
          {book.imageUrl ? (
            <img src={book.imageUrl} alt={book.title} />
          ) : (
            <div className="no-image">📖</div>
          )}
        </div>
        
        <div className="book-detail-info">
          <h1 className="book-detail-title">{book.title}</h1>
          <p className="book-detail-author">Автор: {book.author}</p>
          {book.category && (
            <p className="book-detail-category">Категория: {book.category}</p>
          )}
          {book.year && (
            <p className="book-detail-year">Рік випуску: {book.year}</p>
          )}
          
          {book.description && (
            <div className="book-detail-description">
              <h3>Опис</h3>
              <p>{book.description}</p>
            </div>
          )}
          
          <p className="book-detail-price">{book.price} ₴</p>
          
          <button 
            className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {addedToCart ? 'Додано до кошика!' : 'Додати до кошика'}
          </button>
        </div>
      </div>
    </div>
  )
}