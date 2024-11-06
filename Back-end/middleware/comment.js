export function formatComment(comment, user) {
  let { text , _id: id, vote } = comment;
  const { username, picture, isHasPicture } = user;
  vote = {
    up: vote.up,
    down: vote.down,
  };
  return {
    id,
    username,
    isHasPicture,
    picture,
    text,
    vote,
  };
}
