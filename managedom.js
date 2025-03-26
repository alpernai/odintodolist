import manageProjects from './project.js';
import manageTasks from './task.js'; 

const manageDOM = (() => {
    // ---------------------- Variables --------------------------
    const app = document.getElementById('app');
    // Navbar section 
    const navbarHeader = document.getElementById('projects-header');
    const navbar = document.getElementById('navbar');
    const projectsList = document.getElementById('projects-list');
    const addProjectTab = document.getElementById('add-project');
    // Main section 
    const main = document.getElementById('main');
    // Project card 
    const projectCard = document.getElementsByClassName('project-card');
    const projectHeader = document.getElementsByClassName('project-header');
    const projectTitle = document.getElementsByClassName('project-title');
    const addTaskButton = document.getElementsByClassName('add-task-button');
    const projectTask = document.getElementsByClassName('project-tasks');
    // Task card
    const taskCards = document.getElementsByClassName('task-card');
    const taskLeftSection = document.getElementsByClassName('task-left-section');
    const markCompleteButton = document.getElementsByClassName('mark-complete');
    const taskDescription = document.getElementsByClassName('task-description');
    const taskInput = document.getElementsByClassName('task-input');
    const taskRightSections = document.getElementsByClassName('task-right-section');
    const editTaskButtons = document.getElementsByClassName('edit-task-button');
    // Project Modal 
    const addProjectModal = document.getElementById('add-project-modal');
    const projectForm = document.getElementById('project-form');
    const projectTitleInput = document.getElementById('project-title-input');
    const submitProject = document.getElementById('submit-project');
    const cancelSubmitProjectBtn = document.getElementById('cancel-submit-project'); 
    // Task Modal 
    const addTaskModal = document.getElementById('add-task-modal');
    const taskForm = document.getElementById('task-form');
    const taskDescriptionInput = document.getElementById('task-description-input');
    const taskDateInput = document.getElementById('task-date-input');
    const taskPriorityInput = document.getElementById('task-priority-input');
    const submitTask = document.getElementById('submit-task');
    const cancelTask = document.getElementById('cancel-task');

    // ---------------------- Methods --------------------------
    const displayProjectModal = (show = true) => {        
        if (show) {
          // Open modal and focus input
          projectTitleInput.value = '';
          addProjectModal.style.display = 'flex';
          projectTitleInput.focus(); 
          
          // Add temporary listeners 
          addProjectModal.addEventListener('click', handleOutsideClick); // Close when clicking outside the form.
          document.addEventListener('keydown', handleKeyDown); // Close with ESC and submit with Enter
          cancelSubmitProjectBtn.removeEventListener('click', handleCancel); // Close with Cancel 
        } else {
            // Close modal
            addProjectModal.style.display = 'none';
          
            // Remove temporary listeners
            addProjectModal.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('keydown', handleKeyDown);
            cancelSubmitProjectBtn.removeEventListener('click', handleCancel); 
            }
    };
      
        // displayProjectModal helper functions

        // Mouse click
        const handleOutsideClick = (clickEvent) => {
            if (clickEvent.target === document.getElementById('add-project-modal')) {
                displayProjectModal(false);
            }
        };
      
        // Keyboard press
        const handleKeyDown = (keyDown) => {
            if (keyDown.key === 'Escape') displayProjectModal(false); 
            if (keyDown.key === 'Enter' && keyDown.target === projectTitleInput) {
                keyDown.preventDefault(); 
            }
        };

        // Cancel button
        const handleCancel = () => {
            displayProjectModal(false);
        };
      
        // Open project modal when addProjectTab is clicked.
        addProjectTab.addEventListener('click', () => {
            displayProjectModal(true);
        });

    const displayTaskModal = () => {};
    const createProjectCard = () => {};
    const createTaskCard = () => {};
    const displayProjects = () => {};
    const displayTasks = () => {};
    const filterProjects = () => {};
    const filterTasks = () => {}; 

    return { 
        filterProjects,
        displayProjectModal,
        displayTaskModal,
        createProjectCard,
        createTaskCard,
        displayProjects,
        displayTasks,
        filterProjects,
        filterTasks
    };
})();

export default manageDOM;