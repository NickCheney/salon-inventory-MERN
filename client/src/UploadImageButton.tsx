import { FC, ChangeEventHandler } from 'react'
import './UploadImageButton.css'
import uploadImgIcon from './assets/icons/image_upload.svg'

const UploadImageButton: FC<{
  existingImage: boolean, 
  onUploadImageChange: ChangeEventHandler<HTMLInputElement>
}> = (props) => {
  return (
    <>
      <label className="uploadImageButton" htmlFor="prodImgInput">
        <img src={uploadImgIcon}></img>
        &nbsp;&nbsp;
        <h3>{`${props.existingImage? "Replace": "Upload"} Image`}</h3>
      </label>
      <input 
        type="file" 
        id="prodImgInput" 
        name="prodImgInput" 
        accept="image/*" 
        hidden 
        aria-hidden 
        onChange = {props.onUploadImageChange}
      />
    </>
  )
}

export default UploadImageButton