import { useState } from "react"

export default function Preview({ info }) {
    const [buttonText, setButtonText] = useState('Show more')
    const shortDescription = info.description.split('\n').slice(0, 4).join('\n')

    function toggleDescription() {
        if (buttonText === 'Show more') {
            setButtonText('Show less')
            setDescription(info.description)
        } else {
            setButtonText('Show more')
            setDescription(shortDescription)
        }
    }

    const [description, setDescription] = useState(shortDescription)

    return (<>
        <div className='flex flex-col lg:flex-row mx-[5vw] lg:mx-[10vw] lg:min-h-[20vh] mt-10'>
            <div className='basis-2/3 lg:pr-15'>
                <div className='text-xl font-semibold'>{info.title}</div>
                <div className='text-xs mt-3 whitespace-pre-wrap'>{description}</div>
                <button className='text-sm mt-1 hover:bg-[#333333] hover:cursor-pointer py-1 px-1.5 rounded-2xl' onClick={toggleDescription}>{buttonText}</button>
            </div>
            <div className='basis-1/3'>
                <img className='object-fill' src={info.thumbnail} />
            </div>
        </div>
    </>
    )
}
