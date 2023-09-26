import React from 'react';
import { TaskItem } from './TaskItem';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export const TaskList = ({ tasks, checkedTasks, checkTask, deleteTask }) => {
	return (
		<Droppable droppableId='list-container'>
			{(provided) => (
				<ul
					className='list-container'
					{...provided.droppableProps}
					ref={provided.innerRef}
				>
					{tasks.map((task, index) => (
						<Draggable
							key={task.id}
							draggableId={task.id.toString()}
							index={index}
						>
							{(provided) => {
								return (
									<TaskItem
										key={task.id.toString()}
										text={task.text}
										checked={task.checked}
										onCheck={() => checkTask(task.id)}
										onDelete={() => deleteTask(task.id)}
										provided={provided}
									/>
								);
							}}
						</Draggable>
					))}
					{provided.placeholder}
				</ul>
			)}
		</Droppable>
	);
};
