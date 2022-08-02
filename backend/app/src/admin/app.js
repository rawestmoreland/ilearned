import Logo from "./extensions/auth-logo.svg";
import favicon from "./extensions/favicon.ico";

export default {
  config: {
    auth: { logo: Logo },
    head: { favicon },
    locales: ["en", "fr-FR", "ex-MX"],
    menu: {
      logo: favicon,
    },
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome",
        "Auth.form.welcome.subtitle": "Log in to your ilearned admin account",
        "app.components.LeftMenu.navbrand.title": "ilearned Dashboard",
      },
    },
  },
  bootstrap(app) {
    console.log(app);
  },
};
