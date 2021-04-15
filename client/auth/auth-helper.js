// Storing, Retrieving, and Deleting JWT credentials on the client-side.
import { signout } from './api-auth';

const auth = {
  // retrieve the stored credentials to check
  // if the current user is signed in.
  // Retrieving credentials.
  isAuthenticated() {
    if (typeof window == 'undefined') {
      return false;
    }
    if (sessionStorage.getItem('jwt')) {
      return JSON.parse(sessionStorage.getItem('jwt'));
    } else {
      return false;
    }
  },
  // To save the JWT credentials that are received
  // from the server on successful sign-in.
  // Save credentials.
  authenticate(jwt, cb) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('jwt', JSON.stringify(jwt));
    }
    cb();
  },
  // Clear JWT after the user has signout.
  // Deleting credentials.
  clearJWT(cb) {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('jwt');
    }
    cb();
    // Optional
    signout().then((data) => {
      document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    });
  },
};

export default auth;
