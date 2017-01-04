window.addEventListener('load', function() {
    getProfiles();
});


function getProfiles() {
    let getNewProfileBtn = document.querySelector('#new-profile');
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
        userFirstName: capitalizeFirstLetter(profile.name.first),
        userLastName: capitalizeFirstLetter(profile.name.last),
    });

    let likeBtn = child.querySelector('#like');
    likeBtn.addEventListener('click', function() {
        console.log('I like ' + profile.name.first + ' ' + profile.name.last);
        likeBtn.classList.add('fade');
    });

    let nopeBtn = child.querySelector('#nope');
    nopeBtn.addEventListener('click', function() {
        console.log('I do not like ' + profile.name.first + ' ' + profile.name.last);
        nopeBtn.classList.add('fade');
    });

    parent.appendChild(child);


    let clearBtn = document.querySelector('#clear');
    clearBtn.addEventListener('click', function() {
        parent.innerHTML='';
    });  
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}




