import { FC, useState } from "react"
import Banner from './Banner'
import Products from './Products'
import NewProduct from './NewProduct'
import './App.css'

const App: FC = () => {
  const [showNewProduct, setShowNewProduct] = useState(false);

  return (
    <>
      <Banner />
      <div id="nav">
        <div>
          <button id="newProduct" onClick={() => setShowNewProduct(true)}>
            <h1>+</h1>
          </button>
        </div>

        <div>
          <h1>Products</h1>
        </div>

        <div>
          <input type="text" id="productSearch" placeholder="Search for products"></input>
        </div>

      </div>
      <Products />
      <NewProduct visible={showNewProduct} setVisible={setShowNewProduct}/>
    </>
  )
}

export default App;