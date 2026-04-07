export const AVATAR_ME = "https://cdn.poehali.dev/projects/a926dfc5-4427-4df6-8b21-00b605762dfe/files/05f4c130-a8db-4db3-ab96-1f903ae80bef.jpg";
export const POST_IMG = "https://cdn.poehali.dev/projects/a926dfc5-4427-4df6-8b21-00b605762dfe/files/32005369-6429-40d4-9ff3-caa0ade1a597.jpg";
export const MUSIC_IMG = "https://cdn.poehali.dev/projects/a926dfc5-4427-4df6-8b21-00b605762dfe/files/5ba1a3de-6874-44d7-b215-600b86c808a1.jpg";

export const friends = [
  { id: 1, name: "Маша К.", avatar: AVATAR_ME, match: 94, tag: "музыка, кино" },
  { id: 2, name: "Дима Л.", avatar: AVATAR_ME, match: 87, tag: "спорт, техно" },
  { id: 3, name: "Аня Р.", avatar: AVATAR_ME, match: 81, tag: "арт, путешествия" },
  { id: 4, name: "Костя В.", avatar: AVATAR_ME, match: 76, tag: "игры, музыка" },
];

export const stories = [
  { id: 1, name: "Ты", avatar: AVATAR_ME, isMe: true },
  { id: 2, name: "Маша", avatar: AVATAR_ME },
  { id: 3, name: "Дима", avatar: AVATAR_ME },
  { id: 4, name: "Аня", avatar: AVATAR_ME },
  { id: 5, name: "Лёша", avatar: AVATAR_ME },
  { id: 6, name: "Юля", avatar: AVATAR_ME },
];

export const posts = [
  {
    id: 1,
    user: "Аня Романова",
    avatar: AVATAR_ME,
    time: "2 часа назад",
    text: "Ночной Питер — это всегда магия ✨ Неоновые отражения, пустые улицы и ощущение, что город только для тебя",
    image: POST_IMG,
    likes: 248,
    comments: 34,
    reposts: 12,
  },
  {
    id: 2,
    user: "Дима Ларин",
    avatar: AVATAR_ME,
    time: "5 часов назад",
    text: "Новый трек уже на всех платформах 🎵 Месяц работы, бессонные ночи — и вот оно. Слушайте, делитесь, пишите что думаете!",
    image: null,
    likes: 189,
    comments: 67,
    reposts: 45,
  },
];

export const musicRecs = [
  { id: 1, title: "Pulse", artist: "MANIZHA", cover: MUSIC_IMG, duration: "3:24" },
  { id: 2, title: "Бесконечность", artist: "Miyagi & Эндшпиль", cover: MUSIC_IMG, duration: "4:12" },
  { id: 3, title: "Neon Dreams", artist: "IC3PEAK", cover: MUSIC_IMG, duration: "2:58" },
];

export const messages = [
  { id: 1, name: "Маша К.", avatar: AVATAR_ME, text: "Идёшь на вечеринку в субботу?", time: "сейчас", unread: 3 },
  { id: 2, name: "Дима Л.", avatar: AVATAR_ME, text: "Слушал новый альбом?", time: "5 мин", unread: 0 },
  { id: 3, name: "Аня Р.", avatar: AVATAR_ME, text: "Фото получились классные!", time: "1 ч", unread: 1 },
  { id: 4, name: "Костя В.", avatar: AVATAR_ME, text: "Ставим матч сегодня вечером", time: "3 ч", unread: 0 },
];

export const navItems = [
  { id: "feed", icon: "Home", label: "Лента" },
  { id: "friends", icon: "Users", label: "Друзья" },
  { id: "messages", icon: "MessageCircle", label: "Сообщения" },
  { id: "music", icon: "Music", label: "Музыка" },
  { id: "search", icon: "Search", label: "Поиск" },
  { id: "profile", icon: "User", label: "Профиль" },
  { id: "settings", icon: "Settings", label: "Настройки" },
];
