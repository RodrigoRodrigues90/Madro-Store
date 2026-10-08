import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Contatos from './pages/contatos.jsx'
import Cadastro from './pages/register/cadastro.jsx'
import Login from './pages/register/login.jsx'
import PaginaProdutos from './pages/paginaprodutos.jsx'
import ProdutoDescricao from './pages/produtodescricao.jsx'
import './index.css'

//***Redux */
import {Provider} from 'react-redux';
import store from './Redux/store.js';

//****Router */
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//********** */

//**** Swiper **** */
import {register} from 'swiper/element/bundle'
register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ScrollToTop from './components/ScrollToTop.jsx'
//************ */


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <ScrollToTop/>
    <Routes>
      <Route path='/Madro-Store' element={<App/>} />
      <Route path='/Madro-Store/contatos' element={<Contatos />}/>
      <Route path='/Madro-Store/cadastro' element={<Cadastro />}/>
      <Route path='/Madro-Store/login' element={<Login />}/>
      <Route path='/Madro-Store/produtos' element={<PaginaProdutos />}/>
      <Route path='/Madro-Store/produtos/:categorie' element={<PaginaProdutos />}/>
      <Route path='/Madro-Store/produtodescricao' element={<ProdutoDescricao/>}/>
    </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
