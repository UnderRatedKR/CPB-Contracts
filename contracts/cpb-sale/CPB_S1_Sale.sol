// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../openzeppelin-contracts/access/Ownable.sol";
import "../openzeppelin-contracts/token/ERC721/ERC721.sol";

contract CPB_S1_Sale is Ownable{

    event SetSaleStatus(uint256 status);
    event SetVault(address vault);

    enum SaleState {
        NOT_STARTED,
        IN_PROGRESS,
        PAUSED,
        COMPLETED
    }

    ERC721 public nft;
    SaleState public saleState;
    uint256 public salePrice; //wei or pebt
    address payable public vault;
    uint256 public saleLimit;
    
    constructor (uint256 _salePrice, ERC721 _nft, uint256 _saleLimit, address _vault) {
        require(_vault != address(0), "vault cannot be assigned with a zero address.");
        
        salePrice = _salePrice;
        saleState = SaleState.NOT_STARTED;
        saleLimit = _saleLimit;
        nft = _nft;
    }

    function setSaleNft(ERC721 _nft) public onlyOwner {
        nft = _nft;
    }

    function setVault(address payable _vault) public onlyOwner {
        vault = _vault;
        emit SetVault(_vault);
    }

    function setSalePrice(uint256 _salePrice) public onlyOwner {
        salePrice = _salePrice;
    }

    function setSaleNotStarted() public onlyOwner {
        saleState = SaleState.NOT_STARTED;
        emit SetSaleStatus(0);
    }

    function setSaleInProgress() public onlyOwner {
        saleState = SaleState.IN_PROGRESS;
        emit SetSaleStatus(1);
    }

    function setSalePaused() public onlyOwner {
        saleState = SaleState.PAUSED;
        emit SetSaleStatus(2);
    }

    function setSaleCompleted() public onlyOwner {
        saleState = SaleState.COMPLETED;
        emit SetSaleStatus(3);
    }
}