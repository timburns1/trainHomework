$(document).ready(function(){

var config = {
    apiKey: "AIzaSyA-2ITr1vvVCxcD_102nSz58Dw1dAxAAaY",
    authDomain: "trainhomework-229a7.firebaseapp.com",
    databaseURL: "https://trainhomework-229a7.firebaseio.com",
    projectId: "trainhomework-229a7",
    storageBucket: "trainhomework-229a7.appspot.com",
    messagingSenderId: "824643901425",
    appId: "1:824643901425:web:d7abbc4eacda23807fd650",
    measurementId: "G-Q1EMR8GYS1"
    };
firebase.initializeApp(config);
let database = firebase.database();
$("#addTrainBtn").on("click", function(){
    // take user input
    let trainName = $("#trainNameInput").val().trim();
    let destination = $("#destinationInput").val().trim();
    let firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
    let frequency = $("#frequencyInput").val().trim();
    //create local temporary object to hold train data
let newTrain ={
    name: trainName,
    place: destination,
    ftrain: firstTrain,
    freq: frequency
}
// upload train data to database
database.ref().push(newTrain);
console.log(newTrain.name);
// clears all text boxes
$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#timeInput").val("");
$("#frequencyInput").val("");
//prevents moving to new page
return false;
});












});