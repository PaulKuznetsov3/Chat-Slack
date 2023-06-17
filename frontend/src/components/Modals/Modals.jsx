import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { actions } from '../../slices';
import ModalAdd from './ModalAdd';
import RenameModal from './RenameModal';
import ModalDelete from './ModalDelete';

const modals = {
  add: ModalAdd,
  ren: RenameModal,
  del: ModalDelete,
};
const Modals = () => {
  const dispatch = useDispatch();
  const { show, type } = useSelector((state) => state.modalsInfo.modal);
  const handleClose = () => {
    dispatch(actions.closeModal({ type: '', target: null }));
  };
  const ActiveModal = modals[type];
  return (
    <Modal show={show} onHide={handleClose} centered>
      {ActiveModal && <ActiveModal handleClose={handleClose} />}
    </Modal>
  );
};

export default Modals;
