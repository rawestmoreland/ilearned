import React, { useCallback, useEffect, useState } from 'react';

const ModalContext = React.createContext();

const Modal = ({ modal, unsetModal }) => {
  useEffect(() => {
    const bind = e => {
      if (e.keyCode !== 27) {
        return;
      }

      if (document.activeElement && ['INPUT', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }

      unsetModal();
    };

    document.addEventListener('keyup', bind);
    return () => document.removeEventListener('keyup', bind);
  }, [modal, unsetModal]);

  return modal;
};

const ModalProvider = props => {
  const [modal, setModal] = useState();
  const unsetModal = useCallback(() => {
    setModal();
  }, [setModal]);

  return (
    <ModalContext.Provider value={{ unsetModal, setModal }} {...props}>
      {props.children}
      {modal && <Modal modal={modal} unsetModal={unsetModal} />}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = React.useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a UserProvider');
  }

  return context;
};

export { ModalProvider, useModal };
