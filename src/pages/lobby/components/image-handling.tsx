import React, { useEffect, useState } from "react";

import { Icons } from "../../../icons/icons";
import BlobStorage from "../../../sql-nodejs/blob-storage/app";
import { Spinner } from "../../../ui-kit/spinner/spinner";
import { NextApiClient } from "../../api/next-api.client";

function ImageHandling({ isOwner, lobbyId, imgName, setImgName, editItem }) {
  const [fileSelected, setFileSelected] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);

  const apiClient = new NextApiClient();

  const blob = new BlobStorage();

  const imgUrlPath =
    imgName &&
    `${process.env.NEXT_PUBLIC_BLOB_STORAGE_ENDPOINT}${lobbyId}/${imgName}`;

  useEffect(() => {
    const uploadImg = async () => {
      if (fileSelected) {
        setImgUploading(true);
        setImgName(fileSelected.name);
        fileSelected && (await blob.uploadBlob(fileSelected, lobbyId));
        setFileSelected(null);
        setImgUploading(false);
      }
    };
    const reval = async () => {
      const reval = await apiClient.axiosInstance.get(
        `/api/revalidate?path=${lobbyId}`
      );
    };
    uploadImg();
    reval();
  }, [fileSelected]);

  const onDelete = async (e) => {
    await blob.deleteBlob(lobbyId, imgName);
    const reval = await apiClient.axiosInstance.get(
      `/api/revalidate?path=${lobbyId}`
    );
    setImgName("");
    // await editItem(true);
  };

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
            className={`object-contain overflow-hidden cursor-pointer `}
            src={imgUrlPath}
            id="img-placeholder"
          ></img>
          {!imgName ? (
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
                disabled={!isOwner}
              ></input>
            </>
          ) : (
            <>
              {isOwner && (
                <div
                  onClick={(e) => onDelete(e.target)}
                  className="absolute p-1 rounded-md bottom-1 right-2 z-100 border-2 border-gray bg-slate-200 cursor-pointer"
                >
                  {Icons.GARBAGE}
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default ImageHandling;
