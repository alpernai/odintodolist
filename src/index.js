// src/index.js
import './styles.css';  
import manageProjects from './projects.js';
import manageTasks from './tasks.js';

manageProjects.addProject(1, 'Project 1'); // Create Project 1
const project1 = manageProjects.getProjects()[0]; // Get Project 1
console.log(project1)

const task1 = manageTasks.createTask(1, 'Task 1', 'Description of Task 1', '2025-02-20', true, false);
const task2 = manageTasks.createTask(2, 'Task 2', 'Description of Task 2', '2025-02-21', true, true);

project1.addTask(task1);
project1.addTask(task2);

console.log('Tasks in Project 1 after adding tasks:', project1.tasks);
