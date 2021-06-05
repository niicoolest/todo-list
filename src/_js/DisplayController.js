const DisplayController = (function() {
    function addNewProject() {
        //TO-DO
    }

    function addNewTask() {
        //TO-DO
    }

    function getNewTodoListInputs() {
        
    }

    function createNewToDo() {
        let todoModal = document.getElementById('new-todo-modal');
        todoModal.classList.add('is-active');
    }

    function createNewProject() {
        let projectModal = document.getElementById('new-project-modal');
        projectModal.classList.add('is-active');
    }

    return {
        createNewToDo,
        createNewProject,
    }
})();

export {DisplayController};