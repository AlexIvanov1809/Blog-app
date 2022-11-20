const TOKEN_KEY = "blog-token";
const REFRESH_KEY = "blog-refresh-token";
const EXPIRES_KEY = "blog-expires";
const USERID_KEY = "blog-user-local-id";

export function setTokens(
  { refreshToken, accessToken, userId, expiresIn = 3600 },
  stayOn
) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  if (stayOn) {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(USERID_KEY, userId);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
  } else {
    sessionStorage.setItem(TOKEN_KEY, accessToken);
    sessionStorage.setItem(USERID_KEY, userId);
    sessionStorage.setItem(REFRESH_KEY, refreshToken);
    sessionStorage.setItem(EXPIRES_KEY, expiresDate);
  }
}
export function getAccessToken() {
  const checker = localStorage.getItem(TOKEN_KEY);
  if (checker) {
    return localStorage.getItem(TOKEN_KEY);
  } else {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}
export function getRefreshToken() {
  const checker = localStorage.getItem(REFRESH_KEY);
  if (checker) {
    return localStorage.getItem(REFRESH_KEY);
  } else {
    return sessionStorage.getItem(REFRESH_KEY);
  }
}
export function getExpiresDate() {
  const checker = localStorage.getItem(EXPIRES_KEY);
  if (checker) {
    return localStorage.getItem(EXPIRES_KEY);
  } else {
    return sessionStorage.getItem(EXPIRES_KEY);
  }
}
export function getUserID() {
  const checker = localStorage.getItem(USERID_KEY);
  if (checker) {
    return localStorage.getItem(USERID_KEY);
  } else {
    return sessionStorage.getItem(USERID_KEY);
  }
}
export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USERID_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
  sessionStorage.removeItem(EXPIRES_KEY);
}

const localStorageSevice = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresDate,
  getUserID,
  removeAuthData
};

export default localStorageSevice;
