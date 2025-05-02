import { useEffect, useState } from "react"
import { ThemeProvider } from "./contexts/Theme"
import ThemeBtn from "./components/ThemeBtn"
import Card from "./components/Card"


function App() {
  const [themeMode,setThemeMode] = useState("light")

  const lightTheme = ()=>{
    setThemeMode("light")
  }
  const darkTheme = () =>{
    setThemeMode("dark")
  }

  //actual changes in theme
  useEffect(()=>{
    document.querySelector('html').classList.remove("light","dark")
    document.querySelector("html").classList.add(themeMode)
  },[themeMode])

  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme }}>
      <div className="flex flex-wrap min-h-screen text-center">
        <div className="w-full">
          <div className="w-full max--w-sm mx-autoflex justify-end mb-4"><ThemeBtn /></div>
        </div>
        <div className="w-full max-w-sm mx-auto">
          <Card />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
