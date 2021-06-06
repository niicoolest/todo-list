import {storage} from '../storage';
import { id } from '../util';

const TodoFactory = (function() {

    function createTodo(projectName, title, description, duedate, priority) {
        let todoProps = {
            projectName: projectName,
            title: title,
            description: description,
            duedate: duedate,
            priority: priority,
            id: id()
        }

        storage.addNewToDoToStorage(new Todo(todoProps));
    }

    function getTodosOfAProject(projectName) {
        return storage.getTodoItemsOfAProject(projectName);
    }

    function getTodoDetails(todoId) {
        return storage.getTodoItemById(todoId);
    }

    function deleteTodo(todoId) {
        storage.deleteTodo(todoId);
    }

    class Todo {
        constructor(props) {
            this.title = props.title;
            this.description = props.description;
            this.duedate = props.duedate;
            this.priority = props.priority;
            this.projectName = props.projectName;
            this.id = props.id;
        }
    }

    return {
        createTodo,
        getTodosOfAProject,
        getTodoDetails,
        deleteTodo
    }

})();

export {TodoFactory}