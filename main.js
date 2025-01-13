const manageProjects = (() => {
    let projects = [];

    class Project {
        constructor(id, title) {
            this.id = id;
            this.title = title;
            this.tasks = [];
        }
        addTask() {
        }
        deleteTask() {
        }
    }

    const addProject = () => {};
    const deleteProject = () => {};
    const getProjects = () => {};
    return {};
})();


const manageTasks = (() => {
    class Task {
        constructor(id, name, description, dueDate, status = 'pending') {
            this.id = id;
            this.name = name;
            this.description = description;
            this.dueDate = dueDate;
            this.status = status;
        }

        toggleStatus() {
        }
        markComplete() {
        }
    }

    const createTask = () => {
    };
    return {};
})();


const manageDOM = () => {
    const toggleStatus = () => {}
    const displayAddProject = () => {}
    const displayAddTask = () => {}
    const displayTasks = () => {}
    const toggleProjectVisibility = () => {}
    const filterTasks = () => {}
}



