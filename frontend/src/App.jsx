import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Root from './Root'
import SignatureExtraction from './SignatureExtraction'
import SignatureMatching from './SignatureMatching'
import Hero from './Hero'
 

function App() {
 const baseUrl = import.meta.env.BASE_URL;

  return (
    <Router basename={baseUrl}>
      <Routes>
        <Route path='/' element={<Root/>}>
          <Route path ='/' element={<Hero/>}/>
          <Route path='/extraction' element={<SignatureExtraction/>} />
          <Route path='/matcher' element={<SignatureMatching/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
