import "./style.css";
import { projects, Project, Note, Task, Checklist, ListItem, ToDo } from "./classes";

function initApp() {
    const mainProj = new Project("Main");
    const mainToDo = new ToDo("Explore the app!", mainProj, 1, 0, "");
}
initApp();

