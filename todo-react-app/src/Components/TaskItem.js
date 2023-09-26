import React from 'react';

export const TaskItem = ({ text, onCheck, checked, onDelete, provided }) => {
	const handleDeleteClick = (e) => {
		e.stopPropagation();
		onDelete();
	};

	return (
		<li
			onClick={onCheck}
			className={`drag-item ${checked ? 'checked' : ''}`}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
			ref={provided.innerRef}
			draggable={true}
		>
			{text}
			<span className='material-symbols-outlined' onClick={handleDeleteClick}>
				Delete
			</span>
		</li>
	);
};
