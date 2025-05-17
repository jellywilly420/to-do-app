import { createProjectButtons, renderProjectButtons, clearProjectButtons, createProjectCard, renderProjectCard, clearProjectContainer, selectProjectDOM, projectButtonContainer } from "./DOM";
import { getObjByName, projects, selectProject } from "./classes";
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

export {addProjectButtonsEvents};