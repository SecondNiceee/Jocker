import { useEffect } from "react";
import menuController from "../functions/menuController";

const useBlockInputs = () => {
  useEffect(() => {
        const input = document.querySelectorAll('input'); 
        const textarea = document.querySelectorAll("textarea");
        for (let smallInput of input) {
          smallInput.addEventListener("focus", menuController.hideMenu);
          smallInput.addEventListener("blur", menuController.showMenu);
        }
        for (let smallTextarea of textarea) {
          smallTextarea.addEventListener("focus", menuController.hideMenu);
          smallTextarea.addEventListener("blur", menuController.showMenu
          );
        }
        return () => {
          setTimeout( () => {
            for (let smallInput of input) {
              smallInput.removeEventListener("focus", menuController.hideMenu);
              smallInput.removeEventListener("blur", menuController.showMenu);
            }
            for (let smallTextarea of textarea) {
              smallTextarea.removeEventListener("focus", menuController.hideMenu);
              smallTextarea.removeEventListener("blur", menuController.showMenu
              );
            }
          }, 0 )
        } 
      }, []);

        useEffect(() => {
          let inputs = document.querySelectorAll("input");
          function addH() {
            window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
          }
          // Добавляем обработчик события на каждый элемент input, у которого type не равен file
          inputs.forEach(function (input) {
            if (input.type !== "file") {
              input.addEventListener("focus", addH);
            }
          });
          return () => {
            inputs.forEach(function (input) {
              if (input.type !== "file") {
                input.removeEventListener("focus", addH);
              }
            });
          };
        }, []);
};

export default useBlockInputs;