import React, { createContext, useState, useEffect, useCallback } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const addTask = useCallback((text) => {
        setTasks(prev => [...prev, { id: Date.now(), text, completed: false }]);
    }, []);

    const toggleTask = useCallback((id) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    }, []);

    const deleteTask = useCallback((id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    }, []);

    const editTask = useCallback((id, newText) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, text: newText } : t));
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, theme, addTask, toggleTask, deleteTask, editTask, toggleTheme }}>
            {children}
        </TaskContext.Provider>
    );
};