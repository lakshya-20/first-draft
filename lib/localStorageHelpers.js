const storageKeyToken = 'firstDraft';

const saveUser = (user) =>{
    if (typeof window !== "undefined") {
        return localStorage.setItem(storageKeyToken, JSON.stringify(user));
    }
}

const loadUser = () => {
    if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem(storageKeyToken));
    }
}

const logoutUser = () => {
    if (typeof window !== "undefined") {
        return localStorage.removeItem(storageKeyToken);
    }
}

export default {
  saveUser,
  loadUser,
  logoutUser
};