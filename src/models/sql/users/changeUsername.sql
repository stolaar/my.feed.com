UPDATE users
SET 
    podcast_username = ${user.podcast_username}
WHERE user_id = ${user.user_id} RETURNING *