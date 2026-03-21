import React, { useContext } from 'react';
import { TaskProvider, TaskContext } from './TaskContext';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './App.css';

const MainContent = () => {
    const { theme, toggleTheme } = useContext(TaskContext);

    return (
        <div className={`app-container ${theme}`}>
            <header>
                <h1>Управління завданнями</h1>
                <button className="theme-toggle" onClick={toggleTheme}>
                    Змінити тему ({theme === 'light' ? 'Темна' : 'Світла'})
                </button>
            </header>
            <main>
                <TaskForm />
                <TaskList />
            </main>
        </div>
    );
};

const App = () => {
    return (
        <TaskProvider>
            <MainContent />
        </TaskProvider>
    );
};

export default App;