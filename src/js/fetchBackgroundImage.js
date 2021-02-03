

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
const backgroundImageHandler = async accessKey => {
    const backgroundImage = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`, {
        params: {
            count:30
        }
    })
    const data = await backgroundImage.json();
    displayImage(data.urls.full);
    displayImageLocationInfo(data);
}

export const getBackgroundImage = accessKey => {
    try {
        // daily update needed
        backgroundImageHandler(accessKey);
    } catch (error) {
        console.log(error)
    }
}

