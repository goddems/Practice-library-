import { Link } from 'react-router-dom';

const CategorySidebar = () => {
  const categories = [
    { name: 'Пропозиції ЄКЛУБ', icon: '⭐', link: '/club-offers' },
    { name: 'Зимова еПідтримка', icon: '❄️', link: '/support' },
    { name: 'єКнига', icon: '📱', link: '/e-book' },
    { name: 'Дитяча література', icon: '🧒', link: '/children' },
    { name: 'Художня література', icon: '📖', link: '/fiction' },
    { name: 'Нехудожня література', icon: '', link: '/non-fiction' },
    { name: 'Іншомовна література', icon: '🌍', link: '/foreign' },
    { name: 'Довідникова література', icon: '', link: '/reference' },
    { name: 'Супутні товари', icon: '🎁', link: '/accessories' },
    { name: 'Карти, атласи, путівники', icon: '️', link: '/maps' },
    { name: 'Альбоми', icon: '🖼️', link: '/albums' },
    { name: 'Подарункові видання', icon: '🎀', link: '/gift-editions' },
    { name: 'Періодичні видання', icon: '', link: '/periodicals' },
  ];

  return (
    <aside className="category-sidebar">
      <ul className="category-list">
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={category.link} className="category-item">
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              <span className="category-arrow">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategorySidebar;
