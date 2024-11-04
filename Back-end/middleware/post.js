export function formatPost(post, user) {
  let { text, _id: id, vote,comments } = post;
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
    comments,
    vote,
  };
}
