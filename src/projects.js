const manageProjects = (() => {
    let projects = [];

    class Project {
        constructor(id, title) {
            this.id = id;
            this.title = title;
            this.tasks = [];
        }

        // Add new task to tasks array of Project instance 
        addTask(task) {
            this.tasks.push(task);
        }
        // Delete task from tasks array of Project instance
        deleteTask(taskID) {
            this.tasks = this.tasks.filter(task => task.id !== taskID);
        }
        
    }

    // Add Project instance to projects array
    const addProject = (id, title) => {
        const project = new Project(id, title);
        projects.push(project);
    };

    // Delete Project instance from projects array
    const deleteProject = (id) => {
        projects = projects.filter(project => project.id !== id);
    };

    const getProjects = () => projects;

    return { addProject, 
             deleteProject, 
             getProjects 
    };
})();

export default manageProjects;