import { FC, useEffect, useState } from 'react'
import './ExitButton.css'

import cancelIcon from './assets/icons/cancel_icon.svg'
  
const ExitButton: FC<{onClick: Function, id?: string, forImage?: string}> = (props) => {
  const [style, setStyle] = useState<object | undefined>(undefined);

  console.log(`Rendering ExitButton with props ${JSON.stringify(props)} and style ${JSON.stringify(style)}`);

  useEffect(()=>{
    console.log("Running useEffect for ExitButton");
    if (props.forImage) {
      getImageDimensions(props.forImage).then(imageDimensions => {
        let [naturalHeight, naturalWidth] = imageDimensions;
        let [windowHeight, windowWidth] = [323, 500];
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
        setStyle({"top": `calc(46% - ${imgHeight / 2}px)`, "right": `calc(47.4% - ${imgWidth / 2}px`});
      }).catch(err => {
        console.error(err);
        setStyle(undefined);
      });
    }
  }, [props.forImage]);

  return (
    <button id={props.id} className="cancel" style={style} onClick={() => props.onClick()}>
      <img src={cancelIcon}/>
    </button>
  )
}

/** Get native dimensions of image */
const getImageDimensions = async (imageURL: string) => {
  const imgDimPromise: Promise<[number, number]> = new Promise((resolve, reject) => {
    const previewImg = new Image();
    previewImg.onload = () => resolve([previewImg.naturalHeight, previewImg.naturalWidth]);
    previewImg.onerror = () => reject(null);
    previewImg.src = imageURL;
  });

  console.log(`Awaiting dimensions of image ${imageURL}`);
  const imageDimensions = await imgDimPromise;
  if (!imageDimensions) {
    throw new Error(`Couldn't read dimensions of image ${imageURL}`);
  }
  console.log(`Parsed dimensions ${imageDimensions}`);
  return imageDimensions;
}

export default ExitButton