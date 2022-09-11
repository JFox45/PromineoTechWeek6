var expect = chai.expect;

describe('MyFunctions', function() {
    describe('#numberOfCards', function() {
        it('Should tell me how many cards are in the deck', function() {
            var x = numberOfCards();
            expect(x).to.equal(this.cards.length);
        });
    });
 });