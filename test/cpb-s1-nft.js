const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("cpb nft s1 test", function () {
  it("deploy", async function () {
    const provider = waffle.provider;
    const [deployer, user] = provider.getWallets();

    //NFT 배포
    const CPB1 = await ethers.getContractFactory("nft/CelebPhotoBooksSeason1");
    const cpb = await CPB1.deploy("https://test.com/");
    await cpb.deployed();

  });
});
