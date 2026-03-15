Vue.createApp({
    data: function () {
        return {
            eventObj: {
                eID: "",
                eName: "",
                eDur: "",
                category: "All",
                selectedEvent: ""
            },
            events: []
        };
    },

    computed: {
        eventNames: function () {
            var self = this;

            return self.events.filter(function (eventItem) {
                return self.eventObj.category === "All" || eventItem.category === self.eventObj.category;
            });
            
        },

        selectedEventName: function () {
            var event = this.events.find(e => e.eventid === this.eventObj.selectedEvent);
            return event ? event.eventname : '';
        }
    },

    methods: {
        loadEvents: function () {
            var self = this;

            fetch("events.json")
                .then(function (response) {
                    if (response.ok === true) {
                        return response.json();
                    }
                    else {
                        throw new Error("Could not load events.json");
                    }
                })
                .then(function (data) {
                    self.events = data;
                })
                .catch(function (error) {
                    console.error("Error loading event data:", error);
                });
        }
    },

    mounted: function () {
        this.loadEvents();
    }
}).mount("#app");
