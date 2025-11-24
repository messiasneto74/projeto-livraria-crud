import { GiHamburgerMenu } from "react-icons/gi";

function Header({toggleSidebar}) {

  return (
    <header className="header_nav" >
      <div className="header_left">
      <p className="header-btn" onClick={toggleSidebar}>
      <GiHamburgerMenu />
      </p>
      </div>
      <h2>MEU APLICATIVO MARAVILHOSO</h2>
    </header>
  );
}

export default Header;
