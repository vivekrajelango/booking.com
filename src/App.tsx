import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchForm from './components/SearchForm'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import AvailabilityPage from './components/AvailabilityPage'
import CheckoutPage from './components/CheckoutPage'
import ConfirmationPage from './components/ConfirmationPage'
import { Routes, Route } from 'react-router-dom'
import { SearchProvider } from './context/SearchContext'

const App: React.FC = () => {
  return (
    <SearchProvider>
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
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </SearchProvider>
  )
}

export default App
