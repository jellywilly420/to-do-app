import "./style.css";
import { projects, Project, Note, Task, Checklist, ListItem, ToDo, deleteProject, selectProject } from "./classes";
import { createProjectButtons, renderProjectButtons, clearProjectButtons, createProjectCard } from "./DOM";

function initApp() {
    // console.log(projects);
    const proj1 = new Project("proj1");
    const proj2 = new Project("proj2");
    const proj3 = new Project("proj3");
    const task1 = new ToDo("Explore the app1!", proj3, 1, 0, "");
    const task2 = new ToDo("Explore the app2!", proj3, 1, 0, "");
    const task3 = new ToDo("Explore the app3!", proj1, 1, 0, "");
    const test = createProjectButtons();
    renderProjectButtons(test);
}

initApp();

