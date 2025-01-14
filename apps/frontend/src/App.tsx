import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<></>} />
      </Routes>
    </Router>
  )
}