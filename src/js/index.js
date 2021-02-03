


import weatherHandler from './weather';
import { getBackgroundImage } from './fetchBackgroundImage';
import { isAlreadyVisited, checkTodayDate, displayCurrentTime, setTodayDate } from './timer';
import { mainTodoHandler, removeMainTodo, toggleMainTodo } from './mainTodo';
import { ACCESS_KEY } from './utils/constants';

if (!isAlreadyVisited() || checkTodayDate()) {
    setTodayDate();
    // getBackgroundImage(ACCESS_KEY);
}

weatherHandler();
displayCurrentTime();
setInterval(displayCurrentTime, 1000);

mainTodoHandler();
