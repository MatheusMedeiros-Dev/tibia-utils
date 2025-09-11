import { useAuthValue } from "../context/AuthContext";
import AppButton from "./AppButton";

interface Dropdown {
  modalIsOpen: boolean;
  handleModalClose: () => void;
  handleModalConfirm: () => void;
  handleModalOpen: () => void;
}

const Dropdown = ({ handleModalOpen }: Dropdown) => {
  const { user } = useAuthValue();

  return (
    <div
      className={`fixed right-0 bg-surface-primary text-white  rounded-bl-md`}
    >
      {!user && (
        <ul className="list-none">
          <div className="flex flex-col p-2 gap-2">
            <AppButton
              type="navlink"
              buttonStyle="navbar"
              to="/register"
              label="Cadastre-se"
            />

            <div className="ml-2">
              <AppButton
                type="navlink"
                buttonStyle="login"
                to="/login"
                label="Entrar"
              />
            </div>
          </div>
        </ul>
      )}
      {user && (
        <div className="flex flex-col p-2">
          <ul className="list-none">
            <div className="flex flex-col gap-1">
              <li className="font-bold">Blog</li>

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

              <div className="ml-2">
                <AppButton
                  type="button"
                  buttonStyle="logout"
                  label="Sair"
                  onClick={() => {
                    handleModalOpen();
                  }}
                />
              </div>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
