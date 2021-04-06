// Storing, Retrieving, and Deleting JWT credentials on the client-side.

// To save the JWT credentials that are received
// from the server on successful sign-in.
// Save credentials.
function authenticate(jwt, cb) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('jwt', JSON.stringify(jwt));
  }
  cb();
}

// retrieve the stored credentials to check
// if the current user is signed in.
// Retrieving credentials.
function isAuthenticated() {
  if (typeof window !== 'undefined') {
    return false;
  }
  if (sessionStorage.getItem('jwt')) {
    return JSON.parse(sessionStorage.getItem('jwt'));
  } else {
    return false;
  }
}

// Clear JWT after the user has signout.
// Deleting credentials.
function clearJWT(cb) {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('jwt');
  }
  cb();
  signout().then(() => {
    document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  });
}
