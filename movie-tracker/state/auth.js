import { storage } from "../utils/storage.js";

export function initAuth() {
  let user = storage.get("user", null);

  if (!user) {
    user = { username: "demo", theme: "dark" };
    storage.set("user", user);
  }

  window.user = user;
}
