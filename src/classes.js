export {Project, Note, Task, ToDo, Checklist, ListItem, projects};

let projects = [];
class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }
}

class Note {
    constructor(body, project) {
        this.body = body;
        this.project = project;
        this.indexInProject = this.project.tasks.push(this) - 1;
    }
    delete() {
        this.project.tasks.splice(this.indexInProject, 1);
    }
}

class Task extends Note {
    constructor(body, project, priorityIndex, finished){
        super(body, project);
        this.priorityIndex = priorityIndex;
        this.finished = finished;
    }
    markFinished() {
        this.finished = true;
    }
    
}


class ToDo extends Task {
    constructor(body, project, priorityIndex, finished , dueDate) {
        super(body, project, priorityIndex, finished);
        this.dueDate = dueDate;
    }
}

class Checklist extends Task {
    constructor(body, project, priorityIndex, dueDate) {
        super(body, project, priorityIndex, dueDate);
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
class ListItem {
    constructor (body, finished, checklist) {
        this.body = body;
        this.finished = finished;
        this.checklist = checklist;
        this.indexInChecklist = this.checklist.items.push(this) - 1;
    }
    delete() {
        this.checklist.items.splice(this.indexInChecklist, 1);
    }
} 


let mainProject = new Project("Main Project");
let mainToDo = new ToDo("Explore the app!", mainProject, 1, 0, undefined);
projects.push(mainProject);

let secondProject = new Project("Second Project");
let secondToDo = new ToDo("Create a task!", secondProject, 1, 0, undefined);
projects.push(secondProject);