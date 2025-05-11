"use client";

import {
  getSignedUrlForUpload,
  signedUrlForPutUserFile,
} from "@/app/actions/S3Actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { File } from "lucide-react";
import React from "react";

const UploadFile = ({ userId }: { userId: string | undefined }) => {
  const [file, setFile] = React.useState<File | undefined>();
  const [buttonText, setButtonText] = React.useState<string>("Upload");
  const onFileUploadClicked = async () => {
    if (file) {
      setButtonText("Uploading...");
      const fileName = file.name;
      const fileType = file.type;
      let url = "";
      if (userId === undefined) {
        url = await getSignedUrlForUpload(fileName, fileType);
      } else {
        url = await signedUrlForPutUserFile(fileName, fileType, userId);
      }
      await fetch(url, {
        method: "PUT",
        body: file,
      });
      setButtonText("Upload");
    }
  };
  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <Input
          type="file"
          id="image-upload"
          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <Button variant="outline" className="w-full flex items-center gap-2">
          <File size={16} />
          {file ? `${file.name} : Choose Another File` : "Choose File"}
        </Button>
      </div>
      <Button disabled={!file} onClick={() => onFileUploadClicked()}>
        {buttonText}
      </Button>
    </div>
  );
};

export default UploadFile;
