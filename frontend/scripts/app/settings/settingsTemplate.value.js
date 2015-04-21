(function() {

  'use strict';

  angular
    .module('app.settings')
    .value('settingsTemplate', [
      {
        "category": "Preferences",
        "description": "settings_preferences_travelProfile_description",
        "key": "travel_profile",
        "defaultValue": 1,
        "options": [
          {
            "description": "settings_preferences_travelProfile_timeSaver_description",
            "value": 0,
            "tooltip": "settings_preferences_travelProfile_timesaver_tooltip",
            "parameters": []
          },
          {
            "description": "settings_preferences_travelProfile_explorer_description",
            "value": 1,
            "tooltip": "settings_preferences_travelProfile_explorer_tooltip",
            "parameters": []
          },
          {
            "description": "settings_preferences_travelProfile_socializer_description",
            "value": 2,
            "tooltip": "settings_preferences_travelProfile_socializer_tooltip",
            "parameters": []
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "settings_preferences_transferTime_description",
        "key": "transfer_time",
        "defaultValue": 1,
        "options": [
          {
            "description": "settings_preferences_transferTime_fast_description",
            "value": 0,
            "tooltip": "settings_preferences_transferTime_fast_tooltip"
          },
          {
            "description": "settings_preferences_transferTime_medium_description",
            "value": 1,
            "tooltip": "settings_preferences_transferTime_medium_tooltip"
          },
          {
            "description": "settings_preferences_transferTime_slow_description",
            "value": 2,
            "tooltip": "settings_preferences_transferTime_slow_tooltip"
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "settings_preferences_tripDurationFactor",
        "key": "trip_duration_factor",
        "defaultValue": 1.2
      },
      {
        "category": "Preferences",
        "description": "settings_preferences_tripDurationFactor",
        "key": "home_location",
        "defaultValue": ""
      },
      {
        "category": "Preferences",
        "description": "settings_preferences_hotelType_description",
        "key": "hotel_type",
        "defaultValue": 1,
        "options": [
          {
            "description": "settings_preferences_hotelType_lowBudget_description",
            "value": 0
          },
          {
            "description": "settings_preferences_hotelType_comfort_description",
            "value": 1
          },
          {
            "description": "settings_preferences_hotelType_luxurious_description",
            "value": 2
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "settings_preferences_hotelLocation_description",
        "key": "hotel_location",
        "defaultValue": 0,
        "options": [
          {
            "description": "settings_preferences_hotelLocation_appointment_description",
            "value": 0
          },
          {
            "description": "settings_preferences_hotelLocation_trafficJuntions_description",
            "value": 1
          },
          {
            "description": "settings_preferences_hotelLocation_cityCenter_description",
            "value": 2
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "settings_preferences_accommodationType_description",
        "key": "accommodation_type",
        "defaultValue": 0,
        "options": [
          {
            "description": "settings_preferences_accommodationType_onlyHotels_description",
            "value": 0
          },
          {
            "description": "settings_preferences_accommodationType_hotelsAndPrivate_description",
            "value": 1
          },
          {
            "description": "settings_preferences_accommodationType_onlyPrivate_description",
            "value": 2
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "settings_preferences_taxi",
        "key": "taxi",
        "defaultValue": 1,
        "options": [
          {
            "description": "general_disable",
            "value": 0
          },
          {
            "description": "general_enable",
            "value": 1
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "settings_preferences_flight",
        "key": "flight",
        "defaultValue": 1,
        "options": [
          {
            "description": "general_disable",
            "value": 0
          },
          {
            "description": "general_enable",
            "value": 1
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "settings_preferences_publicTransport",
        "key": "public_transport",
        "defaultValue": 1,
        "options": [
          {
            "description": "general_disable",
            "value": 0
          },
          {
            "description": "general_enable",
            "value": 1
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "settings_preferences_rentalCar",
        "key": "rental_car",
        "defaultValue": 0,
        "options": [
          {
            "description": "general_disable",
            "value": 0
          },
          {
            "description": "general_enable",
            "value": 1
          }
        ]
      },
      {
        "category": "Preferences",
        "description": "settings_preferences_ferry",
        "key": "ferry",
        "defaultValue": 1,
        "options": [
          {
            "description": "general_disable",
            "value": 0
          },
          {
            "description": "general_enable",
            "value": 1
          }
        ]
      }
    ]);
})();
