import { useState } from 'react';
import './App.css'
import { Hero } from './components/Hero'
import { Input } from './components/Input';

function App() {
  const [user, setUser] = useState('');
  const [visible, setVisible] = useState(true);

  const handleOnClick = () => {
      setVisible(false)
  }

  if (visible) {
      return (
          <>
              <Input setUser={setUser} />

              <button
              className="btn"
              onClick={handleOnClick}
              >Submit</button>
          </>
      )
  }
  return (
    <>
      <Hero user={user} />
    </>
  )
}

export default App
