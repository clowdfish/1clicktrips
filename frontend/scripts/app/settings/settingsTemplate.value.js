(function() {

  'use strict';

  angular
    .module('app.settings')
    .value('settingsTemplate', [
      {
        "category": "Preferences",
        "description": "settings_preferences_travelprofile_description",
        "key": "travel_profile",
        "defaultValue": 1,
        "options": [
          {
            "description": "settings_preferences_travelprofile_timesaver_description",
            "value": 0,
            "tooltip": "settings_preferences_travelprofile_timesaver_tooltip",
            "parameters": []
          },
          {
            "description": "settings_preferences_travelprofile_explorer_description",
            "value": 1,
            "tooltip": "settings_preferences_travelprofile_explorer_tooltip",
            "parameters": []
          },
          {
            "description": "settings_preferences_travelprofile_socializer_description",
            "value": 2,
            "tooltip": "settings_preferences_travelprofile_socializer_tooltip",
            "parameters": []
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "settings_preferences_transfertime_description",
        "key": "transfer_time",
        "defaultValue": 1,
        "options": [
          {
            "description": "settings_preferences_transfertime_fast_description",
            "value": 0,
            "tooltip": "settings_preferences_transfertime_fast_tooltip"
          },
          {
            "description": "settings_preferences_transfertime_medium_description",
            "value": 1,
            "tooltip": "settings_preferences_transfertime_medium_tooltip"
          },
          {
            "description": "settings_preferences_transfertime_slow_description",
            "value": 2,
            "tooltip": "settings_preferences_transfertime_slow_tooltip"
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
