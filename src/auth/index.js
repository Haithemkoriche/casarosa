import DOMAIN from "../params";
// eslint-disable-next-line no-unused-vars
import { polyfill } from "babel-polyfill";

class Auth {
  constructor() {
    this.authenticated = localStorage.getItem("authenticated") === "true";
  }

  async login(email, password) {
    let passed = false;
    if (password.length < 8) return;
    if (email.length === 0) return;
    await fetch(`${DOMAIN}admin/login`, {
      body: JSON.stringify({ email, password }),
      method: "POST",
      headers: { "content-type": "application/json" },
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.status === true) {
          localStorage.setItem("authenticated", true);
          localStorage.setItem("token", r.object.token);
          localStorage.setItem("name", r.object.user.name);
          localStorage.setItem("uid", r.object.user.id);
          localStorage.setItem("email", r.object.user.email);
          this.authenticated = true;
          passed = true;
        } else {
          passed = false;
        }
      })
      .catch(() => {
        passed = false;
      });
    return passed;
  }

  async logout() {
    let passed = false;
    await fetch(`${DOMAIN}admin/logout`, {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        id: localStorage.getItem("uid"),
      }),
      headers: { "content-type": "application/json" },
    })
      .then((r) => r.json())
      .then(() => {
        localStorage.setItem("authenticated", false);
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("uid");
        localStorage.removeItem("email");
        this.authenticated = false;
        passed = true;
      })
      .catch(() => {
        passed = false;
      });
    return passed;
  }
}

export default new Auth();
