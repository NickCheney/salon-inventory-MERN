import { FC, useState } from 'react'
import ExitButton from './ExitButton.tsx'
import UploadImageButton from './UploadImageButton.tsx'
import './NewProduct.css'

const ImagePreview: FC<{imageURL: string, default: boolean, onClose: Function}> = (props) => {
  const [imgExitStyle, setImgExitStyle] = useState<object | undefined>(undefined);

  const handlePreviewImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!props.default) {
      const [naturalHeight, naturalWidth] = [event.currentTarget.naturalHeight, event.currentTarget.naturalWidth];
      const [windowHeight, windowWidth] = [323, 500];
      let imgWidth, imgHeight;
  
      if (naturalWidth / naturalHeight >= windowWidth / windowHeight) {
        // Wide image
        imgWidth = windowWidth;
        imgHeight = naturalHeight * windowWidth / naturalWidth;
      } else {
        // Tall image
        imgHeight = windowHeight;
        imgWidth = naturalWidth * windowHeight / naturalHeight;
      }
      setImgExitStyle({"top": `calc(46% - ${imgHeight / 2}px)`, "right": `calc(47.4% - ${imgWidth / 2}px`});
    }
  }

  console.log(`Rendering ImagePreview Component with url: ${props.imageURL} and style ${JSON.stringify(imgExitStyle)}`);

  return (
    <>
      <img className="productImage" src={props.imageURL} onLoad={handlePreviewImageLoad}/>
      {!props.default && <ExitButton
        onClick={props.onClose}
        id="resetImage"
        style = {imgExitStyle}
      />}
    </> 
  )
}

const NewProductModal: FC<{onExit: Function}> = (props) => {
  const [productImageURL, setProductImageURL] = useState<string | undefined>(undefined);
  const imageURL = productImageURL || "src/assets/product-images/default.png";

  /** Release new product image URL if exists */
  const releaseImageURL = () => {
    if (productImageURL) {
      URL.revokeObjectURL(productImageURL);
    }
  }

  /** Handle modal exit */
  const handleExit = () => {
    releaseImageURL();
    props.onExit();
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    /** Exit modal when bg clicked */
    if (e.target instanceof HTMLDivElement && e.target.id === "newProductWindow") {
      handleExit();
    }
  }

  const handlePreviewImageClose = () => {
    releaseImageURL();
    setProductImageURL(undefined);
  }

  /** Replace preview image when changed */
  const handleUploadImageChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = event.target.files?.[0];
    if (imgFile) {
      releaseImageURL();
      const newURL = URL.createObjectURL(imgFile);
      console.log(`New product image URL changed to: ${newURL}`);
      setProductImageURL(newURL);
      event.currentTarget.value = '';
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(event.target);
  }

  console.log(`Rendering NewProduct Component with product image url: ${productImageURL}`);

  return (
    <div id="newProductWindow" onClick={handleClick}>
      <div>
        <ExitButton onClick={handleExit} id="cancelNewProduct"/>
        <div id="imageSelector">
          <div id="imagePreview">
            <ImagePreview imageURL={imageURL} default={!productImageURL} onClose={handlePreviewImageClose}/>
          </div>
          <div id="imageOption">
            <UploadImageButton existingImage={!!productImageURL} onUploadImageChange={handleUploadImageChange}/>
          </div>
        </div>
        <form id="productInfoForm" onSubmit={handleSubmit}>
            <div className="doubleField">
              <label htmlFor='brand'><h3>Brand</h3></label>
              <input className='formFieldInput' type='text' name='brand' required></input>
            </div>
            <div className="doubleField">
              <label htmlFor='name'><h3>Name</h3></label>
              <input className='formFieldInput' type='text' name='name' required></input>
            </div>
            <div className="tripleField">
              <label htmlFor='price'><h3>Price</h3></label>
              <input className='formFieldInput' type='number' name='price' placeholder='0.00' required step='0.01' min='0'></input>
            </div>
            <div className="tripleField">
              <label htmlFor='inStock'><h3>In Stock</h3></label>
              <input className='formFieldInput' type='number' name='inStock' placeholder='0' required step='1' min='0'></input>
            </div>
            <div className="tripleField">
              <label htmlFor='size'><h3>Size</h3></label>
              <input className='formFieldInput' type='text' name='size' placeholder='e.g. 300 mL'></input>
            </div>
            <div className='singleField'>
              <label htmlFor='description'><h3>Description</h3></label>
              <textarea className='formFieldInput' name='description' rows={2} style={{resize: "none"}}></textarea>
            </div>
            <div id="formOptions" className='singleField'>
              <button className='exit' onClick={handleExit}><h3>Cancel</h3></button>
              <button type="submit" className='new'><h3>Create</h3></button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default NewProductModal;