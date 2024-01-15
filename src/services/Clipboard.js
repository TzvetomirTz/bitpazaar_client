const copyToClipboard = (data) => {
    navigator.clipboard.writeText(data)
}

const Clipboard = {
    copyToClipboard
}

export default Clipboard