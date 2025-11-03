// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title SimpleNFT
 * @dev A basic NFT with minting and metadata functionality
 */
contract SimpleNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    
    // State variables
    Counters.Counter private _tokenIdCounter;
    uint256 public maxSupply;
    uint256 public mintPrice;
    bool public isPaused;
    string private _baseTokenURI;
    
    // Events
    event NFTMinted(address indexed to, uint256 indexed tokenId);
    event BaseURIUpdated(string newBaseURI);
    event MintPriceUpdated(uint256 newPrice);
    event ContractPaused(bool paused);
    
    /**
     * @dev Constructor to initialize the NFT collection
     * @param name_ Name of the NFT collection
     * @param symbol_ Symbol of the NFT collection
     * @param maxSupply_ Maximum number of tokens that can be minted
     * @param mintPrice_ Price to mint one NFT (in wei)
     * @param baseURI_ Base URI for token metadata
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 maxSupply_,
        uint256 mintPrice_,
        string memory baseURI_
    ) ERC721(name_, symbol_) {
        maxSupply = maxSupply_;
        mintPrice = mintPrice_;
        _baseTokenURI = baseURI_;
        isPaused = false;
    }
    
    /**
     * @dev Mint a new NFT
     * @return The token ID of the newly minted NFT
     */
    function mint() public payable returns (uint256) {
        require(!isPaused, "Minting is paused");
        require(msg.value >= mintPrice, "Insufficient payment");
        require(_tokenIdCounter.current() < maxSupply, "Max supply reached");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        
        emit NFTMinted(msg.sender, tokenId);
        return tokenId;
    }
    
    /**
     * @dev Owner can mint NFTs for free (for airdrops, team allocation, etc.)
     * @param to Address to mint the NFT to
     * @return The token ID of the newly minted NFT
     */
    function ownerMint(address to) public onlyOwner returns (uint256) {
        require(_tokenIdCounter.current() < maxSupply, "Max supply reached");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        
        emit NFTMinted(to, tokenId);
        return tokenId;
    }
    
    /**
     * @dev Batch mint multiple NFTs to a single address
     * @param to Address to mint the NFTs to
     * @param quantity Number of NFTs to mint
     */
    function batchMint(address to, uint256 quantity) public onlyOwner {
        require(_tokenIdCounter.current() + quantity <= maxSupply, "Would exceed max supply");
        
        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(to, tokenId);
            emit NFTMinted(to, tokenId);
        }
    }
    
    /**
     * @dev Get the current total supply of minted tokens
     * @return The number of tokens minted so far
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    /**
     * @dev Update the base URI for token metadata
     * @param newBaseURI New base URI
     */
    function setBaseURI(string memory newBaseURI) public onlyOwner {
        _baseTokenURI = newBaseURI;
        emit BaseURIUpdated(newBaseURI);
    }
    
    /**
     * @dev Update the mint price
     * @param newPrice New mint price in wei
     */
    function setMintPrice(uint256 newPrice) public onlyOwner {
        mintPrice = newPrice;
        emit MintPriceUpdated(newPrice);
    }
    
    /**
     * @dev Pause or unpause minting
     * @param paused True to pause, false to unpause
     */
    function setPaused(bool paused) public onlyOwner {
        isPaused = paused;
        emit ContractPaused(paused);
    }
    
    /**
     * @dev Withdraw contract balance to owner
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }
    
    /**
     * @dev Get the base URI for token metadata
     * @return Base URI string
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }
    
    /**
     * @dev Check if a token exists
     * @param tokenId Token ID to check
     * @return True if token exists, false otherwise
     */
    function exists(uint256 tokenId) public view returns (bool) {
        return _exists(tokenId);
    }
    
    /**
     * @dev Get all token IDs owned by an address
     * @param owner Address to query
     * @return Array of token IDs
     */
    function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        uint256 index = 0;
        
        for (uint256 tokenId = 0; tokenId < _tokenIdCounter.current(); tokenId++) {
            if (_exists(tokenId) && ownerOf(tokenId) == owner) {
                tokenIds[index] = tokenId;
                index++;
            }
        }
        
        return tokenIds;
    }
    
    /**
     * @dev Receive function to accept ETH
     */
    receive() external payable {}
    
    /**
     * @dev Fallback function
     */
    fallback() external payable {}
}

