import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

function PrivateRoute({ children }) {
  // placeholder auth check — replace with real auth state
  const isLoggedIn = false
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/category/:id" element={
          <PrivateRoute><CategoryPage/></PrivateRoute>
        } />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard/*" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  )
}
