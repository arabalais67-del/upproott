import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Explore from './pages/Explore'
import CityPage from './pages/CityPage'
import Quiz from './pages/Quiz'
import Search from './pages/Search'
import './App.css'

function ScrollToTop() {
  // Scroll to top on route change
  const { pathname } = window.location
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/city/:slug" element={<CityPage />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
