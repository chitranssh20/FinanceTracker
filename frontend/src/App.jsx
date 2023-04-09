import React from 'react'
import ResponsiveSidebar from './ResponsiveSidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Income from './Income';
const App = () => {
  return (
    <>
      <Router>
        <Routes>

          <Route path='/' element={<ResponsiveSidebar />} />
          <Route path='/income' element={<>
             <ResponsiveSidebar />
             <Income />
          </>
             } />
          <Route path='/expenses' element={<ResponsiveSidebar />} />
          <Route path='/budget' element={<ResponsiveSidebar />} />
          <Route path='/savings' element={<ResponsiveSidebar />} />
          <Route path='/investments' element={<ResponsiveSidebar />} />
          <Route path='/debt' element={<ResponsiveSidebar />} />
          <Route path='/net-worth' element={<ResponsiveSidebar />} />
          <Route path='/financial-goals' element={<ResponsiveSidebar />} />
          <Route path='/reports' element={<ResponsiveSidebar />} />
          <Route path='/alerts' element={<ResponsiveSidebar />} />
        </Routes>
      </Router>
    </>
  )
}

export default App