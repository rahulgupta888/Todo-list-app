import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = (index) => {
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reduceTodo));
    setTodos(reduceTodo)
  };

  const handleCompleted = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updateCompletedArr = [...completedTodos];
    updateCompletedArr.push(filteredItem);
    setCompletedTodos(updateCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updateCompletedArr)
    );
  };

  const handleDeleteCompletedTodo = index => {
    let reduceTodo = [...completedTodos];
    reduceTodo.splice(index, 1);

    localStorage.setItem('completedTodos', JSON.stringify(reduceTodo));
    setCompletedTodos(reduceTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedcompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedcompletedTodo) {
      setCompletedTodos(savedcompletedTodo);
    }
  }, [])

  const handleEdit = (ind, item) => {
    console.log(ind);
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  }

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev)=> {
      return{...prev,title:value}
    })
  }

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev)=> {
      return{...prev,description:value}
    })
  }

  const handleUpdateTodo = ()=>{
    let newTodo = [...allTodos];
    newTodo[currentEdit] = currentEditedItem;
    setTodos(newTodo);
    setCurrentEdit("");
  }

  return (
    <div className="App">
      <h1>Todo Lists</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter Your Task Title" />
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Enter Your Task Description" />
          </div>

          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">Add</button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className="todo-list">

          {isCompleteScreen === false && allTodos.map((item, index) => {
            if (currentEdit === index) {
              return (
                <div className='edit__wrapper' key={index}>
                  <input placeholder='Update Title'
                    onChange={(e) => handleUpdateTitle(e.target.value)}
                    value={currentEditedItem.title} />
                  <textarea placeholder='Update Title'
                    rows={4}
                    onChange={(e) => handleUpdateDescription(e.target.value)}
                    value={currentEditedItem.description} />
                  <button type="button" onClick={handleUpdateTodo} className="primaryBtn">Update</button>
                </div>
              )
            } else {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div>
                    <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(index)} title="Delete?" />
                    <BsCheckLg className="check-icon" onClick={() => handleCompleted(index)} title="Completed?" />
                    <AiOutlineEdit className="check-icon" onClick={() => handleEdit(index, item)} title="Edit?" />
                  </div>

                </div>
              );
            }
          })}

          {isCompleteScreen === true && completedTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on: {item.completedOn}</small></p>
                </div>

                <div>
                  <AiOutlineDelete className="icon" onClick={() => handleDeleteCompletedTodo(index)} title="Delete?" />

                </div>

              </div>
            )
          })}

        </div>
      </div>
    </div>
  );
}

export default App;
