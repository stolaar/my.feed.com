create TABLE if not exists users
(
    user_id    serial PRIMARY KEY,
    name       VARCHAR(255),
    email      VARCHAR(255),
    password   VARCHAR(255),
    created_at TIMESTAMP default NOW(),
    updated_at TIMESTAMP default NOW()
);

create TABLE if not exists tokens
(
    token_id   serial PRIMARY KEY,
    user_id    INTEGER NOT NULL,
    token      TEXT,
    created_at TIMESTAMP default NOW(),
    updated_at TIMESTAMP default NOW(),
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
            REFERENCES users (user_id)
            ON DELETE CASCADE
);

create TABLE IF NOT EXISTS user_roles
(
    user_id    INTEGER NOT NULL,
    role       VARCHAR(255),
    created_at TIMESTAMP default NOW(),
    updated_at TIMESTAMP default NOW(),
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
            REFERENCES users (user_id)
            ON DELETE CASCADE
);
