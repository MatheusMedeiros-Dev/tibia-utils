import { useAuthValue } from "../context/AuthContext";
import AppButton from "../components/AppButton";
import tibiaIcon from "../assets/icon.png";
import LineDivider from "../components/LineDivider";
import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import Dropdown from "../components/Dropdown";
import { FaUserCircle } from "react-icons/fa";
import { useAuthentication } from "../hooks/useAuthentication";

const Navbar = () => {
  const { user } = useAuthValue();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuthentication();

  const handleModalOpen = () => {
    setModalIsOpen(true);
    setDropdownOpen(false);
  };
  const handleModalClose = () => setModalIsOpen(false);
  const handleModalConfirm = () => {
    logout();
    setModalIsOpen(false);
  };
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);
  return (
    <header className="sticky top-0 left-0 w-full p-2 bg-surface-primary shadow-lg">
      <nav>
        <ul className="flex items-center justify-between text-primary-text">
          <div className="flex">
            <li>
              <AppButton
                type="link"
                to="/"
                buttonStyle="withoutStyle"
                label={{ src: tibiaIcon, alt: "Logo do site" }}
              />
            </li>
          </div>
          <FaUserCircle
            className="sm:hidden text-3xl cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          <div className="hidden sm:flex">
            <AppButton
              type="navlink"
              buttonStyle="navbar"
              to="/"
              label="Home"
            />

            {!user && (
              <div className="flex">
                <AppButton
                  type="navlink"
                  buttonStyle="navbar"
                  to="/register"
                  label="Cadastre-se"
                />
                <LineDivider direction="vertical" />
                <AppButton
                  type="navlink"
                  buttonStyle="login"
                  to="/login"
                  label="Entrar"
                />
              </div>
            )}
            {user && (
              <>
                <AppButton
                  type="navlink"
                  buttonStyle="navbar"
                  to="/posts/create"
                  label="Criar Post"
                />
                <AppButton
                  type="navlink"
                  buttonStyle="navbar"
                  to="/dashboard/posts"
                  label="Meus Posts"
                />
                <LineDivider direction="vertical" />
                <AppButton
                  type="button"
                  buttonStyle="logout"
                  label="Sair"
                  onClick={handleModalOpen}
                />
                <Modal
                  modalIsOpen={modalIsOpen}
                  modalOnClose={handleModalClose}
                  modalText="Você tem certeza que deseja sair?"
                  modalOnClickClose={handleModalClose}
                  modalOnClickConfirm={handleModalConfirm}
                />
              </>
            )}
          </div>
        </ul>
      </nav>
      {dropdownOpen ? (
        <div ref={dropdownRef} className="w-fit">
          <Dropdown
            handleModalClose={handleModalClose}
            handleModalConfirm={handleModalConfirm}
            handleModalOpen={handleModalOpen}
            modalIsOpen={modalIsOpen}
          />
        </div>
      ) : (
        ""
      )}
    </header>
  );
};

export default Navbar;
