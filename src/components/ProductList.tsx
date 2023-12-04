import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import ProductForm from "./ProductForm";
import { Modal } from "react-bootstrap";
import { Product } from "../interfaces/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = "http://localhost:3001/products";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [formValues, setFormValues] = useState<Product>({
    name: "",
    price: 0,
    desc: "",
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(api)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const closeForm = () => {
    handleClose();
    setFormValues({
      name: "",
      price: 0,
      desc: "",
    });
    setSelectedProduct(null);
  };

  const successToast = () => {
    toast.success("Success", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  const handleDelete = async (id: string) => {
    const cf = confirm("Are you sure??");
    if (cf) {
      await axios.delete(`${api}/${id}`);
      setProducts((prevProduct) =>
        prevProduct.filter((product) => product.id !== id)
      );
      successToast();
    }
  };

  const openUpdateForm = (product: Product) => {
    setSelectedProduct(product);
    setFormValues(product);
    handleShow();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      if (selectedProduct) {
        e.preventDefault();
        const res = await axios.put(`${api}/${selectedProduct.id}`, formValues);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === selectedProduct.id ? res.data : product
          )
        );
        closeForm();
        successToast();
      } else {
        e.preventDefault();
        const res = await axios.post(api, formValues);
        setProducts((prevProducts) => [...prevProducts, res.data]);
        closeForm();
        successToast();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <ToastContainer />
          <div className="col-12">
            {/* <Button onClick={() => showForm()}>
              {isOpenForm ? "Đóng" : "Mở form"}
            </Button> */}
            <Button onClick={handleShow}>Open form</Button>

            <Modal show={show} onHide={closeForm}>
              <Modal.Body>
                <ProductForm
                  show={show}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  closeForm={closeForm}
                />
              </Modal.Body>
            </Modal>
          </div>
          <div className="col-12">
            <h2>Product List</h2>
            <Button onClick={handleShow}>Add product</Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Description</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.desc || "Đang cập nhật"}</td>
                      <td>
                        <Button
                          onClick={() => openUpdateForm(product)}
                          className="btn btn-warning"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() =>
                            handleDelete(product.id || "defaultId")
                          }
                          className="btn btn-danger"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
