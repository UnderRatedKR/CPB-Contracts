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
Baobab : `0xF2e4dE8dC9ABD2E7bB83c60A2119150EF4cc32B6`
Cypress : 
ABI : ./abi/CPB_S1_Ahrin.json
```