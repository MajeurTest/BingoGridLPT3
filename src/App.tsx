import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";
import './App.css'

function App() {
  
  return (
    <>
      <Helmet>
        <title>LPT Bingo | Accueil</title>
      </Helmet>

      <h1>LPT Bingo : Super Mario Sunshine</h1>

      <div className='grilleAccueil'>
        <Link to="/poule1" className='element'>
          Poule 1
        </Link>
        <Link to="/poule2" className='element'>
          <div>Poule 2</div>
        </Link>
        <Link to="/finale" className='element'>
          <div>Finale</div>
        </Link>
        <Link to="/egalite" className='element'>
          <div>Egalite</div>
        </Link>
      </div>
    </>
  )
}

export default App
