import Header from "@/components/Header";
import { COLLECTIONCONTRACT } from "@/utils/constant";
import { useAddress, useContract } from "@thirdweb-dev/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

type Props = {};

const addItem = ({}: Props) => {
  const address = useAddress();
  const router = useRouter();
  const { contract } = useContract(COLLECTIONCONTRACT, "nft-collection");
  console.log("contract:...", contract);

  const [imageURL, setImageURL] = useState<string>();
  const [image, setImage] = useState<File>();

  const handleMintNFT = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contract || !address)
      return alert(
        "you are not logged in into your wallet or contract not available yet"
      );

    const target = e.target as typeof e.target & {
      itemName: { value: string };
      itemDescription: { value: string };
    };
    const metadata = {
      name: target.itemName.value,
      description: target.itemDescription.value,
      image: image,
    };
    console.log({ metadata });
    try {
      const tx = await contract.mintTo(address, metadata);

      console.log({ tx });
      const receipt = tx.receipt; // the transation receipt
      const tokenId = tx.id; //the id of the NFT minted
      const nft = await tx.data(); // (optional) fetch details of minted NFT
      console.log({ nft });

      router.push("/");
    } catch (err) {
      console.error({ err });
    }
  };
  return (
    <>
      <Header />
      <main className="c-wrapper">
        <div className="c-column border p-10 rounded-sm">
          <h1 className="text-4xl font-bol mb-5">
            Add an item to the marketplace
          </h1>
          <h2 className="text-xl font-semibold">Items Details</h2>
          <p className="mb-4">
            By adding an item to the marketplace, your essentially Minting an
            NFT of iten into your wallet which we can then list for sale
          </p>
          <div className="flex flex-col justify-center md:flex-row md:justify-start">
            <img
              alt="add marketplace token"
              width={320}
              height={320}
              src={imageURL ? imageURL : "https://placehold.co/320x320"}
              className="w-80 h-80 object-contain border-blue-300  mb-8 md:mb-0 md:mr-8"
            />
            <form className="flex flex-col w-full" onSubmit={handleMintNFT}>
              <label htmlFor="itemName" className="mb-2">
                Name of Item
              </label>
              <input
                type="text"
                name="itemName"
                id="itemName"
                placeholder="Name Of Item"
                className="c-form__add--input"
              />
              <label htmlFor="itemDescription" className="mb-2">
                Description
              </label>
              <input
                type="text"
                name="itemDescription"
                id="itemDescription"
                className="c-form__add--input"
                placeholder="Enter Description"
              />
              <label htmlFor="itemImage" className="mb-2">
                Image of Item
              </label>
              <input
                type="file"
                name="itemImage"
                id="itemImage"
                className="mb-5"
                onChange={(e) => {
                  let file = e.target.files?.[0];
                  if (file) {
                    setImageURL(URL.createObjectURL(file));
                    setImage(file);
                  }
                }}
              />

              <button
                type="submit"
                className="c-card__btn c-btn__primary mr-auto"
              >
                Add/Mint Item
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default addItem;
