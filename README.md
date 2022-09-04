# CPB-Contracts
Smart Contracts for CPB

```
//After setting the PK for development and testing in the .env file, run the script below

npm install
npx hardhat compile
npx hardhat test

npx hardhat run .\scripts\deploy_CPB_S1_Ahrin.js --network baobab
npx hardhat run .\scripts\deploy_CPB_S1_Ahrin_Sale.js --network baobab

```

## CPB Season 1 Ahrin
```
Name : Ahrin: CelebPhotobooks Season 1
Symbol : CPB
Standard : ERC721
Baobab : `0xD92C7dd14E646203Bfde80f1D627C2c093c60748`
Cypress : `0xc2d60ac0CF0703A475cCd180F52E2c7E61dB5EC5`
ABI : ./abi/CPB_S1_Ahrin.json
```

