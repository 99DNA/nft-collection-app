import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import React from "react";
import { CONTRACT_ADDRESS } from "../../constants/address";
import styles from "../../styles/Home.module.css";

export default function Profile() {
  const address = useAddress();
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: ownedNFTs, isLoading: isOwnedNFTsLoading } = useOwnedNFTs(
    contract,
    address,
  );

  return (
    <div className={styles.container}>
      {address ? (
        <div>
          <div>
            <h1>Profile</h1>
            <p>Wallet Address: {truncateAddress(address || "")}</p>
          </div>
          <hr />
          <div>
            <h3>My NFTs:</h3>
            <div className={styles.grid}>
              {!isOwnedNFTsLoading ? (
                ownedNFTs?.length! > 0 ? (
                  ownedNFTs?.map((nft) => (
                    <div key={nft.metadata.id} className={styles.NFTCard}>
                      <ThirdwebNftMedia metadata={nft.metadata} />
                      <h3>{nft.metadata.name}</h3>
                    </div>
                  ))
                ) : (
                  <p>No NFTs owned</p>
                )
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.main}>
          <p>Please connect your wallet</p>
        </div>
      )}
    </div>
  );
}
