import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BooksPage from './pages/BooksPage'
import AddBookPage from './pages/AddBookPage'
import BookDetailPage from './pages/BookDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/add" element={<AddBookPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </CartProvider>
  )
}

export default App
