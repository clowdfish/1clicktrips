(function() {

  'use strict';

  angular
    .module('app.settings')
    .value('settingsTemplate', [
      {
        "category": "Preferences",
        "description": "Set your personal travel profile.",
        "key": "travel_profile",
        "default": 1,
        "options": {
          0: {
            "description": "time saver",
            "tooltip": "Choose this travel profile, when you want to spend as little time as possible on the road.",
            "parameters": []
          },
          1: {
            "description": "explorer",
            "tooltip": "Choose this travel profile, when you want to also explore your destination and spend some time there.",
            "parameters": []
          },
          2: {
            "description": "socializer",
            "tooltip": "Choose this travel profile, when you plan to spend some time with your customer after the appointment.",
            "parameters": []
          }
        }
      },
      {
        "category": "Preferences",
        "description": "Set a transfer time.",
        "key": "transfer_time",
        "default": 1,
        "options": {
          0: {
            "description": "fast",
            "tooltip": "Your name is Usain Bolt? Go for that option."
          },
          1: {
            "description": "medium",
            "tooltip": "For most people this option is the way to go."
          },
          2: {
            "description": "slow",
            "tooltip": "If you miss your connections too often, go for that option. It will give you some additional buffer time."
          }
        }
      },
      {
        "category": "Preferences",
        "description": "How much slower may the low-budget trip be in comparison to the fastest trip?",
        "key": "trip_duration_factor",
        "default": 1.2
      },
      {
        "category": "Preferences",
        "description": "Set your default home location.",
        "key": "home_location",
        "default": ""
      },
      {
        "category": "Preferences",
        "description": "Set your hotel preference.",
        "key": "hotel_type",
        "default": 1,
        "options": {
          0: {
            "description": "low-budget"
          },
          1: {
            "description": "comfort"
          },
          2: {
            "description": "luxurious"
          }
        }
      },
      {
        "category": "Preferences",
        "description": "Set your hotel location preference.",
        "key": "hotel_location",
        "default": 0,
        "options": {
          0: {
            "description": "close to appointment location"
          },
          1: {
            "description": "close to traffic junctions"
          },
          2: {
            "description": "close to city center"
          }
        }
      },
      {
        "category": "Preferences",
        "description": "Do you also want to use private accommodations like Airbnb?",
        "key": "accommodation_type",
        "default": 0,
        "options": {
          0: {
            "description": "only hotels"
          },
          1: {
            "description": "hotels and private accommodations"
          },
          2: {
            "description": "only private accommodations"
          }
        }
      },
      {
        "category": "Preferences",
        "description": "(De)Activate the taxi option.",
        "key": "taxi",
        "default": 1,
        "options": [
          { 0: "disable" },
          { 1: "enable" }
        ]
      },
      {
        "category": "Preferences",
        "description": "(De)Activate the flight option.",
        "key": "flight",
        "default": 1,
        "options": {
          0: {
            "description": "disable"
          },
          1: {
            "description": "enable"
          }
        }
      },
      {
        "category": "Preferences",
        "description": "(De)Activate the public transport option.",
        "key": "public_transport",
        "default": 1,
        "options": {
          0: {
            "description": "disable"
          },
          1: {
            "description": "enable"
          }
        }
      },
      {
        "category": "Preferences",
        "description": "(De)Activate the rental car option.",
        "key": "rental_car",
        "default": 0,
        "options": {
          0: {
            "description": "disable"
          },
          1: {
            "description": "enable"
          }
        }
      },
      {
        "category": "Preferences",
        "description": "(De)Activate the ferry option.",
        "key": "ferry",
        "default": 1,
        "options": {
          0: {
            "description": "disable"
          },
          1: {
            "description": "enable"
          }
        }
      }
    ]);
})();