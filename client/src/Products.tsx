import { useState, useEffect, FC } from 'react'
import './Products.css'

const ProductImage: FC<{id?: string, imageURL?: string, children?: JSX.Element}> = (props) => {
  /** Return an element for a product image */
  const prodImgDir = "src/assets/product-images";
  const imageURL = props.imageURL? 
    props.imageURL.indexOf("/")===-1? 
      `${prodImgDir}/${props.imageURL}`
      : props.imageURL
    : `${prodImgDir}/default.svg`;

  
  return <div id={props.id} className='productImage'> 
    <img src={imageURL} />
    {props.children}
  </div>
}

type Product = {
  brand: string,
  name: string,
  price: number,
  inStock: number,
  size?: string,
  description?: string,
  imageURL?: string
} 

const ProductCard: FC<{product: Product}> = ({product}) => {
  /** Return an element for a product card. */
  return (
    <div className='productCard'>
      <ProductImage imageURL={product.imageURL}/>
      <div className="productName">
        <div>
          <h3>{product.brand} {product.name}</h3>
        </div>
      </div>
      <div className="productInfo">
        <div>
            <h4>${product.price}</h4>
        </div>
        <div>
            <h4>|</h4>
        </div>
        <div>
          <h4>{product.inStock} in stock</h4>
        </div>
      </div>
    </div>
  )
}

const fetchProducts = async () => {
  // Fetch all products
  // TODO: Replace API endpoint hard code
  const response = await fetch("http://localhost:3000/api/v1/products/", {method:"GET"});
  const products = await response.json();
  console.log("Called products endpoint")
  if ("error" in products) {
    throw Error(products.error);
  }
  return products;
}

const Products: FC = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
    .then(fetchedProducts => {
      setProducts(fetchedProducts);
      setLoading(false);
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className='productMessage'><h2>Loading products...</h2></div>
  }

  if (error) {
    return (
    <div className='productMessage'>
      <h2 style={{color: "rgb(128, 0, 0)"}} >Error loading products: {(error as any).message}</h2>
    </div>
    )
  }
  
  if (products.length === 0) {
    return <div className='productMessage'><h2>No products found.</h2></div>
  }
  const productCards = (products as Product[]).map(product => <ProductCard product={product}/>);

  return (
    <div id="products">
      {productCards}
    </div>
  )
}

export default Products;
export { ProductImage };