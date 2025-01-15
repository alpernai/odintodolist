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

export default manageProjects;
