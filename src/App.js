import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { LocateFixed, Moon, Sun } from "lucide-react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import "@fontsource/work-sans"; // Импорт Work Sans
import "./index.css";
import "./styles.css";


const resources = {
  ru: {
    translation: {
      categories: "Категории",
      searchPlaceholder: "Поиск по названию",
      hours: "Время работы",
      schedule: "Мероприятия",
      website: "Перейти на сайт",
      description: "Описание",
      address: "Адрес",
      contact: "Контакты",
      findMe: "Найти меня"
    },
  },
  en: {
    translation: {
      categories: "Categories",
      searchPlaceholder: "Search by name",
      hours: "Hours",
      schedule: "Activities",
      website: "Visit website",
      description: "Description",
      address: "Address",
      contact: "Contact",
      findMe: "Find me"
    },
  },
  zh: {
    translation: {
      categories: "类别",
      searchPlaceholder: "按名称搜索",
      hours: "营业时间",
      schedule: "活动",
      website: "访问网站",
      description: "描述",
      address: "地址",
      contact: "联系方式",
      findMe: "查找我"
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

const places = [
  {
    id: 1,
    name: "Нижегородский государственный художественный музей",
    name_en: "Nizhny Novgorod State Art Museum",
    name_zh: "下诺夫哥罗德州立艺术博物馆",
    type: "музей",
    position: [56.329382, 44.012698],
    hours: "вт,ср 10:00–18:00; чт 12:00–20:00; пт-вс 11:00–19:00",
    schedule: "Экскурсии каждый час",
    link: "https://artmuseumnn.ru/",
    description: "Один из старейших музеев России с коллекциями русского и зарубежного искусства, включая Айвазовского, Репина и Шишкина.",
    address: "пл. Минина и Пожарского, д. 2/2",
    contact: "+7 910 384-21-16",
  },
  {
    id: 3,
    name: "Арсенал – центр современного искусства",
    name_en: "Arsenal – Center for Contemporary Art",
    name_zh: "阿森纳当代艺术中心",
    type: "музей",
    position: [56.328139, 44.006500],
    hours: "вт-вс 12:00–20:00",
    schedule: "Выставки и мастер-классы",
    link: "arsenal-museum.art",
    description: "Современная галерея в здании исторического Арсенала, где проходят выставки, лекции и фестивали современного искусства.",
    address: "Кремль, 6",
    contact: "+7 831 422-75-55",
  },
  {
    id: 6,
    name: "Дворец культуры им. С. Орджоникидзе",
    name_en: "Palace of Culture named after S. Ordzhonikidze",
    name_zh: "奥尔乔尼基泽文化宫",
    type: "дом культуры",
    position: [56.331278, 43.846308],
    hours: "08:00–21:00",
    schedule: "Концерты, выставки и кружки",
    description: "Один из старейших домов культуры в городе, место проведения культурных и общественных мероприятий.",
    link: "https://dksergo-nn.ru/o-nas/istoriya-dk.html",
    address: "ул. Чаадаева 17",
    contact: "+7 950 600-16-15",
  },
  {
    id: 7,
    name: "Дворец культуры 'Красное Сормово'",
    type: "дом культуры",
    position: [56.343914, 43.862778],
    hours: "08:00–23:00",
    schedule: "Концерты и мероприятия",
    description: "Культурный центр в Сормовском районе с регулярными событиями и кружками.",
    link: "https://vk.com/club198754807",
    address: "Юбилейный бул., 32",
    contact: "+7 (831) 225-11-18",
  },
  {
    id: 8,
    name: "Центр культуры и досуга 'Молодежный'",
    type: "дом культуры",
    position: [56.265313, 43.887103],
    hours: "08:00–21:00",
    schedule: "Клубы и мастер-классы",
    description: "Пространство для молодежных мероприятий и досуга.",
    link: "molodezhnyj-nn.ru",
    address: "ул. Дьяконова, 25А",
    contact: "+7 (831) 253-29-36",
  },
  {
    id: 9,
    name: "Дворец культуры железнодорожников",
    type: "дом культуры",
    position: [56.310245, 43.945813],
    hours: "08:00–22:00",
    schedule: "Театральные и музыкальные события",
    description: "Дом культуры с театральной и музыкальной программой.",
    link: "http://cdkz-nn.ru",
    address: "ул. Июльских Дней, 1А",
    contact: "+7 (831) 248-37-14",
  },
  {
    id: 10,
    name: "Дом культуры 'Газ'",
    type: "дом культуры",
    position: [56.239689, 43.861419],
    hours: "09:00–18:00",
    schedule: "Тематические вечера и занятия",
    description: "Дом культуры при заводе ГАЗ.",
    link: "https://дкгаз.рф",
    address: "ул. Героя Юрия Смирнова, 12",
    contact: "+7 (831) 256-50-51",
  },
  {
    id: 11,
    name: "Дом культуры им. Свердлова",
    type: "дом культуры",
    position: [56.322267, 44.000941],
    hours: "09:00–16:30",
    schedule: "Концерты и мастер-классы",
    description: "Место проведения образовательных и культурных программ.",
    link: "https://www.afisha.ru/nnovgorod/other/dk-im-sverdlova-58751/",
    address: "Большая Покровская ул., 18",
    contact: "+7 (831) 437-38-33",
  },
  {
    id: 12,
    name: "Художественная Галерея Юрковка",
    type: "галерея",
    position: [56.323265, 43.990438],
    hours: "вт-вс 13:00–18:00",
    schedule: "Выставки современного искусства",
    description: "Галерея с экспозициями от молодых и известных художников.",
    link: "ngvk.ru",
    address: "Сергиевская ул., 12",
    contact: "+7 (920) 258-00-61",
  },
  {
    id: 13,
    name: "Галерея хрупкие мечты",
    type: "галерея",
    position: [56.333123, 43.902013],
    hours: "вт-пн 11:00–17:00",
    schedule: "Арт-перформансы и выставки",
    description: "Нестандартное арт-пространство в центре города.",
    link: "https://lobachevagallery.ru",
    address: "Народная ул., 2Б",
    contact: "+7 (920) 250-05-85",
  },
  {
    id: 14,
    name: "FUTURO Gallery",
    type: "галерея",
    position: [56.329583, 43.994380],
    hours: "вт-вс 12:00–20:00",
    schedule: "Современные арт-инсталляции",
    description: "Галерея цифрового и экспериментального искусства.",
    link: "https://futurogallery.ru/",
    address: "Рождественская улица, 6",
    contact: "+7 (831) 213-62-62",
  },
  {
    id: 15,
    name: "Арт-галерея Кладовка",
    type: "галерея",
    position: [56.324320, 44.003153],
    hours: "вт-вс 11:00–18:00",
    schedule: "Выставки и мастер-классы",
    description: "Творческое пространство для художников и зрителей.",
    link: "https://ngiamz.ru/kladovka-galereya-istoriy",
    address: "Большая Покровская улица, 8",
    contact: "+7 951 903-56-99",
  },
  {
    id: 18,
    name: "ЦЕХ",
    type: "галерея",
    position: [56.322352, 44.011871],
    hours: "вт-вс 12:00–21:00",
    schedule: "Арт-проекты и визуальные исследования",
    description: "Индустриальное пространство с креативными выставками.",
    link: "https://tseh.space",
    address: "Варварская ул., 32",
    contact: "+7 (920) 252-37-63",
  },
  {
    id: 20,
    name: "Галерея шоколада",
    type: "галерея",
    position: [56.352328, 43.870973],
    hours: "пн-пт 10:00–17:00",
    schedule: "Выставки сладкого искусства",
    description: "Необычная галерея, объединяющая искусство и кулинарию.",
    link: "https://shokolad52.ru",
    address: "ул. Дмитрия Павлова, 13А",
    contact: "+7 (831) 274-66-80",
  },
  {
    id: 21,
    name: "Центральная районная библиотека им. Т.Г. Шевченко",
    type: "библиотека",
    position: [56.269924, 43.976798],
    hours: "10:00–18:00",
    schedule: "Клубы, лекции, читальные залы",
    description: "Одна из старейших районных библиотек города.",
    link: "https://приокбиблио.рф",
    address: "просп. Гагарина, 112",
    contact: "+7 (831) 465-21-22",
  },
  {
    id: 22,
    name: "Нижегородская государственная областная универсальная научная библиотека им. В.И. Ленина",
    type: "библиотека",
    position: [56.325131, 44.007534],
    hours: "пн-чт 09:00–20:00; пт-вс 10:00–18:00",
    schedule: "Выставки, встречи, архивы",
    description: "Главная библиотека области с огромным книжным фондом.",
    link: "ngounb.ru",
    address: "Варварская улица, 3",
    contact: "+7 831 419-41-54",
  },
  {
    id: 23,
    name: "Библиотека им. С.В. Михалкова",
    type: "библиотека",
    position: [56.262030, 44.002500],
    hours: "пн-пт 09:30–18:00; вс 09:00–17:30",
    schedule: "Детские чтения и мероприятия",
    description: "Детская библиотека с творческими программами.",
    link: "https://приокбиблио.рф",
    address: "Анкудиновское шоссе, 30",
    contact: "+7 (831) 431-25-14",
  },
  {
    id: 24,
    name: "Центральная библиотека им. В.И. Ленина г. Нижнего Новгорода",
    type: "библиотека",
    position: [56.324000, 43.956547],
    hours: "09:00–19:00",
    schedule: "Книжные клубы и выставки",
    description: "Крупнейшая библиотека региона, предлагающая читателям доступ к обширному фонду книг и образовательным мероприятиям.",
    link: "https://biblionn.ru",
    address: "Советская ул., 16",
    contact: "+7 (831) 246-41-02",
  },
  {
    id: 25,
    name: "Библиотека им. А.С. Попова",
    type: "библиотека",
    position: [56.256701, 43.985986],
    hours: "пн-пт 09:30–18:00; вс 09:00–17:30",
    schedule: "Литературные вечера",
    description: "Культурный центр с регулярными встречами читателей.",
    link: "https://приокбиблио.рф",
    address: "Горная ул., 30",
    contact: "+7 (831) 465-01-93",
  },
  {
    id: 26,
    name: "Центральная районная библиотека им. А.С. Пушкина г. Нижний Новгород",
    type: "библиотека",
    position: [56.329271, 43.872270],
    hours: "пн-пт 10:00–18:00; вс 10:00–17:00",
    schedule: "Клубы и выставки",
    description: "Крупная библиотека с богатой программой.",
    link: "https://biblmr.r52.ru",
    address: "Березовская ул., 96А",
    contact: "+7 (831) 224-58-80",
  },
  {
    id: 27,
    name: "Кафе Biblioteca",
    type: "библиотека",
    position: [56.317135, 43.995079],
    hours: "11:00–22:00",
    schedule: "Кафе и книжный уголок",
    description: "Уютное место для кофе и чтения.",
    link: "https://biblioteca-nn.ru",
    address: "Большая Покровская ул., 46",
    contact: "+7 (831) 433-69-34",
  },
  {
    id: 28,
    name: "Нижегородский государственный академический театр драмы имени М. Горького",
    type: "театр",
    position: [56.324128, 44.001458],
    hours: "10:00–13:20;14:00–16:00;16:15–20:00",
    schedule: "Спектакли ежедневно",
    description: "Один из старейших театров России с богатым репертуаром.",
    link: "https://drama.nnov.ru",
    address: "Большая Покровская ул., 13",
    contact: "+7 (831) 419-51-73",
  },
  {
    id: 29,
    name: "Нижегородский театр комедии",
    type: "театр",
    position: [56.320387, 44.002252],
    hours: "10:00–22:00",
    schedule: "Комедийные постановки",
    description: "Театр, специализирующийся на лёгких и весёлых спектаклях.",
    link: "https://comedy.nnov.ru",
    address: "Грузинская улица, 23",
    contact: "+7 831 434-04-24",
  },
  {
    id: 30,
    name: "Театр юного зрителя",
    type: "театр",
    position: [56.316545, 44.010511],
    hours: "10:00–14:15;15:00–19:00",
    schedule: "Детские спектакли и программы",
    description: "Театр для детей и подростков с увлекательными постановками.",
    link: "https://tyuz.ru",
    address: "ул. Максима Горького, 145",
    contact: "+7 (831) 428-00-00",
  },
  {
    id: 31,
    name: "Нижегородский государственный академический театр оперы и балета имени А. С. Пушкина",
    type: "театр",
    position: [56.315830, 44.016955],
    hours: "10:30–20:00",
    schedule: "Опера и балет",
    description: "Главный оперный театр города с богатой историей.",
    link: "https://www.operann.ru/",
    address: "ул. Белинского, 59",
    contact: "+7 831 234 05 34",
  },
  {
    id: 32,
    name: "Нижегородский государственный академический театр кукол",
    type: "театр",
    position: [56.318407, 43.995999],
    hours: "10:00–18:30",
    schedule: "Кукольные представления",
    description: "Сказочный театр для детей и семейного просмотра.",
    link: "https://www.ngatk.ru",
    address: "Большая Покровская ул., 39Б",
    contact: "+7 (831) 215-12-00",
  },
  {
    id: 33,
    name: "Нетеатр",
    type: "театр",
    position: [56.324691, 44.004150],
    hours: "11:00–22:00",
    schedule: "Современные спектакли",
    description: "Независимый театр с экспериментальными постановками.",
    link: "https://neteatr.ru/",
    address: "Большая Покровская ул., 4Д",
    contact: "+7 (930) 665-00-13",
  },
  {
    id: 34,
    name: "Академия видео Ты-звезда",
    type: "школа искусств",
    position: [56.315376, 44.022255],
    hours: "пн-пт 16:45–21:00; сб-вс 10:00–18:00",
    schedule: "Занятия ежедневно",
    description: "Креативная студия для будущих видеоблогеров.",
    link: "https://akademia.planet-t.ru",
    address: "ул. Дунаева, 8",
    contact: "+7 (915) 933-02-02",
  },
  {
    id: 35,
    name: "Детская школа искусств №8 им. В. Ю. Виллуана",
    type: "школа искусств",
    position: [56.324132, 44.008804],
    hours: "пн-чт 08:30–17:30; пт 08:30–16:30",
    schedule: "Музыкальные и художественные классы",
    description: "Одна из ведущих школ искусств в Нижнем Новгороде.",
    link: "https://villuanschool.ru",
    address: "Варварская ул., 5",
    contact: "+7 (831) 419-87-49",
  },
  {
    id: 36,
    name: "Детская школа искусств №6 им. А. А. Касьянова",
    type: "школа искусств",
    position: [56.282903, 44.037620],
    hours: "пн-сб 09:00–20:00",
    schedule: "Музыкальные отделения",
    description: "Образовательное учреждение с богатой историей.",
    link: "http://www.дши6.рф",
    address: "ул. Маршала Рокоссовского, 10",
    contact: "+7 (831) 214-09-66",
  }
];


const icons = {
  музей: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/1825/1825814.png",
    iconSize: [30, 30],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30],
  }),
  театр: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/1778/1778557.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  библиотека: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/3875/3875536.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  галерея: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/8077/8077696.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  "дом культуры": new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2933/2933168.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  "школа искусств": new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/8093/8093232.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
};

