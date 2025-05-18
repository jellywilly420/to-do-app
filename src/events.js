import { createProjectButtons, renderProjectButtons, clearProjectButtons, createProjectCard, renderProjectCard, clearProjectContainer, selectProjectDOM, projectButtonContainer } from "./DOM";
import { Project, projects, getObjByName, deleteProject } from "./classes";
// for all the dom events


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
                        // delete it?                        
                        deleteProject(projObj)
                    }
                    else {
                        alert("You can't delete your only project!");
                        return;
                    }
                    // need a rerender
                    // really need to combine all these into a rendring function man :/
                    clearProjectButtons();
                    clearProjectContainer();
                    renderProjectButtons();
                    renderProjectCard();
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