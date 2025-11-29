import { useState } from 'react';

export default function Natividad() {
  const [tasksInput, setTasksInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!tasksInput.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: tasksInput.trim() }]);
    setTasksInput("");
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const panelStyle = {
    padding: "20px",
    backgroundColor: "var(--panel)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    maxWidth: "520px",
    margin: "20px auto",
    color: "var(--text)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)"
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "16px",
    fontSize: "1.4rem"
  };

  const inputRowStyle = {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    marginBottom: "16px"
  };

  const inputStyle = {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    backgroundColor: "var(--panel2)",
    color: "var(--text)"
  };

  const addBtnStyle = {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent2))",
    color: "white",
    fontWeight: 600,
    cursor: "pointer"
  };

  const listStyle = { listStyle: "none", padding: 0, margin: 0 };

  const itemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    backgroundColor: "var(--panel2)",
    marginBottom: "8px"
  };

  const removeBtnStyle = {
    padding: "8px 10px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    backgroundColor: "#2b3556",
    color: "var(--text)",
    cursor: "pointer"
  };

  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>Todo List</h2>
      <div style={inputRowStyle}>
        <input
          type="text"
          value={tasksInput}
          onChange={(e) => setTasksInput(e.target.value)}
          placeholder="Add a task"
          style={inputStyle}
        />
        <button style={addBtnStyle} onClick={addTask}>Add</button>
      </div>
      <ul style={listStyle}>
        {tasks.map((task) => (
          <li key={task.id} style={itemStyle}>
            <span>{task.text}</span>
            <button style={removeBtnStyle} onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
