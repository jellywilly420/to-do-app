import { projects, getObjByName, getSelectedProject, selectProject } from "./classes";
import { addProjectButtonsEvents } from "./events";

const projectButtonContainer = document.querySelector("#projectList");
const projectContainer = document.querySelector("#projectContainer");

function createProjectCard() {
    // finds the selected project from projects array
    // creates an div and populates it with the title of the project
    // makes a div for tasks inside the project
    let selectedProj = getSelectedProject();
    const projectDiv = document.createElement("div");
    projectDiv.id = "projectDiv";
    const projectTitle = document.createElement("p");
    projectTitle.id = "projectTitle";
    projectTitle.innerText = `${selectedProj.title}`;
    const tasksContainer = document.createElement("div");
    tasksContainer.id = "tasksContainer";
    
    // task populating needs work
    for (let task of selectedProj.tasks) {
        const taskCard = document.createElement("div");
        taskCard.innerText = `${task.body}`;
        tasksContainer.appendChild(taskCard);
    }

    projectDiv.appendChild(projectTitle);
    projectDiv.appendChild(tasksContainer);

    return projectDiv
}

function clearProjectContainer() {
    // deletes the contents of the project container
    projectContainer.innerHTML = "";
}

function renderProjectCard() {
    clearProjectContainer();
    // adds the project div of the selected project to the project container
    // the div is available using createProjectCard()
    const projectCard = createProjectCard();
    projectContainer.appendChild(projectCard);
}

function createProjectButtons() {
    // returns an array of divs containing elements elements for each project. uses the projects array.
    // each div has 3 elements: radio and label and button
    let buttonArray = [];
    for (let project in projects) {
        // div creation
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("projectButtonDiv");
        // button and label creation
        const projectButton = document.createElement("input");
        projectButton.type = "radio";
        projectButton.id = `${projects[project].title}`;
        projectButton.setAttribute("name", "project");
        const buttonLabel = document.createElement("label");
        buttonLabel.setAttribute("for", `${projects[project].title}`);
        buttonLabel.innerText = `${projects[project].title}`;
        // delete button creation
        const deleteProjectButton = document.createElement("button");
        deleteProjectButton.id = `delete-${projects[project].title}`;
        deleteProjectButton.innerText = "del";
        // edit button creation
        const editProjectButton = document.createElement("button");
        editProjectButton.classList.add("edit-project-button");
        editProjectButton.id = `edit-${projects[project].title}`;
        editProjectButton.innerText = "edit";
        if (projects[project].selected) {
            projectButton.checked = 1;
        }
        buttonDiv.appendChild(projectButton);
        buttonDiv.appendChild(buttonLabel);
        buttonDiv.appendChild(editProjectButton);
        buttonDiv.appendChild(deleteProjectButton);
        buttonArray.push(buttonDiv);
    }
    return buttonArray;
}

function renderProjectButtons() {
    clearProjectButtons();
    const buttonArray = createProjectButtons();
    for (let buttonDiv of buttonArray) {
        projectButtonContainer.appendChild(buttonDiv);
    }
    // add listeners after adding the buttons to the DOM
    addProjectButtonsEvents();
}

function clearProjectButtons() {
    // clears the project buttons list
    // maybe returns the index of the selected project to easily keep track?
    projectButtonContainer.innerHTML = "";
}

// projectTitle is the id of the radio button
function selectProjectDOM(projectTitle) {
    // should be called by clicking a project buttons
    // getObjByName to find the obj
    // check if project is already selected
    // select found obj
    // clear project container and render it
    const projectToSelect = getObjByName(projectTitle, projects);
    if (projectToSelect.selected) {return}
    selectProject(projectToSelect);
    renderProjectButtons();
    renderProjectCard();
}


export { createProjectButtons, renderProjectButtons, clearProjectButtons, createProjectCard, renderProjectCard, clearProjectContainer, selectProjectDOM, projectButtonContainer };