import { useState } from 'react'
import Progress from './Progress.tsx'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Download({ url, id, title, resolutions }) {
    const [progress, setProgress] = useState({ 'percent': '0.0%' })

    async function progressView() {
        let finished = false;
        while (!finished) {
            await fetch('http://127.0.0.1:3000/progress/' + id, { method: 'POST' }).then(async (response) => {
                const data = await response.clone().text()
                if (data === 'finished') {
                    setProgress({ 'percent': '100.0%' })
                    finished = true
                } else {
                    response.json().then((data) => {
                        setProgress(data)
                    })
                }
            })
            await sleep(1000)
        }
    }

    function downloadVideo(event) {
        const encodedURL = event.target.getAttribute('data-url')
        const resmenu = document.getElementById('resolutionSelection')
        const res = resmenu?.value
        setTimeout(progressView, 5000)
        fetch('http://127.0.0.1:3000/download/' + encodedURL + '?res=' + res, { method: 'POST' }).then((response) => {
            response.blob().then((blob) => {
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a');
                a.href = url;
                a.download = `${title} (${id}).mkv`;
                a.click()

            })
        })
    }

    let validResolutions = []
    for (const resolution of resolutions) {
        if (resolution !== 'audio only') {
            validResolutions.push(resolution)
        }
    }
    validResolutions.sort((a, b) => Number(b.split('x')[0]) - Number(a.split('x')[0]))
    const resMenu = validResolutions.map((resolution) =>
        <option key={resolution} value={resolution.split('x')[1]}>{resolution}</option>
    )


    return (<div className='mt-10 gap-5 flex flex-col items-center'>
        <Progress progress={progress} />
        <div className='flex flex-row items-center gap-3'>
            <div>Quality:</div>
            <select className='bg-[#1d1d1f] text-right rounded-2xl px-1.5 py-1' id='resolutionSelection'>
                {resMenu}
            </select>
            <button className='text-xl text-black border-solid border-lime-300 bg-lime-300 border-1 rounded-2xl px-3 py-2 hover:cursor-pointer' onClick={downloadVideo} data-url={url}>Download</button>
        </div>
    </div>)
}
