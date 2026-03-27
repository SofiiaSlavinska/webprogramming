import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  // Направлене звуження типу (Narrowing)
  if (task.type === 'bug') {
    return (
      <div style={{ border: '2px solid red', margin: '8px', padding: '12px', borderRadius: '4px' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>🐛 {task.title}</h3>
        <p style={{ margin: 0 }}>Status: {task.status}</p>
        <p style={{ margin: 0, fontWeight: 'bold' }}>Severity: {task.severity}</p> 
      </div>
    );
  }

  // Якщо це не 'bug', TypeScript точно знає, що це 'feature'
  return (
    <div style={{ border: '2px solid green', margin: '8px', padding: '12px', borderRadius: '4px' }}>
      <h3 style={{ margin: '0 0 8px 0' }}>✨ {task.title}</h3>
      <p style={{ margin: 0 }}>Status: {task.status}</p>
      <p style={{ margin: 0, fontWeight: 'bold' }}>Priority: {task.priority}</p>
      {task.expectedRelease && <p style={{ margin: 0 }}>Release: {task.expectedRelease}</p>}
    </div>
  );
};