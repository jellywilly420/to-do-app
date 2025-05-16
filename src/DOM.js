import { mainProject, mainToDo, projects } from "./classes";



function renderProjectLinks() {
    const projectList = document.querySelector("#projectList");
    projectList.innerHTML = "";
    for (let i of projects) {
        const listItem = document.createElement("li");
        listItem.classList.add("list-none");
        listItem.innerHTML = `<a class="cursor-pointer">${i.title}</a>`;
        projectList.appendChild(listItem);
    }
    const projectlinks = [...document.querySelector("#projectList").children];
    for (let i of projectlinks) {
        if (i.classList.contains("selected")) {

        }
    }
}

function renderProject() {
    const projectContainer = document.querySelector("#projectContainer");
    const projectlinks = [...document.querySelector("#projectList").children];
}

function addListeners() {
    const projectAddBtn = document.querySelector("#addProject");
    const projectAddConfirm = document.querySelector("#projectAddConfirm");
    const projectAddClose = document.querySelector("#projectAddClose");
    const projectAddDialog = document.querySelector("#projectAddDialog");
    const projectlinks = [...document.querySelector("#projectList").children];

    projectAddBtn.addEventListener("click", ()=>{projectAddDialog.showModal()});
    projectAddConfirm.addEventListener("click", ()=>{projectAddDialog.close()})
    projectAddClose.addEventListener("click", ()=>{projectAddDialog.close()})
    for (let link of projectlinks) {
        link.children[0].addEventListener("click", (e)=>{
            for (let i of projectlinks) {
                i.children[0].classList.remove("selected");
            }
            e.target.classList.add("selected");
        })
    }
}


export {renderProjectLinks, renderProject, addListeners}