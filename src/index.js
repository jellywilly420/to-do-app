import "./style.css";
import { projects, Project, Note, Task, Checklist, ListItem, ToDo, deleteProject } from "./classes";
import { createProjectButtons, renderProjectButtons, clearProjectButtons } from "./DOM";

function initApp() {
    console.log(projects);
    const proj1 = new Project("proj1");
    // const mainToDo = new ToDo("Explore the app!", mainProj, 1, 0, "");
    const proj2 = new Project("proj2");
    const proj3 = new Project("proj3");
    const test = createProjectButtons();
    renderProjectButtons(test);
    console.log(projects);
    deleteProject(projects[0]);
    deleteProject(projects[0]);
    clearProjectButtons();
    const proj4 = new Project("proj4");
    const proj5 = new Project("proj5");
    const test2 = createProjectButtons();
    console.log(projects);
    renderProjectButtons(test2);
}

initApp();

