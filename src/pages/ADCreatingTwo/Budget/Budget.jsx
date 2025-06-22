import cl from "./Budget.module.css";
import GreyText from "../../../components/UI/GreyText/GreyText";
import BudgetInput from "../BudgetInput/BudgetInput";
import { useDispatch, useSelector } from "react-redux";
import { setSecondPage } from "../../../store/taskCreating";

const Budget = ({
  className,
  errorTon
}) => {
  
  const tonConstant = useSelector((state) => state.ton.value);

  const {tonValue, budget} = useSelector((state) => state.taskCreating.secondPage);

  const dispatch = useDispatch();

  return (
    <div className={className ? [className, cl.Budget].join(" ") : cl.Budget}>
      <GreyText className={cl.GreyText}> Ваш бюджет </GreyText>
      <BudgetInput
      style = {errorTon
        ? {color : '#FF6767'}
        : {}
      }
            
        errorTon = {errorTon}
        tonConstant={tonConstant}
        setTonValue={(e) =>
          dispatch(setSecondPage({ budget: e , tonValue :   (Number(e.replace(/\s/g, '').replace(',','.')) / tonConstant ).toFixed(3)  }))
        }
        tonValue={tonValue}
        budget={budget}
        setBudget={(e) => {
         dispatch(setSecondPage({ budget: e , tonValue :   (Number(e.replace(/\s/g, '').replace(',','.')) / tonConstant ).toFixed(3)  }));

        }}
      />
    </div>
  );
};

export default Budget;
