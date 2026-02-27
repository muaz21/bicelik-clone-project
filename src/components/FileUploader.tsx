import {useCallback, useEffect, useState} from "react";
import {FileWithPath, useDropzone} from "react-dropzone";
import {convertFileToUrl} from "@/lib/utils";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl?: string;
  width: string;
  height: string;
  field?: any;
};

const FileUploader = ({
  fieldChange,
  mediaUrl,
  height,
  width,
  field,
}: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl || "");
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  useEffect(() => {
    if (field) {
      if (field.value.length == 0) {
        setFile([]);
        setFileUrl("");
      }
    }
  }, [field]);

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      "image/.png": [".png", ".jpeg", ".jpg"],
      "image/.jpeg": [".png", ".jpeg", ".jpg"],
      "image/.jpg": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={
        "flex flex-center bg-accent flex-col rounded-xl cursor-pointer h-max"
      }
      style={{
        height: parseInt(height) * 4 + "px",
        width: parseInt(width) * 4 + "px",
      }}>
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <>
          <div className={`flex flex-1 justify-start w-full ${"h-full"}`}>
            <img src={fileUrl} alt="image" />
          </div>
        </>
      ) : (
        <div className={"flex items-center justify-center h-full"}>
          <img
            src={"/gallery-add.svg"}
            width={40}
            height={40}
            alt="file upload"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
