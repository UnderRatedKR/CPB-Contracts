// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../openzeppelin-contracts/access/Ownable.sol";

contract SaleForERC721 is Ownable{

    event setSaleStatus(uint256 status);

    enum SaleState {
        NOT_STARTED,
        IN_PROGRESS,
        PAUSED,
        COMPLETED
    }

    SaleState public saleState;
    uint256 public salePrice; //wei or peb
    
    constructor (uint256 _salePrice) public {
        salePrice = _salePrice;
        saleState = SaleState.NOT_STARTED;
    }

    function setSalePrice(uint256 _salePrice) public onlyOwner {
        salePrice = _salePrice;
    }

    function setSaleNotStarted(uint256 _salePrice) public onlyOwner {
        saleState = SaleState.NOT_STARTED;
    }

    function setSaleInProgress(uint256 _salePrice) public onlyOwner {
        saleState = SaleState.IN_PROGRESS;
    }

    function setSalePaused(uint256 _salePrice) public onlyOwner {
        saleState = SaleState.PAUSED;
    }

    function setSaleCompleted(uint256 _salePrice) public onlyOwner {
        saleState = SaleState.COMPLETED;
    }


/*

    function setSaleToken(address _token) public onlyOwner {
        SaleToken = _token;
    }*/

}
    