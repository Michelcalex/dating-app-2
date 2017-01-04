window.addEventListener('load', function() {
    getProfiles();
});


function getProfiles() {
    let getNewProfileBtn = document.querySelector('#get-new-profile button');
    getNewProfileBtn.addEventListener('click', function() {

        let request = new XMLHttpRequest();
        request.open('GET', 'https://randomuser.me/api');
        request.addEventListener('load', function() {
            let response = JSON.parse(request.responseText);
            console.log(response);

            for(let i = 0; i < response.results.length; i++) {
                showProfiles(response.results[i]);
            }
        });

        request.send();
    });   
}


function showProfiles(profile) {
    let parent = document.querySelector('#user-profiles ul');
    let child = document.createElement('li');

    let template = document.querySelector('#user-profile-template');

    child.innerHTML = Mustache.render(template.innerHTML, {
        imgSrc: profile.picture.large,
        userFirstName: profile.name.first,
        userLastName: profile.name.last,
    });

    let likeBtn = child.querySelector('#like');
    likeBtn.addEventListener('click', function() {
        console.log('I got a new profile ' + profile.name.first + ' ' + profile.name.last);
    })

    parent.appendChild(child);  
}





