import manageProjects from './projects.js';
import manageTasks from './tasks.js';

manageProjects.addProject(1, 'Default');
manageProjects.addProject(2, 'Work');
manageProjects.addProject(3, 'Personal');

const task1 = manageTasks.createTask(1, 'Task 1', 'Complete the report', '2025-01-15', true, true);
const task2 = manageTasks.createTask(2, 'Task 2', 'Buy groceries', '2025-01-16', true, false);
const task3 = manageTasks.createTask(3, 'Task 3', 'Fix the bug', '2025-01-17', true, false);

manageProjects.getProjects()[1].addTask(task1); 
manageProjects.getProjects()[2].addTask(task2); 
manageProjects.getProjects()[1].addTask(task3); 

console.log('Projects after adding tasks:', manageProjects.getProjects());

manageProjects.getProjects()[1].deleteTask(1); 

console.log('Projects after deleting a task:', manageProjects.getProjects());

