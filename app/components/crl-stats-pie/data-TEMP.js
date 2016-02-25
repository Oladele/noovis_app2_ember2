export function getData( labels ) {
  return getDataWithCustomLabels(labels);
}

function getDataWithCustomLabels(labels){
  return [{
    label: labels.active,
    value: 614,
    type: "number",
  }, {
    label: labels.other,
    value: 986,
    type: "number",
  }
];
}