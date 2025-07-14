import { useState } from "react"

export default function Progress({ progress }) {
    return (<>
        <div className='rounded-2xl w-[30vw] overflow-clip bg-neutral-900'>
            <div className='bg-lime-300 text-black w-50/100 text-center' style={{width: progress.percent}}>Downloading: {progress.percent}</div>
        </div>
        <div>ETA: {progress.eta}</div>
    </>)
}
