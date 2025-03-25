const manageTasks = (() => {
    let lastTaskId = 0; 

    const generateTaskId = () => {
        lastTaskId++;
        return lastTaskId;
    };
    class Task {
        constructor(name, description, dueDate, isPending = true, priority = false) {
            this.id = generateTaskId();
            this.name = name;
            this.description = description;
            this.dueDate = dueDate;
            this.isPending = isPending;
            this.priority = priority;
        }

        togglePriority(){
            this.priority = this.priority ? false : true;
        }

        toggleComplete() {
            this.isPending = this.isPending ? false : true;
        }
    }

    const createTask = (name, description, dueDate, isPending, priority) => {
        return new Task (name, description, dueDate, isPending, priority)
    };

    return { createTask };
})();

export default manageTasks;