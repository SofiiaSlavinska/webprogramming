import React, { useState, useRef, useContext } from 'react';
import { TaskContext } from './TaskContext';

const TaskForm = () => {
    const [text, setText] = useState('');
    const inputRef = useRef(null);
    const { addTask } = useContext(TaskContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            addTask(text.trim());
            setText('');
            inputRef.current.focus();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Додати нове завдання..."
            />
            <button type="submit">Додати</button>
        </form>
    );
};

export default TaskForm;