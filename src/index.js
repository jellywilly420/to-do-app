import "./style.css";
import { projects, Project, Note, Task, Checklist, ListItem, ToDo, deleteProject, selectProject } from "./classes";
import { renderProjectButtons, clearProjectButtons, renderProjectCard, clearProjectContainer, selectProjectDOM } from "./DOM";
import { addProjectButtonsEvents, addCreateProjectEvents, addDialogEvents } from "./events";

function initApp() {
    // console.log(projects);
    const proj1 = new Project("proj 1");
    const proj2 = new Project("proj 2");
    const proj3 = new Project("proj 3");
    const task1 = new ToDo("Explore the app1!", proj1, 1, 0, "");
    const task2 = new ToDo("Explore the app2!", proj2, 1, 0, "");
    const task3 = new ToDo("Explore the app3!", proj3, 1, 0, "");
    renderProjectButtons();
    renderProjectCard();

    // addProjectButtonsEvents();
    addCreateProjectEvents();
    addDialogEvents();
}

initApp();

