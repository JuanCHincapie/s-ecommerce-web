import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import { ShoppingCartContext } from "../context/shoppingCart";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fas, faB, faL } from "@fortawesome/free-solid-svg-icons";
import Offcanvas from "react-bootstrap/esm/Offcanvas";

library.add(fas, faB);
interface Props {
  title: string;
  children: any;
  hidden?: boolean;
}
const ButtonShoppingCart = forwardRef(({ children, title, hidden }: Props, ref) => {
  const shoppingCartContext: any = useContext(ShoppingCartContext);

  const [show, setShow] = useState(hidden ?? false);

  useEffect(()=>{
    setShow(show);
  }, [show]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, ()=> { 
    return {
      handleClose
    }
  });

  return (
    <>
      <button type="button" className="btn btn-primary position-relative" onClick={() => shoppingCartContext?.shoppingCart?.length > 0 ? handleShow(): null }>
        <FontAwesomeIcon icon={fas.faCartShopping} />
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {shoppingCartContext?.shoppingCart?.length ?? 0}
        </span>
      </button>
      <Offcanvas show={show} onHide={handleClose} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
         {children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
})

export default ButtonShoppingCart;