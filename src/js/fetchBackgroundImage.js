import { isAlreadyVisited, checkTodayDate } from './time';

const displayImage = image => {
    document.querySelector('body').style.backgroundImage = `url(${image})`;
}
const displayImageLocationInfo = data => {
    if(!data.user.location) {
        document.getElementById('location').innerHTML = 'The location information is not provided';
        document.getElementById('photoProvider').innerHTML = data.user.name;
        return;
    }
    document.getElementById('location').innerHTML = data.user.location ? data.user.location : '';
    document.getElementById('photoProvider').innerHTML = data.user.name;

}
const obtainImageFromServer = async ACCESS_KEY => {
    try {
        const backgroundImage = await fetch(`https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}`, {
            params: {
                count:30
            }
        })
        const imageInfo = await backgroundImage.json();
        localStorage.setItem('image-info', JSON.stringify(imageInfo));
    } catch (error) {
        console.log(error)
    }
}
const backgroundImageHandler = async ACCESS_KEY => {
    if (isAlreadyVisited() || checkTodayDate()) await obtainImageFromServer(ACCESS_KEY);
    const imageInfo = JSON.parse(localStorage.getItem('image-info'));
    displayImage(imageInfo.urls.full);
    displayImageLocationInfo(imageInfo);
}

export const getBackgroundImage = ACCESS_KEY => {
    backgroundImageHandler(ACCESS_KEY);

}

