module.exports = {
  getUserByToken: require('./get-user-by-token'),
  authenticateCurrentUserByToken: require('./authenticate-current-user-by-token'),
  checkValidation: require('./check-validation'),
  getUserByToken: require('./get-user-by-token'),
  post: {
    getPostById: require('./posts/get-post-by-id')
  },
  myPost: {
    getCurrentUserPostById: require('./my-posts/get-current-user-post-by-id')
  },
  myComment: {
    getCurrentUserCommentById: require('./my-posts/get-current-user-comment-by-id')
  }
}
