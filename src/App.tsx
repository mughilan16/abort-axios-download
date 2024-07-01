import axios from "axios";
import { useMutation } from "react-query"
import { saveAs } from 'file-saver';

function App() {
  const controller = new AbortController();
  const url = 'http://ec2-100-21-24-56.us-west-2.compute.amazonaws.com:8080/antares-backend/public/api/file-download/pre-edit+clean-up+userid-1066+20240617093812.zip?fileName=1234567_clean_up.zip'
  const signal = controller.signal;
  const { mutateAsync: downlaod, isLoading } = useMutation('dataiahgoe', async () => {
    await axios.get(url, { responseType: 'blob', signal: signal }).then((response) => {
      console.log(response.data)
      saveAs(response.data, "zipfil.zip");
    }).then(_ => {
      alert("file downloaded")
    })
      .catch(() => {
        alert("file download failed")
      });
  })

  console.log(isLoading)

  return (
    <div>
      <button onClick={() => downlaod()}>Download</button>
      {isLoading && "downloading"}
      <button onClick={() => controller.abort()}>Cancel</button>
    </div>
  )

}

export default App
