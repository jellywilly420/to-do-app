export {Project, Note, Task, ToDo, Checklist, ListItem, projects};

// array for containing projects
let projects = [];

// project, has a title and an array of tasks
class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
        this.index = projects.push(this) - 1;
        
        // needed in DOM maybe?
        this.selected = 0;
    }
    // if delete is successful (project isn't the only one in projects array) return true
    // should be useful in dom?
    delete() {
        if (projects.length > 1) {
            projects.splice(this.index, 1);
            return 1
        }
        else {
            return 0
        }
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
