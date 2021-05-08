import React, { useState } from "react";
import ImagesUpload from "./components/file-upload/file-upload.component";
import {
  NavBarContainer
} from "./index.styles";

function App() {
  const [newImages, setNewImages] = useState({
    toUpdateImages: []
  });

  const updateUploadedImages = (images) =>
    setNewImages({ ...newImages, toUpdateImages: images });


  const handleSubmit = (event) => {
    event.preventDefault();
    //logic to upload images...
  };

  return (
      <>
        <div>
          <NavBarContainer>
            <p>Menu</p>
          </NavBarContainer>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <button type="submit"> Upload {newImages.toUpdateImages.length} images</button>
            <ImagesUpload
                accept=".jpg,.png,.jpeg"
                multiple
                updateImagesCb={updateUploadedImages}
            />
          </form>
        </div>
      </>
  );
}

export default App;