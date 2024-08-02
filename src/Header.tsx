import { Link } from "react-router-dom"
import "./Header.css"

function Header() {
	return (
		<nav>
			<Link to="/" className="link">Accueil</Link>
			<div></div>
			<Link to="/poule1" className="link">Poule 1</Link>
			<Link to="/poule2" className="link">Poule 2</Link>
			<Link to="/finale" className="link">Finale</Link>
			<Link to="/egalite" className="link">Egalite</Link>
		</nav>
	)
}

export default Header