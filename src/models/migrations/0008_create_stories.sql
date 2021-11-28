CREATE TABLE IF NOT EXISTS stories
(
    story_id serial PRIMARY KEY,
    title    VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS story_posts
(
    story_post_id serial primary key,
    story_id      INT NOT NULL,
    post_id       INT NOT NULL,
    CONSTRAINT fk_story
        FOREIGN KEY (story_id)
            REFERENCES stories (story_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_post
        FOREIGN KEY (post_id)
            REFERENCES posts (post_id)
            ON DELETE CASCADE
);
