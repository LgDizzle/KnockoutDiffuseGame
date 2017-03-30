$(function() {

    function gameViewModel() {
        var self = this;
        self.gameName = ko.observable("Knockout!");
        self.playerName = ko.observable("Player One");

        self.fullName = ko.computed(function () {
            return self.playerFirstName() + " " + self.playerLastName();
        }, self);
    }

    function game() {
        var self = this;
        self.currentTurnIndex = 0;
        self.deck = new deck();
    }

    // ReSharper disable once DuplicatingLocalDeclaration
    function deck() {
        var self = this;
        self.cards = [];
        self.cardsDrawn = 0;
        var suits = ["spades", "diamonds", "hearts", "clubs"];
        var names = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
        for (var suit in suits) {
            for (var name in names) {
                self.cards.push(new card(names[name], suits[suit]));
            }
        }
    }

    deck.prototype.getCard = function() {
        var self = this;
        if (self.cards.length == self.cardsDrawn) {
            return null;
        } //case: check if all cards drawn

        var random = Math.floor(Math.random() * (self.cards.length - self.cardsDrawn));
        var temp = self.cards[random];

        //swap chosen card with card last in array
        self.cards[random] = self.cards[self.cards.length - self.cardsDrawn - 1];
        self.cards[self.cards.length - self.cardsDrawn - 1] = temp;
        self.cardsDrawn++;

        return temp;
    };

    function card(name, suit) {
        self.name = name;
        self.suit = suit;
    }

    card.prototype.image = function() {
        return "http://www.jonarnaldo.com/sandbox/deck_images/" + name + "_of_" + suit + ".png";
    };

    card.prototype.value = function() {
        var self = this;
        if (self.name == "jack" || "queen" || "king") {
            return [10];
        } else if (self.name == "ace") {
            return [1, 11];
        } else {
            return parseInt(self.name, 10);
        }
    };

    function player() {
        var self = this;
        //self.name;
        self.cards = [];
    }

    player.prototype.addCard = function() {
        var self = this;
        self.cards.push(deck.getCard());
    };

    player.prototype.score = function() {
        var self = this;
        var score = 0;
        var aces = [];

        for (var i = 0; i < self.cards.length; i++) {
            var value = self.cards[i].value() // value array ex.[10]
            if (value.length == 1) {
                score += value[0];
            } else {
                aces.push(value);
            }
        }

        for (var j = 0; j < aces.length; j++) {
            if (score + aces[j].value[1] <= 21) {
                score + aces[j].value[1];
            } else {
                score + aces[j].value[0];
            }
        }
        return score;

    };

    var deck = new deck();
    var player1 = new player();


    $("#getCard").click(function() {
        player1.addCard();


        var cardName = player1.cards[player1.cards.length - 1].name;
        var cardSuit = player1.cards[player1.cards.length - 1].suit;
        $("#table").append(cardName + cardSuit);
    });
})