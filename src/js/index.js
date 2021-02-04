import weatherHandler from './weather';
import { getBackgroundImage } from './fetchBackgroundImage';
import { displayCurrentTime, setTodayDate } from './time';
import { mainTodoHandler} from './mainTodo';
import { ACCESS_KEY } from './utils/constants';


getBackgroundImage(ACCESS_KEY);

setTodayDate();
displayCurrentTime();
setInterval(displayCurrentTime, 1000);

weatherHandler();

mainTodoHandler();
