import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public readonly prevHash: string,
    public readonly height: number,
    public readonly data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  // static 함수: 클래스 인스턴스가 없어도 부를 수 있는 함수
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }

  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    else return this.blocks[this.blocks.length - 1].hash;
  }

  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }

  // return type에 readonly를 붙여 보안상의 취약점을 해결했다.
  public getBlocks(): readonly Block[] {
    return this.blocks;
  }
}

const myBlockchain = new Blockchain();
myBlockchain.addBlock("First one");
myBlockchain.addBlock("Second one");
myBlockchain.addBlock("Third one");

// myBlockchain.getBlocks().push(new Block("xxxxx", 11111, "HACKEDDDD"));
console.log(myBlockchain.getBlocks());
