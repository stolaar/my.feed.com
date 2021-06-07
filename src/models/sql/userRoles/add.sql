INSERT INTO ${schema~}.user_roles(user_id, role)
VALUES (${user_id}, ${role}) RETURNING *