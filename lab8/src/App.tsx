import { useState } from 'react';
import type { Task } from './types'; // Додали слово type
import { TaskCard } from './components/TaskCard';
import { List } from './components/List';
import { TaskForm } from './components/TaskForm';
import { filterTasks, isHighPriorityBug } from './utils';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Ініціалізація стану масивом нашого Discriminated Union
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', type: 'bug', title: 'Login API returns 500', status: 'todo', severity: 'critical' },
    { id: '2', type: 'feature', title: 'Implement dark mode', status: 'in-progress', priority: 1 },
    { id: '3', type: 'bug', title: 'Button alignment off', status: 'done', severity: 'low' }
  ]);

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const filteredTasks = filterTasks(tasks, searchQuery);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Task Management Dashboard</h2>
      
      <TaskForm onAddTask={handleAddTask} />

      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '20px', boxSizing: 'border-box' }}
      />

      {/* Передача дженерік-списку */}
      <List 
        items={filteredTasks} 
        renderItem={(task) => (
          <div style={{ 
            // Підсвічування "гарячих" завдань за допомогою Type Guard
            backgroundColor: isHighPriorityBug(task) ? '#ffebee' : 'transparent',
            borderRadius: '4px'
          }}>
            <TaskCard task={task} />
          </div>
        )} 
      />
    </div>
  );
}

export default App;