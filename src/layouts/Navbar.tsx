import AppButton from "../components/AppButton";
import tibiaIcon from "../assets/icon.png";

import { useEffect, useRef, useState } from "react";

import Dropdown from "../components/Dropdown";
import { FaUserCircle } from "react-icons/fa";
import { useAuthentication } from "../hooks/useAuthentication";
import Modal from "../components/Modal";

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuthentication();

  const handleModalOpen = () => {
    setModalIsOpen(true);
    setDropdownOpen(false);
    console.log("x");
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
          <div className="flex">
            <AppButton
              type="navlink"
              buttonStyle="navbar"
              to="/loot-split"
              label="Loot Split"
            />

            <AppButton
              type="navlink"
              buttonStyle="navbar"
              to="/"
              label="Blog"
            />
          </div>
          <FaUserCircle
            className="text-3xl cursor-pointer"
            onClick={() => setDropdownOpen(true)}
          />
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
      <Modal
        modalIsOpen={modalIsOpen}
        modalOnClose={handleModalClose}
        modalText="Você tem certeza que deseja sair?"
        modalOnClickClose={handleModalClose}
        modalOnClickConfirm={handleModalConfirm}
      />
    </header>
  );
};

export default Navbar;
