import weatherHandler from './weather';
import { getBackgroundImage } from './fetchBackgroundImage';
import { isAlreadyVisited, checkTodayDate, displayCurrentTime, setTodayDate } from './time';
import { mainTodoHandler, removeMainTodo, toggleMainTodo } from './mainTodo';
import subTodoHandler from './subTodo';
import { ACCESS_KEY } from './utils/constants';


getBackgroundImage(ACCESS_KEY);

setTodayDate();
displayCurrentTime();
setInterval(displayCurrentTime, 1000);

weatherHandler();

mainTodoHandler();
subTodoHandler();
