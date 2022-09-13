import React, { useEffect, useState } from "react";

import { Icons } from "../../../icons/icons";
import BlobStorage from "../../../sql-nodejs/blob-storage/app";
import { Spinner } from "../../../ui-kit/loader/loader2";

function ImageHandling(props) {
  const [fileSelected, setFileSelected] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);

  const {
    setEnlargingPicture,
    enlarginPicture,
    imageInMemory,
    setImageInMemory,
  } = props;

  const blob = new BlobStorage();

  const updateImgFrontEnd = () => {
    const file = fileSelected;
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const image = new Image();
      image.src = event.target.result as string;
      image.onload = function () {
        setImageInMemory({
          src: image.src,
          width: image.width,
          height: image.height,
        });
      };
    });

    // reader.readAsDataURL(file);
  };

  useEffect(() => {
    const uploadImg = async () => {
      if (fileSelected) {
        setImgUploading(true);
        fileSelected && (await blob.uploadBlob(fileSelected));
        setFileSelected(null);
        setImgUploading(false);
      }
    };
    uploadImg();
  }, [fileSelected]);

  const onFileChange = (event: any) => {
    setFileSelected(event.target.files[0]);
  };

  return (
    <>
      {imgUploading ? (
        <Spinner />
      ) : (
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
                ? `absolute z-48 min-w-[100px] min-h-[100px] -left-[0.1rem] max-w-[${imageInMemory.width}px] max-h-[${imageInMemory.height}px] cursor-pointer`
                : imageInMemory.src &&
                  `w-[${imageInMemory.width}px] h-[${imageInMemory.height}px] cursor-pointer `
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
                type="file"
                onChange={onFileChange}
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
      )}
    </>
  );
}

export default ImageHandling;
