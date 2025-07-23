import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropUtils";
import { supabase } from "../../supabaseClient";
import styles from "./AvatarUpload.module.css";

const AvatarUpload = ({ OnUpload }) => {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const imageDataUrl = await readFile(selectedFile);
    setImageSrc(imageDataUrl);
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result));
      reader.readAsDataURL(file);
    });
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleUpload = async () => {
    try {
      setUploading(true);
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { data, error } = await supabase.storage
        .from("songs")
        .upload(filePath, croppedBlob);

      if (error) throw error;

      const { data: url } = await supabase.storage
        .from("songs")
        .getPublicUrl(filePath);

      localStorage.setItem("avatar", url.publicUrl);
      OnUpload(url.publicUrl);
      alert("File Uploaded Successfully");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <label className={styles.uploadLabel}>Image Upload</label>
      <input
        type="file"
        accept="image/*"
        className={styles.uploadInput}
        onChange={handleFileChange}
      />

      {imageSrc && (
        <div className={styles.cropContainer}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      {imageSrc && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={styles.uploadButton}
        >
          {uploading ? "Uploading..." : "Upload Cropped Image"}
        </button>
      )}
    </div>
  );
};

export default AvatarUpload;
