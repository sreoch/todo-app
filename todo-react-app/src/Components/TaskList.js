import React from 'react';
import { TaskItem } from './TaskItem';

export const TaskList = ({ tasks, checkedTasks, checkTask, deleteTask }) => {
	return (
		<ul id='list-container' className='drag-sort-enable'>
			{tasks.map((task) => (
				<TaskItem
					key={task.id}
					text={task.text}
					checked={task.checked}
					onCheck={() => checkTask(task.id)}
					onDelete={() => deleteTask(task.id)}
				/>
			))}
		</ul>
	);
};
