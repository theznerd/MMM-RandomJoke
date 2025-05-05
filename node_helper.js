/* Magic Mirror²
 * Node Helper: MMM-RandomJoke
 */

const NodeHelper = require("node_helper");
const fetch = require("node-fetch");

module.exports = NodeHelper.create({
    // Start the helper
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },
    
    // Override socketNotificationReceived method
    socketNotificationReceived: function(notification, payload) {
        if (notification === "GET_JOKE") {
            this.getJoke();
        }
    },
    
    // Fetch joke from API
    getJoke: function() {
        const self = this;
        const url = "https://official-joke-api.appspot.com/random_joke";
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                self.sendSocketNotification("JOKE_RESULT", data);
            })
            .catch(error => {
                console.error("Error fetching joke:", error);
                // Send a default joke in case of error
                self.sendSocketNotification("JOKE_RESULT", {
                    type: "error",
                    setup: "Why did the API fail?",
                    punchline: "It couldn't take a joke!",
                    id: 0
                });
            });
    }
});
