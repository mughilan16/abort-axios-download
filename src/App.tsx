import axios from "axios";
import { useMutation } from "react-query"
import { saveAs } from 'file-saver';
import { useRef } from "react";

function App() {
  const controllerRef = useRef<AbortController>();

  const url = 'http://ec2-100-21-24-56.us-west-2.compute.amazonaws.com:8080/antares-backend/public/api/file-download/pre-edit+clean-up+userid-1066+20240617093812.zip?fileName=1234567_clean_up.zip'
  const { mutateAsync: download, isLoading } = useMutation('zipfile', async () => {
    controllerRef.current = new AbortController();
    await axios.get(url, { responseType: 'blob', signal: controllerRef.current.signal }).then(res => {
      saveAs(res.data)
    }),
    {
      onError: () => {
        alert("file download failed");
      },
      onSuccess: () => {
        alert("file downloaded");
      }
    }
  })

  return (
    <div>
      <button onClick={() => download()}>Download</button>
      {isLoading && "downloading"}
      <button onClick={() => controllerRef.current?.abort()}>Cancel</button>
    </div >
  )

}

export default App
