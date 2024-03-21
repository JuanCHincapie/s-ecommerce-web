import Table from 'react-bootstrap/esm/Table';
import '../../index.scss';
import './CardProduct.css'
import SelectQuantity from './components/SelectQuantity';
import { useContext, useState } from 'react';
import { ShoppingCartContext } from '../../context/shoppingCart';

type CardProduct = {
  productId: number;
  productName:string;
  item: string | number;
  stock: number;
  description?: string;
  price: number;
}
const CardProduct = (cardProduct: CardProduct) => {
  const shoppingCartContext: any = useContext(ShoppingCartContext);
  const [quantity, setQuantity] = useState(0);

  const quantityChange = (cardProduct: CardProduct) => {
    shoppingCartContext?.quantityChange({...cardProduct, quantity});
  }

  return (
    <>
    <Table className="m-0">
      <tbody>
        <tr>
          <td>
            <div className="product-image-thumb wh65px float-start">
              <img className="w-100 h-100" src="src/assets/imgs/product-not-found.png" alt="Product Image"/>
            </div>
          </td>
          <td>
            <div className="text-start p-1 mw300px  float-start">
              <div >
                <strong>
                  {cardProduct.productName}
                </strong>
              </div>
              <p className="m-0">Item No. {cardProduct.productId} | <span className="text-success fw-bold">{cardProduct.stock} in stock</span></p>
              {!!cardProduct.description && <p className="m-0">{cardProduct.description}</p>}
            </div>
          </td>
          <td>
              <p className="m-1 fw-bold pt-2 fs-6">€{cardProduct.price}</p>
          </td>
          <td>
              <SelectQuantity currentQuantity={quantity} onChange={(quantity: number) => setQuantity(quantity)}/>   
          </td>
          <td>
            <button type="button" className="mt-1 btn btn-block btn-success" 
              onClick={() => quantityChange != null ? quantityChange(cardProduct): null}>Add to cart
            </button>
          </td>
        </tr>
      </tbody>
    </Table>
    </>
  )
}

export default CardProduct;