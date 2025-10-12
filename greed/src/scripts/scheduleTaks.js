const scheduleTasks = (tasks) => {

    const sortedTasks = tasks.sort((a, b) => a.start.localeCompare(b.start));
  
    const scheduledTasks = [];
  
    sortedTasks.forEach((task) => {
      if (scheduledTasks.length === 0) {
        scheduledTasks.push(task); 
      } else {

        let conflict = false; 
  
        scheduledTasks.forEach((scheduledTask, index) => {
          if (
            task.start <= scheduledTask.start &&
            task.end > scheduledTask.start
          ) {
        
            conflict = true;
  
            if (task.end < scheduledTask.end) {
            
              scheduledTasks.splice(index, 1, task); 
            }
          }
        });
  
        if (!conflict) {
          scheduledTasks.push(task);
        }
      }
    });
  
    return scheduledTasks;
  };
  
export default scheduleTasks;

  