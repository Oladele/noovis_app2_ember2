export function getData( labels ) {
  return getDataWithCustomLabels(labels);
}

function getDataWithCustomLabels(labels){
  return [
    // *****************
    // Active Channels
    // ****************
    {
      "label": labels.active,
      "group": "HR",
      "value": 68,
    },
    {
      "label": labels.active,
      "group": "St. Ch",
      "value": 59,
    },
    {
      "label": labels.active,
      "group": "BS",
      "value": 66,
    },
    {
      "label": labels.active,
      "group": "HV",
      "value": 116,
    },
    {
      "label": labels.active,
      "group": "CR",
      "value": 89,
    },
    {
      "label": labels.active,
      "group": "CC",
      "value": 133,
    },
    {
      "label": labels.active,
      "group": "PV",
      "value": 122,
    },
    {
      "label": labels.active,
      "group": "FH",
      "value": 41,
    },
    {
      "label": labels.active,
      "group": "MT",
      "value": 41,
    },
    {
      "label": labels.active,
      "group": "EW",
      "value": 55,
    },
    {
      "label": labels.active,
      "group": "CyCr",
      "value": 58,
    },
    {
      "label": labels.active,
      "group": "AB",
      "value": 65,
    },
    {
      "label": labels.active,
      "group": "GTC",
      "value": 73,
    },
    // *****************
    // Standby Channels
    // *****************
    {
      "label": labels.other,
      "group": "HR",
      "value": 188,
    },
    {
      "label": labels.other,
      "group": "St. Ch",
      "value": 101,
    },
    {
      "label": labels.other,
      "group": "BS",
      "value": 158,
    },
    {
      "label": labels.other,
      "group": "HV",
      "value": 11
    },
    {
      "label": labels.other,
      "group": "CR",
      "value": 7,
    },
    {
      "label": labels.other,
      "group": "CC",
      "value": 12
    },
    {
      "label": labels.other,
      "group": "PV",
      "value": 12
    },
    {
      "label": labels.other,
      "group": "FH",
      "value": 23,

    },
    {
      "label": labels.other,
      "group": "MT",
      "value": 23,
    },
    {
      "label": labels.other,
      "group": "EW",
      "value": 9,
    },
    {
      "label": labels.other,
      "group": "CyCr",
      "value": 6,
    },
    {
      "label": labels.other,
      "group": "AB",
      "value": 31,
    },
    {
      "label": labels.other,
      "group": "GTC",
      "value": 23,
    }
  ];
}