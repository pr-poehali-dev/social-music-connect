import { useState } from "react";
import { Sidebar, RightSidebar } from "@/components/social/Sidebar";
import { MainContent } from "@/components/social/MainContent";

export default function Index() {
  const [active, setActive] = useState("feed");
  const [postLikes, setPostLikes] = useState<Record<number, boolean>>({ 2: true });
  const [playingTrack, setPlayingTrack] = useState<number | null>(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [newPost, setNewPost] = useState("");
  const [addedFriends, setAddedFriends] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setPostLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-mesh font-rubik flex">
      <Sidebar active={active} setActive={setActive} />

      <MainContent
        active={active}
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
