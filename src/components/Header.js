import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to="/">
      <i className="fa-solid fa-earth-americas" />
    </Link>
    <p>Covid19 in South America</p>
    <div>
      <i className="fa-solid fa-microphone" />
      <i className="fa-solid fa-gear" />
    </div>
  </header>
);

export default Header;
