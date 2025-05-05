/* Magic Mirror²
 * Module: MMM-RandomJoke
 * Displays random jokes from the official-joke-api
 */
Module.register("MMM-RandomJoke", {
    // Default module configuration
    defaults: {
        updateInterval: 60000 * 15, // Update every 15 minutes
        fadeSpeed: 4000,
        retryDelay: 5000,
        animationSpeed: 2500,
        showType: true, // Show joke category
        showId: false   // Show joke ID
    },

    // Define required scripts
    getScripts: function() {
        return ["moment.js"];
    },

    // Define required styles
    getStyles: function() {
        return ["MMM-RandomJoke.css"];
    },

    // Define start sequence
    start: function() {
        Log.info("Starting module: " + this.name);
        
        this.joke = {
            type: "",
            setup: "Loading joke...",
            punchline: "",
            id: 0
        };
        
        this.loaded = false;
        this.scheduleUpdate(this.config.updateInterval);
        this.getJoke();
    },

    // Override dom generator
    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.className = "mmm-random-joke";
        
        if (!this.loaded) {
            wrapper.innerHTML = "Loading joke...";
            wrapper.className = "dimmed light small";
            return wrapper;
        }
        
        // Joke container
        var jokeContainer = document.createElement("div");
        jokeContainer.className = "joke-container";
        
        // Joke type (if enabled)
        if (this.config.showType && this.joke.type) {
            var typeElem = document.createElement("div");
            typeElem.className = "joke-type bright small";
            typeElem.innerHTML = this.joke.type.toUpperCase();
            jokeContainer.appendChild(typeElem);
        }
        
        // Joke setup
        var setupElem = document.createElement("div");
        setupElem.className = "joke-setup bright medium";
        setupElem.innerHTML = this.joke.setup;
        jokeContainer.appendChild(setupElem);
        
        // Joke punchline
        var punchlineElem = document.createElement("div");
        punchlineElem.className = "joke-punchline light medium";
        punchlineElem.innerHTML = this.joke.punchline;
        jokeContainer.appendChild(punchlineElem);
        
        // Joke ID (if enabled)
        if (this.config.showId && this.joke.id) {
            var idElem = document.createElement("div");
            idElem.className = "joke-id xsmall dimmed";
            idElem.innerHTML = "Joke #" + this.joke.id;
            jokeContainer.appendChild(idElem);
        }
        
        wrapper.appendChild(jokeContainer);
        return wrapper;
    },

    // Request new joke data
    getJoke: function() {
        this.sendSocketNotification("GET_JOKE");
    },

    // Schedule next update
    scheduleUpdate: function(delay) {
        var nextLoad = delay;
        if (typeof delay === "undefined") {
            nextLoad = this.config.updateInterval;
        }
        
        var self = this;
        setTimeout(function() {
            self.getJoke();
        }, nextLoad);
    },

    // Socket notification received
    socketNotificationReceived: function(notification, payload) {
        if (notification === "JOKE_RESULT") {
            this.processJoke(payload);
        }
    },

    // Process joke data
    processJoke: function(data) {
        if (!data || !data.setup || !data.punchline) {
            // If no valid joke data, retry after delay
            this.scheduleUpdate(this.config.retryDelay);
            return;
        }
        
        this.joke = data;
        this.loaded = true;
        this.updateDom(this.config.animationSpeed);
        this.scheduleUpdate();
    }
});
