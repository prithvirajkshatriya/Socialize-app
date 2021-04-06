// Helper methods for user CRUD.
// The create() methods will take data from the view component,
// which'll invoke this method. FInally, a promise is returned
// as a response from the server.

// Creating a new user.
const create = async (user) => {
  try {
    let response = await fetch('api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// To retrieve all the users.
const list = async (signal) => {
  try {
    let response = await fetch('/api/users/', {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// The JWT is attached to GET fetch call in the authorization
// header using bearer scheme.

// To retrieve a specific user or say retrieve user by userId.
const read = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/users/' + params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// Updating a user's data.
const update = async (params, credentials, user) => {
  try {
    let response = await fetch('/api/users/' + params.userId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t,
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// Delete a user.
const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/users/' + params.userId, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, list, read, update, remove };
