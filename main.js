const manageProjects = (() => {
    let projects = [];

    class Project {
        constructor(id, title) {
            this.id = id;
            this.title = title;
            this.tasks = [];
        }

        addTask(task) {
            this.tasks.push(task);
        }

        deleteTask(taskID) {
            this.tasks = this.tasks.filter(task => task.id !== taskID);
        }
        
    }

    const addProject = (id, title) => {
        const project = new Project(id, title);
        projects.push(project);
    };

    const deleteProject = (id) => {
        projects = projects.filter(project => project.id !== id);
    };

    const getProjects = () => projects;

    return { addProject, 
             deleteProject, 
             getProjects 
    };
})();


const manageTasks = (() => {
    class Task {
        constructor(id, name, description, dueDate, isPending = true, priority = false) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.dueDate = dueDate;
            this.isPending = isPending;
            this.priority = priority;
        }

        togglePriority(){
            this.priority = this.priority ? false : true;
        }

        toggleComplete() {
            this.isPending = this.isPending ? false : true;

        }
    }

    const createTask = (id, name, description, dueDate, isPending, priority) => {
        return new Task (id, name, description, dueDate, isPending, priority)
    };

    return { createTask };
})();

const manageDOM = () => {
    const toggleStatus = () => {}
    const displayAddProject = () => {}
    const displayAddTask = () => {}
    const displayTasks = () => {}
    const toggleProjectVisibility = () => {}
    const filterTasks = () => {}

    return { toggleStatus, 
             displayAddProject, 
             displayAddTask, 
             displayTasks, 
             toggleProjectVisibility,
             filterTasks
            }
}



