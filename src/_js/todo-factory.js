import {storage} from './storage';

const TodoFactory = (function() {

    function createTodo(projectName, title, description, duedate, priority) {
        let todoProps = {
            projectName: projectName,
            title: title,
            description: description,
            duedate: duedate,
            priority: priority
        }

        storage.addNewToDoToStorage(new Todo(todoProps));
    }

    class Todo {
        constructor(props) {
            this.title = props.title;
            this.description = props.description;
            this.duedate = props.duedate;
            this.priority = props.priority;
            this.projectName = props.projectName
        }
    }

    return {
        createTodo
    }

})();

export {TodoFactory}