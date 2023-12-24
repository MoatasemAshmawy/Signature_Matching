import { useEffect, useState } from 'react';
import DropZone from './DropZone';
import axios from 'axios';
import { saveAs } from 'file-saver';

const SignatureExtraction = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [extractedImage, setExtractedImage] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const uploadImage = async () => {
    setErrorMessage('');
    if(files.length == 0){
      setErrorMessage('Please Provide an Image!')
      return;
    }
    setLoading(true);
    const formdata = new FormData();
    formdata.append('image', files[0]);
    try {
      const path = (
        await axios.post('http://localhost:8000/api/extract', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      ).data['image_path'];
      const fullpath = 'http://localhost:8000/' + path;

      setLoading(false);
      setFiles([]);
      setExtractedImage(fullpath);
    } catch (error) {
      setLoading(false);
      console.error(error);
      setErrorMessage('Something Went Wrong Please Try Again!');
    }
  };

  const downloadExtractedImage = () => {
    saveAs(extractedImage, 'extractedSignatures');
  };

  useEffect(() => {
    if (files.length > 0) {
      setExtractedImage(null);
    }
  }, [files]);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-2">
        Extract Your Signature from a document image
      </h1>
      <div className="w-1/2">
        <DropZone maxFiles={1} setFiles={setFiles} files={files} />
      </div>
      {files.length > 0 && (
        <div className="flex gap-3 justify-center items-center mt-2">
          {files.map((file, index) => (
            <img
              src={file.preview}
              alt={file.name}
              key={index}
              className="w-32 border"
            />
          ))}
        </div>
      )}
      {extractedImage && (
        <div className="flex flex-col justify-center items-center gap-2 mt-2">
          <img
            src={extractedImage}
            alt="extractedImage"
            className="w-28 border"
          />
          <button
            onClick={downloadExtractedImage}
            className=" rounded-md p-2 bg-green-500 text-white"
          >
            Download Image
          </button>
        </div>
      )}
      {errorMessage.length > 0 && (
        <div className="bg-red-600 rounded-md p-2 text-white mt-2">
          {errorMessage}
        </div>
      )}
      {!extractedImage && (
        <button
          onClick={uploadImage}
          className="p-2 bg-zinc-900 rounded-md text-white hover:bg-slate-700 transition-colors mt-2"
        >
          {loading ? 'Extracting...' : 'Extract Signature'}
        </button>
      )}
    </div>
  );
};

export default SignatureExtraction;
