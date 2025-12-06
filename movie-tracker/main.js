import { router } from "./router.js";
import navbar from "./ui/components/navbar.js";
import { getMovieDetails } from "./api/tmdb.js";
import { store } from "./state/store.js";

console.log("---- MAIN JS START ----");

// Wait for the DOM before rendering anything
window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded - Initializing App");

    // Render the navbar
    const navRoot = document.getElementById("navbar");
    if (navRoot) {
        navRoot.innerHTML = navbar();
        console.log("Navbar loaded");
    } else {
        console.error("Navbar root (#navbar) not found");
    }

    // Start the router (loads the correct view into #app)
    const appRoot = document.getElementById("app");
    if (appRoot) {
        router();
        console.log("Router started");
    } else {
        console.error("App root (#app) not found");
    }
});
