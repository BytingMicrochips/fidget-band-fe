import './App.css'
import  logo  from './assets/logo.jpg'
function App() {
  return (
    <>
      <div className='splashLogo'>
        <img src={logo}/>
      </div>
      <div className='splashButtons'>
      <button>Enter site</button>
      <button>Join mailing list</button>
      </div>
    </>
  )
}

export default App
