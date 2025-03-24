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

class Task {
    constructor(body, priorityIndex, finished, project){
        this.body = body;
        this.priorityIndex = priorityIndex;
        this.finished = finished;
        this.project = project;
        this.project.tasks.push(this);
    }
    markFinished() {
        this.finished = true;
    }
}

class Note {
    constructor(body, project) {
        this.body = body;
        this.project = project;
        project.addTask(this);
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


// let defaultProject = new Project("Main");
