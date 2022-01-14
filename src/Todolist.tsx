import React, {useState} from 'react';
import {filterType} from "./App";
import './App.css';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: filterType, todolistID: string) => void
    addTask: (titleInput: string) => void
    changeCheked: (id: string, isDone: boolean) => void
    activeFilter: filterType
    id: string
}

export function Todolist({title, tasks, removeTask, changeFilter, addTask, changeCheked, activeFilter, ...props}: PropsType) {
    let [error, setError] = useState<string | null>(null)

    function filterTask(value: filterType, todolistID: string) {
        changeFilter(value, todolistID)
    }

    let [titleInput, setTitleInput] = useState('');

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTitleInput(e.currentTarget.value)
        setError("")
    }

    function addTaskHandler() {
        if (titleInput.trim() !== "") {
            addTask(titleInput)
            setTitleInput("")
        } else {
            setError("This pole is required")
        }
    }

    function onClickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        addTaskHandler()
    }

    function onKeyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return <div>
        <h3>{title}</h3>
        <div>
            <input className={error ? "error" : ""}
                   value={titleInput}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}
            >+
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {tasks.map((m) => {

                function changeChekedHandler(e: React.ChangeEvent<HTMLInputElement>) {
                    changeCheked(m.id, e.currentTarget.checked)
                }

                return (
                    <li className={m.isDone ? "isDone" : ""}>
                        <input
                            type="checkbox"
                            checked={m.isDone}
                            onChange={changeChekedHandler}
                        />
                        <span>{m.title}</span>
                        <button onClick={() => {
                            removeTask(m.id)
                        }}>X
                        </button>
                    </li>)
            })}

        </ul>
        <div>
            <button className={activeFilter === "All" ? "activeFilter" : ""} onClick={() => filterTask("All", props.id)}>All
            </button>
            <button className={activeFilter === "Active" ? "activeFilter" : ""}
                    onClick={() => {
                        filterTask("Active", props.id)
                    }}>Active
            </button>
            <button className={activeFilter === "Completed" ? "activeFilter" : ""}
                    onClick={() => filterTask("Completed", props.id)}>Completed
            </button>
        </div>
    </div>
}
