(function() {

  'use strict';

  angular
    .module('app.settings')
    .value('settingsTemplate', [
      {
        "category": "Preferences",
        "description": "Set your personal travel profile.",
        "key": "travel_profile",
        "defaultValue": 1,
        "options": [
          {
            "description": "time saver",
            "value": 0,
            "tooltip": "Choose this travel profile, when you want to spend as little time as possible on the road.",
            "parameters": []
          },
          {
            "description": "explorer",
            "value": 1,
            "tooltip": "Choose this travel profile, when you want to also explore your destination and spend some time there.",
            "parameters": []
          },
          {
            "description": "socializer",
            "value": 2,
            "tooltip": "Choose this travel profile, when you plan to spend some time with your customer after the appointment.",
            "parameters": []
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "Set a transfer time.",
        "key": "transfer_time",
        "defaultValue": 1,
        "options": [
          {
            "description": "fast",
            "value": 0,
            "tooltip": "Your name is Usain Bolt? Go for that option."
          },
          {
            "description": "medium",
            "value": 1,
            "tooltip": "For most people this option is the way to go."
          },
          {
            "description": "slow",
            "value": 2,
            "tooltip": "If you miss your connections too often, go for that option. It will give you some additional buffer time."
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "How much slower may the low-budget trip be in comparison to the fastest trip?",
        "key": "trip_duration_factor",
        "defaultValue": 1.2
      },
      {
        "category": "Preferences",
        "description": "Set your default home location.",
        "key": "home_location",
        "defaultValue": ""
      },
      {
        "category": "Preferences",
        "description": "Set your hotel preference.",
        "key": "hotel_type",
        "defaultValue": 1,
        "options": [
          {
            "description": "low-budget",
            "value": 0
          },
          {
            "description": "comfort",
            "value": 1
          },
          {
            "description": "luxurious",
            "value": 2
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "Set your hotel location preference.",
        "key": "hotel_location",
        "defaultValue": 0,
        "options": [
          {
            "description": "close to appointment location",
            "value": 0
          },
          {
            "description": "close to traffic junctions",
            "value": 1
          },
          {
            "description": "close to city center",
            "value": 2
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "Do you also want to use private accommodations like Airbnb?",
        "key": "accommodation_type",
        "defaultValue": 0,
        "options": [
          {
            "description": "only hotels",
            "value": 0
          },
          {
            "description": "hotels and private accommodations",
            "value": 1
          },
          {
            "description": "only private accommodations",
            "value": 2
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "(De)Activate the taxi option.",
        "key": "taxi",
        "defaultValue": 1,
        "options": [
          {
            "description": "disable",
            "value": 0
          },
          {
            "description": "enable",
            "value": 1
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "(De)Activate the flight option.",
        "key": "flight",
        "defaultValue": 1,
        "options": [
          {
            "description": "disable",
            "value": 0
          },
          {
            "description": "enable",
            "value": 1
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "(De)Activate the public transport option.",
        "key": "public_transport",
        "defaultValue": 1,
        "options": [
          {
            "description": "disable",
            "value": 0
          },
          {
            "description": "enable",
            "value": 1
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "(De)Activate the rental car option.",
        "key": "rental_car",
        "defaultValue": 0,
        "options": [
          {
            "description": "disable",
            "value": 0
          },
          {
            "description": "enable",
            "value": 1
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "(De)Activate the ferry option.",
        "key": "ferry",
        "defaultValue": 1,
        "options": [
          {
            "description": "disable",
            "value": 0
          },
          {
            "description": "enable",
            "value": 1
          }
        ]
      }
    ]);
})();
