export default function Progress({ progress }) {
    return (<>
        <p>Downloading: {progress.percent}</p>
        <p>ETA: {progress.eta}</p>
    </>)
}
