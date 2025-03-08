import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addStores, updateStores } from "../../redux/reducers/storeSlice";
import {storeDetailsType} from '../../types/Types';
import {generateUniqueId} from '../commonFn'


interface AddStoreModalProps {
  storeToEdit?: storeDetailsType | null;
  setStoreToEdit: (store: storeDetailsType | null) => void; 
}

const AddStoreModal: React.FC<AddStoreModalProps> = ({ storeToEdit, setStoreToEdit }) => {
  const [show, setShow] = useState(false);
  const [store, setStore] = useState<storeDetailsType>({ id: 0,  storeCode: "",   storeName: "", city: "", state: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (storeToEdit) {
      setStore(storeToEdit); 
      setShow(true); 
    }
  }, [storeToEdit]);

  const handleClose = () => {
    setShow(false);
    setStoreToEdit(null); 
  };

  
  

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (store.storeName && store.city && store.state) {
      if (storeToEdit) {
        dispatch(updateStores(store)); 
      } else {
        const newId = generateUniqueId();
        dispatch(addStores({ ...store, id: newId,storeCode:Date.now().toString()})); 
      }
      handleClose();
      setStore({ id: 0, storeName: "",storeCode:"", city: "", state: "" });
    }
  };

  return (
    <div className="container mt-4">
      {!storeToEdit && (
        <Button variant="primary" onClick={() => setShow(true)} style={{ cursor: "pointer", marginLeft: "125px", marginTop: "-57px" }}>
          Add Store
        </Button>
      )}

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{storeToEdit ? "Update Store" : "Add Store"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Store Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter store name"
                name="storeName"
                value={store.storeName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                name="city"
                value={store.city}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state"
                name="state"
                value={store.state}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {storeToEdit ? "Update Store" : "Save Store"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddStoreModal;
