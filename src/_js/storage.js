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

    init();

    return {
        addNewToDoToStorage,
        addNewProjectToStorage
    }

})();

export {storage}