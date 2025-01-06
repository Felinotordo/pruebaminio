import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "@/utils/s3Client";

export async function POST(req) {
  try {
    const { fileName, fileType, fileData } = await req.json();

    const bucketName = "imagenesvps";
    const objectName = fileName;

    // Convierte el contenido base64 a un buffer
    const buffer = Buffer.from(fileData.split(",")[1], "base64");

    // Parámetros del comando para subir el archivo
    const params = {
      Bucket: bucketName,
      Key: objectName,
      Body: buffer,
      ContentType: fileType,
    };

    // Subir archivo al bucket en MinIO
    await s3Client.send(new PutObjectCommand(params));

    return NextResponse.json({
      message: "Archivo subido exitosamente",
      url: `http://127.0.0.1:9000/${bucketName}/${objectName}`, // Cambia según tu configuración
    });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    return NextResponse.json(
      { error: "Error al subir archivo" },
      { status: 500 }
    );
  }
}
