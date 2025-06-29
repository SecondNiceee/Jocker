import { useCallback } from 'react';
import { USERID } from '../../../constants/tgStatic.config';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { clearTasks, postMyTask } from '../../../store/information';
import { clearCreating } from '../../../store/taskCreating';

const usePrepareAndPostTask = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const prepareAndPostTask = useCallback(async (task) =>  {
        let myFormData = new FormData();
        myFormData.append("userId", String(USERID));
        myFormData.append("title", String(task.taskName.trim()));
        myFormData.append("description", String(task.taskDescription.trim()));
        myFormData.append("views", "0");
        myFormData.append("category", String(task.category.id));
        myFormData.append("subCategory", String(task.subCategory.id));
        myFormData.append("price", String(task.budget.replace(/\s+/g, "")));
        myFormData.append("tonPrice", String(task.tonValue));
        if (document.getElementById("dateSwapper")?.style.transform) {
        myFormData.append("startTime", task.startTime);
        myFormData.append("endTime", task.endTime);
        } else {
        myFormData.append("endTime", task.singleTime);
        myFormData.append("startTime", "");
        }
        // myFormData.append("photos", task.photos);

        if (task.photos.length !== 0) {
        for (let file of task.photos) {
            myFormData.append("photos", file);
        }
        }
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
        dispatch(clearTasks());
        dispatch(clearCreating());
        await dispatch(postMyTask([myFormData, task.photos]));
        navigate("/MyAds");
    }, [dispatch, navigate]);
  return prepareAndPostTask;
};

export default usePrepareAndPostTask;