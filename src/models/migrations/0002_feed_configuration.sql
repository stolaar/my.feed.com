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
    user_role_id serial PRIMARY KEY,
    user_id    INTEGER NOT NULL,
    role       VARCHAR(255),
    created_at TIMESTAMP default NOW(),
    updated_at TIMESTAMP default NOW(),
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
            REFERENCES users (user_id)
            ON DELETE CASCADE
);

create TABLE if not exists feed_selectors
(
   feed_selectors_id  serial PRIMARY KEY,
   wrapper VARCHAR(255),
   article VARCHAR(255),
   title VARCHAR(255),
   description VARCHAR(255),
   image VARCHAR(255),
   link VARCHAR(255),
   created_at TIMESTAMP default NOW(),
   updated_at TIMESTAMP default NOW()
);

create TABLE if not exists feed_configuration
(
   feed_configuration_id    serial PRIMARY KEY,
   uri VARCHAR(255),
   label VARCHAR(255),
   feed_selectors_id INTEGER NOT NULL,
   created_at TIMESTAMP default NOW(),
   updated_at TIMESTAMP default NOW(),
       CONSTRAINT fk_selectors
       FOREIGN KEY (feed_selectors_id)
       REFERENCES feed_selectors (feed_selectors_id)
       ON DELETE CASCADE
);

create TABLE if not exists user_configurations
(
    user_configuration_id serial PRIMARY KEY,
    feed_configuration_id  INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_configuration
        FOREIGN KEY (feed_configuration_id)
            REFERENCES feed_configuration (feed_configuration_id)
            ON DELETE CASCADE,
     CONSTRAINT fk_users
     FOREIGN KEY (user_id)
     REFERENCES users (user_id)
     ON DELETE CASCADE
);
