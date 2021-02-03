import weatherHandler from './weather';

weatherHandler();
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


<<<<<<< HEAD
=======
// getBackgroundImage(accessKey);
>>>>>>> f77b206a4a5ea66102c150f866de683a1461969e
