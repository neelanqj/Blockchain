const Block = require('./Block');

class Blockchain {
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock(data){
        const lastBlock = this.chain[this.chain.length-1];
        const block = Block.mineBlock(lastBlock, data);
        this.chain.push(block);

        return block;
    }

    isValidChain(chain){
        if(JSON.stringify(chain[0]) != JSON.stringify(Block.genesis())) return false;
        for(let i = 1;i<chain.length; i++){
            let block = chain[i];
            let lastBlock = chain[i-1];

            //console.log(block.hash.toString().substring(0,10)+','+ lastBlock.hash.toString().substring(0,10)+','+ Block.blockHash(block).toString().substring(0,10));
            if(block.lastHash !== lastBlock.hash ||
                block.hash !== Block.blockHash(block))
                {
                    //console.log(block.hash+','+ lastBlock.hash+','+ Block.blockHash(block));
                    return false; 
                }
        }
        return true;
    }

    replaceChain(newChain){
        if(newChain.length <= this.chain.length){
            console.log('Recieved chain is not longer than current chain');
            return;
        } else if(!this.isValidChain(newChain)) {
            console.log('The recived chain is not valid');
            return;
        }

        console.log('Replacing blockchain with the new chain.');
        this.chain = newChain;
    }

}

module.exports = Blockchain;