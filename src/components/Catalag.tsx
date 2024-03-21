import { useContext, useEffect, useState } from "react";
import CardProduct from "./components/CardProduct";
import CatalogPagination from "./components/CatalogPagination";
import { ECOMMERCE_API_URL } from "../constants/url";
import { ShoppingCartContext } from "../context/shoppingCart";

class Product
{
  id!:number;
  name!:string;
  description?:string;
  price:number = 0;
  categoryId!:number;
  availableStock:number = 0;
  categoryName?:string;
  selectQuantity:number = 0;
}

const Catalog = () => {
  const shoppingCartContext: any = useContext(ShoppingCartContext);
  let [products, setProducts]  = useState<Product[]>([]);
  let [pageSize] = useState(10);
  let [totalPages, setTotalPages] = useState(10);
  let [currentPage, setCurrentPage] = useState(1);
  useEffect(()=> {
    const url = `${ECOMMERCE_API_URL}v1/products/getProducts?currentPage=${encodeURIComponent(currentPage)}&pageSize=${encodeURIComponent(pageSize)}`;
    fetch(url, { method: 'GET', headers: { 'Content-type': 'application/json'}})
    .then((response) => response.json())
    .then((data: any) => {
      setProducts(data?.data);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    });
  }, [currentPage, shoppingCartContext?.shoppingCart])

  return (
    <>
      <ul>
        {products.length > 0 && products.map((item) => (
          <li key={item.id} className="ls-none">

            <CardProduct  
              productId={item.id}
              productName={item.name} 
              item={item.id} 
              stock={item.availableStock} 
              description={item.description} 
              price={item.price}
              >
              </CardProduct>
          </li>
          ))
        }
      </ul>
      <CatalogPagination currentPage={currentPage} totalPages={totalPages} handler={(currentPage: number) => setCurrentPage(currentPage)} />
    </>
  )
  
}
export default Catalog;

