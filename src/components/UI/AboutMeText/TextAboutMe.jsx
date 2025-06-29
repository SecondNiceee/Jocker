import { memo, useEffect, useRef, useState } from "react"
import "./TextAboutMe.css"
import Text from "../../Text/Text"

const TextAboutMe = ({
  aboutU,
  darkSide = false,
  className = {},
  textareaClassName = {},
  buttonClassNames = {},
  emptyText = "Пользователь ничего не написал о себе",
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showReadMore, setShowReadMore] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [truncatedText, setTruncatedText] = useState("")

  const textRef = useRef(null)
  const measureRef = useRef(null)

  // Функция для обрезания текста до 3 строк с учетом многоточия
  const truncateTextToThreeLines = (text) => {
    if (!measureRef.current || !text) return text

    const element = measureRef.current

    // Измеряем высоту одной строки
    element.textContent = "A"
    const singleLineHeight = element.scrollHeight

    // Проверяем полный текст
    element.textContent = text
    const fullHeight = element.scrollHeight

    // Если текст помещается в 3 строки, возвращаем как есть
    if (fullHeight <= singleLineHeight * 3.2) {
      return text
    }

    // Бинарный поиск с учетом многоточия
    let left = 0
    let right = text.length
    let bestFit = ""

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)

      // Обрезаем текст и сразу добавляем многоточие
      let testText = text.substring(0, mid).trim()

      // Убираем последнее слово, если оно обрезано посередине
      const words = testText.split(" ")
      if (words.length > 1 && mid < text.length) {
        // Проверяем, не обрезали ли мы слово посередине
        const lastWord = words[words.length - 1]
        const fullWordInOriginal = text.substring(mid - lastWord.length, mid + 10).split(" ")[0]

        if (lastWord !== fullWordInOriginal) {
          // Слово обрезано, убираем его
          testText = words.slice(0, -1).join(" ")
        }
      }

      testText += "..."

      element.textContent = testText
      const testHeight = element.scrollHeight

      if (testHeight <= singleLineHeight * 3.2) {
        bestFit = testText
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    return bestFit
  }

  useEffect(() => {
    if (!aboutU || aboutU.trim() === "") {
      setIsEmpty(true)
      setShowReadMore(false)
      setTruncatedText("")
      return
    }

    setIsEmpty(false)

    setTimeout(() => {
      if (measureRef.current && textRef.current) {
        measureRef.current.style.width = `${textRef.current.offsetWidth - 16}px`

        const truncated = truncateTextToThreeLines(aboutU)
        setTruncatedText(truncated)
        setShowReadMore(truncated !== aboutU)
        setIsExpanded(false)
      }
    }, 100)
  }, [aboutU])

  const displayText = isEmpty ? emptyText : aboutU

  let currentText
  if (isEmpty) {
    currentText = displayText
  } else if (isExpanded) {
    currentText = aboutU
  } else {
    currentText = truncatedText
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div {...props} className={`ur__town ${className || ""}`}>
      {darkSide && <div className="background" style={{ display: showReadMore ? "block" : "none" }} />}

      <div
        ref={measureRef}
        className={`about__u-text ${textareaClassName || ""}`}
        style={{
          position: "absolute",
          visibility: "hidden",
          height: "auto",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          lineHeight: "21px",
          top: "-9999px",
          left: "-9999px",
          padding: "8px",
        }}
      />

      <div
        ref={textRef}
        className={`about__u-text ${textareaClassName || ""}`}
        style={{
          opacity: isEmpty ? 0.5 : 1,
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          lineHeight: "21px",
          minHeight: "21px",
          transition: "all 0.3s ease",
          borderRadius : showReadMore ? "10px 10px 6px 6px" : "10px"
        }}
      >
        {currentText}
      </div>

      {showReadMore && (
        <div
          className={`also ${buttonClassNames || ""}`}
          onClick={handleToggle}
          style={{
            display: "flex",
            cursor: "pointer",
            marginTop: "5px",
          }}
        >
          <Text>{isExpanded ? "Скрыть" : "Читать далее"}</Text>
        </div>
      )}
    </div>
  )
}

export default memo(TextAboutMe)
