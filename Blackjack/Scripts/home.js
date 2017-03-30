/// <reference path="~/Scripts/knockout-3.0.0.debug.js" />
$(function () {
    function GameViewModel() {
        var self = this;
        self.gameName = ko.observable("Knockout!");
        self.playerName = ko.observable("Player One");
        self.playerFirstName = ko.observable("Sir");
        self.playerLastName = ko.observable("'chuuuuuuuu");
        self.playerHealth = ko.observable(100);
        self.enemyHealth = ko.observable(100);

        self.fullName = ko.computed(function() {
                return self.playerFirstName() + " " + self.playerLastName();
            },
            self);

        this.AttackButton = function() {
            var currentVal = self.enemyHealth();
            self.enemyHealth(currentVal - 10);
        };

        this.PotionButton = function() {
            var currentVal = self.playerHealth();
            self.playerHealth(currentVal + 20);
        };
    }

// activates knockout
ko.applyBindings(new GameViewModel());
});