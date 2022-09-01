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
    await expect (cpb.totalSupply()).to.be.equal(200);

    


    //nft배포 체크리스트
    //1200번 이상 민팅 안되는지 확인 필요
    //1-1200번 번호 정확하게 민팅 들어가는지, 주소 잘 들어가는지 확인 필요

  });
});
