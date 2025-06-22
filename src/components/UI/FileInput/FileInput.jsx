import { useState, useCallback, useRef, useMemo, useEffect } from "react"
import cl from "./FileInput.module.css"
import BlockSpinner from "../BlockSpinner/BlockSpinner"
import Text from "../../Text/Text"
import NoPhotosComponent from "./ui/NoPhotosComponent"

let counter = 0;
const FileInput = ({ className, files, setFiles, fileError, maxFiles = 10, clear = true }) => {
  const [previewUrls, setPreviewUrls] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingCount, setLoadingCount] = useState(0)
  const fileInputRef = useRef(null)

  // Generate preview URLs for files
  const generatePreviews = useCallback((fileList) => {
    const urls = []

    fileList.forEach((item) => {
      if (typeof item === "string") {
        // If it's already a URL string, use it directly
        urls.push(item)
      } else {
        // If it's a File object, create object URL
        urls.push(URL.createObjectURL(item))
      }
    })

    setPreviewUrls(urls)
  }, [])

  // Update previews when files change
  useEffect(() => {
    generatePreviews(files)

    if (clear && files.length === 0) {
      setPreviewUrls([])
    }

    // Cleanup object URLs
    return () => {
      previewUrls.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url)
        }
      })
    }
    // eslint-disable-next-line
  }, [files, clear, generatePreviews])

  // Resize image function
  const resizeImage = useCallback((file, maxWidth = 1640, maxHeight = 1640) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (event) => {
        const img = new Image()

        img.onload = () => {
          let width = img.width
          let height = img.height

          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }

          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }

          const canvas = document.createElement("canvas")
          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext("2d")
          ctx.drawImage(img, 0, 0, width, height)

          canvas.toBlob((blob) => {
            resolve(
              new File([blob], file.name, {
                type: "image/png",
                lastModified: new Date().getTime(),
              }),
            )
          }, "image/png")
        }

        img.onerror = () => reject(new Error("Could not load image"))
        img.src = event.target.result
      }

      reader.onerror = () => reject(new Error("Could not read file"))
      reader.readAsDataURL(file)
    })
  }, [])

  // Handle file selection
  const addFiles = useCallback(
    async (newFiles) => {
      if (files.length + newFiles.length > maxFiles) {
        window.Telegram?.WebApp?.showAlert(`Максимум ${maxFiles} файлов разрешено`) ||
          alert(`Максимум ${maxFiles} файлов разрешено`)
        return
      }

      setIsLoading(true)
      setLoadingCount(newFiles.length)

      try {
        const processedFiles = []

        for (let i = 0; i < newFiles.length; i++) {
          const file = newFiles[i]

          if (file.type.startsWith("image/")) {
            const resizedFile = await resizeImage(file)
            processedFiles.push(resizedFile)
          } else {
            processedFiles.push(file)
          }
        }
        setFiles([...files, ...processedFiles])
      } catch (error) {
        console.error("Error processing files:", error)
        window.Telegram?.WebApp?.showAlert("Не удалось загрузить фотку, попробуйте еще раз") ||
          alert("Не удалось загрузить файлы, попробуйте еще раз")
      } finally {
        setIsLoading(false)
        setLoadingCount(0)
      }
    },
    [files, setFiles, maxFiles, resizeImage],
  )

  // Remove file
  const removeFile = useCallback(
    (index) => {
      const newFiles = files.filter((_, i) => i !== index)
      setFiles(newFiles)

      // Clear input value
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    },
    [files, setFiles],
  )

  // Photo container style
  const photoStyle = useMemo(() => {
    if (fileError) {
      return {
        display: "flex",
        border: "1px solid #FF6767",
      }
    }
    if (files.length === 0) {
      return {
        display: "flex",
      }
    }
    return {}
  }, [fileError, files])

  // Image style for grid
  const imageStyle = useMemo(() => {
    if (files.length > 0) {
      const size = (document.documentElement.offsetWidth - 28 - 18 - 15.6) / 3
      return {
        height: `${size}px`,
        width: `${size}px`,
        maxHeight: `${size}px`,
        maxWidth: `${size}px`,
      }
    }
    return {}
  }, [files])

  return (
    <>
      <div style={photoStyle} className={className ? [cl.FileInput, className].join(" ") : cl.FileInput}>
        {/* Display existing images */}
        {previewUrls.map((url, index) => (
          <div key={index} className={cl.imageFeetContainer}>
            <div onClick={() => removeFile(index)} className={[cl.removeIcon, "_icon-trash"].join(" ")} />
            <img style={imageStyle} className={cl.imageFeet} src={url || "/placeholder.svg"} alt="" />
          </div>
        ))}

        {/* Loading spinners */}
        {isLoading &&
          Array.from({ length: loadingCount }).map((_, i) => (
            <div key={`loader-${i}`} className="filesLoader">
              <BlockSpinner style={{ ...imageStyle, border: "1px solid black" }} />
            </div>
          ))}

        {/* File input area */}
        <NoPhotosComponent files = {files} imageStyle={imageStyle} counter = {counter} addFiles = {addFiles} />
      </div>

      {fileError && <Text className={cl.fileError}>Добавьте хотя бы один пример работы</Text>}
    </>
  )
}

export default FileInput;
