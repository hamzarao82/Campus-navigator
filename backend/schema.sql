CREATE TABLE IF NOT EXISTS locations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK(type IN ('building', 'room', 'poi')) NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  latitude REAL,
  longitude REAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_name ON locations(name);
CREATE INDEX IF NOT EXISTS idx_type ON locations(type);
CREATE INDEX IF NOT EXISTS idx_location ON locations(location);

CREATE TABLE IF NOT EXISTS search_history (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  query TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_id ON search_history(user_id);
CREATE INDEX IF NOT EXISTS idx_created_at ON search_history(created_at);
