import { useState } from 'react';
import JobBox from './components/JobBox';
import scheduleTasks from "./scripts/scheduleTaks";
import jobs from './test';
import './App.css';

function App() {
  const [taskName, setTaskName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [allTasks, setAllTasks] = useState(jobs);
  const [scheduledTasks, setScheduledTasks] = useState([]);

  const handleAddTask = () => {
    const isNameValid = /^[A-Za-z\s,-]+$/.test(taskName);
    const isTimeValid = /^([01]\d|2[0-3]):([0-5]\d)$/.test(startTime) && /^([01]\d|2[0-3]):([0-5]\d)$/.test(endTime);

    if (isNameValid && isTimeValid && startTime < endTime) {
      const newTask = { name: taskName, start: startTime, end: endTime };
      setAllTasks(prev => [...prev, newTask]);
      setTaskName("");
      setStartTime("");
      setEndTime("");
    } else {
      alert('Por favor, insira valores válidos. O horário de início deve ser anterior ao término.');
    }
  };

  const handleScheduleTasks = () => {
    if (allTasks.length === 0) {
      alert("Adicione pelo menos uma tarefa");
      return;
    }
    const result = scheduleTasks([...allTasks]);
    setScheduledTasks(result);
  };

  const handleClearTasks = () => {
    setAllTasks([]);
    setScheduledTasks([]);
  };

  return (
    <div className="app-container">
      <header>
        <h1> Tarefeas Scheduler</h1>
      </header>

      <main>
        <section className="form-section">
          <h2>Adicionar Nova Tarefa</h2>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Nome da tarefa"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <button onClick={handleAddTask}>Adicionar</button>
          </div>
        </section>

        <div className="actions">
          <button className="schedule" onClick={handleScheduleTasks}>Agendar Tarefas</button>
          <button className="clear" onClick={handleClearTasks}>Limpar Tudo</button>
        </div>

        <div className="task-grid">
          <div className="task-column">
            <h3>Tarefas a Agendar ({allTasks.length})</h3>
            <div className="task-list">
              {allTasks.map((task, index) => (
                <JobBox key={index} job={task} />
              ))}
            </div>
          </div>

          <div className="task-column">
            <h3>Tarefas Agendadas ({scheduledTasks.length})</h3>
            <div className="task-list">
              {scheduledTasks.map((task, index) => (
                <JobBox key={index} job={task} color="green" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
