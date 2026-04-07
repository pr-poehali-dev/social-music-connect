CREATE TABLE IF NOT EXISTS chat_rooms (
  id SERIAL PRIMARY KEY,
  user1_id TEXT NOT NULL,
  user2_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user1_id, user2_id)
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id SERIAL PRIMARY KEY,
  room_id INTEGER NOT NULL REFERENCES chat_rooms(id),
  sender_id TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_room_id ON chat_messages(room_id, created_at);
