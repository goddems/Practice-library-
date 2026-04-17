import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [
    { id: 1, title: 'Дюна', author: 'Френк Герберт', category: 'Sci-Fi', description: 'Епічна науково-фантастична сага, що розповідає про пустельну планету Арракіс, відому як Дюна. Юний Пол Атрейдес стає спадкоємцем герцогського роду і потрапляє у вир політичних інтриг. Книга поєднує глибокі екологічні та політичні теми з захоплюючим сюжетом.', price: 250, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/3/e/3ec97f0b-3000-11e7-80c5-000c29ae1566_2d2fca36-de18-11ee-8194-00505684ea69.jpg' },
    { id: 2, title: '1984', author: 'Джордж Орвелл', category: 'Fiction', description: 'Антиутопічний роман, що зображує тоталітарне суспільство майбутнього. Головний герой Вінстон Сміт працює у Міністерстві правди. Роман є попередженням про небезпеку тоталітаризму та маніпуляції свідомістю.', price: 180, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/c/f/cfa051db-74e0-11e6-80be-000c29ae1566_3727b395-a703-11ed-817c-0050568ef5e6.jpg' },
    { id: 3, title: 'Прекрасний новий світ', author: 'Олдос Гакслі', category: 'Sci-Fi', description: 'Антиутопія зображує утопічне суспільство 2540 року, де люди народжуються в пробірках і розподілені на касти. Книга досліджує теми свободи, щастя та технологій.', price: 190, imageUrl: 'https://cdn-fmdgc.nitrocdn.com/DJHzsKSzEIUxuEwuLIiKesCWutiPRqpT/assets/images/optimized/rev-678be01/uabook.com.ua/wp-content/uploads/2023/02/prekrasnyj-novyj-svit-.jpg' },
    { id: 4, title: '451° за Фаренгейтом', author: 'Рей Бредбері', category: 'Sci-Fi', description: 'Роман про світ, де книги заборонені. Гай Монтег працює пожежником, який спалює книги. Потужна метафора про цінність думки та небезпеку цензури.', price: 170, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/9/8/98ddb3de-8c29-11e8-8100-000c29ae1566_b4a2c8ea-d76b-11ec-8170-0050568ef5e6.jpg' },
    { id: 5, title: 'Гобіт, або Туди і звідти', author: 'Дж. Р. Р. Толкін', category: 'Fantasy', description: 'Казкова повість про Більбо Торбина, який опиняється в компанії гномів у поході за втраченим королівством. Знаходить магічне кільце.', price: 220, imageUrl: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/2/1/21_3_43.jpg' },
    { id: 6, title: 'Володар Перснів: Братство Персня', author: 'Дж. Р. Р. Толкін', category: 'Fantasy', description: 'Епічна фентезі-трилогія про боротьбу ��ар��дів Середземля проти темного владики Саурона. Хоббіт Фродо отримує шанс перемогти зло.', price: 350, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/7/d/7dcde957-819f-11e6-80c0-000c29ae1566_fbd9d961-4f88-11ed-8175-0050568ef5e6.jpg' },
    { id: 7, title: 'Гаррі Поттер і філософський камінь', author: 'Дж. К. Ролінґ', category: 'Fantasy', description: 'Перша книга про юного чарівника Гаррі Поттера, який дізнається про своє походження і потрапляє до школи чарівництва Хогвартс.', price: 230, imageUrl: 'https://reading.in.ua/wp-content/uploads/2024/07/harri-potter-i-filosofskyy-kamin-dzhoan-roling-min.jpg' },
    { id: 8, title: 'Ловець у житі', author: 'Джером Девід Селінджер', category: 'Fiction', description: 'Розповідь від імені підлітка Холдена Колфілда про його пригоди в Нью-Йорку після виключення зі школи. Книга є класикою.', price: 160, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/f/5/f5ceae7c-496e-11ed-8175-0050568ef5e6_e3b299bf-4971-11ed-8175-0050568ef5e6.jpg' },
    { id: 9, title: 'Убити пересмішника', author: 'Гарпер Лі', category: 'Classic', description: 'Роман про юного Скаута Фінча та її батька Адвоката Фінча, який захищає чорношкірого чоловіка, несправедливо звинуваченого. Про расову несправедливість.', price: 175, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/d/6/d6684450-80d8-11e6-80c0-000c29ae1566_06b22a67-85a7-11eb-814a-0050568ef5e6.jpg' },
    { id: 10, title: 'Великий Гетсбі', author: 'Френсіс Скотт Фіцджеральд', category: 'Classic', description: 'Роман про таємничого мільйонера Джея Гетсбі, який влаштує пишні бенкети в надії привернути увагу своєї колишньої коханої. Про американську мрію.', price: 150, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/3/1/31f6e583-8315-11eb-814a-0050568ef5e6_dec62c06-8316-11eb-814a-0050568ef5e6.jpg' },
    { id: 11, title: 'Мобі Дік, або Білий кит', author: 'Герман Мелвілл', category: 'Classic', description: 'Епічна історія капітана Ахава, одержимого ідеєю вбити білого кита Мобі Діка. Глибока метафора про одержимість.', price: 200, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/a/f/af425e64-8fbb-11e6-80c0-000c29ae1566_84463edd-b3f6-11ef-81b5-005056857596.jpg' },
    { id: 12, title: 'Війна і мир', author: 'Лев Толстой', category: 'Classic', description: 'Епічний роман про епоху наполеонівських війн через призму життя кількох аристократичних родин. Центральний герой - П\'єр Безухий.', price: 300, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/c/b/cb8d512c-f651-11ee-8199-005056857596_a810550b-03e1-11f0-81bb-005056857596.jpg' },
    { id: 13, title: 'Злочин і кара', author: 'Федір Достоєвський', category: 'Classic', description: 'Психологічний роман про Родіона Раскольнікова, який вбиває лихварку і проходить шлях покаяння. Досліджує межі моралі.', price: 190, imageUrl: 'https://content2.rozetka.com.ua/goods/images/big/21311621.jpg' },
    { id: 14, title: 'Брати Карамазови', author: 'Федір Достоєвський', category: 'Classic', description: 'Філософський роман про родину Карамазових: батька Федора та його трьох синів. Про віру, мораль і боротьбу добра і зла.', price: 280, imageUrl: 'https://images.prom.ua/6332810449_w640_h640_kniga-bratya-karamazovy.jpg' },
    { id: 15, title: 'Анна Кареніна', author: 'Лев Толстой', category: 'Classic', description: 'Роман про трагедію заміжньої жінки Анни Кареніної, яка закохується в офіцера Вронського. Про кохання і трагедію.', price: 270, imageUrl: 'https://mirknig.eu/image/cache/AzbukaAttikus/anna-karenina-800x800.jpg' },
    { id: 16, title: 'Алхімік', author: 'Пауло Коельйо', category: 'Fiction', description: 'Притча про пастуха Сантьяго, який мріє знайти скарб у Єгипті. Про шлях до самопізнання та здійснення мрій.', price: 160, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/4/e/4e719bca-f916-11e6-80c5-000c29ae1566_818cb22a-414d-11ec-8154-0050568ef5e6.jpg' },
    { id: 17, title: 'Код да Вінчі', author: 'Ден Браун', category: 'Mystery', description: 'Трилер про криптографа Роберта Ленґдона, який опиняється в центрі таємниці після вбивства куратора Лувру. Про таємниці Леонардо да Вінчі.', price: 210, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/e/a/eacdacee-5811-11e8-80f5-000c29ae1566_2933bb83-ca58-11ee-8192-00505684ea69.jpg' },
    { id: 18, title: 'Янголи і демони', author: 'Ден Браун', category: 'Mystery', description: 'Пригодницький трилер, де професор Роберт Ленґдон опиняється в Римі. Про таємничу організацію.', price: 200, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/6/0/60efc56a-70a4-11e8-80fe-000c29ae1566_076299df-ca59-11ee-8192-00505684ea69.jpg' },
    { id: 19, title: 'Дівчина з татуюванням дракона', author: 'Стіґ Ларссон', category: 'Mystery', description: 'Шведський детективний трилер про журналіста Мікаеля Блумквіста та хакершу Лісбет Саландер.', price: 220, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/8/6/86266070-0e6d-11f1-91db-005056b02ec0_43455eeb-0e6e-11f1-91db-005056b02ec0.jpg' },
    { id: 20, title: 'Загублена', author: 'Ґілліан Флінн', category: 'Mystery', description: 'Психологічний трилер про Аміну Грей, яка зникає з власного дому. Тримає в напрузі до самого фіналу.', price: 195, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/8/7/87e49f68-933f-11ed-8178-0050568ef5e6_b244bc77-933f-11ed-8178-0050568ef5e6.jpg' },
    { id: 21, title: 'Сяйво', author: 'Стівен Кінг', category: 'Fiction', description: 'Містичний хорор про родину Торранс, яка переїжджає працювати охоронцями у великий готель на зиму. Про древнє зло в готелі.', price: 210, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/c/e/ce5f2714-9074-11e6-80c0-000c29ae1566_c3894431-1490-11ed-8173-0050568ef5e6.jpg' },
    { id: 22, title: 'Воно', author: 'Стівен Кінг', category: 'Fiction', description: 'Хорор про древнє зло, що живе в маленькому містечку Деррі і з\'являється кожні 27 років. Про дитячі страхи.', price: 280, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/a/c/ac5fa8bc-df4f-11f0-91d5-005056b02ec0_63a1f2c9-1d44-11f1-91dd-005056b02ec0.jpg' },
    { id: 23, title: 'Протистояння', author: 'Стівен Кінг', category: 'Fiction', description: 'Постапокаліптичний роман про епідемію, що знищує 99% людства. Про віру, надію та боротьбу добра і зла.', price: 300, imageUrl: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/i/m/img028_1_37.jpg' },
    { id: 24, title: 'Дорога', author: 'Кормак Маккарті', category: 'Fiction', description: 'Постапокаліптична історія про батька та сина, які йдуть південною дорогою. Про батьківську любов і збереження людяності.', price: 170, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/e/9/e9d4cb06-92dd-11f0-81c1-005056b0789c_7a014d2a-92df-11f0-81c1-005056b0789c.jpg' },
    { id: 25, title: 'Крадійка книжок', author: 'Маркус Зузак', category: 'Fiction', description: 'Історія дівчинки Лілі в нацистській Німеччині. Про дружбу, мужність та силу літератури.', price: 185, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/7/b/7b29b22f-acd0-11eb-814a-0050568ef5e6_5ca2f434-acd1-11eb-814a-0050568ef5e6.jpg' },
    { id: 26, title: 'Голодні ігри', author: 'Сюзанна Коллінз', category: 'Sci-Fi', description: 'Дистопія про державу Панем, яка щорічно проводить смертельні змагання. Кетніс стає символом повстання.', price: 200, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/2/b/2b46847c-a00e-11ee-8190-00505684ea69_3d4a40c8-a010-11ee-8190-00505684ea69.jpg' },
    { id: 27, title: 'У вогні', author: 'Сюзанна Коллінз', category: 'Sci-Fi', description: 'Друга книга трилогії Голодні ігри, де Кетніс стає символом повстання. Поглиблює політичні інтриги.', price: 210, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/6/0/60b7b532-d204-11f0-81c8-005056b0789c_e9d5b930-d205-11f0-81c8-005056b0789c.jpg' },
    { id: 28, title: 'Переспівниця', author: 'Сюзанна Коллінз', category: 'Sci-Fi', description: 'Фінал трилогії Голодні ігри. Розв\'язується фінальна битва між повстанцями та Капіталієм.', price: 220, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/f/c/fc21cbc2-8c7b-11e6-80c0-000c29ae1566_48b50654-8a0d-11ef-81b0-005056857596.jpg' },
    { id: 29, title: 'Гра Ендера', author: 'Орсон Скотт Кард', category: 'Sci-Fi', description: 'Науково-фантастичний роман про геніального хлопчика Ендера Віггіна. Про боротьбу з інопланетянами.', price: 190, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/c/e/ce7e45f4-83e8-11e6-80c0-000c29ae1566_aea33c8c-a8e2-11f0-81c3-005056b0789c.jpg' },
    { id: 30, title: 'Фундація', author: 'Айзек Азімов', category: 'Sci-Fi', description: 'Класика наукової фантастики про падіння Галактичної Імперії. Про те, як ідеї та наука можуть формувати історію.', price: 200, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/4/6/466cac66-40a6-11ec-8154-0050568ef5e6_a2a4ed9b-40a6-11ec-8154-0050568ef5e6.jpg' },
    { id: 31, title: 'Я, робот', author: 'Айзек Азімов', category: 'Sci-Fi', description: 'Збірка оповідань про роботів і три закони робототехніки. Про природу свідомості та етики технологій.', price: 180, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/5/a/5ab04984-df8e-11e9-8121-000c29ae1566_916ca018-df8e-11e9-8121-000c29ae1566.jpg' },
    { id: 32, title: 'Нейромант', author: 'Вільям Ґібсон', category: 'Sci-Fi', description: 'Кіберпанк-роман про хакера Кейса. Заклав основи кіберпанку як жанру.', price: 195, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/a/b/abdece58-8639-11eb-814a-0050568ef5e6_2a3add21-863c-11eb-814a-0050568ef5e6.jpg' },
    { id: 33, title: 'Ім\'я вітру', author: 'Патрік Ротфусс', category: 'Fantasy', description: 'Фентезі-роман про легендарного чарівника Квоута. Повна музики, магії та пригод.', price: 240, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/c/5/c53b131a-4bb8-11e9-8112-000c29ae1566_6208516c-e8b7-11ed-8183-00505684ea69.jpg' },
    { id: 34, title: 'Гра престолів', author: 'Джордж Р. Р. Мартін', category: 'Fantasy', description: 'Перша книга серії Пісня льоду і полум\'я про боротьбу за Залізний трон. Багато персонажів і політичні інтриги.', price: 260, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/0/5/05603514-510b-11f0-81bd-005056b0789c_b0b042a6-510d-11f0-81bd-005056b0789c.jpg' },
    { id: 35, title: 'Битва королів', author: 'Джордж Р. Р. Мартін', category: 'Fantasy', description: 'Друга книга серії, де боротьба за владу досягає апогею. Відома несподіваними поворотами.', price: 270, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/e/b/eb93f44f-d8b0-11ea-813b-000c29ae1566_b2896beb-d8b1-11ea-813b-000c29ae1566.jpg' },
    { id: 36, title: 'Хроніки Нарнії: Лев, Біла Відьма та шафа', author: 'Клайв Стейплз Льюїс', category: 'Fantasy', description: 'Фентезі-серія про магічну країну Нарнію, куди потрапляють діти через шафи. Класика дитячої літератури.', price: 300, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/3/3/33de1f72-870b-11e6-80c0-000c29ae1566_e7a2eca0-b157-11ef-81b5-005056857596.jpg' },
    { id: 37, title: 'Дракула', author: 'Брем Стокер', category: 'Classic', description: 'Готичний роман про графа Дракулу, який переноситься з Трансільванії до Англії. Основоположник вампірського жанру.', price: 170, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/6/2/62dad7c4-5363-11f0-81bd-005056b0789c_7028e348-5742-11f0-81bd-005056b0789c.jpg' },
    { id: 38, title: 'Франкенштейн, або Сучасний Прометей', author: 'Мері Шеллі', category: 'Classic', description: 'Перший науково-фантастичний роман про вченого, який створює живу істоту. Про відповідальність вченого.', price: 160, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/0/7/078e66b8-dce3-11ec-8170-0050568ef5e6_24d05ee0-dce5-11ec-8170-0050568ef5e6.jpg' },
    { id: 39, title: 'Етюд у багряних тонах', author: 'Артур Конан Дойл', category: 'Mystery', description: 'Перша справа Шерлока Холмса. Демонструє дедуктивний метод розкриття злочинів.', price: 150, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/f/d/fd01942e-25a1-11e7-80c5-000c29ae1566_6c2be8a0-d248-11ee-8193-00505684ea69.jpg' },
    { id: 40, title: 'Собака Баскервілів', author: 'Артур Конан Дойл', category: 'Mystery', description: 'Класичний детектив з Шерлоком Холмсом. Про легенду про чудовисько на болоті. Класика жанру.', price: 165, imageUrl: 'https://book-ye.com.ua/media/catalog/product/cache/79524a38d3bc3d0f3b6015a08841400c/3/0/30968af0-e2d8-11ef-81b7-005056857596_3542c76e-e2d9-11ef-81b7-005056857596.jpg' },
  ];
  private idCounter = 41;

  findAll(category?: string): Book[] {
    if (category) {
      return this.books.filter(book => book.category === category);
    }
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  create(book: CreateBookDto): Book {
    const newBook: Book = { id: this.idCounter++, ...book };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, data: UpdateBookDto): Book {
    const book = this.findOne(id);
    
    // Оновлюємо тільки ті поля, які передані
    if (data.title) book.title = data.title;
    if (data.author) book.author = data.author;
    if (data.category) book.category = data.category;
    if (data.description) book.description = data.description;
    if (data.price) book.price = data.price;
    if (data.imageUrl) book.imageUrl = data.imageUrl;
    
    return book;
  }

  remove(id: number) {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) throw new NotFoundException('Book not found');
    this.books.splice(index, 1);
    return { message: 'Deleted' };
  }
}
