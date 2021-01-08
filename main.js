const receipt = require('./inputs.json')

var totalCosts = {};

console.log("Calculating...");

receipt.items.forEach(function (item) {
  item.bill_to.forEach(function(person) {
    var cost = item.cost / item.bill_to.length;
    console.log(person + " pays " + cost + " for " + item.label)
    if (person in totalCosts) {
      totalCosts[person].cost += cost;
      totalCosts[person].items.push({
        "label": item.label,
        "cost": cost,
      });
    } else {
      totalCosts[person] = {
        "cost": cost,
        "items": [{
          "label": item.label,
          "cost": cost,
        }],
      };
    };
  });
});

console.log("Items billed:")
Object.entries(totalCosts).forEach(function(entry) {
  const [person, personValues] = entry;
  console.log("------------");
  console.log(person + ":");
  personValues.items.forEach(function(item) {
    console.log(item.label + ": " + item.cost.toFixed(2));
  })
})

var sum = 0;
console.log("------------");
console.log("Total costs:")
Object.entries(totalCosts).forEach(function(entry) {
  const [person, personValues] = entry;
  console.log(person + ": " + personValues.cost.toFixed(2));
  sum += personValues.cost;
})
console.log("Sum: " + sum.toFixed(2));