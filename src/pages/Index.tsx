import { useState } from "react";
import { Sidebar, RightSidebar } from "@/components/social/Sidebar";
import { MainContent } from "@/components/social/MainContent";
import { MiniPlayer } from "@/components/social/MiniPlayer";
import { useAudioPlayer } from "@/components/social/useAudioPlayer";

export default function Index() {
  const [active, setActive] = useState("feed");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [postLikes, setPostLikes] = useState<Record<number, boolean>>({ 2: true });
  const [searchQuery, setSearchQuery] = useState("");
  const [newPost, setNewPost] = useState("");
  const [addedFriends, setAddedFriends] = useState<number[]>([]);

  const { state: playerState, controls: playerControls } = useAudioPlayer();

  const toggleLike = (id: number) => {
    setPostLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-mesh font-rubik flex overflow-hidden">
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
        playerState={playerState}
        playerControls={playerControls}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        newPost={newPost}
        setNewPost={setNewPost}
        addedFriends={addedFriends}
        setAddedFriends={setAddedFriends}
      />

      {(active === "feed" || active === "search") && (
        <RightSidebar playerControls={playerControls} playerState={playerState} />
      )}

      <MiniPlayer state={playerState} controls={playerControls} />
    </div>
  );
}
