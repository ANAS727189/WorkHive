import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import FormManage from "./components/form.jsx";
import './App.css'

function App() {
  return (
    <>
       {/* first name , last name, email, salary, date, actions(edit, delete); */}

      <Navbar />
      <FormManage />
      <Footer />
    </>
  )
}

export default App