"use client";

import { _Object } from "@aws-sdk/client-s3";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { getSignedUrlForDownload } from "@/app/actions/S3Actions";

const FilesTable = ({
  files,
  isPublic,
}: {
  files: _Object[];
  isPublic: boolean;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead>Last Modified</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Download</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <TableRow key={file.Key}>
            <TableCell>{file.Key}</TableCell>
            <TableCell>{file.LastModified?.toString()}</TableCell>
            <TableCell>{file.Size}</TableCell>
            <TableCell>
              {isPublic ? (
                <a
                  href={`https://hardik-jain-file-upload.s3.ap-south-1.amazonaws.com/${file.Key}`}
                  target="_blank"
                >
                  Open File
                </a>
              ) : (
                <Button
                  variant="outline"
                  onClick={async () => {
                    const url = await getSignedUrlForDownload(file.Key ?? "");
                    window.open(url, "_blank");
                  }}
                >
                  Open File
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FilesTable;
