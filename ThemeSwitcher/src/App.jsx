// import { useEffect, useState } from "react"
// import { ThemeProvider } from "./contexts/Theme"
// import ThemeBtn from "./components/ThemeBtn"
// import Card from "./components/Card"

// function App() {
//   const [themeMode,setThemeMode] = useState("light")

//   const lightTheme = ()=>{
//     setThemeMode("light")
//   }
//   const darkTheme = () =>{
//     setThemeMode("dark")
//   }

//   //actual changes in theme
//   useEffect(()=>{
//     document.querySelector('html').classList.remove("light","dark")
//     document.querySelector("html").classList.add(themeMode)
//   },[themeMode])

//   return (
//     <ThemeProvider value={{themeMode, lightTheme, darkTheme }}>
//       <div className="flex flex-wrap min-h-screen text-center">
//         <div className="w-full">
//           <div className="w-full max--w-sm mx-autoflex justify-end mb-4"><ThemeBtn /></div>
//         </div>
//         <div className="w-full max-w-sm mx-auto">
//           <Card />
//         </div>
//       </div>
//     </ThemeProvider>
//   )
// }

// export default App


import { useState, useEffect } from 'react'
import {TodoProvider} from './contexts'
//import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

    
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  



  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App