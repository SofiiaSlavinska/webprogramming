import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react'; // Типи з React
import type { Task } from '../types';               // Наш тип

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

export const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [taskType, setTaskType] = useState<'bug' | 'feature'>('bug');
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Автоматичний фокус при зміні типу завдання
  useEffect(() => {
    // Optional chaining безпечно обробляє можливий null
    inputRef.current?.focus();
  }, [taskType]);

  // Сувора типізація події onChange
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Сувора типізація події onSubmit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = taskType === 'bug' 
      ? { id: Date.now().toString(), type: 'bug', title, status: 'todo', severity: 'low' }
      : { id: Date.now().toString(), type: 'feature', title, status: 'todo', priority: 1 };

    onAddTask(newTask);
    setTitle(''); // Очищення форми
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ marginRight: '16px', cursor: 'pointer' }}>
          <input 
            type="radio" 
            checked={taskType === 'bug'} 
            onChange={() => setTaskType('bug')} 
          /> Bug
        </label>
        <label style={{ cursor: 'pointer' }}>
          <input 
            type="radio" 
            checked={taskType === 'feature'} 
            onChange={() => setTaskType('feature')} 
          /> Feature
        </label>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input 
          ref={inputRef}
          type="text" 
          value={title} 
          onChange={handleTitleChange} 
          placeholder={`Enter ${taskType} title...`}
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Add Task</button>
      </div>
    </form>
  );
};