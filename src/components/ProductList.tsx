import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import ProductForm from "./ProductForm";
const api = "http://localhost:8000/api/products";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  type Product = {
    name: string;
    price: number;
    desc: string;
    _id?: string;
  };

  useEffect(() => {
    axios
      .get(api)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showForm = () => {
    setIsOpenForm(!isOpenForm);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2> Product Form</h2>
            <Button onClick={() => showForm()}>
              {isOpenForm ? "Đóng" : "Mở form"}
            </Button>
            {isOpenForm && <ProductForm />}
          </div>
          <div className="col-12">
            <h2>Product List</h2>
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
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.desc || "Đang cập nhật"}</td>
                      <td>
                        <Button className="btn btn-warning">Edit</Button>
                        <Button className="btn btn-danger">Delete</Button>
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
