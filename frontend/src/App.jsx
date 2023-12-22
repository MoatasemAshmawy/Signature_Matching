import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Root from './Root'
import SignatureExtraction from './SignatureExtraction'
import SignatureMatching from './SignatureMatching'

function App() {
 

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Root/>}>
          <Route path='extraction' element={<SignatureExtraction/>} />
          <Route path='matching' element={<SignatureMatching/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
