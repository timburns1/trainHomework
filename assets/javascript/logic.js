$(document).ready(function(){

const config = {
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
    const database = firebase.database();
    $('#addTrainBtn').on("click", function() {
      // take user input
      let trainName = $("#trainNameInput").val().trim();
      let destination = $("#destinationInput").val().trim();
      let firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
      let frequency = $("#frequencyInput").val().trim();
      // to create local temporary object to hold train data
      let newTrain = {
          name: trainName,
          place: destination,
          ftrain: firstTrain,
          freq: frequency
        }
        // uploads train data to the database
      database.ref().push(newTrain);
      console.log(newTrain.name);
      // clears all the text-boxes
      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#timeInput").val("");
      $("#frequencyInput").val("");
      // Prevents moving to new page
      return false;
    });
    //  Created a firebase event listner for adding trains to database and a row in the html when the user adds an entry
    database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());
      // Now we store the childSnapshot values into a variable
      let trainName = childSnapshot.val().name;
      let destination = childSnapshot.val().place;
      let firstTrain = childSnapshot.val().ftrain;
      let frequency = childSnapshot.val().freq;
      // first Train pushed back to make sure it comes before current time
      let firstTimeConverted = moment(firstTrain, "HH:mm");
      console.log(firstTimeConverted);
      let currentTime = moment().format("HH:mm");
      console.log("CURRENT TIME: " + currentTime);
      // store difference between currentTime and fisrt train converted in a variable.
      let timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
      console.log(firstTrain);
      console.log("Difference in Time: " + timeDiff);
      // find Remainder of the time left and store in a variable
      let timeRemainder = timeDiff % frequency;
      console.log(timeRemainder);
      // to calculate minutes till train,we store it in a variable
      let minToTrain = frequency - timeRemainder;
      // next train
      let nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
      $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
    });












});