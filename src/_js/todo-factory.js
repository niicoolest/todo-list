const TodoFactory = (function() {

    function createTodo(title, description, duedate, priority) {
        let todoProps = {
            title: title,
            description: description,
            duedate: duedate,
            priority: priority
        }

        return new Todo(todoProps);
    }

    class Todo {
        constructor(props) {
            this.title = props.title;
            this.description = props.description;
            this.duedate = props.duedate;
            this.priority = props.priority;
        }
    }

    return {
        createTodo
    }

})();