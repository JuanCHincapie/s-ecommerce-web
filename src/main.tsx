import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ShoppingCartProvider } from './context/shoppingCart.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ShoppingCartProvider>
    <App />
  </ShoppingCartProvider>,
)
