const manageDOM = (() => {
    // Navbar section 
    const navbar = document.getElementById('navbar');
    const projectsList = document.getElementById('projects-list');

    // Main section 
    const main = document.getElementById('main');

    // Project card 
    const projectCards = document.getElementsByClassName('project-card');
    const projectHeaders = document.getElementsByClassName('project-header');
    const projectTitles = document.getElementsByClassName('project-title');
    const addTaskButtons = document.getElementsByClassName('add-task-button');
    const projectTasks = document.getElementsByClassName('project-tasks');

    // Task card
    const taskCards = document.getElementsByClassName('task-card');
    const taskLeftSections = document.getElementsByClassName('task-left-section');
    const markCompleteButtons = document.getElementsByClassName('mark-complete');
    const taskDescriptions = document.getElementsByClassName('task-description');
    const taskRightSections = document.getElementsByClassName('task-right-section');
    const editTaskButtons = document.getElementsByClassName('edit-task-button');

    // Project Modal 
    const addProjectModal = document.getElementById('add-project-modal');
    const projectForm = document.getElementById('project-form');
    const projectTitleInput = document.getElementById('project-title-input');
    const submitProject = document.getElementById('submit-project');
    const cancelSubmitProject = document.getElementById('cancel-submit'); // Note: Your HTML has 'cancel-submit' not 'cancel-submit-project'

    // Task Modal 
    const addTaskModal = document.getElementById('add-task-modal');
    const taskForm = document.getElementById('task-form');
    const taskDescriptionInput = document.getElementById('task-description-input');
    const taskDateInput = document.getElementById('task-date-input');
    const taskPriorityInput = document.getElementById('task-priority-input');
    const submitTask = document.getElementById('submit-task');
    const cancelTask = document.getElementById('cancel-task');

    const filterProjects = () => {};
    const displayProjectModal = () => {};
    const displayTaskModal = () => {};
    const createProjectCard = () => {};
    const createTaskCard = () => {};

    return { 
        filterProjects,
        displayProjectModal,
        displayTaskModal,
        createProjectCard,
        createTaskCard
    };
})();

export default manageDOM;