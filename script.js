$(document).ready(function(){
    console.log('init');

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('signed in as ' + user.uid);

            firebase.database().ref('things').on("child_added", function(data) {
                console.log(data);
                loadThingElem(data.val(), data.key);
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        } else {
            firebase.auth().signInWithEmailAndPassword('example@example.com', 'example').catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('auth error: ' + error.message)
            });
        }
    });

    $("#newThingAdd").on("click", addThing);
});

function addThing() {
    var name = $("#newThingName").val();
    console.log("adding", name)
    firebase.database().ref('things').push(name);
}

function loadThingElem(name, id) {
    var $thing = $('<div></div>');

    $thing
        .addClass('thing')
        .text(name);

    $('#container').append($thing);
}