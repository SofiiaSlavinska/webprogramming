import React, { useState, useContext } from 'react';
import { TaskContext } from './TaskContext';

const TaskItem = ({ task = { id: 0, text: 'Порожнє завдання', completed: false } }) => {
    const { toggleTask, deleteTask, editTask } = useContext(TaskContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleEditSave = () => {
        if (editText.trim()) {
            editTask(task.id, editText.trim());
            setIsEditing(false);
        }
    };

    return (
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
            />
            
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                    />
                    <button onClick={handleEditSave}>Зберегти</button>
                </>
            ) : (
                <>
                    <span className="task-text">{task.text}</span>
                    <button onClick={() => setIsEditing(true)}>Редагувати</button>
                </>
            )}
            
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>Видалити</button>
        </li>
    );
};

export default TaskItem;