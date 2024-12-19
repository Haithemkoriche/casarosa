// ** React Imports
import { useTranslation } from "react-i18next";
// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const BasicModal = ({ data, basicModal, close }) => {
  // ** States
  const { t } = useTranslation();

  return (
    <Modal isOpen={basicModal} toggle={close} centered>
      <ModalHeader toggle={close}>{t("History")}</ModalHeader>
      <ModalBody>{data}</ModalBody>
    </Modal>
  );
};
export default BasicModal;
