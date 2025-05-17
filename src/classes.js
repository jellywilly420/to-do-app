export {Project, Note, Task, ToDo, Checklist, ListItem, projects, deleteProject, getObjByName, getSelectedProject, selectProject};

// array for containing projects
let projects = [];

// finds the currently selected project from the projects array
function getSelectedProject() {
    for (let proj of projects) {
        if (proj.selected) {return proj}
    }
}

function getObjByName(objName, objArray) {
    // checks to see if the object is a project or not
    // either uses the title prop or the body prop to search
    // may or may not need the task compatibility
    if (objArray[0] instanceof Project) {
        console.log(objName);
        for (let proj of objArray) {
            console.log(proj.title);
            if (proj.title === objName) {
                return proj;
            }
        }
    }
    else {
        for (let task of objArray) {
            if (task.body === objName) {
                return task;
            }
        }
    }
}

function selectProject(project) {
    for (let proj of projects) {
        proj.selected = 0;
    }
    project.selected = 1;
}

function deleteProject(project) {

    // checks length of array, only deletes if it's more than 1
    if (projects.length > 1) {
        for (let i of projects) {
            if (i === project) {
                projects.splice(projects.indexOf(i), 1);
            }
        }
    }

    // checks if a project is selected, if not, selects the first one
    let projectSelected = 0;
    for (let project of projects) {
        projectSelected = projectSelected || project.selected
    }
    if (!projectSelected) {
        projects[0].selected = 1;
    }
}

// project, has a title and an array of tasks
class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
        
        // would this work if an element before this one was deleted?
        // i think the index wouldn't change after deletion, which could lead to problems.
        this.index = projects.push(this) - 1;

        // needed in DOM maybe?
        this.selected;
        selectProject(this);
    }
}

// note, has a body and a parent project. delete method removes it from parent project
class Note {
    constructor(body, project) {
        this.body = body;
        this.project = project;
        this.index = this.project.tasks.push(this) - 1;
    }
    delete() {
        this.project.tasks.splice(this.index, 1);
    }
}

// task, has a body, parent project, priority and a finished state. delete method is inherited.
// markFinished 
class Task extends Note {
    constructor(body, project, priority, finished){
        super(body, project);
        this.priority = priority;
        this.finished = finished;
    }
    setFinished(state) {
        this.finished = state;
    }
}

// todo, inherits most of task. has a dueDate.
class ToDo extends Task {
    constructor(body, project, priority, finished , dueDate) {
        super(body, project, priority, finished);
        this.dueDate = dueDate;
    }
}

// checklist, inherits task. has items (checklist items)
class Checklist extends Task {
    constructor(body, project, priority, dueDate) {
        super(body, project, priority, dueDate);
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    markItemFinished(item) {
        const foundItem = this.items.find(i => i === item);
        if (foundItem) {
            foundItem.finished = true;
        }
    }
}

// list item, has body, finished state and parent checklist. can be deleted.
class ListItem {
    constructor (body, finished, checklist) {
        this.body = body;
        this.finished = finished;
        this.checklist = checklist;
        this.index = this.checklist.items.push(this) - 1;
    }
    delete() {
        this.checklist.items.splice(this.index, 1);
    }
} 
