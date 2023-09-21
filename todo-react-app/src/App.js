import { useState } from 'react';
import './App.css';
import { TaskInput } from './Components/TaskInput';
import { TaskList } from './Components/TaskList';

function App() {
	const [tasks, setTasks] = useState([]);
	const [taskText, setTaskText] = useState('');

	const addTask = (newTaskText) => {
		const newTask = {
			text: newTaskText,
			id: Date.now(),
			checked: false,
		};
		setTasks((prevTasks) => [...prevTasks, newTask]);
	};

	const deleteTask = (taskId) => {
		const updatedTasks = tasks.filter((task) => task.id !== taskId);
		setTasks(updatedTasks);
	};

	const checkTask = (taskId) => {
		const updatedTasks = tasks.map((task) =>
			task.id === taskId
				? { ...task, checked: !task.checked } // Toggle the 'checked' property
				: task
		);
		setTasks(updatedTasks);
	};

	return (
		<div className='container'>
			<div className='todo-container'>
				<h2>Agenda</h2>
				<TaskInput
					addTask={addTask}
					taskText={taskText}
					setTaskText={setTaskText}
				/>
			</div>
			<TaskList
				tasks={tasks}
				// checkedTasks={checkedTasks}
				checkTask={checkTask}
				deleteTask={deleteTask}
			/>
		</div>
	);
}

export default App;
