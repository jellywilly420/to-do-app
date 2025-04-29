class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }
    addTask(task) {
        this.tasks.push(task);
        task.project = this;
    }
}

class Note {
    #indexInProject;
    constructor(body, project) {
        this.body = body;
        this.project = project;
        this.#indexInProject = this.project.tasks.push(this);
    }
    delete() {
        this.project.tasks.splice(this.#indexInProject-1, 1);
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
    constructor(body, priorityIndex, finished, project , dueDate) {
        super(body, priorityIndex, finished, project);
        this.dueDate = dueDate;
        project.addTask(this);
    }
}

class Checklist extends Task {
    constructor(body, priorityIndex, finished, project, dueDate) {
        super(body, priorityIndex, finished, project, dueDate);
        this.items = [];
        this.project.addTask(this);
    }
    addItem(item) {
        this.items.push(item);
    }
    markItemFinished(item) {
        const foundItem = this.items.find(i => i === item);
        if (foundItem) {
            foundItem.markFinished();
        }
    }
}
class ListItem {
    constructor (body, finished, checklist) {
        this.body = body;
        this.finished = finished;
        this.checklist = checklist;
    }
} 


let defaultProject = new Project("Main");
let defaultTask = new Task("Explore TODU", defaultProject, 5, false);
let secondTask = new Task("Victim Task", defaultProject, 2, true);
