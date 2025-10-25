import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchForm from './components/SearchForm'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import AvailabilityPage from './components/AvailabilityPage'
import { Routes, Route } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <SearchForm />
            </>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/availability" element={<AvailabilityPage />} />
      </Routes>
    </div>
  )
}

export default App
