import { useState } from 'react'
import Progress from './Progress.tsx'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Download({ url, id }) {
    const [progress, setProgress] = useState(<></>)

    async function progressView() {
        let finished = false;
        while (!finished) {
            await fetch('http://127.0.0.1:3000/progress/' + id, { method: 'POST' }).then(async (response) => {
                const data = await response.clone().text()
                if (data === 'finished') {
                    setProgress(<h1>Finished downloading!</h1>)
                    finished = true
                } else {
                    response.json().then((data) => {
                        setProgress(<Progress progress={data} />)
                    })
                }
            })
            await sleep(1000)
        }
    }

    function downloadVideo(event) {
        const encodedURL = event.target.getAttribute('data-url')
        setTimeout(progressView, 5000)
        fetch('http://127.0.0.1:3000/download/' + encodedURL, { method: 'POST' }).then((response) => {
            response.blob().then((blob) => {
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a');
                a.href = url;
                a.download = 'yourvideo.mkv';
                a.click()

            })
        })
    }

    return (<div className='mt-10 gap-5 flex flex-col items-center'>
        {progress}
        <button className='text-xl text-black border-solid border-lime-300 bg-lime-300 border-1 rounded-2xl px-3 py-2 hover:cursor-pointer' onClick={downloadVideo} data-url={url}>Download</button>
    </div>)
}