const types = [
  { key: "все", label: { ru: "Все", en: "All", zh: "全部" } },
  { key: "музей", label: { ru: "Музей", en: "Museum", zh: "博物馆" } },
  { key: "театр", label: { ru: "Театр", en: "Theater", zh: "剧院" } },
  { key: "библиотека", label: { ru: "Библиотека", en: "Library", zh: "图书馆" } },
  { key: "галерея", label: { ru: "Галерея", en: "Gallery", zh: "画廊" } },
  { key: "дом культуры", label: { ru: "Дом Культуры", en: "House of Culture", zh: "文化之家" } },
  { key: "школа искусств", label: { ru: "Школа Искусств", en: "School of Arts", zh: "艺术学院" } },
];

function LocateButton() {
  const map = useMap();
  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        map.setView([latitude, longitude], 14);
      });
    }
  };
  return (
    <button
      onClick={handleClick}
      className="absolute z-[1000] top-24 right-4 bg-white text-black rounded-full shadow-md px-3 py-2"
    >
      <LocateFixed className="w-4 h-4 mr-2" /> Найти меня
    </button>
  );
}
function ThemeToggle({ dark, setDark }) {
  return (
    <button

      className="absolute top-4 left-4 z-[1000] bg-white rounded-full p-2 shadow hover:bg-slate-100"
    >
      {dark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-800" />}
    </button>
  );
}

function LanguageSwitcher() {
  return (
    <div className="absolute top-4 left-20 z-[1000] bg-white rounded p-1 shadow space-x-2">
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("все");
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const filteredPlaces = places.filter(
    (place) =>
      (filter === "все" || place.type === filter) &&
      (place.name.toLowerCase().includes(search.toLowerCase()) ||
      place[`name_${lang}`]?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", overflow: "hidden" }}>
      <aside style={{
        width: "260px",
        backgroundColor: "#1e293b",
        color: "white",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem"
      }}>
        <h2 className="text-xl font-bold">{t("categories")}</h2>
        {types.map((type) => (
          <Button
            key={type.key}
            variant={filter === type.key ? "default" : "secondary"}
            onClick={() => setFilter(type.key)}
            className="w-full"
          >
            {type.label[lang]}
          </Button>
        ))}
        <Input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-2"
        />
      </aside>
  
      <div style={{ flex: 1, height: "100%", width: "100%" }}>
        <MapContainer
          center={[56.3287, 44.002]}
          zoom={13}
          minZoom={13}
          maxZoom={18}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          maxBounds={[[56.19, 43.75], [56.40, 44.15]]} // <-- ВАЖНО: сюда добавили ограничение
          maxBoundsViscosity={1.0}
        >
          
          <TileLayer
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://carto.com/">Carto</a>'
/>
          {filteredPlaces.map((place) => (
            <Marker
              key={place.id}
              position={place.position}
              icon={icons[place.type]}
            >
              <Popup>
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="w-64">
      <CardContent className="space-y-2 p-3">
        <h3 className="font-bold text-lg">{place[`name_${lang}`] || place.name}</h3>
        {place.description && <p className="text-sm text-gray-700">{place.description}</p>}
        <p>🕒 {t("hours")}: {place.hours}</p>
        <p>🎭 {t("schedule")}: {place.schedule}</p>
        <p>📍 {t("address")}: {place.address}</p>
        <p>📞 {t("contact")}: {place.contact}</p>
        <a
          href={place.link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 underline"
        >
          {t("website")}
        </a>
      </CardContent>
    </Card>
  </motion.div>
</Popup>

            </Marker>
          ))}
          <LocateButton />
          <ThemeToggle dark={dark} setDark={setDark} />
          <LanguageSwitcher />
        </MapContainer>
        <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 1000 }}>
      <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
        <option value="ru">RU</option>
        <option value="en">EN</option>
        <option value="zh">ZH</option>
      </select>
    </div>
      </div>
    </div>
  );  
}