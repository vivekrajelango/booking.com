import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchForm from './components/SearchForm'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 -mt-8">
        <SearchForm />
      </div>
    </div>
  )
}

export default App
