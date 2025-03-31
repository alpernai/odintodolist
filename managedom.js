import manageProjects from './project.js';
import manageTasks from './task.js'; 

const manageDOM = (() => {
    // -----------------------------------------------------------------
    // -------------------------- Variables ----------------------------
    // -----------------------------------------------------------------

    // Navbar section 
    const navbar = document.getElementById('navbar');
    const navbarHeader = document.getElementById('projects-header');
    const addProjectTab = document.getElementById('add-project');
    const projectsList = document.getElementById('projects-list');

    // Main section 
    const main = document.getElementById('main');

    // Project card 
    const projectCard = document.getElementsByClassName('project-card');
    const projectHeader = document.getElementsByClassName('project-header');
    const projectTitle = document.getElementsByClassName('project-title');
    const deleteProjectButton = document.getElementsByClassName('delete-project-button');
    const projectTasks = document.getElementsByClassName('project-tasks');

    // Task card
    const taskCard = document.getElementsByClassName('task-card');
    const taskLeftSection = document.getElementsByClassName('task-left-section');
    const markCompleteButton = document.getElementsByClassName('mark-complete');
    const taskDescription = document.getElementsByClassName('task-description');
    const taskInput = document.getElementsByClassName('task-input');
    const taskRightSection = document.getElementsByClassName('task-right-section');
    const editTaskButton = document.getElementsByClassName('edit-task-button');

    // Project Modal 
    const addProjectModal = document.getElementById('add-project-modal');
    const projectForm = document.getElementById('project-form');
    const projectTitleInput = document.getElementById('project-title-input');
    const submitProject = document.getElementById('submit-project');
    const cancelSubmitProjectButton = document.getElementById('cancel-submit-project'); 

    // Task Modal 
    const addTaskModal = document.getElementById('add-task-modal');
    const taskForm = document.getElementById('task-form');
    const taskDescriptionInput = document.getElementById('task-description-input');
    const taskDateInput = document.getElementById('task-date-input');
    const taskPriorityInput = document.getElementById('task-priority-input');
    const submitTask = document.getElementById('submit-task');
    const cancelTask = document.getElementById('cancel-task');   

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
    
        // Search for the project by ID
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
        
        // Task rendering logic will go here ?
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
        

        // Event delegation setup (single listener)
        projectsList.addEventListener('click', handleProjectTabClick);
     
        // Initialization: display modal when "Add Project" tab is clicked 
        addProjectTab.addEventListener('click', displayProjectModal);

        // Add Project when there is input + Enter/Submit Project
        projectForm.addEventListener('submit', handleProjectSubmit);


    // -----------------------------------------------------------------
    // ------------------------- Task methods --------------------------
    // -----------------------------------------------------------------

    function createTaskCard() {
        // Create main container div
        const taskCard = document.createElement("div");
        taskCard.className = "task-card";
            
        // Create left section div
        const taskLeftSection = document.createElement("div");
        taskLeftSection.className = "task-left-section";
            
        // Create checkbox input
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "mark-complete";
            
        // Create label
        const label = document.createElement("label");
        label.className = "task-description";
        label.setAttribute("for", "mark-complete");
            
        // Create task input
        const taskInput = document.createElement("input");
        taskInput.type = "text";
        taskInput.className = "task-input";
        taskInput.placeholder = "Task description";
            
        // Append input to label
        label.appendChild(taskInput);
            
        // Append elements to left section
        taskLeftSection.appendChild(checkbox);
        taskLeftSection.appendChild(label);
            
        // Create right section div
        const taskRightSection = document.createElement("div");
        taskRightSection.className = "task-right-section";
            
        // Create edit button
        const editButton = document.createElement("button");
        editButton.className = "edit-task-button";
            
        // Create icon element
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-pen-to-square";
            
        // Append icon to button
        editButton.appendChild(icon);
            
        // Append button to right section
        taskRightSection.appendChild(editButton);
            
        // Append left and right sections to main container
        taskCard.appendChild(taskLeftSection);
        taskCard.appendChild(taskRightSection);
            
        return taskCard;
    }
        

    // -----------------------------------------------------------------
    // ----------------------- Expose methods --------------------------
    // -----------------------------------------------------------------
    return { 
        displayProjectModal,
    };

})();

export default manageDOM;