import { saveDataToLocalStorage, loadDataFromLocalStorage } from './storage';

// Load projects from localStorage when the app starts
const projects = loadDataFromLocalStorage();

// Now you can work with the `projects` array
console.log(projects);  // Check the console to ensure it's loading the data
