import Icon from "@/components/ui/icon";
import { AVATAR_ME, POST_IMG, MUSIC_IMG, friends, stories, posts, musicRecs, messages } from "./data";

interface MainContentProps {
  active: string;
  postLikes: Record<number, boolean>;
  toggleLike: (id: number) => void;
  playingTrack: number | null;
  setPlayingTrack: (id: number | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  newPost: string;
  setNewPost: (v: string) => void;
  addedFriends: number[];
  setAddedFriends: (fn: (prev: number[]) => number[]) => void;
}

export function MainContent({
  active,
  postLikes,
  toggleLike,
  playingTrack,
  setPlayingTrack,
  searchQuery,
  setSearchQuery,
  newPost,
  setNewPost,
  addedFriends,
  setAddedFriends,
}: MainContentProps) {
  return (
    <main className="flex-1 overflow-y-auto scrollbar-hide">

      {/* ── ЛЕНТА ── */}
      {active === "feed" && (
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 animate-fade-in">
          {/* Create post */}
          <div className="glass-bright rounded-2xl p-4">
            <div className="flex gap-3">
              <div className="story-ring w-10 h-10 flex-shrink-0">
                <img src={AVATAR_ME} alt="Я" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={e => setNewPost(e.target.value)}
                  placeholder="Что у тебя нового?"
                  className="w-full bg-transparent text-white/80 placeholder:text-white/30 text-sm resize-none outline-none min-h-[48px]"
                  rows={2}
                />
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                  <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-neon-purple transition-colors px-3 py-1.5 rounded-lg hover:bg-neon-purple/10">
                    <Icon name="Image" size={14} />Фото
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-neon-pink transition-colors px-3 py-1.5 rounded-lg hover:bg-neon-pink/10">
                    <Icon name="Music2" size={14} />Музыка
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-neon-blue transition-colors px-3 py-1.5 rounded-lg hover:bg-neon-blue/10">
                    <Icon name="Smile" size={14} />Настроение
                  </button>
                  <button className="ml-auto gradient-bg text-white text-xs font-semibold px-4 py-1.5 rounded-lg hover:scale-105 transition-transform">
                    Опубликовать
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stories */}
          <div className="glass-bright rounded-2xl p-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
              {stories.map((story, i) => (
                <div key={story.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
                  style={{ animationDelay: `${i * 0.05}s` }}>
                  {story.isMe ? (
                    <div className="relative w-14 h-14 rounded-full glass border border-white/10 flex items-center justify-center hover:border-neon-purple/50 transition-all">
                      <Icon name="Plus" size={20} className="text-white/50 group-hover:text-neon-purple transition-colors" />
                    </div>
                  ) : (
                    <div className="story-ring w-14 h-14 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <img src={story.avatar} alt={story.name} className="w-[52px] h-[52px] rounded-full object-cover m-[2px]" />
                    </div>
                  )}
                  <span className="text-[10px] text-white/50 group-hover:text-white/80 transition-colors">{story.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Posts */}
          {posts.map((post, i) => (
            <div key={post.id} className="glass-bright rounded-2xl overflow-hidden animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="story-ring w-10 h-10">
                    <img src={post.avatar} alt={post.user} className="w-9 h-9 rounded-full object-cover m-[2px]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{post.user}</p>
                    <p className="text-xs text-white/40">{post.time}</p>
                  </div>
                  <button className="text-white/30 hover:text-white/60 transition-colors">
                    <Icon name="MoreHorizontal" size={16} />
                  </button>
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-3">{post.text}</p>
              </div>
              {post.image && (
                <div className="relative">
                  <img src={post.image} alt="" className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              )}
              <div className="px-4 py-3 flex items-center gap-1 border-t border-white/5">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all hover:scale-105
                    ${postLikes[post.id] ? "text-neon-pink bg-neon-pink/10" : "text-white/40 hover:text-neon-pink hover:bg-neon-pink/10"}`}
                >
                  <Icon name="Heart" size={16} />
                  <span className="font-medium">{post.likes + (postLikes[post.id] ? 1 : 0)}</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-white/40 hover:text-neon-blue hover:bg-neon-blue/10 transition-all">
                  <Icon name="MessageCircle" size={16} />
                  <span className="font-medium">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-white/40 hover:text-neon-green hover:bg-neon-green/10 transition-all">
                  <Icon name="Repeat2" size={16} />
                  <span className="font-medium">{post.reposts}</span>
                </button>
                <button className="ml-auto p-2 rounded-xl text-white/30 hover:text-neon-purple hover:bg-neon-purple/10 transition-all">
                  <Icon name="Bookmark" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── ДРУЗЬЯ ── */}
      {active === "friends" && (
        <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
          <div className="mb-6">
            <h2 className="font-golos font-bold text-2xl text-white mb-1">Друзья</h2>
            <p className="text-sm text-white/40">Умные рекомендации на основе твоих интересов</p>
          </div>
          <div className="flex gap-2 mb-6">
            {["Рекомендации", "Все друзья", "Заявки"].map((tab, i) => (
              <button key={i}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                  ${i === 0 ? "gradient-bg text-white glow" : "glass text-white/50 hover:text-white/80"}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {friends.map((friend, i) => (
              <div key={friend.id} className="glass-bright rounded-2xl p-4 flex items-center gap-4 animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="story-ring w-14 h-14 flex-shrink-0">
                  <img src={friend.avatar} alt={friend.name} className="w-[52px] h-[52px] rounded-full object-cover m-[2px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{friend.name}</p>
                  <p className="text-xs text-white/40 mt-0.5">{friend.tag}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full gradient-bg rounded-full" style={{ width: `${friend.match}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-neon-purple">{friend.match}%</span>
                  </div>
                </div>
                <button
                  onClick={() => setAddedFriends(prev =>
                    prev.includes(friend.id) ? prev.filter(id => id !== friend.id) : [...prev, friend.id]
                  )}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105 flex-shrink-0
                    ${addedFriends.includes(friend.id) ? "bg-white/10 text-white/60" : "gradient-bg text-white glow"}`}
                >
                  {addedFriends.includes(friend.id) ? "Добавлен" : "Добавить"}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 glass rounded-2xl p-4 flex items-center gap-3 border border-neon-purple/20">
            <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
              <Icon name="Sparkles" size={14} className="text-white" />
            </div>
            <p className="text-xs text-white/50">ИИ анализирует твои интересы и подбирает людей с максимальной совместимостью</p>
          </div>
        </div>
      )}

      {/* ── СООБЩЕНИЯ ── */}
      {active === "messages" && (
        <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-golos font-bold text-2xl text-white">Сообщения</h2>
              <p className="text-sm text-white/40">4 непрочитанных</p>
            </div>
            <button className="gradient-bg text-white p-2.5 rounded-xl hover:scale-105 transition-transform glow">
              <Icon name="Plus" size={18} />
            </button>
          </div>
          <div className="relative mb-4">
            <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              placeholder="Поиск по чатам..."
              className="w-full glass rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 outline-none"
            />
          </div>
          <div className="space-y-2">
            {messages.map((msg, i) => (
              <div key={msg.id} className="glass-bright rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:border-neon-purple/20 transition-all animate-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="relative flex-shrink-0">
                  <div className={msg.unread > 0 ? "story-ring w-12 h-12" : "w-12 h-12"}>
                    <img src={msg.avatar} alt={msg.name}
                      className={`object-cover rounded-full ${msg.unread > 0 ? "w-[44px] h-[44px] m-[2px]" : "w-full h-full"}`} />
                  </div>
                  {msg.unread > 0 && (
                    <span className="absolute -top-1 -right-1 text-[10px] bg-neon-pink text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">
                      {msg.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className={`text-sm font-semibold ${msg.unread > 0 ? "text-white" : "text-white/70"}`}>{msg.name}</p>
                    <span className="text-[10px] text-white/30">{msg.time}</span>
                  </div>
                  <p className="text-xs text-white/40 truncate">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── МУЗЫКА ── */}
      {active === "music" && (
        <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
          <div className="mb-6">
            <h2 className="font-golos font-bold text-2xl text-white mb-1">Музыка</h2>
            <p className="text-sm text-white/40">Персональные рекомендации на основе вкусов</p>
          </div>

          {/* Now playing */}
          {playingTrack && (
            <div className="relative rounded-2xl overflow-hidden mb-6 animate-scale-in">
              <img src={MUSIC_IMG} alt="cover" className="w-full h-52 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-neon-purple font-semibold tracking-widest uppercase mb-1">Сейчас играет</p>
                    <p className="text-white font-bold text-lg font-golos">Бесконечность</p>
                    <p className="text-white/60 text-sm">Miyagi & Эндшпиль</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-white/50 hover:text-white transition-colors">
                      <Icon name="SkipBack" size={20} />
                    </button>
                    <button
                      onClick={() => setPlayingTrack(null)}
                      className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center glow hover:scale-105 transition-transform"
                    >
                      <Icon name="Pause" size={20} className="text-white" />
                    </button>
                    <button className="text-white/50 hover:text-white transition-colors">
                      <Icon name="SkipForward" size={20} />
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="h-1 bg-white/20 rounded-full">
                    <div className="h-full w-2/5 gradient-bg rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {!playingTrack && (
            <div
              className="glass-bright rounded-2xl p-5 mb-6 flex items-center justify-center gap-4 cursor-pointer hover:border-neon-purple/30 transition-all"
              onClick={() => setPlayingTrack(2)}
            >
              <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center glow">
                <Icon name="Play" size={20} className="text-white ml-0.5" />
              </div>
              <div>
                <p className="text-sm text-white/60">Нажми, чтобы продолжить</p>
                <p className="text-xs text-neon-purple">Бесконечность — Miyagi & Эндшпиль</p>
              </div>
            </div>
          )}

          <h3 className="font-golos font-semibold text-white mb-3">Рекомендации для тебя</h3>
          <div className="space-y-2">
            {musicRecs.map((track, i) => (
              <div key={track.id}
                className={`glass-bright rounded-2xl p-3 flex items-center gap-3 cursor-pointer transition-all hover:border-neon-purple/20 animate-fade-up
                  ${playingTrack === track.id ? "border-neon-purple/30 bg-neon-purple/5" : ""}`}
                style={{ animationDelay: `${i * 0.08}s` }}
                onClick={() => setPlayingTrack(track.id === playingTrack ? null : track.id)}
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                  {playingTrack === track.id && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="flex gap-0.5 items-end h-5">
                        {[3, 5, 2, 4].map((h, j) => (
                          <div key={j} className="w-1 gradient-bg rounded-full animate-pulse"
                            style={{ height: `${h * 3}px` }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${playingTrack === track.id ? "text-neon-purple" : "text-white"}`}>{track.title}</p>
                  <p className="text-xs text-white/40 truncate">{track.artist}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-white/30">{track.duration}</span>
                  <button className="text-white/30 hover:text-neon-pink transition-colors" onClick={e => e.stopPropagation()}>
                    <Icon name="Heart" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 glass rounded-2xl p-4 flex items-center gap-3 border border-neon-blue/20">
            <div className="w-8 h-8 rounded-xl bg-neon-blue/20 flex items-center justify-center flex-shrink-0">
              <Icon name="Sparkles" size={14} className="text-neon-blue" />
            </div>
            <p className="text-xs text-white/50">ИИ анализирует твои прослушивания и подбирает треки, которые тебе точно понравятся</p>
          </div>
        </div>
      )}

      {/* ── ПОИСК ── */}
      {active === "search" && (
        <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
          <h2 className="font-golos font-bold text-2xl text-white mb-6">Поиск</h2>
          <div className="relative mb-6">
            <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Люди, музыка, посты..."
              className="w-full glass-bright rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-white/30 outline-none text-sm"
            />
          </div>
          <div className="mb-6">
            <p className="text-xs text-white/30 font-semibold tracking-widest uppercase mb-3">В тренде</p>
            <div className="flex flex-wrap gap-2">
              {["#музыка", "#питер", "#кино", "#арт", "#техно", "#путешествия", "#фотография", "#вечеринки"].map((tag, i) => (
                <button key={i} className="glass px-3 py-1.5 rounded-xl text-xs text-white/60 hover:text-neon-purple hover:border-neon-purple/30 transition-all">
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-white/30 font-semibold tracking-widest uppercase mb-3">Рекомендуем</p>
          <div className="space-y-2">
            {friends.slice(0, 3).map((f, i) => (
              <div key={f.id} className="glass-bright rounded-2xl p-3 flex items-center gap-3 animate-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}>
                <img src={f.avatar} alt={f.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{f.name}</p>
                  <p className="text-xs text-white/40">{f.tag}</p>
                </div>
                <span className="text-xs text-neon-purple font-semibold">{f.match}% совпадение</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ПРОФИЛЬ ── */}
      {active === "profile" && (
        <div className="animate-fade-in">
          <div className="relative h-48 overflow-hidden">
            <img src={POST_IMG} alt="cover" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/30 to-transparent" />
            <div className="absolute inset-0 opacity-40" style={{ background: "linear-gradient(135deg, rgba(155,89,240,0.3), rgba(240,89,184,0.2))" }} />
            <button className="absolute top-4 right-4 glass px-3 py-1.5 rounded-xl text-xs text-white/70 flex items-center gap-1.5 hover:text-white transition-colors">
              <Icon name="Camera" size={12} />Изменить
            </button>
          </div>
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex items-end gap-4 -mt-10 mb-6">
              <div className="story-ring w-20 h-20 flex-shrink-0">
                <img src={AVATAR_ME} alt="Я" className="w-[72px] h-[72px] rounded-full object-cover m-[4px]" />
              </div>
              <div className="flex-1 pb-1">
                <h2 className="font-golos font-black text-2xl text-white">Алекс Чернов</h2>
                <p className="text-sm text-white/40">@alexchernov · Москва</p>
              </div>
              <button className="glass px-4 py-2 rounded-xl text-sm text-white/70 hover:text-white transition-colors flex-shrink-0">
                Редактировать
              </button>
            </div>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              Люблю музыку, фотографию и ночные прогулки по городу 🎵 Цифровой кочевник. Всегда ищу новые впечатления.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[{ label: "Постов", value: "142" }, { label: "Друзей", value: "1.4K" }, { label: "Подписчиков", value: "8.2K" }].map((stat, i) => (
                <div key={i} className="glass-bright rounded-2xl p-4 text-center">
                  <p className="font-golos font-black text-2xl neon-text">{stat.value}</p>
                  <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mb-6">
              <p className="text-xs text-white/30 font-semibold tracking-widest uppercase mb-3">Интересы</p>
              <div className="flex flex-wrap gap-2">
                {["🎵 Музыка", "📸 Фото", "✈️ Путешествия", "🎬 Кино", "🎮 Игры", "🍕 Еда"].map((int, i) => (
                  <span key={i} className="neon-border px-3 py-1.5 rounded-xl text-xs text-neon-purple font-medium">{int}</span>
                ))}
              </div>
            </div>
            <p className="text-xs text-white/30 font-semibold tracking-widest uppercase mb-3">Посты</p>
            <div className="grid grid-cols-3 gap-2 pb-6">
              {[POST_IMG, MUSIC_IMG, POST_IMG, MUSIC_IMG, POST_IMG, MUSIC_IMG].map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer group">
                  <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── НАСТРОЙКИ ── */}
      {active === "settings" && (
        <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
          <h2 className="font-golos font-bold text-2xl text-white mb-6">Настройки</h2>
          {[
            { title: "Аккаунт", items: [{ icon: "User", label: "Редактировать профиль" }, { icon: "Lock", label: "Приватность" }, { icon: "Bell", label: "Уведомления" }] },
            { title: "Рекомендации ИИ", items: [{ icon: "Sparkles", label: "Персонализация ленты" }, { icon: "Users", label: "Умный поиск друзей" }, { icon: "Music", label: "Музыкальные рекомендации" }] },
            { title: "Оформление", items: [{ icon: "Palette", label: "Тема интерфейса" }, { icon: "Type", label: "Размер шрифта" }, { icon: "Monitor", label: "Вид ленты" }] },
            { title: "Прочее", items: [{ icon: "HelpCircle", label: "Помощь и поддержка" }, { icon: "LogOut", label: "Выйти из аккаунта" }] },
          ].map((section, si) => (
            <div key={si} className="mb-6">
              <p className="text-xs text-white/30 font-semibold tracking-widest uppercase mb-2">{section.title}</p>
              <div className="glass-bright rounded-2xl overflow-hidden">
                {section.items.map((item, ii) => (
                  <button key={ii}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all
                      ${ii < section.items.length - 1 ? "border-b border-white/5" : ""}`}>
                    <Icon name={item.icon} size={16} className="text-neon-purple" />
                    {item.label}
                    <Icon name="ChevronRight" size={14} className="ml-auto text-white/20" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
