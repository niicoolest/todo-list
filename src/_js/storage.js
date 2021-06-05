const storage = (() => {

    let storage;

    function init() {
        storage = window.localStorage;

        if(storage.getItem('projects') == null) {
            storage.setItem('projects', '[]');
        }

        if(storage.getItem('todos') == null) {
            storage.setItem('todos', '[]');
        }
    }

    function addNewToDoToStorage(todo) {
        let storageTodos = JSON.parse(storage.getItem("todos") || "[]");
        storageTodos.push(todo);
        storage.setItem('todos', JSON.stringify(storageTodos));
    }

    function addNewProjectToStorage(project) {
        let storageProjects = JSON.parse(storage.getItem("projects") || "[]");
        storageProjects.push(project);
        storage.setItem('projects', JSON.stringify(storageProjects));
    }

    function getProjectItems() {
        return JSON.parse(storage.getItem('projects'));
    }

    function getTodoItemsOfAProject(project) {
        let todos = JSON.parse(storage.getItem('todos'));
        return todos.filter(todo => todo['projectName'] == project);
    }

    function getTodoItemById(todoId) {
        let todos = JSON.parse(storage.getItem('todos'));
        let todoInSearch = todos.filter(todo => todo['id'] == todoId);
        if(todoInSearch.length == 1) {
            return todoInSearch[0];
        }

        return null;
    }

    init();

    return {
        addNewToDoToStorage,
        addNewProjectToStorage,
        getProjectItems,
        getTodoItemsOfAProject,
        getTodoItemById
    }

})();

export {storage}