import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

const DropZone = ({ maxFiles, files, setFiles }) => {
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        'image/jpeg': [],
        'image/png': [],
      },
      maxFiles,
      onDrop: (acceptedFiles) => {
        if (files.length + acceptedFiles.length <= maxFiles) {
          setFiles([
            ...files,
            ...acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            ),
          ]);
        } else {
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
        }
      },
    });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        {...getRootProps()}
        className={`border-dashed border-2 ${isDragAccept && 'border-green-500'}
          ${
            isDragReject && 'border-red-600'
          } border-slate-900 transition-all  w-full h-44 flex flex-col justify-center items-center cursor-pointer`}
      >
        <input {...getInputProps()} />
        {isDragAccept ? (
          <p>Drop the image here</p>
        ) : (
          <p>Drag &apos;n&apos; drop image here, or click to select image</p>
        )}
      </div>
    </>
  );
};

DropZone.propTypes = {
  maxFiles: PropTypes.number,
  files: PropTypes.array,
  setFiles: PropTypes.func,
};
export default DropZone;
