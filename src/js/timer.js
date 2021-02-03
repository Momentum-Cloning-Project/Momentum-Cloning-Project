const today = new Date();
const date = today.getDate();
let hours = 0;
let minutes = 0;
let currenTime = 0;


const setTodayDate = () => {
    localStorage.setItem('today-date', date);
}

export const getTodayDate = () => {
    return localStorage.getItem('today-date');
}
export const checkTodayDate = () => {
    if(String(getCurrentDate()) !== localStorage.getItem('today-date')) {
        return true;
    }
    return false
}
 
export const displayCurrentTime = () => {
    hours = today.getHours(); // 시
    minutes = today.getMinutes();  // 분
    hours = String(hours).length === 1 ? '0' + hours : hours;
    minutes = String(minutes).length === 1 ? '0' + minutes : minutes;
    currenTime = hours + ':' + minutes;
    setTodayDate();

    document.getElementById('currentTime').innerHTML =  currenTime;
}

export const getCurrentDate = () => date;