## API Routes for Comments Component

- Create : Adds comment to database
  - Type = POST
  - Url = `page/:page_id/user/:user_id/comments`
  - Data = {comment-text, songTimeStamp, postDate, parentCommentId}
  
- Read: Gets all comments for specific page
  - Type = GET
  - Url = `page/:page_id/comments`

- Update: Updates a comment (when user edits)
  - Type = PATCH 
  - Url = `page/:page_id/comments/:comment_id`
  - Data = {comment_text: newComment}

- Delete: Remove comment/ all its replies
  - Type = DELETE
  - Url = `page/:page_id/comments/:comment_id`



