import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import {AppRoute} from '../../consts';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <Nav />
        </div>
      </div>
    </header>
  );
}

export default Header;