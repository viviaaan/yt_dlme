export default function Preview({ info }) {
    return (<>
        <div>{info.title}</div>
        <div>{info.description}</div>
        <img src={info.thumbnail} />
    </>
    )
}
