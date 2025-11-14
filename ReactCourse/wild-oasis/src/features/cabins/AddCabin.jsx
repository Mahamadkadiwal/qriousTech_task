import React, { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";


const AddCabin  = () => {
    return (
        
        <Modal>
            <Modal.Open opens="cabin-form">
                <Button>Add new cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm />
            </Modal.Window>
        </Modal>
        
    )
}

// const AddCabin = () => {
// //   const [isOpenModal, setisOpenModal] = useState(false);
//   return (
//     <div>
//       <Button
//         onClick={() => {
//           setisOpenModal(!isOpenModal);
//         }}
//       >
//         Add Cabin
//       </Button>

//       {isOpenModal && (
//         <Modal onClose={() => setisOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setisOpenModal(false)}/>
//         </Modal>
//       )}
//     </div>
//   );
// };

export default AddCabin;
