import manageProjects from './projects.js';
import manageTasks from './tasks.js';

const generateUniqueID = () => {
    return Date.now() + Math.floor(Math.random() * 1000); 
};

const controlDom = (() => {

    // Display the modal for adding a new project
    const displayAddProject = () => {
        
        const addProjectButton = document.getElementById('add-project');
        const modal = document.getElementById('add-project-modal');
        const cancelSubmit = document.getElementById('cancel-submit'); // Cancel button to close the modal
        const projectForm = document.getElementById('project-form');
        const projectTitleInput = document.getElementById('project-title-input'); // Corrected to match input ID

        // Open the modal when the "Add Project" button is clicked
        addProjectButton.addEventListener('click', () => {
            modal.style.display = 'flex'; 
        });

        // Close the modal when the cancel button is clicked
        cancelSubmit.addEventListener('click', (event) => {
            event.preventDefault();  //
            modal.style.display = 'none';  
        });

        // Close the modal if the user clicks outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Handle form submission to create a new project
        projectForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const projectTitle = projectTitleInput.value.trim();

            if (projectTitle) {
                // Generate a unique ID for the new project
                const projectId = generateUniqueID(); 

                // Add the new project
                manageProjects.addProject(projectId, projectTitle);
                console.log(manageProjects.getProjects());

                // Clear the input field and close the modal
                projectTitleInput.value = '';
                modal.style.display = 'none';

                // Optionally, trigger a re-render of the project list (to show the new project)
                // This could be done by calling a `displayProjects` function if you have one
            }
        });
    };

    return { displayAddProject };

})();

export default controlDom;
