import { projects, getObjByName, getSelectedProject } from "./classes";

const projectButtonContainer = document.querySelector("#projectList");


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
}

function renderProjectCard() {
    // adds the project div of the selected project to the project container
}

function createProjectButtons() {
    // returns an array of objects of elements for each project. uses the projects array.
    // each object has two properties: radio and label
    let buttonArray = [];
    for (let project in projects) {
        let buttonObj = {};
        const projectButton = document.createElement("input");
        projectButton.type = "radio";
        projectButton.id = `projectBtn-${project}`;
        projectButton.setAttribute("name", "project");
        const buttonLabel = document.createElement("label");
        buttonLabel.setAttribute("for", `projectBtn-${project}`);
        buttonLabel.innerText = `${projects[project].title}`;
        if (projects[project].selected) {
            projectButton.checked = 1;
        }
        buttonObj = {
            "radio": projectButton,
            "label": buttonLabel,
        };
        buttonArray.push(buttonObj);
    }
    return buttonArray;
}

function renderProjectButtons(buttonArray) {
    for (let button of buttonArray) {
        projectButtonContainer.appendChild(button["radio"]);
        projectButtonContainer.appendChild(button["label"]);
    }
}

function clearProjectButtons() {
    // clears the project buttons list
    // maybe returns the index of the selected project to easily keep track?
    projectButtonContainer.innerHTML = "";
}


function selectProject(projectElem) {
    // starts in DOM
    // exctract project title from elem
    // check if project is already selected, do nothing if so.
    // if not, set project to selected, unselect all other projects. (both elem and obj)
}


export { createProjectButtons, renderProjectButtons, clearProjectButtons, createProjectCard };