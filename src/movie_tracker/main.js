import { initAuth } from "./state/auth.js";
import navbar from "./ui/components/navbar.js";
import { router } from "./router.js";

document.getElementById("navbar").append(navbar());

initAuth();
router();

window.addEventListener("hashchange", router);
