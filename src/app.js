import { initProblemPage } from "./pages/problemPage";

const loadApp = () => {
    console.log("app loaded");
    initProblemPage();
};

window.addEventListener("load", loadApp);
