# SimpleNFT Contract

A straightforward NFT collection contract that lets you create and manage digital collectibles.

---

**Getting Started:** When deploying, you'll set your collection name, symbol, maximum supply, mint price, and where your NFT artwork/metadata is stored.

---

**How People Mint:** Anyone can mint an NFT by calling `mint()` and sending the required payment. The minting process checks that minting is active and the collection hasn't sold out.

---

**Managing Your Collection:** As the creator, you can send NFTs to specific addresses with `batchMint()`, collect payments with `withdraw()`, pause or resume minting with `setPaused()`, adjust the mint price with `setMintPrice()`, and update your metadata location with `setBaseURI()`.

---

**Checking Collection Info:** Use `totalSupply()` to see how many NFTs have been minted, and `tokensOfOwner()` to see all NFTs owned by any address.
