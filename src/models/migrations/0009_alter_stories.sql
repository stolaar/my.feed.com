ALTER TABLE stories ADD COLUMN if not exists created_at TIMESTAMP DEFAULT NOW();
ALTER TABLE stories ADD COLUMN if not exists updated_at TIMESTAMP DEFAULT NOW();
