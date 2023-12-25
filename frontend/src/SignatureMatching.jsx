import { useMemo, useState } from 'react';
import DropZone from './DropZone';
import axios from 'axios';

const SignatureMatching = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [similarity, setSimilarity] = useState(0);

  const removeFile = (index)=>{
    const clonedFiles = [...files];
    clonedFiles.splice(index,1);
    setFiles(clonedFiles);
  }

  const uploadImage = async () => {
    setErrorMessage('');
    setSimilarity(0);
    if(files.length != 2){
      setErrorMessage("Please Provide 2 Images!");
      return;
    }
    setLoading(true);
    const formdata = new FormData();
    formdata.append('image1', files[0]);
    formdata.append('image2', files[1]);
    try {
      const similarity = (
        await axios.post('http://localhost:8000/api/match', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      ).data['similarity'];
      setLoading(false);
      setSimilarity(similarity);
    } catch (error) {
      setLoading(false);
      console.error(error);
      setErrorMessage('Something Went Wrong Please Try Again!');
    }
  };

  const matchStyle = useMemo(() => {
    if (similarity > 85) {
      return 'bg-green-600';
    }
    if (similarity > 60) {
      return 'bg-orange-600';
    }
    return 'bg-red-500';
  }, [similarity]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-2">
        Check for match percentage between 2 signatures
      </h1>
      <div className="w-1/2">
        <DropZone maxFiles={2} setFiles={setFiles} files={files} />
      </div>
      {files.length > 0 && (
        <div className="flex gap-3 justify-center items-center mt-2">
          {files.map((file, index) => (
            <div className="relative" key={index}>
              <button className="absolute top-[-4px] right-[-4px] rounded-full bg-red-600 w-5 h-5 flex justify-center items-center" onClick={()=> removeFile(index)}>X</button>
              <img
                src={file.preview}
                alt={file.name}
                
                className="w-32 border"
              />
            </div>
          ))}
        </div>
      )}

      {errorMessage.length > 0 && (
        <div className="bg-red-600 rounded-md p-2 text-white mt-2">
          {errorMessage}
        </div>
      )}
      <button
        onClick={uploadImage}
        className="p-2 bg-zinc-900 rounded-md text-white hover:bg-slate-700 transition-colors mt-2"
      >
        {loading ? 'Testing...' : 'Check For Match'}
      </button>

      {!!similarity && (
        <h2
          className={`text-2xl text-white ${matchStyle} mt-2 p-2 rounded-sm`}
        >{`Images have a ${similarity}% match.`}</h2>
      )}
    </div>
  );
};

export default SignatureMatching;
