// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Dropdown from 'react-bootstrap/esm/Dropdown'
import './App.css'
import ResultSection from './components/ResultSection'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faB } from "@fortawesome/free-solid-svg-icons";
import { ShoppingCartContext } from './context/shoppingCart';
import { useContext, useEffect, useRef, useState } from 'react';
import ButtonShoppingCart from './components/ButtonShoppingCart';
import Table from 'react-bootstrap/esm/Table';
import { ECOMMERCE_API_URL } from './constants/url';
import Toastr from './components/Toastr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas, faB);

function App() {
  const shoppingCartContext: any = useContext(ShoppingCartContext);
  const [categories, setCategories] = useState([]);
  const modalRef: any = useRef();
  const toastRef: any = useRef();
  const getItems = () => shoppingCartContext.shoppingCart.reduce((prv: number, crr: any) => prv + crr.quantity, 0);
  const getTotal = () => shoppingCartContext.shoppingCart.reduce((prv: number, crr: any) => prv + crr.totalPrice, 0);

  useEffect(()=>{
    const url = `${ECOMMERCE_API_URL}v1/categories/getAll`;
    fetch(url, { method: 'GET', headers: { 'Content-type': 'application/json'}})
    .then((response) => response.json())
    .then((data: any) => {
      setCategories(data);
    });
  }, [])

  const processOrder = () => {
    const request = {
      customerId: 1,
      orderItems: shoppingCartContext.shoppingCart
    }
    const url = `${ECOMMERCE_API_URL}v1/orders/create`;
    fetch(url, { method: 'POST', headers: { 'Content-type': 'application/json'}, body: JSON.stringify(request) })
    .then((response) => {
      const res = response.json();
      console.log(res);
      return res;
    })
    .then((data: any) => {
      if(data.successful) {
        shoppingCartContext.setShoppingCart([]);
        modalRef.current.handleClose();
        toastRef.current.showMessage('Your order has been created.', 'Your order');
      }else{
        toastRef.current.showMessage(data.message, 'Failure');
      }
    });
  }

  const onChangeHandler = (value: number, item: any) => {
    if(value >= 0 && value != item.quantity){
      shoppingCartContext?.quantityChange({...item, quantity: value});
    } 
  }

  const handleDeleteItem = (productId: number) => {
    shoppingCartContext?.deleteItem(productId);
  }

  return (
    <>
      <div className="wrapper">
        <nav className="main-header navbar navbar-expand-md navbar-light navbar-white nav-border">
          <div className="container">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Categorias
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  categories?.length > 0 && categories.map((category: any) => 
                    <Dropdown.Item href="#/action-1">{category.name}</Dropdown.Item>
                  )
                }
              </Dropdown.Menu>
            </Dropdown>

            <ButtonShoppingCart ref={modalRef} title='Shopping cart details'>
              {
                <>
                <Table>
                  <tbody>
                    {
                      shoppingCartContext.shoppingCart?.map((item: any, index: number) => 
                      <tr key={index}>
                        <td>{item.productName}</td>
                        <td>{item.price}</td>
                        <td>
                          <input type="number" 
                            className="w60px text-end" 
                            value={item.quantity} 
                            onChange={(event)=> onChangeHandler(+event.target.value >= 0 ? +event.target.value : 0, item) }
                          />
                          </td>
                        <td>{item.totalPrice}</td>
                        <td className="float-end">
                          <span className='btn btn-default' onClick={()=> handleDeleteItem(item.productId)}>
                            <FontAwesomeIcon icon={fas.faTrashCan}/>
                          </span>
                        </td>
                      </tr>
                      )
                    }
                  </tbody>
                </Table>
                <div className="position-absolute bottom-0 w-100">
                  <div className="w100">
                    <Table>
                      <tbody>
                        <tr>
                          <td>Items </td>
                          <td className="float-end">{getItems()}</td>
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td className="float-end">{getTotal()}</td>
                        </tr>
                      </tbody>

                    </Table>
                  </div>
                  <button className="btn btn-flat btn-primary w-100 b-0" onClick={()=> processOrder()}>
                    Process Order
                  </button>
                </div>
                </>
              }
            </ButtonShoppingCart>
          </div>
        </nav>
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0"> Shopping <small>Cart</small></h1>
                </div>
              </div>
            </div>
          </div>
          <ResultSection />
        </div>
      </div>
      <Toastr ref={toastRef}>
        
      </Toastr>
    </>
  )
}

export default App
