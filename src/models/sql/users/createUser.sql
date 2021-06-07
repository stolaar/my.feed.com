INSERT INTO ${schema~}.users(name, email, password)
VALUES (${name},${email}, ${password}) RETURNING *
