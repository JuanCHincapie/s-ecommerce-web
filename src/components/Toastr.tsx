import { forwardRef, useImperativeHandle, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
class ToastModel {
  message!: string;
  title?: string;
}
const Toastr = forwardRef(({}, ref) => {
  const [show, setShow] = useState(false);
  const [message, setMessage]= useState<ToastModel>({message: "" });

  const toggleShow = () => setShow(!show);
  const showMessage = (message: string, title?: string) => {
    setMessage({message, title});
    setShow(!show);
  } 

  useImperativeHandle(ref, ()=> ({ showMessage }) );

  return (
   
        <Toast className='position-absolute top-0 end-0 m-2 zi1050' show={show} onClose={toggleShow} autohide delay={4000}>
          <Toast.Header>
            <strong className="me-auto">{message.title}</strong>
            <small></small>
          </Toast.Header>
          <Toast.Body>{message.message}</Toast.Body>
        </Toast>
  );
})

export default Toastr;