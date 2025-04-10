CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT
);

INSERT INTO users (name, email, phone)
VALUES
  ('Ali Yılmaz', 'ali@example.com', '05001234567'),
  ('Ayşe Demir', 'ayse@example.com', '05321234567');
