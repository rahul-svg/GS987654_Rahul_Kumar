import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addSKU, updateSKU } from "../../redux/reducers/skuSlice";
import {skuDetailsType} from '../../types/Types';
import {generateUniqueId} from '../commonFn'


interface AddSkuModalProps {
 skuToEdit?: skuDetailsType | null;
  setSkuToEdit: (store: skuDetailsType | null) => void; 
}

const AddSkuModal: React.FC<AddSkuModalProps> = ({ skuToEdit, setSkuToEdit }) => {
  const [show, setShow] = useState(false);
  const [sku, setSku] = useState<skuDetailsType>({id:"",label: "",class: "",department: "",price:"",cost:""});
  const dispatch = useDispatch();

  useEffect(() => {
    if (skuToEdit) {
      setSku(skuToEdit); 
      setShow(true); 
    }
  }, [skuToEdit]);

  const handleClose = () => {
    setShow(false);
    setSkuToEdit(null); 
  };

  
  

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSku({ ...sku, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sku.label && sku.class && sku.department && sku.price && sku.cost) {
      if (skuToEdit) {
        dispatch(updateSKU(sku)); 
      } else {
        const newId = generateUniqueId();
        dispatch(addSKU({ ...sku,id:String(newId)})); 
      }
      handleClose();
      setSku({ id:"",label: "",class: "",department: "",price:"",cost:""});
    }
  };

  return (
    <div className="container mt-4">
      {!skuToEdit && (
        <Button variant="primary" onClick={() => setShow(true)} style={{ cursor: "pointer", marginLeft: "125px", marginTop: "-57px" }}>
          Add SKU
        </Button>
      )}

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{skuToEdit ? "Update Sku" : "Add Sku"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Sku Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter sku name"
                name="label"
                value={sku.label}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter class name"
                name="class"
                value={sku.class}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department name"
                name="department"
                value={sku.department}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                name="price"
                value={sku.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter cost"
                name="cost"
                value={sku.cost}
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
            {skuToEdit ? "Update Sku" : "Save Sku"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddSkuModal;
