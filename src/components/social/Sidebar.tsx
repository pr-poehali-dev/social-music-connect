import Icon from "@/components/ui/icon";
import { AVATAR_ME, friends, musicRecs, navItems } from "./data";

interface SidebarProps {
  active: string;
  setActive: (id: string) => void;
  onToggle: () => void;
}

export function Sidebar({ active, setActive, onToggle }: SidebarProps) {
  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col glass border-r border-white/5 z-20">
      <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
        <div>
          <h1 className="font-golos font-black text-2xl neon-text tracking-tight">Вспышка</h1>
          <p className="text-xs text-white/40 mt-0.5">соцсеть нового поколения</p>
        </div>
        <button
          onClick={onToggle}
          className="text-white/30 hover:text-white/70 transition-colors p-1.5 rounded-lg hover:bg-white/5"
          title="Свернуть меню"
        >
          <Icon name="PanelLeftClose" size={18} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${active === item.id
                ? "nav-active text-neon-purple font-semibold"
                : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
          >
            <Icon name={item.icon} size={18} />
            <span className="text-sm">{item.label}</span>
            {item.id === "messages" && (
              <span className="ml-auto text-xs bg-neon-pink text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">4</span>
            )}
          </button>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="story-ring w-9 h-9 flex-shrink-0">
            <img src={AVATAR_ME} alt="Я" className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">Алекс Чернов</p>
            <p className="text-xs text-white/40">@alexchernov</p>
          </div>
          <button className="ml-auto text-white/30 hover:text-white/70 transition-colors">
            <Icon name="MoreHorizontal" size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

interface RightSidebarProps {
  setPlayingTrack: (id: number) => void;
}

export function RightSidebar({ setPlayingTrack }: RightSidebarProps) {
  return (
    <aside className="w-72 h-screen sticky top-0 flex flex-col glass border-l border-white/5 overflow-y-auto scrollbar-hide flex-shrink-0">
      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/30 font-semibold tracking-widest uppercase">Люди рядом</p>
            <button className="text-xs text-neon-purple hover:text-neon-pink transition-colors">Все</button>
          </div>
          <div className="space-y-2">
            {friends.slice(0, 3).map(f => (
              <div key={f.id} className="flex items-center gap-2.5">
                <img src={f.avatar} alt={f.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white/80 truncate">{f.name}</p>
                  <p className="text-[10px] text-neon-purple">{f.match}% совпадение</p>
                </div>
                <button className="text-[10px] gradient-bg text-white px-2 py-1 rounded-lg hover:scale-105 transition-transform flex-shrink-0">
                  +
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 pt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/30 font-semibold tracking-widest uppercase">Музыка для тебя</p>
            <button className="text-xs text-neon-purple hover:text-neon-pink transition-colors">Все</button>
          </div>
          <div className="space-y-2">
            {musicRecs.map(track => (
              <div key={track.id} className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setPlayingTrack(track.id)}>
                <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={track.cover} alt={track.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white/80 truncate">{track.title}</p>
                  <p className="text-[10px] text-white/40 truncate">{track.artist}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-neon-purple">
                  <Icon name="Play" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 pt-4">
          <p className="text-xs text-white/30 font-semibold tracking-widest uppercase mb-3">В тренде</p>
          <div className="space-y-2.5">
            {["#музыка", "#питер", "#кино"].map((tag, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-white/60 hover:text-neon-purple cursor-pointer transition-colors">{tag}</span>
                <span className="text-[10px] text-white/20">{[142, 98, 67][i]}K</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
