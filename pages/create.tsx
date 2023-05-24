import Header from "@/components/Header";
import { COLLECTIONCONTRACT } from "@/utils/constant";
import network from "@/utils/network";
import {
  ListingType,
  MediaRenderer,
  NATIVE_TOKEN_ADDRESS,
  NFT,
  useAddress,
  useContract,
  useCreateAuctionListing,
  useCreateDirectListing,
  useNetwork,
  useNetworkMismatch,
  useOwnedNFTs,
  useSwitchChain,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

type props = {};
type createListingType = {
  listingType: {
    value: string;
  };
  price: { value: string };
};
const Create = ({}: props) => {
  const address = useAddress();
  const router = useRouter();
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "marketplace-v3"
  );
  const { contract: collectionContract } = useContract(
    COLLECTIONCONTRACT,
    "nft-collection"
  );

  const [selectedNFT, setSelectedNFT] = useState<NFT>();

  const networkMismatch = useNetworkMismatch();
  const switchChain = useSwitchChain();

  const ownedNFTs = useOwnedNFTs(collectionContract, address);
  const {
    isError: ownedNFTsIsErr,
    isLoading: ownedNFTsIsLoading,
    data: ownedNFTsData,
  } = ownedNFTs;
  const {
    mutate: createDirectListing,
    isLoading: createDirectListingIsLoading,
    isSuccess: createDirectListingIsSuccess,
    isError: createDirectListingIsError,
    error: createDirectListingError,
  } = useCreateDirectListing(contract);
  const {
    mutate: createAuctionListing,
    isLoading: createAuctionListingIsLoading,
    isSuccess: createAuctionListingIsSuccess,
    isError: createAuctionListingIsError,
    error: createAuctionListingError,
  } = useCreateAuctionListing(contract);

  const handleCreateListing = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (networkMismatch) return switchChain(network);
    if (!selectedNFT) return;

    const target = e.target as typeof e.target & {
      elements: createListingType;
    };
    const { listingType, price } = target.elements;

    debugger;
    if (+listingType.value === ListingType.Direct) {
      createDirectListing(
        {
          assetContractAddress: COLLECTIONCONTRACT,
          tokenId: selectedNFT.metadata.id,
          currencyContractAddress: NATIVE_TOKEN_ADDRESS,
          pricePerToken: price.value,
          startTimestamp: new Date(),
          endTimestamp: new Date(
            new Date().getTime() + 7 * 24 * 60 * 60 * 1000
          ),
          quantity: 1,
          isReservedListing: false,
        },
        {
          onSuccess(data, variables, context) {
            console.log(
              "createDirectListing Success:..",
              data,
              variables,
              context
            );
            router.push("/");
          },
          onError(error, variables, context) {
            console.log(
              "createDirectListing Error:..",
              error,
              variables,
              context
            );
          },
        }
      );
    } else {
      createAuctionListing(
        {
          tokenId: selectedNFT.metadata.id,
          assetContractAddress: COLLECTIONCONTRACT,
          currencyContractAddress: NATIVE_TOKEN_ADDRESS,
          quantity: 1,
          startTimestamp: new Date(),
          buyoutBidAmount: 0.0001,
          minimumBidAmount: 0,
          endTimestamp: new Date(
            new Date().getTime() + 7 * 24 * 60 * 60 * 1000
          ),
        },
        {
          onSuccess(data, variables, context) {
            console.log(
              "createAuctionListing Success:..",
              data,
              variables,
              context
            );
            router.push("/");
          },
          onError(error, variables, context) {
            console.log(
              "createAuctionListing Error:..",
              error,
              variables,
              context
            );
          },
        }
      );
    }
  };

  return (
    <>
      <Header />
      <main className="c-wrapper">
        <section className="c-column">
          <h1 onClick={() => console.log("selectedNFT", selectedNFT)}>
            List an Item
          </h1>
          <h2 className="mb-2">Select an Item you would like to sell</h2>
          <hr className="mb-8" />
          <p className="mb-8">
            Below you will find the NFT's you own in your wallet
          </p>
          {createAuctionListingIsLoading && (
            <h1 className="animate-bounce text-center p-8 font-bold text-4xl text-blue-500">
              create <b>Auction</b> Listing Is Loading...
            </h1>
          )}
          {createDirectListingIsLoading && (
            <h1 className="animate-bounce text-center p-8 font-bold text-4xl text-blue-500">
              create <b>Direct</b> Listing Is Loading...
            </h1>
          )}
          {ownedNFTsIsLoading && (
            <h2 className="animate-bounce text-center p-8">loading...</h2>
          )}
          {ownedNFTsIsErr && (
            <h2 className="text-center text-orange-500 p-8">
              loading NTFs has error...
            </h2>
          )}
          <div className="flex overflow-x-scroll space-x-4 p-4">
            {ownedNFTsData?.map((nft) => (
              <div
                className={`c-card__nfts border-2 ${
                  selectedNFT?.metadata.id === nft.metadata.id &&
                  "border-blue-700"
                }`}
                onClick={() => {
                  setSelectedNFT(nft);
                  console.log({ nft });
                }}
                key={nft.metadata.id}
              >
                <MediaRenderer
                  className="h-48 object-contain mb-6"
                  width="192"
                  height="192"
                  src={nft.metadata.image}
                  alt={nft.metadata.name?.toString()}
                />
                <div className="flex flex-col pt-4 justify-start w-full">
                  <h3 className="font-bold mb-1 truncate">
                    {nft.metadata.name}
                  </h3>
                  <p className="truncate max-w-full">
                    {nft.metadata.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {selectedNFT && (
            <form onSubmit={handleCreateListing} className="flex flex-col">
              <div className="flex flex-col p-10">
                <div className="grid grid-cols-2 gap-5 mb-8">
                  <label
                    htmlFor="select_direct_listing"
                    className="border-r font-light"
                  >
                    Direct Listing / Fixed Price
                  </label>
                  <input
                    type="radio"
                    id="select_direct_listing"
                    name="listingType"
                    value={ListingType.Direct}
                    className="w-10 h-10 ml-auto"
                  />
                  <label
                    htmlFor="select_auction_listing"
                    className="border-r font-light"
                  >
                    Auction English
                  </label>
                  <input
                    type="radio"
                    id="select_auction_listing"
                    name="listingType"
                    value={ListingType.Auction}
                    className="w-10 h-10 ml-auto"
                  />
                  <label htmlFor="price" className="border-r font-light">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="listingType"
                    placeholder="0.05"
                    className="bg-gray-100 p-5 rounded-lg font-bold"
                  />
                </div>

                <button className="rounded-lg c-btn__primary w-full text-2xl transition-all text-center text-white py-5">
                  Create Listing
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </>
  );
};

export default Create;
