import { useAuthValue } from "../context/AuthContext";
import Modal from "./Modal";
import AppButton from "./AppButton";

interface Dropdown {
  onClick?: () => void;
  modalIsOpen: boolean;
  handleModalClose: () => void;
  handleModalConfirm: () => void;
  handleModalOpen: () => void;
}

const Dropdown = ({
  onClick,
  modalIsOpen,
  handleModalClose,
  handleModalConfirm,
  handleModalOpen,
}: Dropdown) => {
  const { user } = useAuthValue();

  return (
    <div
      className={`fixed right-0 bg-surface-primary text-white  rounded-bl-md`}
    >
      {!user && (
        <ul className="list-none">
          <div className="flex flex-col p-2 gap-2">
            <li>
              <AppButton
                type="navlink"
                buttonStyle="navbar"
                to="/register"
                label="Cadastre-se"
                onClick={onClick}
              />
            </li>
            <li className="ml-2">
              <AppButton
                type="navlink"
                buttonStyle="login"
                to="/login"
                label="Entrar"
                onClick={onClick}
              />
            </li>
          </div>
        </ul>
      )}
      {user && (
        <div className="flex flex-col p-2">
          <ul className="list-none">
            <div className="flex flex-col gap-1">
              <li className="font-bold">Blog</li>
              <li>
                <AppButton
                  type="navlink"
                  buttonStyle="navbar"
                  to="/posts/create"
                  label="Criar Post"
                  onClick={onClick}
                />
              </li>
              <li>
                <AppButton
                  type="navlink"
                  buttonStyle="navbar"
                  to="/dashboard/posts"
                  label="Meus Posts"
                  onClick={onClick}
                />
              </li>
              <li className="ml-2">
                <AppButton
                  type="button"
                  buttonStyle="logout"
                  label="Sair"
                  onClick={() => {
                    handleModalOpen();
                  }}
                />
              </li>
              <li>
                <Modal
                  modalIsOpen={modalIsOpen}
                  modalOnClose={handleModalClose}
                  modalText="Você tem certeza que deseja sair?"
                  modalOnClickClose={handleModalClose}
                  modalOnClickConfirm={handleModalConfirm}
                />
              </li>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
