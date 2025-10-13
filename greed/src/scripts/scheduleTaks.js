const scheduleTasks = (tasks) => {
  // 1. Sort tasks by their finish times in ascending order.
  const sortedTasks = tasks.sort((a, b) => a.end.localeCompare(b.end));

  if (sortedTasks.length === 0) {
    return [];
  }

  // 2. Initialize the schedule with the first task.
  const scheduledTasks = [sortedTasks[0]];

  // 3. Keep track of the finish time of the last scheduled task.
  let lastFinishTime = sortedTasks[0].end;

  // 4. Iterate through the rest of the tasks.
  for (let i = 1; i < sortedTasks.length; i++) {
    const currentTask = sortedTasks[i];

    // 5. If the current task starts after or at the same time the last one finishes, schedule it.
    if (currentTask.start >= lastFinishTime) {
      scheduledTasks.push(currentTask);
      lastFinishTime = currentTask.end;
    }
  }

  return scheduledTasks;
};

export default scheduleTasks;