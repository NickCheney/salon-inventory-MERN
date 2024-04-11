import { FC, useState } from 'react'
import ExitButton from './ExitButton.tsx'
import UploadImageButton from './UploadImageButton.tsx'
import './NewProduct.css'

const NewProductModal: FC<{onExit: Function}> = (props) => {
  const [productImageURL, setProductImageURL] = useState<string | undefined>(undefined);
  const imageURL = productImageURL? productImageURL : "src/assets/product-images/default.svg";

  /** Exit modal when bg clicked */
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === "newProductWindow") {
      props.onExit();
    }
  }

  /** Replace preview image when changed */
  const handleUploadImageChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = event.target.files?.[0];
    if (imgFile) {
      if (productImageURL) {
        // Release existing image url
        URL.revokeObjectURL(productImageURL);
      }
      const newURL = URL.createObjectURL(imgFile);
      console.log(`New product image URL changed to: ${newURL}`);
      setProductImageURL(newURL);
    }
  }

  console.log(`Rendering NewProduct Component with product image url: ${productImageURL}`);

  return (
    <div id="newProductWindow" onClick={handleClick}>
      <div>
        <ExitButton onClick={props.onExit} id="cancelNewProduct"/>
        <div id="imageSelector">
          <div id="imagePreview">
            <img className="productImage" src={imageURL}/>
              {productImageURL && <ExitButton
                onClick={() => setProductImageURL(undefined)}
                id="resetImage"
                forImage={productImageURL}
              />} 
          </div>
          <div id="imageOption">
            <UploadImageButton existingImage={!!productImageURL} onUploadImageChange={handleUploadImageChange}/>
          </div>
        </div>
        <div id="productInfoForm">
        </div>
      </div>
    </div>
  )
}

export default NewProductModal;