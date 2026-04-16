import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const bookSchema = z.object({
  title: z.string().min(1, 'Назва обов\'язкова').min(2, 'Мінімум 2 символи'),
  author: z.string().min(1, 'Автор обов\'язковий').min(2, 'Мінімум 2 символи'),
  price: z.number().min(1, 'Ціна повинна бути більше 0'),
  description: z.string().optional(),
  category: z.string().min(1, 'Оберіть категорію'),
  imageUrl: z.string().optional(),
})

type BookFormData = z.infer<typeof bookSchema>

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

export default function AddBookPage() {
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      price: 1,
      description: '',
      category: '',
      imageUrl: '',
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: BookFormData) => {
    try {
      const bookData = {
        ...data,
        imageUrl: imagePreview || '',
      }
      await axios.post('http://localhost:3000/books', bookData)
      navigate('/books')
    } catch (error) {
      console.error('Error creating book:', error)
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#333', textDecoration: 'none' }}>← На головну</Link>
      <h1>Додати книгу</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Назва</label>
          <input {...register('title')} style={{ width: '100%', padding: '8px' }} />
          {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Автор</label>
          <input {...register('author')} style={{ width: '100%', padding: '8px' }} />
          {errors.author && <span style={{ color: 'red' }}>{errors.author.message}</span>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Ціна (₴)</label>
          <input {...register('price', { valueAsNumber: true })} type="number" style={{ width: '100%', padding: '8px' }} />
          {errors.price && <span style={{ color: 'red' }}>{errors.price.message}</span>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Категория</label>
          <select {...register('category')} style={{ width: '100%', padding: '8px' }}>
            <option value="">Оберіть категорію</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{categoryLabels[cat]}</option>
            ))}
          </select>
          {errors.category && <span style={{ color: 'red' }}>{errors.category.message}</span>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Опис</label>
          <textarea {...register('description')} style={{ width: '100%', padding: '8px', minHeight: '100px' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Фото обкладинки</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
            style={{ width: '100%', padding: '8px' }}
          />
          {imagePreview && (
            <div style={{ marginTop: '10px' }}>
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={{ maxWidth: '200px', maxHeight: '300px', objectFit: 'contain', border: '1px solid #ddd', borderRadius: '4px' }} 
              />
              <button 
                type="button"
                onClick={() => setImagePreview(null)}
                style={{ display: 'block', marginTop: '5px', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}
              >
                Видалити фото
              </button>
            </div>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} style={{ padding: '12px', cursor: 'pointer' }}>
          {isSubmitting ? 'Додаємо...' : 'Додати книгу'}
        </button>
      </form>
    </div>
  )
}