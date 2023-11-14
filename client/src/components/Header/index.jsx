import { Link } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/userSlice";
import { NewspaperClipping } from "@phosphor-icons/react";
import { linksIfLoggedIn, linksIfLoggedOut } from "./config";
import "./styles.scss";


const Header = ({ isLoading }) => {

  const user = useSelector(selectCurrentUser);
  const userMenuLinks = user ? linksIfLoggedIn : linksIfLoggedOut;

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  return (
    <header className="header">
      <nav className="header__nav">
        <Link className="header__logo" to="/news">
          <NewspaperClipping size={40} weight="duotone" color="#646cff" />
          News Portal
        </Link>

        {isLoading || isLoggingOut
          ? <p>Загружается...</p>
          : <div className="header__user-menu">
              {userMenuLinks.map(({text, href}) => 
                (<Link
                  key={text}
                  to={href}
                  {...text === "Выйти" ? {onClick: logout} : {}}
                >
                  {text}
                </Link>)
              )}
            </div>
        }
      </nav>
    </header>
          
  );
};

export default Header;
