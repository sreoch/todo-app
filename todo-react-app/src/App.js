import { useState, useEffect } from 'react';
import './App.css';
import { TaskInput } from './Components/TaskInput';
import { TaskList } from './Components/TaskList';
import { Summary } from './Components/Summary';
import { DragDropContext } from 'react-beautiful-dnd';
import { db } from './firebase.js';
import {
	collection,
	query,
	orderBy,
	onSnapshot,
	addDoc,
	serverTimestamp,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';

const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));
function App() {
	const [tasks, setTasks] = useState([]);
	const [taskText, setTaskText] = useState('');
	const [checkedCount, setCheckedCount] = useState(0);
	const [taskCount, setTaskCount] = useState(0);

	useEffect(() => {
		onSnapshot(q, (snapshot) => {
			const tasksFromFirebase = snapshot.docs.map((doc) => ({
				id: doc.id,
				item: doc.data(),
			}));

			setTasks(tasksFromFirebase);

			// Calculate and set taskCount and checkedCount
			getTaskCount(tasksFromFirebase);
			getCheckedTaskCount(tasksFromFirebase);
		});
	}, [taskText]);

	const addTask = (newTaskText) => {
		addDoc(collection(db, 'todos'), {
			todo: newTaskText,
			timestamp: serverTimestamp(),
			checked: false, // Add the checked field with an initial value
		})
			.then((docRef) => {
				// After successfully adding the task to Firebase, update the state with the new task
				const newTask = {
					id: docRef.id,
					item: {
						todo: newTaskText,
						timestamp: serverTimestamp(),
						checked: false, // Initialize it as false
					},
				};

				setTasks((prevTasks) => [...prevTasks, newTask]);
			})
			.catch((error) => {
				console.error('Error adding task: ', error);
			});
	};

	const getTaskCount = (tasksArray) => {
		const tasks = tasksArray.filter((task) => !task.item.checked);
		const taskCount = tasks.length;
		setTaskCount(taskCount);
	};

	const getCheckedTaskCount = (tasksArray) => {
		const checkedTasks = tasksArray.filter((task) => task.item.checked);
		const checkedTaskCount = checkedTasks.length;
		setCheckedCount(checkedTaskCount);
	};

	const deleteTask = (taskId) => {
		// Delete the task from Firestore
		const taskRef = doc(db, 'todos', taskId);

		deleteDoc(taskRef)
			.then(() => {})
			.catch((error) => {
				console.error('Error deleting task: ', error);
				// Handle any errors or show error messages to the user
			});
	};

	const checkTask = (taskId) => {
		const taskRef = doc(db, 'todos', taskId);

		// Toggle the "checked" field by setting it to the opposite value
		const newChecked = !tasks.find((task) => task.id === taskId).item.checked;

		updateDoc(taskRef, {
			checked: newChecked,
		})
			.then(() => {
				// Update the state to reflect the change in checked value
				setTasks((prevTasks) =>
					prevTasks.map((task) =>
						task.id === taskId
							? {
									...task,
									item: {
										...task.item,
										checked: newChecked,
									},
							  }
							: task
					)
				);
			})
			.catch((error) => {
				console.error('Error updating task: ', error);
				// Handle any errors or show error messages to the user
			});
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
