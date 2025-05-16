import { projects } from "./classes";


function createProjectCard(projectObj) {
    // takes in a Project obj, returns a div with the tasks in said project + edit and delete buttons
}

function clearProjectContainer() {
    // deletes the contents of the project container
}

function renderProjectCard() {
    // adds the project div of the selected project to the project container
}

function createProjectButton(projectObj) {
    // takes in project obj, returns the element for that project.
}

function clearProjectButtons() {
    // clears the project buttons list
    // maybe returns the index of the selected project to easily keep track?
}

function renderProjectButton(projectElem) {
    // takes in button element
    // adds it to the project buttons list
    // should check if button is selected?
}

function selectProject(projectElem) {
    // starts in DOM
    // exctract project title from elem
    // check if project is already selected, do nothing if so.
    // if not, set project to selected, unselect all other projects. (both elem and obj)
}

