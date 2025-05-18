import { createProjectButtons, renderProjectButtons, clearProjectButtons, createProjectCard, renderProjectCard, clearProjectContainer, selectProjectDOM, projectButtonContainer } from "./DOM";
import { Project, projects } from "./classes";
// for all the dom events


// - selecting projects
function addProjectButtonsEvents() {
    // add listeners to all children of button container
    for (let node of [...projectButtonContainer.children]) {
        // filter nodes to only add listeners to the inputs
        // the labels being clicked triggers a click on inputs anyway
        if (node.tagName === "INPUT") {
                node.addEventListener("click", (e)=>{
                // on click
                // extract project title from event target
                // get the object equivilant of the title
                // if it's selected, return
                // if not, selectProjectDOM that mf
                const projTitle = e.target.id; 
                selectProjectDOM(projTitle);
            })
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
            addProjectDialog.value = "";
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