const manageProjects = (() => {
    let projects = [];
    let lastProjectId = 0; 

    const generateProjectId = () => {
        lastProjectId++;
        return lastProjectId;
    };

    class Project {
        constructor(title) {
            this.id = generateProjectId();
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

    const addProject = (title) => {
        const project = new Project(title);
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