import "./style.css";
import { projects, Project, Note, Task, Checklist, ListItem, ToDo } from "./classes";
import { createProjectButtons, renderProjectButtons } from "./DOM";

function initApp() {
    const proj1 = new Project("proj1");
    // const mainToDo = new ToDo("Explore the app!", mainProj, 1, 0, "");
    const proj2 = new Project("proj2");
    const proj3 = new Project("proj3");
    const test = createProjectButtons();
    renderProjectButtons(test);
    console.log(projects);
}

initApp();

