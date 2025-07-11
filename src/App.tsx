import { useState } from 'react'
import Preview from './Preview.tsx'
import Download from './Download.tsx'
import './App.css'


function App() {
    const [preview, setPreview] = useState(<></>)
    const [download, setDownload] = useState(<></>)

    function formSubmit(event) {
        event.preventDefault()
        const encodedURL = encodeURIComponent(event.target[0].value)

        fetch('http://127.0.0.1:3000/preview/' + encodedURL, { method: 'POST' }).then((videoInfo) => {
            videoInfo.json().then((data) => {
                setPreview(<Preview info={data} />)
                setDownload(<Download url={encodedURL} />)
            })
        })
    }

    return (
        <>
            <div className='min-h-[8vh] py-0.5 flex items-center justify-center bg-[#1d1d1f]'>
                <span className='text-[#d2d2d2] text-3xl font-semibold'>yt-dlme</span>
            </div>
            <div className='mt-3'>
                <form className='flex text-[#f5f5f7] flex-row justify-center' onSubmit={formSubmit}>
                    <input className='border-solid outline-none w-[60vw] lg:w-[30vw] border-white border-2 rounded-lg border-collapse rounded-r-none px-2 py-1' type='url' placeholder='Enter a link'></input>
                    <input className='border-solid outline-none border-[#d2d2d2] border-2 border-collapse rounded-3xl border-l-0 rounded-l-none px-3' type='submit' value='Search'></input>
                </form>
                {preview}
                {download}
            </div>
        </>
    )
}

export default App
