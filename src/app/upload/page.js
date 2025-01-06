"use client";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor, selecciona un archivo.");
      return;
    }

    setUploading(true);

    const fileName = file.name;
    const fileType = file.type;

    // Convertir archivo a base64
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileData = event.target.result;

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName, fileType, fileData }),
        });

        const data = await response.json();

        if (response.ok) {
          setUploadedUrl(data.url);
          alert("Archivo subido exitosamente.");
        } else {
          alert("Error al subir archivo: " + data.error);
        }
      } catch (error) {
        console.error("Error al subir archivo:", error);
        alert("Error al subir archivo.");
      } finally {
        setUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Subir Archivo</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {uploading ? "Subiendo..." : "Subir"}
      </button>
      {uploadedUrl && (
        <div className="mt-4">
          <p>Archivo subido con éxito:</p>
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
}
