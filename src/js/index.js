import { getBackgroundImage } from './fetchBackgroundImage';
import { getTodayDate, checkTodayDate, displayCurrentTime } from './timer';
import { mainTodoHandler, removeMainTodo, toggleMainTodo } from './mainTodo';
import { ACCESS_KEY } from './utils/constants';


if (getTodayDate() || checkTodayDate()) {

    getBackgroundImage(ACCESS_KEY);
}

displayCurrentTime();
setInterval(displayCurrentTime, 1000);

mainTodoHandler();


