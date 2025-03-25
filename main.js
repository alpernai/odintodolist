import manageProjects from './project.js';
import manageTasks from './task.js'; 
import manageDOM from './managedom.js';

console.log("Modules loaded:", {
    projects: typeof manageProjects,
    tasks: typeof manageTasks,
    dom: typeof manageDOM
  });

document.addEventListener('DOMContentLoaded', () => {
    window.appDebug = {
      projects: manageProjects,
      tasks: manageTasks,
      dom: manageDOM
    };
    console.log('Debug tools ready. Use appDebug in console.');
  });