import { FC, useState } from 'react'
import { ProductImage } from './Products.tsx'
import './NewProduct.css'
import cancelIcon from './assets/icons/cancel_icon.svg'
import uploadImgIcon from './assets/icons/image_upload.svg'

const ExitButton: FC<{id: string, parameter: any, onClickFx: Function}> = (props) => {
    return <div id={props.id} className="cancel">
        <button onClick={()=>props.onClickFx(props.parameter)}>
            <img src={cancelIcon}/>
        </button>
    </div>
}

const NewProduct: FC<{visible: boolean, setVisible: Function}> = ({visible, setVisible}) => {
    const [productImageURL, setProductImageURL] = useState<string | undefined>(undefined);
    return visible? 
        <div 
            id="newProductWindow" 
            onClick={
                e => {
                    if (e.target instanceof HTMLElement && e.target.id === "newProductWindow") {
                        setVisible(false);
                    }
                }
            }
        >
            <div>
                <ExitButton id="cancel" parameter={false} onClickFx={setVisible}/>
                <div id="imageSelector">
                    <ProductImage id="imagePreview" imageURL={productImageURL}>
                        {/* <ExitButton id="resetImage" parameter={undefined} onClickFx={setProductImageURL}/> */}
                    </ProductImage>
                    <div id="imageOption">
                        <label htmlFor="prodImg">
                            <img src={uploadImgIcon}></img>
                            &nbsp;&nbsp;
                            <h3>{`${productImageURL? "Replace": "Upload"} Image`}</h3>
                        </label>
                        <input 
                            type="file" 
                            id="prodImg" 
                            name="prodImg" 
                            accept="image/*" 
                            hidden 
                            aria-hidden 
                            onChange = {
                                (event) => {
                                    const imgFile = event.target.files?.[0];
                                    if (imgFile) {
                                        if (productImageURL) {
                                            // Release existing image url
                                            URL.revokeObjectURL(productImageURL);
                                        }
                                        setProductImageURL(URL.createObjectURL(imgFile));
                                    }
                                }
                            }
                        />
                    </div>
                </div>
                <div id="productInfoForm">
                </div>
            </div>
        </div> 
    : <></>;
}

export default NewProduct;