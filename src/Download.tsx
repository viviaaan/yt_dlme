export default function Download({ url }) {
    function downloadVideo(event) {
        const encodedURL = event.target.getAttribute('data-url')
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

    return (<div className='flex justify-center'>
        <button className='mt-3 text-xl text-black border-solid border-lime-300 bg-lime-300 border-1 rounded-2xl px-3 py-2' onClick={downloadVideo} data-url={url}>Download</button>
    </div>)
}
