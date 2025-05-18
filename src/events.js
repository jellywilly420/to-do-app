import { createProjectButtons, renderProjectButtons, clearProjectButtons, createProjectCard, renderProjectCard, clearProjectContainer, selectProjectDOM, projectButtonContainer } from "./DOM";
import { Project, projects } from "./classes";
// for all the dom events


// - selecting projects
function addProjectButtonsEvents() {
    // get an array of divs for each project buttons
    const buttonDivArr = [...document.querySelectorAll('.projectButtonDiv')];
    // iterate over divs, then iterate over children of each div
    for (let div of buttonDivArr) {
        for (let child of [...div.children]) {
            // only add event listener to input type children
            if (child.tagName === "INPUT") {
                    child.addEventListener("click", (e)=>{
                    // extract project title from event target id
                    // select that mf
                    const projTitle = e.target.id; 
                    // the function checks to see if proj is already selected so all gucci!
                    selectProjectDOM(projTitle);
                })
            }
        }

    }
}

// - creating a project
function addCreateProjectEvents() {
    // get 'add project', 'confirm' and 'cancel' buttons
    // get dialog elem
    // get 'project name' input elem
    const addProjectDialog = document.querySelector("#projectAddDialog");
    const addProjectButton = document.querySelector("#addProject");
    const addConfirmButton = document.querySelector("#projectAddConfirm")
    const addCancelButton = document.querySelector("#projectAddClose");
    const projNameInput = document.querySelector("#projectName");

    // add button event
    addProjectButton.addEventListener("click", ()=>{
        addProjectDialog.showModal();
    })

    // confirm button event
    addConfirmButton.addEventListener("click", ()=>{
        // stuff happens then close
        // - check if a project already exists with the same name
        // - alert if so
        const projName = projNameInput.value;
        let projNameExists = false;
        for (let proj of projects) {
            // sets the boolean to true if an existing project matches names with the inputted name
            projNameExists = projNameExists || (proj.title === projName);
        }
        // input validation
        if (projName === "") {
            alert("Please enter the project name!");
        }
        else if (projNameExists) {
            alert("Project name already exists!");
        }
        else {
            // create a new project
            // render button (automatically selected)
            const newProj = new Project(projName);
            clearProjectButtons();
            renderProjectButtons();
            clearProjectContainer();
            renderProjectCard();
            projNameInput.value = "";
            addProjectDialog.close();
        }
    })

    // cancel button event
    addCancelButton.addEventListener("click", ()=>{
        // stuff happens then close
        projNameInput.value = "";
        addProjectDialog.close();
    })
}

export { addProjectButtonsEvents, addCreateProjectEvents };