create TABLE users (
    user_id serial PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

create TABLE tokens (
    token_id serial PRIMARY KEY,
    user_id INTEGER NOT NULL,
    token TEXT,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	  REFERENCES users(user_id)
	  ON DELETE CASCADE
);

create TABLE IF NOT EXISTS user_roles (
    user_id     INTEGER NOT NULL,
    role        VARCHAR(255),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	  REFERENCES users(user_id)
	  ON DELETE CASCADE
);
