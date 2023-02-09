import Icons from "./Icons"
import Loader from "./Loader";
import { useEffect, useCallback, useState } from "react";
import Dropzone from 'react-dropzone'

const FileInput = ({ setFile, accepts, className, showText }) => {

	const [loading, setLoading] = useState(false)

	const onDrop = useCallback((acceptedFiles) => {
		setLoading(true)
		acceptedFiles.forEach((file) => {
			const reader = new FileReader()
			reader.readAsDataURL(file);
			reader.onabort = () => console.log('file reading was aborted')
			reader.onerror = () => console.log('file reading has failed')
			reader.onload = () => {
				console.log('reading file omh')
				var dataURI = reader.result;
				// convert base64 to raw binary data held in a string
				// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
				var byteString = atob(dataURI.split(',')[1]);

				// separate out the mime component
				var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

				// write the bytes of the string to an ArrayBuffer
				var ab = new ArrayBuffer(byteString.length);

				// create a view into the buffer
				var ia = new Uint8Array(ab);

				// set the bytes of the buffer to the correct values
				for (var i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				}

				// write the ArrayBuffer to a blob, and you're done
				var blob = new Blob([ab], { type: mimeString });
				setFile({blob: blob, link: URL.createObjectURL(blob)});
			}
		})
	}, [])

	return (
		<>
			<div className="flex group items-center justify-center w-full">
				<Dropzone accept={accepts} onDrop={onDrop} >
					{({ getRootProps, getInputProps }) => (
						<div className="flex flex-col items-center justify-center pt-5 pb-6" {...getRootProps({ className: `flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg text-center cursor-pointer hover:bg-dark border-gray-600 hover:border-gray-500 ${className}` })}>
							<input className="w-full h-full hidden" {...getInputProps()} />
							{loading ? (<Loader className={`w-10 h-10 ${showText === true ? "mb-3" : null}`} />) : (
								<Icons icon="arrow-up-tray" className={`w-10 h-10 ${showText === true ? "mb-3" : null} text-gray-400`} />
							)}
							{showText === true ? (<p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-medium underline group-hover:no-underline">Click to upload</span> or drag and drop</p>) : null}

						</div>
					)}
				</Dropzone>
			</div>
		</>
	)
}

export default FileInput