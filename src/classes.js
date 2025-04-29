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
        super(body, priorityIndex, finished, project);
        this.dueDate = dueDate;
        project.addTask(this);
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


let firstProject = new Project("Main");

// let firstTask = new Task("Explore TODU", firstProject, 5, false);
// let secondTask = new Task("Make a Task", firstProject, 2, true);
let firstChecklist = new Checklist("Checklist 1", firstProject, 1, false, "2023-10-01");
let firstItem = new ListItem("Item 1", false, firstChecklist);
let secondItem = new ListItem("Item 2", true, firstChecklist);
// let Note1 = new Note("Note 1", firstProject);

