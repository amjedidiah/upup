import { GoogleFile } from 'google'
import { OneDriveFile } from 'microsoft'
import React, { ReactEventHandler } from 'react'
import { TbFile, TbFolder } from 'react-icons/tb'

const handleImgError: ReactEventHandler<HTMLImageElement> = e => {
    const svg = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path></svg>`
    e.currentTarget.src = `data:image/svg+xml;base64,${btoa(svg)}`
    e.currentTarget.onerror = null
}

export default function DriveBrowserIcon({
    file,
}: {
    file: OneDriveFile | GoogleFile
}) {
    const isFolder = Boolean(
        (file as OneDriveFile).isFolder || (file as GoogleFile).children,
    )
    const src =
        'isFolder' in file ? file.thumbnails?.small.url : file.thumbnailLink

    if (isFolder) return <TbFolder />
    if (!src) return <TbFile />

    return (
        <img
            src={src}
            alt={file.name}
            className="h-5 w-5 rounded-md border"
            onError={handleImgError}
        />
    )
}
