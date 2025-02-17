const manageTasks = (() => {
    class Task {
        constructor(id, name, description, dueDate, isPending = true, priority = false) {
            this.id = id;
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

    const createTask = (id, name, description, dueDate, isPending, priority) => {
        return new Task (id, name, description, dueDate, isPending, priority)
    };

    return { createTask };
})();

export default manageTasks;