import { memo, useEffect, useMemo, useRef } from "react";
import cl from "./FullPicker.module.css";
import Text from "../../Text/Text";
const FullPicker = ({
  values,
  keys,
  nowKey,
  setNowKey,
  className,
  GreyIntWidth,
  GreyWidth,
}) => {
  const myTransform = useMemo(() => {
    for (let i = 0; i < keys.length; i++) {
      if (nowKey === keys[0]) {
        return "translateX(2px)";
      }
      if (nowKey === keys[i]) {
        return "translateX(" + (GreyIntWidth * i + 2).toString() + "px)";
      }
    }
  }, [nowKey, GreyIntWidth, keys]);

  const myRef = useRef(null)
    useEffect( () => {
      function click(){
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
      }
      myRef.current.addEventListener("click" , click)
    } , [] )
  return (
    <div ref={myRef} className={className ? [cl.track, className].join(" ") : cl.track}>
      <div
        style={{ width: GreyWidth, transform: myTransform }}
        className={cl.greyBlock}
      ></div>

      {keys.map((e, i) => {
        return (
          <>
            {nowKey === keys[i] ? (
              <Text key={i}
                className={cl.bigValue}
                onClick={(e) => {
                  setNowKey(keys[i]);
                }}
              >
                {values[i]}
              </Text>
            ) : (
              <Text key={i}
                className={cl.value}
                onClick={(e) => {
                  setNowKey(keys[i]);
                }}
              >
                {values[i]}
              </Text>
            )}
            <div className={cl.loup} style={i === keys.length - 1 ? {display : "none"} : {}}></div>

          </>
        )
      })}

    </div>
  );
};

export default memo(FullPicker);
