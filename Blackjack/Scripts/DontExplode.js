$(function () {

    function DontExplodeViewModel() {
        var self = this;
        self.gameName = ko.observable("Don't Explode");

        self.wires = [
            { wireColor: "white" },
            { wireColor: "black" },
            { wireColor: "yellow" }
        ];

        self.hardWires = ko.observableArray([
            new wire(self.wires[0]),
            new wire(self.wires[1]),
            new wire(self.wires[2])
        ]);

        //function autoWires() {
        //    var wires = ["white", "black", "purple", "red", "green", "orange"];
        //    for (var suit in suits) {
        //        for (var name in names) {
        //            self.cards.push(new card(names[name], suits[suit]));
        //        }
        //    }
        //}
        function wire(color) {
            var self2 = this;
            self2.wire = ko.observable(color);
            self2.isWireCut = ko.observable(false);
            self2.isEnabled = ko.observable(true);
            self2.buttonText = ko.observable(color.wireColor);

            self.cutWire = function() {
                checkCutWire(self);
            }
        }

        self.checkCutWire = function(wire) {
            // loop through our hard coded wires
            hardWires.forEach(function (w, index) {
                console.log(w);
                console.log(index);
                console.log(wire);
            });
        }

    };

    // activates knockout
    ko.applyBindings(new DontExplodeViewModel());
});