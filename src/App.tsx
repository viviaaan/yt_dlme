import { useState } from 'react'
import Preview from './Preview.tsx'
import './App.css'


function App() {
    const [preview, setPreview] = useState(<></>)
    const [download, setDownload] = useState(<></>)

    function downloadVideo(event) {
        const encodedURL = event.target.getAttribute('data-url')
        fetch('http://127.0.0.1:3000/download/' + encodedURL, { method: 'POST' }).then(() => {
        })
    }

    function formSubmit(event) {
        event.preventDefault()
        const encodedURL = encodeURIComponent(event.target[0].value)

        fetch('http://127.0.0.1:3000/preview/' + encodedURL, { method: 'POST' }).then((videoInfo) => {
            videoInfo.json().then((data) => {
                setPreview(<Preview info={data} />)
                setDownload(<button onClick={downloadVideo} data-url={encodedURL}>Download</button>)
            })
        })
    }

    return (
        <>
            <h2>YouTube Video Downloader</h2>
            <form onSubmit={formSubmit}>
                <input className='bg-blue-500' type='url'></input>
                <input type='submit'></input>
            </form>
            {preview}
            {download}
        </>
    )
}

export default App
