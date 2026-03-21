import React, { useContext, useState, useMemo } from 'react';
import { TaskContext } from './TaskContext';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';

const TaskList = () => {
    const { tasks } = useContext(TaskContext);
    const [filter, setFilter] = useState('all');

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.completed);
            case 'completed':
                return tasks.filter(task => task.completed);
            default:
                return tasks;
        }
    }, [tasks, filter]);

    const activeCount = useMemo(() => {
        return tasks.filter(task => !task.completed).length;
    }, [tasks]);

    return (
        <div className="task-list-container">
            <TaskFilter filter={filter} setFilter={setFilter} />
            <p className="task-count">Залишилось активних завдань: <strong>{activeCount}</strong></p>
            <ul className="task-list">
                {filteredTasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;