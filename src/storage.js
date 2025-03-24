const saveDataToLocalStorage = (projects) => {
    const projectsString = JSON.stringify(projects);    
    localStorage.setItem('projects', projectsString);
};

const loadDataFromLocalStorage = () => {
    const projectsData = localStorage.getItem('projects');
    if (projectsData) {
        return JSON.parse(projectsData); 
    }
    return [];
};

