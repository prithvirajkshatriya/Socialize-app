/**
 * When FollowProfileButton is added to the profile, the following value will be
 * determined and sent from the Profile component as a prop to FollowProfileButton,
 * along with the click handler that takes the specific follow or unfollow fetch API
 * to be called as a parameter
 */
export default function FollowProfileButton(props) {
  // Click to follow.
  const followClick = () => {
    props.onButtonClick(follow);
  };

  // Click to unfollow.
  const unfollowClick = () => {
    props.onButtonClick(unfollow);
  };

  return (
    <div>
      {props.following ? (
        <Button variant="contained" color="secondary" onClick={unfollowClick}>
          Unfollow
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={followClick}>
          Follow
        </Button>
      )}
    </div>
  );
  FollowProfileButton.propTypes = {
    following: PropTypes.bool.isRequired,
    onButtonClick: PropTypes.func.isRequired,
  };
}
