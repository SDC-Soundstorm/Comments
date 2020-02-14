## API Routes for Comments Component

- Create : Adds comment to database
  - Type = POST
  - Url = `page/:page_id/comments`
  - Req.body = {comment-text, songTimeStamp, postDate, parentCommentId, userId}
  - Returns = None 
- Read: Gets all comments for specific page
  - Type = GET
  - Url = `page/:page_id/comments`
  - Returns = array of comments for the page 

- Update: Updates a comment (when user edits)
  - Type = PATCH 
  - Url = `page/:page_id/comments/:comment_id`
  - Req.body = {comment_text: newComment}
  - Returns = None

- Delete: Remove comment/ all its replies
  - Type = DELETE
  - Url = `page/:page_id/comments/:comment_id`
  - Returns = None



