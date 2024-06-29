import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_PRODUCT_PENDING, GET_PRODUCT_PENDING, POST_PRODUCT_PENDING, UPDATE_PRODUCT_PENDING } from "./redux-saga/admin/action";


function App() {

  let dispatch = useDispatch()

  let [view, setview] = useState({})

  let img = useRef()
  let name = useRef()
  let price = useRef()
  let desc = useRef()

  // ADD data
  let submitData = () => {

    let product = {

      img: img.current.value,
      name: name.current.value,
      price: price.current.value,
      desc: desc.current.value,

    }
    console.log(product);

    dispatch({ type: POST_PRODUCT_PENDING, payload: product })

  }

  // fetch data
  let result = useSelector((state) => state.adminReducer)

  // delete data
  let deleteData = (id) => {
    // console.log(id, "id from delete api ");
    dispatch({ type: DELETE_PRODUCT_PENDING, payload: id })
  }

  //view data
  function viewData(product) {
    setview(product);
  }

  function handle(e) {
    setview({ ...view, [e.target.name]: e.target.value });
  }

  function updateProduct() {
    dispatch({ type: UPDATE_PRODUCT_PENDING, payload: view });
  }


  useEffect(() => {
    dispatch({ type: GET_PRODUCT_PENDING })
  }, [])

  if (result.isLoading) {
    return <h1>Loading....</h1>
  }

  return (
    <>
      <div className="container-fluid mt-2">
        <label className="mb-2 fw-semibold">Image : </label>
        <input type="text" ref={img} className="form-control border border-secondary mb-3" style={{ width: "20%" }} placeholder="Enter here image link" />
        <label className="mb-2 fw-semibold">Name : </label>
        <input type="text" ref={name} className="form-control border border-secondary mb-3" style={{ width: "20%" }} placeholder="Enter here name" />
        <label className="mb-2 fw-semibold">Price : </label>
        <input type="number" ref={price} className="form-control border border-secondary mb-3" style={{ width: "20%" }} placeholder="Enter here price" />
        <label className="mb-2 fw-semibold">Description : </label>
        <input type="text" ref={desc} className="form-control border border-secondary mb-3" style={{ width: "20%" }} placeholder="Enter here description" />
        <button className="btn btn-dark mt-3" onClick={submitData} style={{ width: "20%" }}>Submit</button>

        <table class="table mt-4">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              result.product.map((val, index) => {
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td><img src={val.img} width={50} /></td>
                      <td>{val.name}</td>
                      <td>{val.price}</td>
                      <td>{val.desc}</td>
                      <td><button onClick={() => viewData(val)} class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Update</button></td>
                      <td><button onClick={() => deleteData(val.id)} className="btn btn-outline-dark">Delete</button></td>
                    </tr>
                  </>
                )
              })
            }
          </tbody>
        </table>


        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Update Product Details</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label class="col-form-label fw-semibold">Image:</label>
                    <input type="text" name="img" value={view.img} onChange={handle} class="form-control border border-secondary" />
                  </div>
                  <div class="mb-3">
                    <label class="col-form-label fw-semibold">Name:</label>
                    <input type="text" name="name" value={view.name} onChange={handle} class="form-control border border-secondary" />
                  </div>
                  <div class="mb-3">
                    <label class="col-form-label fw-semibold">Price:</label>
                    <input type="text" name="price" value={view.price} onChange={handle} class="form-control border border-secondary" />
                  </div>
                  <div class="mb-3">
                    <label class="col-form-label fw-semibold">Description:</label>
                    <input type="text" name="desc" value={view.desc} onChange={handle} class="form-control border border-secondary" />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button onClick={updateProduct} type="button" data-bs-dismiss="modal" class="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
