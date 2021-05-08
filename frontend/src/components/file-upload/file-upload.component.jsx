import React, { useRef, useState } from "react";
import {
  ImageUploadContainer,
  FormField,
  DragDropText,
  UploadImagesButton,
  ImagePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel
} from "./file-upload.styles";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const ImagesUpload = ({
  label,
  updateImagesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const imageInputField = useRef(null);
  const [images, setImages] = useState({});

  const handleUploadButtonClick = () => {
    imageInputField.current.click();
  };

  const addNewImages = (newImages) => {
    for (let image of newImages) {
      if (image.size < maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { image };
        }
        images[image.name] = image;
      }
    }
    return { ...images };
  };

  const callUpdateImagesCb = (images) => {
    const imagesAsArray = convertNestedObjectToArray(images);
    updateImagesCb(imagesAsArray);
  };

  const handleNewImagesUpload = (e) => {
    const { files: newImages } = e.target;
    if (newImages.length) {
      let updatedImages = addNewImages(newImages);
      setImages(updatedImages);
      callUpdateImagesCb(updatedImages);
    }
  };

  const removeImage = (fileName) => {
    delete images[fileName];
    setImages({ ...images });
    callUpdateImagesCb({ ...images });
  };

  return (
    <>
      <ImageUploadContainer>
        <InputLabel>{label}</InputLabel>
        <DragDropText>Drag & drop images here</DragDropText>
        <DragDropText>or</DragDropText>
        <UploadImagesButton type="button" onClick={handleUploadButtonClick}>
          <i className="fas fa-cloud-upload-alt" />
          <span> Select images to upload </span>
        </UploadImagesButton>
        <FormField
          type="file"
          ref={imageInputField}
          onChange={handleNewImagesUpload}
          title=""
          value=""
          {...otherProps}
        />
      </ImageUploadContainer>

      <ImagePreviewContainer>
        <PreviewList>
          {Object.keys(images).map((fileName, index) => {
            let image = images[fileName];
            let isImageFile = image.type.split("/")[0] === "image";
            return (
              <PreviewContainer key={fileName}>
                <div>
                  {isImageFile && (
                    <ImagePreview
                      src={URL.createObjectURL(image)}
                      alt={`image preview ${index}`}
                    />
                  )}
                  <FileMetaData isImageFile={isImageFile}>
                    <span>{image.name}</span>
                    <aside>
                      <span>{convertBytesToKB(image.size)} kb</span>
                      <RemoveFileIcon
                        className="fas fa-trash-alt"
                        onClick={() => removeImage(fileName)}
                      />
                    </aside>
                  </FileMetaData>
                </div>
              </PreviewContainer>
            );
          })}
        </PreviewList>
      </ImagePreviewContainer>
    </>
  );
};

export default ImagesUpload;