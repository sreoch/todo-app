export const Summary = () => {
	return (
		<div id='summary-container'>
			<h2>Summary</h2>
			<div>Tasks remaining: {taskCount}</div>
			<div>Completed tasks: {checkedCount}</div>
		</div>
	);
};
