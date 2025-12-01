import { Outlet, Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import "../styles.css"; 

function Layout() {
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="layout-container">
      <Sidebar className="app">
        <Menu>
          <MenuItem className="menu1" onClick={() => collapseSidebar()}>
            <h2>Dashboard</h2>
          </MenuItem>

          <MenuItem component={<Link to="/" />}>Home</MenuItem>
          <MenuItem component={<Link to="/show-book" />}>Livros</MenuItem>
          <MenuItem component={<Link to="/create-book" />}>Novo Livro</MenuItem>
        </Menu>
      </Sidebar>

      <div className="content-wrapper">
        <header className="topbar">
          <div className="search">
            <input placeholder="Search..." />
          </div>
          <div className="topbar-right">
            <button className="btn">New</button>
            <button className="btn">Upload</button>
            <div className="avatar" onClick={handleLogout}>
              MN
            </div>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
