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
    
        // Search for the project by ID - future: if notAll do this. if all, create a card for each project.
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

    const handleDeleteClick = (clickEvent) => {
        // Stop bubbling to project selection
        clickEvent.stopPropagation();
        
        // Find the trashcan's project card ID 
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
        
        // Listen for clicks on navbar tabs. 
        projectsList.addEventListener('click', handleProjectTabClick);
     
        // Display modal when Add Project tab is clicked.
        addProjectTab.addEventListener('click', displayProjectModal);

        // Add Project when modal has input + Enter/Submit Project
        projectForm.addEventListener('submit', handleProjectSubmit);


    // -----------------------------------------------------------------
    // ------------------------- Task methods --------------------------
    // -----------------------------------------------------------------

    function createTaskCardHTML() {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'mark-complete';
        
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.className = 'task-input';
        textInput.placeholder = 'Add task';
        
        taskCard.appendChild(checkbox);
        taskCard.appendChild(textInput);
        
        return taskCard;
    };

    // Add tasks by typing / clicking 'Enter' on input.
    const handleTaskInput = (keyEvent) => {
        // Only respond to Enter key
        if (keyEvent.key !== 'Enter') return;
        
        const input = keyEvent.target;
        const projectTasks = input.closest('.project-tasks');
        const taskCard = input.closest('.task-card');
        
        // Check if this is the last / empty card 
        if (!taskCard || taskCard !== projectTasks.lastElementChild) return;
        
        // Validate input
        const description = input.value.trim();
        if (!description) return;
        
        // Get current project data
        const projectCard = projectTasks.closest('.project-card');
        const projectId = Number(projectCard.dataset.projectId);
        const currentProject = manageProjects.getProjects()
            .find(proj => proj.id === projectId);
        
        // Create and store task
        const newTask = manageTasks.createTask(description);
        currentProject.addTask(newTask);
        
        // Update DOM
        input.value = '';
        const newTaskCard = createTaskCardHTML();
        newTaskCard.dataset.taskId = newTask.id;
        newTaskCard.querySelector('.task-input').value = description;
        projectTasks.insertBefore(newTaskCard, taskCard);
        
        // Focus on new card input
        input.focus();
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
    
    const initializeTaskHandlers = () => {
        document.addEventListener('keydown', (e) => {
            if (e.target.classList.contains('task-input')) {
                handleTaskInput(e);
            }
        });
    };
    
    // Call this when loading the app
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
        initializeTaskHandlers
    };

})();

export default manageDOM;