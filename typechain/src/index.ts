import * as CryptoJS from "crypto-js";

class Block {
  static calculateBlockHash = (
    index: number, 
    prevHash: string, 
    data: string, 
    timestamp: number
  ):string => CryptoJS.SHA256(index + prevHash + timestamp + data).toString();

  static validateStructure = (aBlock:Block):boolean => (
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.prevHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string"
  );

  public index: number;
  public hash: string;
  public prevHash: string;
  public data: string;
  public timestamp: number;

  constructor(index:number, hash:string, prevHash:string, data:string, timestamp:number) {
    this.index = index;
    this.hash = hash;
    this.prevHash = prevHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock:Block = new Block(0, "20220209", "", "first block", 20220209);

let blockchain:Block[] = [genesisBlock];
// blockchain의 타입 : Block의 배열!
// 타입스크립트는 이 배열에 Block만 넣을 수 있도록 해 준다.

const getBlockchain = ():Block[] => blockchain;

const getLatestBlock = ():Block => blockchain[blockchain.length - 1];

const getNewTimestamp = ():number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data:string):Block => {
  const prevBlock:Block =  getLatestBlock();
  const newIndex:number = prevBlock.index + 1;
  const newTimestamp:number = getNewTimestamp(); 
  const newHash:string = Block.calculateBlockHash(
    newIndex,
    prevBlock.hash,
    data,
    newTimestamp
  );
  const newBlock:Block = new Block(
    newIndex, 
    newHash, 
    prevBlock.hash, 
    data, 
    newTimestamp);
  addBlock(newBlock);
  return newBlock;
};

const getHashforBlock = (aBlock:Block):string => 
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.prevHash,
    aBlock.data,
    aBlock.timestamp
  );

const isBlockValid = (candidateBlock:Block, prevBlock:Block):boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (prevBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (prevBlock.hash !== candidateBlock.prevHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock:Block):void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

export {};
// TS 법칙 : 이 파일이 모듈이 될 수 있도록 무언가를 export 해야 한다 ..?
// 이것을 안 해주면 변수 선언을 할 떄 에러가 뜬다 .. 