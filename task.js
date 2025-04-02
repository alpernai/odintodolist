const manageTasks = (() => {
    let lastTaskId = 0; 

    const generateTaskId = () => {
        lastTaskId++;
        return lastTaskId;
    };

    class Task {
        constructor(
            description = "", 
            dueDate = new Date().toISOString().split('T')[0], 
            isPending = true, 
            priority = false,
            id = generateTaskId()
        ){
            this.description = description;
            this.dueDate = dueDate;
            this.isPending = isPending;
            this.priority = priority;
            this.id = id;
        }

        togglePriority(){
            this.priority = !this.priority;
        }

        toggleComplete() {
            this.isPending = !this.isPending;
        }
    }

    const createTask = (description, dueDate, isPending, priority, id) => {
        return new Task(description, dueDate, isPending, priority, id);
    };

    return { 
        createTask,
        Task 
    };
})();

export default manageTasks;