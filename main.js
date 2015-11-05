// wait for DOM to load before running JS
$(document).ready(function() {

	// object constructor - Flower
	function Flower(name, color, petals, petalSize, stemLength, carnivorous, smellsPretty, parent1, parent2, imageURL) {
	  this.name = name;
	  this.color = color;
	  this.petals = petals;
	  this.petalSize = petalSize;
	  this.stemLength = stemLength;
	  this.carnivorous = carnivorous;
	  this.smellsPretty = smellsPretty;
	  this.parent1 = parent1 || this.name;
	  this.parent2 = parent2 || this.name;
	  this.imageURL = imageURL || "blankflower.jpg";
	  this.description = '';
	  // this.sniff = function() {
	  //   console.log("Sniff Sniff Sniff!)");
	  // };
	  this.smellsGood = function(answer) {
	    if (answer) {
	      return "This flower smells amazing!  ";
	    } else {
	      return "What a noxious weed!  ";
	    }
	  };
	  this.describe = function() {
	    var str = ("The "+this.name+" is a "+this.color +" flower with "+this.petals+" petals.  ");
	    str += ("Typically, the "+this.name+" is about "+this.stemLength+" cm long with ");
	    str += ("petals that are roughly "+petalSize+" cm.  ");
	    str += this.smellsGood(smellsPretty);
	    // if (smellsPretty) {
	    // 	str += "It is described as having a pleasant smell.  ";
	    // } else {
	    // 	str += "Most find the scent unappealing.  ";
	    // }
	    if (carnivorous) {
	    	str += "This plant has the added benefit of ridding your house of unwanted pests.";
	    }
	    return str;
	  };
	  // this.compare = function(otherFlower) {
	  //   return ("My " + this.color + " flower is much prettier than your " +
	  //     otherFlower.color + " flower :P)");
	  // };
	  // this.render = function() {
	  //   $('body').append("<p>My pretty flower is " + this.color +
	  //     " and has " + this.petals + " pristine petals.</p>");
	  // };
	  // this.heLovesMe = function() {
	  //   for (var i = 0; i < this.petals - 1; i++) {
	  //     if (i % 2 === 0) console.log("He loves me...");
	  //     else console.log("He loves me not...");
	  //   }
	  //   if (this.petals % 2 === 1) console.log("He loves me!");
	  //   else console.log("He loves me not!");
	  // };
	  this.crossPollinate = function(otherFlower) {
	    var name = this.name.slice(0, 3) + otherFlower.name.slice(3);
	    var color = this.color + '-' + otherFlower.color;
	    var petals = Math.round((this.petals + otherFlower.petals) / 2);
	    var petalSize = Math.max(this.petalSize, otherFlower.petalSize);
	    var stemLength = Math.min(this.stemLength, otherFlower.stemLength);
	    var carnivorous = this.carnivorous || otherFlower.carnivorous;
	    var smellsPretty = this.smellsPretty && otherFlower.smellsPretty;
	    var child = new Flower(name, color, petals, petalSize, stemLength, carnivorous, smellsPretty, this.name, otherFlower.name);
	    flowers.push(child);
	  };
	}

	// Array of flowers
	var flowers = [
	  new Flower('delphinium', 'purple', 8, 2, 3, false, true, false, false, 'delphinium.jpg'),
	  new Flower('tulip', 'violet', 6, 2, 6, false, true, false, false, 'tulip.jpg'),
	  new Flower('rose', 'red', 22, 3, 12, false, true, false, false, 'rose.jpg'),
	  new Flower('primrose', 'yellow', 4, 3, 5, false, false, false, false, 'primrose.jpg'),
	  new Flower('venus flytrap', 'green-red', 2, 3, 4, true, false, false, false, 'venusflytrap.jpg')
	];

	var size = flowers.length;
	for(i=0; i<size-1; i++) {
	  for(j=i+1; j<size; j++) {
	    flowers[i].crossPollinate(flowers[j]);
	  }
	}

	size = flowers.length;
	for(i=0; i<size-1; i++) {
	  for(j=i+1; j<size; j++) {
	    flowers[i].crossPollinate(flowers[j]);
	  }
	}

	for(i=0; i<flowers.length; i++) {
		flowers[i].description = flowers[i].describe();
	}

	Handlebars.registerHelper('grouped_each', function(every, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
	});

	// compile handlebars template
	var source = $('#flowers-template').html();
	var template = Handlebars.compile(source);
	$('#results').append(template({flowers: flowers}));
});





