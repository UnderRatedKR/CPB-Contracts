const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("cpb nft s1 test", function () {
  it("deploy", async function () {
    const provider = waffle.provider;
    const [deployer, user] = provider.getWallets();

    //NFT 배포
    const CPB1 = await ethers.getContractFactory("CPB_S1");
    const cpb = await CPB1.deploy("https://test.com/");
    await cpb.deployed();

    let reserve = []

    for (let i = 0; i < 200; i ++) {
      reserve.push(deployer.address);
    }

    await cpb.safeBatchMint(reserve);
    expect(await cpb.totalSupply()).to.be.equal(200);

    /*
    //1200개까지만 발행되는지 테스트
    await cpb.safeBatchMint(reserve);
    await cpb.safeBatchMint(reserve);
    await cpb.safeBatchMint(reserve);
    await cpb.safeBatchMint(reserve);
    await cpb.safeBatchMint(reserve);
    expect(await cpb.totalSupply()).to.be.equal(1200);
    expect(await cpb.tokenURI(1200)).to.be.equal("https://test.com/1200");
    await expect(cpb.safeMint(deployer.address)).to.be.revertedWith("exceeded max Supply.");
    */


  });
});
