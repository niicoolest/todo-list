import { datenow, id } from "./util";

const storage = (() => {

    const EXAMPLE_TODO = {
        id: id(),
        projectName: 'Home',
        description: 'Read about The Odin Project curriculum',
        title: 'Check out TOP',
        duedate: datenow(),
        priority: 'Low'
    }

    const EXAMPLE_PROJECT = {
        id: id(),
        projectName: 'Special Project'
    }

    let storage;

    function init() {
        storage = window.localStorage;

        if(storage.getItem('projects') == null) {
            storage.setItem('projects', JSON.stringify(new Array(EXAMPLE_PROJECT)));
        }

        if(storage.getItem('todos') == null) {
            storage.setItem('todos', JSON.stringify(new Array(EXAMPLE_TODO)));
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

    function deleteProject(projectId) {
        let projects = JSON.parse(storage.getItem('projects'));
        let todos = JSON.parse(storage.getItem('todos'));

        let toBeDeleted = projects.filter(proj => proj['id'] == projectId);
        let updatedProjects = projects.filter(proj => proj['id'] != projectId);
        let updatedTodos = todos.filter(todo => todo['projectName'] != toBeDeleted[0]['projectName']);
        storage.setItem('todos', JSON.stringify(updatedTodos));
        storage.setItem('projects', JSON.stringify(updatedProjects));
    }

    function deleteTodo(todoId) {
        let todos = JSON.parse(storage.getItem('todos'));
        let newTodoList = todos.filter(todo => todo['id'] != todoId);
        storage.setItem('todos', JSON.stringify(newTodoList));
    }

    init();

    return {
        addNewToDoToStorage,
        addNewProjectToStorage,
        getProjectItems,
        getTodoItemsOfAProject,
        getTodoItemById,
        deleteTodo,
        deleteProject
    }

})();

export {storage}