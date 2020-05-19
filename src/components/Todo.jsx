import React from "react";

class Todo extends React.Component {
  state = {
    tasks: [],
    taskText: ''
  };

  constructor(props) {
    super(props);
    this.deleteTask = this.deleteTask.bind(this);
  }

  handleInput = ({target}) => this.setState({taskText: target.value})

  addTodo = () => {
      const {tasks, taskText} = this.state;
      tasks.push({id: tasks.length > 0 ? tasks[tasks.length - 1].id +1  : 1, text: taskText, status: 'pending'});
      this.setState({
        tasks,
        taskText: ''
      });
  }

  handleKeyDown = ({key}) => {
      if (key === 'Enter') {
          this.addTodo();
      }
  }

  deleteTask = id => () =>{
      const {tasks} = this.state;
      this.setState({tasks: tasks.filter(item => item.id !== id)});
  }

  completeTask = index => () => {
      const {tasks} = this.state;
      tasks[index].status = 'complete';
      this.setState({tasks});
  }

  showTasks = (item, index) => {
      return (
        <li key={index} className={item.status}>
            <div className="left"  onClick={this.completeTask(index)}>{item.text}</div>
            {item.status !== 'complete' && <button className="right" onClick={this.deleteTask(item.id)}>X</button>}
        </li>
      );
  }

  render() {
      const {tasks, taskText} = this.state;
    return (
      <div>
        <h1>WORK TO DOS</h1>
        <h4 className="yellow">
          Enter the text into the input fieldto add items to your todo list (max
          28 characters)
        </h4>
        <h4 className="green">Click the item to mark it as complete</h4>
        <h4 className="red">Click de "X" to remove the item from your list</h4>
        <input className="todo_input" type="text" value={taskText} onChange={this.handleInput} maxLength={28} onKeyDown={this.handleKeyDown}/>
        <button className="button_add" onClick={this.addTodo}>Add</button>
        <ul className="todo-list">
          {tasks.map(this.showTasks)}
        </ul>
      </div>
    );
  }
}

export default Todo;
