import { useState, useEffect } from 'react';
import './App.css';
import { TaskInput } from './Components/TaskInput';
import { TaskList } from './Components/TaskList';
import { Summary } from './Components/Summary';
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
	const [tasks, setTasks] = useState([]);
	const [taskText, setTaskText] = useState('');
	const [checkedCount, setCheckedCount] = useState(0);
	const [taskCount, setTaskCount] = useState(0);
	const [draggedItem, setDraggedItem] = useState(null); // Add draggedItem state

	const addTask = (newTaskText) => {
		const newTask = {
			text: newTaskText,
			id: Date.now(),
			checked: false,
		};
		setTasks((prevTasks) => {
			const updatedTasks = [...prevTasks, newTask];
			getTaskCount(updatedTasks);
			getCheckedTaskCount(updatedTasks);
			return updatedTasks;
		});
	};

	const getTaskCount = (tasksArray) => {
		const tasks = tasksArray.filter((task) => !task.checked);
		const taskCount = tasks.length;
		setTaskCount(taskCount);
	};

	const getCheckedTaskCount = (tasksArray) => {
		const checkedTasks = tasksArray.filter((task) => task.checked);
		const checkedTaskCount = checkedTasks.length;
		setCheckedCount(checkedTaskCount);
	};

	const deleteTask = (taskId) => {
		const updatedTasks = tasks.filter((task) => task.id !== taskId);
		setTasks(updatedTasks);
		getTaskCount(updatedTasks);
		getCheckedTaskCount(updatedTasks);
	};

	const checkTask = (taskId) => {
		const updatedTasks = tasks.map((task) =>
			task.id === taskId
				? { ...task, checked: !task.checked } // Toggle the 'checked' property
				: task
		);
		setTasks(updatedTasks);
		getTaskCount(updatedTasks);
		getCheckedTaskCount(updatedTasks);
	};

	const onDragEnd = (result) => {
		if (!result.destination) {
			return; // Dropped outside the list
		}

		const reorderedTasks = [...tasks];
		const [movedTask] = reorderedTasks.splice(result.source.index, 1);
		reorderedTasks.splice(result.destination.index, 0, movedTask);

		setTasks(reorderedTasks);
	};

	const saveTasksToLocalStorage = (tasks) => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='container'>
				<div className='todo-container'>
					<h2>Agenda</h2>
					<TaskInput
						addTask={addTask}
						taskText={taskText}
						setTaskText={setTaskText}
					/>
				</div>
				<Summary taskCount={taskCount} checkedCount={checkedCount} />
				<TaskList tasks={tasks} checkTask={checkTask} deleteTask={deleteTask} />
			</div>
		</DragDropContext>
	);
}

export default App;
