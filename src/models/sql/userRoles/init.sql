-- eslint-disable

INSERT INTO ${schema~}. user_roles(user_id, role)
VALUES ('1',
        "END_USER") RETURNING *