import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface Book {
  id: number
  title: string
  author: string
  price: number
  category?: string
  description?: string
  imageUrl?: string
}

const categories = [
  'Sci-Fi',
  'Fiction',
  'Fantasy',
  'Classic',
  'Mystery',
]

const categoryLabels: Record<string, string> = {
  'Sci-Fi': 'Наукова фантастика',
  'Fiction': 'Художня література',
  'Fantasy': 'Фентезі',
  'Classic': 'Класика',
  'Mystery': 'Детектив',
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  useEffect(() => {
    const url = selectedCategory
      ? `http://localhost:3000/books?category=${selectedCategory}`
      : 'http://localhost:3000/books'
    
    axios.get(url)
      .then(res => setBooks(res.data))
      .catch(err => console.error('Error fetching books:', err))
  }, [selectedCategory])

  const filteredAndSortedBooks = useMemo(() => {
    let result = [...books]
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
      )
    }
    
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title, 'uk'))
        break
      default:
        break
    }
    
    return result
  }, [books, searchQuery, sortBy])

  return (
    <div className="books-page">
      <Link to="/" style={{ display: 'inline-block', padding: '20px', color: '#333', textDecoration: 'none' }}>← На головну</Link>
      <div className="books-layout">
        {/* Category Sidebar */}
        <aside className="category-sidebar">
          <h3>Категорії</h3>
          <button
            className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            Всі
          </button>
{categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              >
                {categoryLabels[cat]}
              </button>
            ))}
        </aside>

        {/* Main Content */}
        <main className="books-main">
          {/* Header with search and sort */}
          <div className="books-header">
            <div className="search-box">
              <input
                type="text"
                placeholder="Пошук у цій категорії"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="sort-box">
              <label>Сортування:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">За популярністю</option>
                <option value="price-asc">За ціною ↑</option>
                <option value="price-desc">За ціною ↓</option>
                <option value="name">За назвою</option>
              </select>
              <span className="products-count">Товарів: {filteredAndSortedBooks.length}</span>
            </div>
          </div>

          {/* Books Grid */}
          {filteredAndSortedBooks.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Книг не знайдено</p>
          ) : (
            <div className="books-grid">
              {filteredAndSortedBooks.map((book) => (
                <Link key={book.id} to={`/books/${book.id}`} className="book-card-link">
                  <div className="book-card">
                    <div className="book-image">
                      {book.imageUrl ? (
                        <img src={book.imageUrl} alt={book.title} />
                      ) : (
                        '📖'
                      )}
                    </div>
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">{book.author}</p>
                    <p className="book-price">{book.price} ₴</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}