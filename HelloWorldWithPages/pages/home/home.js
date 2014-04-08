(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            // Retrieve the div that hosts the Rating control.
            var ratingControlDiv = document.getElementById("ratingControlDiv");

            // Retrieve the actual Rating control.
            var ratingControl = ratingControlDiv.winControl;

            // Register the event handler.
            ratingControl.addEventListener("change", this.ratingChanged, false);

            // Step 5: Register the event handler when the app launches
            // Retrieve the button and register our event handler.
            var helloButton = document.getElementById("helloButton");
            helloButton.addEventListener("click", this.buttonClickHandler, false);

            // Retrieve the input element and register our event handler.
            var nameInput = document.getElementById("nameInput");
            nameInput.addEventListener("change", this.nameInputChanged);
        },

        buttonClickHandler: function (eventInfo) {
            var userName = document.getElementById("nameInput").value;
            var greetingString = "Hello, " + userName + "!";
            document.getElementById("greetingOutput").innerText = greetingString;

            // Save the session data.
            WinJS.Application.sessionState.greetingOutput = greetingString;
        },

        ratingChanged: function (eventInfo) {
            var ratingOutput = document.getElementById("ratingOutput");
            ratingOutput.innerText = eventInfo.detail.tentativeRating;

            // Store the rating for multiple sessions.
            var appData = Windows.Storage.ApplicationData.current;
            var roamingSettings = appData.roamingSettings;
            roamingSettings.values["greetingRating"] = eventInfo.detail.tentativeRating;
        },

        nameInputChanged: function (eventInfo) {
            var nameInput = eventInfo.srcElement;

            // Store the user's name for multiple sessions.
            var appData = Windows.Storage.ApplicationData.current;
            var roamingSettings = appData.roamingSettings;
            roamingSettings.values["userName"] = nameInput.value;
        }

    });
})();
