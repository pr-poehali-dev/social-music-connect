import { useState } from "react";
import { Sidebar, RightSidebar } from "@/components/social/Sidebar";
import { MainContent } from "@/components/social/MainContent";

export default function Index() {
  const [active, setActive] = useState("feed");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [postLikes, setPostLikes] = useState<Record<number, boolean>>({ 2: true });
  const [playingTrack, setPlayingTrack] = useState<number | null>(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [newPost, setNewPost] = useState("");
  const [addedFriends, setAddedFriends] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setPostLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-mesh font-rubik flex overflow-hidden">
      {/* Sidebar с анимацией */}
      <div
        className="flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden"
        style={{ width: sidebarOpen ? "256px" : "0px" }}
      >
        <Sidebar active={active} setActive={setActive} onToggle={() => setSidebarOpen(false)} />
      </div>

      <MainContent
        active={active}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(o => !o)}
        postLikes={postLikes}
        toggleLike={toggleLike}
        playingTrack={playingTrack}
        setPlayingTrack={setPlayingTrack}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        newPost={newPost}
        setNewPost={setNewPost}
        addedFriends={addedFriends}
        setAddedFriends={setAddedFriends}
      />

      {(active === "feed" || active === "search") && (
        <RightSidebar setPlayingTrack={setPlayingTrack} />
      )}
    </div>
  );
}
