import { useState } from "react"

export default function Progress({ progress }) {
    if (progress.percent === '0.0%') {
        return <></>
    } else if (progress.percent === '100.0%') {
        return <div>Finished Downloading!</div>
    } else {
        return (<>
            <div className='rounded-2xl w-[80vw] lg:w-[30vw] h-[30px] relative overflow-clip bg-neutral-900'>
                <div className='bg-lime-300 h-full absolute' style={{ width: progress.percent }}></div>
                <span className='w-full text-red-600 absolute text-center'>Downloading: {progress.percent}</span>
            </div>
            <div>ETA: {progress.eta}</div>
        </>)
    }
}
