import React, { useState } from "react";

import { Icons } from "../../../icons/icons";
import BlobStorage from "../../../sql-nodejs/blob-storage/app";

function ImageHandling(props) {
  const [fileSelected, setFileSelected] = useState(null);

  const {
    setEnlargingPicture,
    enlarginPicture,
    imageInMemory,
    setImageInMemory,
    updateImgFrontEnd,
    imgUploading,
    setImgUploading,
  } = props;

  const blob = new BlobStorage();

  const onFileChange = (event) => {
    setFileSelected(event.target.files[0]);
    onFileUpload();
    updateImgFrontEnd();
  };

  const onFileUpload = async () => {
    setImgUploading(true);
    fileSelected && (await blob.uploadBlob(fileSelected));
    setFileSelected(null);
    setImgUploading(false);
  };

  return (
    <>
      <img
        onClick={() =>
          setEnlargingPicture(() => {
            if (imageInMemory.src && !enlarginPicture) return true;
            return false;
          })
        }
        className={
          enlarginPicture
            ? `absolute z-48 w-[${imageInMemory.width}px] h-[${imageInMemory.height}px] cursor-pointer`
            : imageInMemory.src && "w-full h-full object-contain cursor-pointer"
        }
        src={imageInMemory.src}
        id="img-placeholder"
      ></img>
      {!imageInMemory.src ? (
        <>
          <label className="cursor-pointer" htmlFor="image-selector">
            <p>Last opp bilde</p>
          </label>
          <input
            className="w-full hidden"
            onChange={onFileChange}
            type="file"
            id="image-selector"
            name="image-selector"
            accept="image/png, image/jpeg"
          ></input>
        </>
      ) : (
        <div
          onClick={() => setImageInMemory({ src: "", width: 0, height: 0 })}
          className="absolute p-1 rounded-md bottom-1 right-2 z-100 border-2 border-gray bg-slate-200 cursor-pointer"
        >
          {Icons.GARBAGE}
        </div>
      )}
    </>
  );
}

export default ImageHandling;
