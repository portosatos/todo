import { useState } from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineStar, AiOutlinePlus, AiFillCheckCircle, AiFillStar } from 'react-icons/ai'

export const App = () => {
  // создали пустой массив для тудушек
  const [todos, setTodos] = useState([])

  // стейт инпута для названия 
  const [todoName, setTodoName] = useState('')

  const [searchTodo, setSearchTodo] = useState('')

  // функция которая меняет стейт при вводе данных в инпут
  const todoNameHandler = (e) => {
    setTodoName(e.target.value)
    // console.log(e.targer.value);
  }

  // функция которая добоавляет в массив тудушекб одну тудушку
  const addTodoHandler = (event) => {
    event.preventDefault();
    setTodos([
      ...todos,
      {
        id: new Date().getTime(),
        todoName: todoName,
        isCompleted: false,
        isFavorite: false,
      }
    ]);
    setTodoName('');
  }
  

  const searchHandler = (event) => {
    setSearchTodo(event.target.value)
  }

  const completeHandler = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
        return todo;
      
    });
    setTodos(updatedTodos); 
  }
  
  const deleteHandler = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos); 
  }

  const favoriteHandler = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          isFavorite: !todo.isFavorite,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }  
  

  return (
    <div className='container mx-auto p-2'>
    <h1 className='text-4xl text-center mb-2'>TodoList</h1>
    <div className='flex justify-between items-center gap-4 mb-4 '>
      <div className='flex gap-1'>
        <button className='min-w-[80px] h-10 px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg capitalize transition-colors duration-200'>all</button>
        <button className='min-w-[80px] h-10 px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg capitalize transition-colors duration-200'>active</button>
        <button className='min-w-[80px] h-10 px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg capitalize transition-colors duration-200'>favorite</button>
      </div>
      <div className='flex-1'>
      <input className='w-full border border-solid border-purple-700 rounded-lg pl-2 ' type='text' placeholder='search...' onChange={searchHandler}/>
      </div>
    </div>
    <ul className='flex flex-col mb-4'>
      {todos
      .filter((todo) => todo.todoName.includes(searchTodo))
      .map((todo) => (
        <li className='flex justify-between items-center' key={todo.id}>
          <span>{todo.todoName}</span>
          <div className='flex gap-1'>
            <button type='button' className='text-3xl text-green-500' onClick={() => completeHandler(todo.id)}>
              {
                todo.isCompleted ? <AiFillCheckCircle/> : <AiOutlineCheckCircle/>
              }
            </button>
            <button type='button' 
            className='text-3xl text-red-500' 
            onClick={() => deleteHandler(todo.id)}>
              <AiOutlineCloseCircle/>
            </button>
            <button className='text-3xl text-yellow-500'
              onClick={() => favoriteHandler(todo.id)}
            >
              {
                 todo.isFavorite ? <AiFillStar/> : <AiOutlineStar/>
              }
              </button>
          </div>
        </li>
      ))}
    </ul>
    <div className='add-todo'>
      {}
      <form onSubmit={addTodoHandler} className='relative flex items-center'>
        <input
         type='text' 
         placeholder='add todo...' 
         onChange={todoNameHandler} 
         value={todoName}
         className='w-full h-10 solid border-purple-600'/>
        <button type="submit" className='absolute right-2 text-3xl'>
          <AiOutlinePlus/>
        </button>
      </form>
    </div>
  </div>
  )
}