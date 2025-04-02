import manageProjects from './project.js';
import manageTasks from './task.js'; 

const manageDOM = (() => {
    // -----------------------------------------------------------------
    // -------------------------- Variables ----------------------------
    // -----------------------------------------------------------------

    // Navbar section 
    const addProjectTab = document.getElementById('add-project');
    const projectsList = document.getElementById('projects-list');

    // Main section 
    const main = document.getElementById('main');

    // Project Modal 
    const addProjectModal = document.getElementById('add-project-modal');
    const projectForm = document.getElementById('project-form');
    const projectTitleInput = document.getElementById('project-title-input');
    const cancelSubmitProjectButton = document.getElementById('cancel-submit-project'); 

    // -----------------------------------------------------------------
    // ---------------------- Project methods --------------------------
    // -----------------------------------------------------------------

    const displayProjectModal = (show = true) => {
        if (show) {
            // Clear input and display modal
            projectTitleInput.value = '';
            addProjectModal.style.display = 'flex';

            // Add temporary event listeners
            document.addEventListener('keydown', handleKeyDown); 
            addProjectModal.addEventListener('click', handleOutsideClick);
            cancelSubmitProjectButton.addEventListener('click', handleProjectCancel);
            } else {
                // Remove temporary event listeners 
                document.addEventListener('keydown', handleKeyDown);
                addProjectModal.addEventListener('click', handleOutsideClick);
                cancelSubmitProjectButton.addEventListener('click', handleProjectCancel);

                // Hide modal and clear input field
                addProjectModal.style.display = 'none';
        }
    };

    const refreshNavbar = () => {
        // Clear navbar
        const projects = manageProjects.getProjects();
        projectsList.innerHTML = '';
        
        // Add existing project titles to navbar
        projects.forEach(project => { 
            const li = document.createElement('li');
            li.textContent = project.title;
            li.dataset.projectId = project.id; 
            projectsList.appendChild(li);
            });
        };
    
    const handleProjectTabClick = (clickEvent) => {
        // Select clicked project 
        const clickedProject = clickEvent.target.closest('li');
        if (!clickedProject || !clickedProject.dataset.projectId) return;
        
        // Remove active class from all projects listed in navbar
        document.querySelectorAll('#projects-list li').forEach(project => {
            project.classList.remove('active');
        });
        
        // Mark clicked project as active
        clickedProject.classList.add('active');
        
        // Store selected project ID 
        const selectedProjectId = parseInt(clickedProject.dataset.projectId);

        displayProject(selectedProjectId);
    };

    const displayProject = (projectID) => {
        // Update projects array and clear main 
        const projects = manageProjects.getProjects();
        main.innerHTML = '';
    
        // Search for the project by ID - Note for future: if (notAll), do this. Else, create a card for each project.
        const currentProject = projects.find(project => project.id === projectID);
        
        // Handle not found
        if (!currentProject) {
            console.warn(`Project ${projectID} not found`);
            return;
        }
    
        // Create, mark with ID and append project card
        const newProjectCard = createProjectHTML(currentProject.title);
        newProjectCard.dataset.projectId = currentProject.id; 
        main.appendChild(newProjectCard);

        // Render project tasks
        renderAllTasks(currentProject);
    };

    const handleShowAllClick = () => {
        // Clear main area
        main.innerHTML = '';
        
        // Get all projects
        const projects = manageProjects.getProjects();
        
        // Remove active class from all project tabs
        document.querySelectorAll('#projects-list li').forEach(li => {
            li.classList.remove('active');
        });
        
        // Render all projects
        projects.forEach(project => {
            const projectCard = createProjectHTML(project.title);
            projectCard.dataset.projectId = project.id;
            main.appendChild(projectCard);
            renderAllTasks(project);
        });
    };

    const handleDeleteClick = (clickEvent) => {
        // Stop bubbling to project selection
        clickEvent.stopPropagation();
        
        // Find the trashcan's project card
        const projectCard = clickEvent.target.closest('.project-card');
        if (!projectCard) return; 
        
        // Save and validate ID
        const projectId = Number(projectCard.dataset.projectId);
        if (!projectId) return; 
        
        // Request user confirmation
        if (!confirm('Delete this project permanently?')) return;
        
        // Delete if confirmed
        const success = manageProjects.deleteProject(projectId);
        if (success) { 
            main.innerHTML = '';
            refreshNavbar();
        } else {
            console.warn('Failed to delete project', projectId);
        }
    };

        // Keyboard helper function
        const handleKeyDown = (keydownEvent) => {
            if (keydownEvent.key === 'Escape') { // Close with ESC
                displayProjectModal(false);
            }
        };

        // Mouse click helper function
        const handleOutsideClick = (clickEvent) => {
            if (clickEvent.target === addProjectModal) {
                displayProjectModal(false);
            }
        };

        // Cancel helper function
        const handleProjectCancel = (clickEvent) => {
            clickEvent.preventDefault();
            displayProjectModal(false);
        };

        // Submit helper function
        const handleProjectSubmit = (submitEvent) => {
            submitEvent.preventDefault();
            const title = projectTitleInput.value.trim();
            
            if (!title) {
                projectTitleInput.focus(); 
                return; 
            }
            
            // Create project
            manageProjects.addProject(title);
            console.log("Current projects:", manageProjects.getProjects());
            refreshNavbar();
            displayProjectModal(false);
        };

        // Create project card 
        function createProjectHTML(title) {
            // Card
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");
        
            // Header
            const projectHeader = document.createElement("div");
            projectHeader.classList.add("project-header");
        
            // Title
            const projectTitle = document.createElement("h2");
            projectTitle.classList.add("project-title");
            projectTitle.textContent = title;
        
            // Delete
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener('click', handleDeleteClick);
        
            // Trash icon
            const trashIcon = document.createElement("i");
            trashIcon.classList.add("fa-solid", "fa-trash");
            deleteButton.appendChild(trashIcon);
        
            // Append title and delete to header
            projectHeader.appendChild(projectTitle);
            projectHeader.appendChild(deleteButton);
        
            // Project tasks
            const projectTasks = document.createElement("div");
            projectTasks.classList.add("project-tasks");

            // Append header and tasks to card
            projectCard.appendChild(projectHeader);
            projectCard.appendChild(projectTasks);
        
            return projectCard;
        }
        
        // Listen for clicks on navbar tabs
        projectsList.addEventListener('click', handleProjectTabClick);
     
        // Display modal when Add Project tab is clicked
        addProjectTab.addEventListener('click', displayProjectModal);

        // Add Project when modal has input + Enter/Submit Project
        projectForm.addEventListener('submit', handleProjectSubmit);

        // Display all projects when "All" is clicked
        document.getElementById('show-all').addEventListener('click', handleShowAllClick);



    // -----------------------------------------------------------------
    // ------------------------- Task methods --------------------------
    // -----------------------------------------------------------------

    function createTaskCardHTML() {
        // Card
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        
        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'mark-complete';
        
        // Task description
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.className = 'task-input';
        textInput.placeholder = 'New';
        
        // Append checkbox and description to card
        taskCard.appendChild(checkbox);
        taskCard.appendChild(textInput);
        
        return taskCard;
    };

    const handleTaskInput = (keyEvent) => {
        // Only respond to 'Enter'
        if (keyEvent.key !== 'Enter') return;
        
        // Identify task
        const input = keyEvent.target;
        const projectTasks = input.closest('.project-tasks');
        const taskCard = input.closest('.task-card');
        
        // Make sure the task is empty and it's the last 
        if (!taskCard || taskCard !== projectTasks.lastElementChild) return;
        const description = input.value.trim();
        if (!description) return;

        // If it is, identify its project 
        const projectCard = projectTasks.closest('.project-card');
        const projectId = parseInt(projectCard.dataset.projectId);
        const currentProject = manageProjects.getProjects()
            .find(project => project.id === projectId);
        
        // Create task and add it to project
        const newTask = manageTasks.createTask(description);
        currentProject.addTask(newTask);

        // Re-render
        input.value = '';
        renderAllTasks(currentProject); 
    };

    const renderAllTasks = (project) => {
        // Get the project card and tasks container
        const projectCard = document.querySelector(`.project-card[data-project-id="${project.id}"]`);
        if (!projectCard) return;
        
        const tasksContainer = projectCard.querySelector('.project-tasks');
        tasksContainer.innerHTML = '';
    
        // Render existing tasks
        project.tasks.forEach(task => {
            const taskCard = createTaskCardHTML();
            taskCard.dataset.taskId = task.id;
            
            const textInput = taskCard.querySelector('.task-input');
            textInput.value = task.description;
            
            const checkbox = taskCard.querySelector('.mark-complete');
            checkbox.checked = !task.isPending;
            // Listen for completion / deletion
            checkbox.addEventListener('click', handleCheckboxClick); 

            if (!task.isPending) {
                taskCard.classList.add('completed');
            }
            
            tasksContainer.appendChild(taskCard);
        });
    
        // Add new/empty card at the end
        const emptyCard = createTaskCardHTML();
        tasksContainer.appendChild(emptyCard);
        emptyCard.querySelector('.task-input').focus();
    };
    
    const handleCheckboxClick = (event) => {
        // Identify DOM elements
        const checkbox = event.target;
        const taskCard = checkbox.closest('.task-card');
        if (!taskCard || !taskCard.dataset.taskId) return;

        // Find/validate their corresponding data
        const taskId = parseInt(taskCard.dataset.taskId);
        const projectCard = taskCard.closest('.project-card');
        const projectId = parseInt(projectCard.dataset.projectId);

        const project = manageProjects.getProjects()
            .find(p => p.id === projectId);
        if (!project) return;
    
        const task = project.tasks.find(t => t.id === taskId);
        if (!task) return;
    
        // If checked, mark as complete
        const isNowPending = task.toggleComplete();
        taskCard.classList.toggle('completed', !isNowPending);
    
        // And then delete
        if (!isNowPending) {
            taskCard._deletionTimer = setTimeout(() => {
                project.deleteTask(taskId);
                renderAllTasks(project);
            }, 1000);
        } else if (taskCard._deletionTimer) {
            clearTimeout(taskCard._deletionTimer);
        }
    };
    
    // Permanent listener for task inputs
    const initializeTaskHandlers = () => {
        document.addEventListener('keydown', (keyEvent) => {
            if (keyEvent.target.classList.contains('task-input')) {
                handleTaskInput(keyEvent);
            }
        });
    };
    
    // Initialization
    initializeTaskHandlers();

    // -----------------------------------------------------------------
    // ----------------------- Expose methods --------------------------
    // -----------------------------------------------------------------
    
    return { 
        displayProjectModal,
        refreshNavbar,
        handleProjectTabClick,
        displayProject,
        handleDeleteClick,
        handleKeyDown,
        handleOutsideClick,
        handleProjectCancel,
        handleProjectSubmit,
        createProjectHTML,
        createTaskCardHTML,
        handleTaskInput,
        renderAllTasks,
        handleCheckboxClick,
        initializeTaskHandlers
    };

})();

export default manageDOM;