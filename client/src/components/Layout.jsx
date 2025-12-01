import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import Header from "./Header";
import Menu from "./Menu";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import API from "../API";
import "../styles.css";


function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className={isSidebarCollapsed ? "layout" : "layout.close"}>
      <div className="layout_header">
        <Header toggleSidebar={toggleSidebar} />
      </div>

      <div className="layout_menu">
        {isSidebarCollapsed && <Menu toggleSidebar={toggleSidebar} />}
      </div>

      <div className="layout_content">
        <Outlet />
      </div>
    </div>
  );
}

const Layout = () => {
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (!cookies.token) return;
      const { data } = await API.post("/", {}, { withCredentials: true });
      if (data.status) {
        setUsername(data.user);
      }
    };
    fetchUser();
  }, [cookies]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  const initials = "MN"; // você pode montar pelas iniciais do username se quiser

  return (
    <div className="layout-container">
      <Sidebar className="app">
        <Menu>
          <MenuItem
            className="menu1"
            icon={
              <MenuRoundedIcon
                onClick={() => {
                  collapseSidebar();
                }}
              />
            }
            component={<Link to="/" className="link" />}
          >
            <h2>Livraria</h2>
          </MenuItem>

          <MenuItem
            icon={<HomeRoundedIcon />}
            component={<Link to="/" className="link" />}
          >
            Home
          </MenuItem>

          <MenuItem
            icon={<MenuBookRoundedIcon />}
            component={<Link to="/show-book" className="link" />}
          >
            Livros
          </MenuItem>

          <MenuItem
            icon={<AddBoxRoundedIcon />}
            component={<Link to="/create-book" className="link" />}
          >
            Novo livro
          </MenuItem>

          <MenuItem icon={<LogoutRoundedIcon />} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>

      <div className="content-wrapper">
        {/* Header com avatar MN */}
        <header className="topbar">
          <div className="topbar-title">Sistema Livraria CRUD</div>
          <div className="topbar-user" onClick={handleLogout}>
            <div className="avatar-circle">{initials}</div>
            <span className="topbar-username">{username}</span>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
