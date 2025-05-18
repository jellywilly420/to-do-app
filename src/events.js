import { createProjectButtons, renderProjectButtons, clearProjectButtons, createProjectCard, renderProjectCard, clearProjectContainer, selectProjectDOM, projectButtonContainer } from "./DOM";
import { Project, projects, getObjByName, deleteProject } from "./classes";
// for all the dom events

// add project dialog
const addProjectDialog = document.querySelector("#projectAddDialog");
const addConfirmButton = document.querySelector("#projectAddConfirm")
const addCancelButton = document.querySelector("#projectAddClose");
const projNameInputAdd = document.querySelector("#projectNameAdd");

// edit project dialog
const projectEditDialog = document.querySelector("#projectEditDialog");
const editConfirmButton = document.querySelector("#projectEditConfirm");
const editCancelButton = document.querySelector("#projectEditClose");
const projNameInputEdit = document.querySelector("#projectNameEdit");

// used to keep track of old project before editing projects
let currentProjObj;

// - project buttons
function addProjectButtonsEvents() {
    // get an array of divs for each project buttons
    const buttonDivArr = [...document.querySelectorAll('.projectButtonDiv')];
    // iterate over divs, then iterate over children of each div
    for (let div of buttonDivArr) {
        for (let child of [...div.children]) {
            // add event listener to input type children (adding a project)
            // ADDING PROJECTS!!!
            if (child.tagName === "INPUT") {
                    child.addEventListener("click", (e)=>{
                    // extract project title from event target id
                    // select that mf
                    const projTitle = e.target.id; 
                    // the function checks to see if proj is already selected so all gucci!
                    selectProjectDOM(projTitle);
                })
            }
            // add event listener to buttons with id that starts with 'delete-', rest of id name is the title
            // DELETING PROJECTS!!!
            else if (child.tagName === "BUTTON" && child.id.split("-")[0] === "delete") {
                child.addEventListener("click", ()=>{
                    // extract proj title
                    const projName = child.id.split("-")[1];
                    // getObjByName that bih
                    const projObj = getObjByName(projName, projects);
                    // only allow deletion if projects[] has more than one project
                    if (projects.length > 1) {
                        if (confirm(`Are you sure you want to delete ${projName}?\nThis will delete all the tasks within it!`)){
                            // delete it?                        
                            deleteProject(projObj);
                        }
                    }
                    else {
                        alert("You can't delete your only project!");
                        return;
                    }
                    // need a rerender
                    renderProjectButtons();
                    renderProjectCard();
                })
            }
            // EDITING PROJECTS!!!
            else if (child.tagName === "BUTTON" && child.id.split("-")[0] === "edit") {

                // editProject events
                child.addEventListener("click", (e)=>{
                    // open the edit project dialog
                    projectEditDialog.showModal();
                    // get current project name
                    const oldName = e.target.id.split("-")[1];
                    // get obj of current project
                    currentProjObj = getObjByName(oldName, projects);
                    // fill input with current project name
                    projNameInputEdit.value = oldName;
                    // select input value
                    projNameInputEdit.select();
                })
            }
        }
    }
}

// - creating a project
function addCreateProjectEvents() {
    // addProject stuff
    const addProjectButton = document.querySelector("#addProject");

    // add button event
    addProjectButton.addEventListener("click", ()=>{
        addProjectDialog.showModal();
    })
}

function addDialogEvents() {
    // keyboard event shortcuts
    addProjectDialog.addEventListener("keydown", (e)=>{
        if (e.key === "Enter") {
            e.preventDefault();
            addConfirmButton.click();
        }
    })
    projectEditDialog.addEventListener("keydown", (e)=>{
        if (e.key === "Enter") {
            e.preventDefault();
            editConfirmButton.click();
        }
    })
    addProjectDialog.addEventListener("keydown", (e)=>{
        if (e.key === "Escape") {
            e.preventDefault();
            addCancelButton.click();
        }
    })
    projectEditDialog.addEventListener("keydown", (e)=>{
        if (e.key === "Escape") {
            e.preventDefault();
            editCancelButton.click();
        }
    })

    // add project confirm button event
    addConfirmButton.addEventListener("click", ()=>{
        // stuff happens then close
        // - check if a project already exists with the same name
        // - alert if so
        const projName = projNameInputAdd.value;
        let projNameExists = false;
        for (let proj of projects) {
            // sets the boolean to true if an existing project matches names with the inputted name
            projNameExists = projNameExists || (proj.title === projName);
        }
        // input validation
        if (projName === "") {
            alert("Please enter the project name!");
            projNameInputAdd.focus();
        }
        else if (projNameExists) {
            alert("Project name already exists!");
            projNameInputAdd.focus();
        }
        else {
            // create a new project
            // render button (automatically selected)
            const newProj = new Project(projName);
            renderProjectButtons();
            renderProjectCard();
            projNameInputAdd.value = "";
            addProjectDialog.close();
        }
    })

    // add project cancel button event
    addCancelButton.addEventListener("click", ()=>{
        // stuff happens then close
        projNameInputAdd.value = "";
        addProjectDialog.close();
    })

    // edit project cancel button even
    editCancelButton.addEventListener("click", ()=>{
        // stuff happens then close
        projNameInputEdit.value = "";
        projectEditDialog.close();
    })

    // edit project confirm button event listener
    editConfirmButton.addEventListener("click",()=>{
        // get new proj name
        const newName = projNameInputEdit.value;
        // check if name already exists
        let projNameExists = false;
        for (let proj of projects) {
            // sets the boolean to true if an existing project matches names with the inputted name
            projNameExists = projNameExists || (proj.title === newName);
        }

        // if input is empty
        if (newName === "") {
            alert("Please enter the new project name!");
            projNameInputEdit.focus();
        }
        // if name already exists
        else if (projNameExists) {
            alert("Project name already exists!");
            projNameInputEdit.focus();
        }
        else {
            // change obj title to new name
            currentProjObj.title = newName;
            // clear input field
            projNameInputEdit.value = "";
            // close dialog 
            projectEditDialog.close();
            // rerender
            renderProjectCard();
            renderProjectButtons();
        }
    })
}

export { addProjectButtonsEvents, addCreateProjectEvents, addDialogEvents };