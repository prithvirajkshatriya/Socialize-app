import React, { useState, useEffect } from 'react';
import auth from './../auth/auth-helper';
import { read } from './api-user';
import { Redirect, Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';

export default function Profile({ match }) {
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectoSignin] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read(
      {
        userId: match.params.userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setRedirectoSignin(true);
      } else {
        setUser(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
        {auth.isAuthenticated().user &&
          auth.isAuthenticated().user._id == user._id && (
            <ListItemSecondaryAction>
              <Link to={'/user/edit/' + user._id}>
                <IconButton aria-label="Edit" color="primary">
                  <Edit />
                </IconButton>
              </Link>
              <DeleteUser userId={user._id} />
            </ListItemSecondaryAction>
          )}
        <Divider />
        <ListItem>
          <ListItemtext
            primary={'Joined: ' + new Date(user.created).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
}
