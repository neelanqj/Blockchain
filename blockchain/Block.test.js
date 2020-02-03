const Block = require('./block');
const { DIFFICULTY } = require('../config');

describe('Block', () => {
    let data, lastBlock, block;

    beforeEach(()=>{
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });

    it('Sets the data to match the giveN iNput', () => {
        expect(block.data).toEqual(data);
    });
    
    it('Sets the lastHash to match the hash of tteh last block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });
    it('gen a hash that matches the diff', () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
    });
    it('lowers diff for slowly mined blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamp + 360000))
         .toEqual(block.difficulty-1);
    });
    it('raises the diff for quickly mined blocks', () => {
       expect(Block.adjustDifficulty(block, block.timestamp+1))
        .toEqual(block.difficulty+1); 
    });
});