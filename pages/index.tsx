import Header from "@/components/Header";
import { BanknotesIcon, ClockIcon } from "@heroicons/react/24/outline";
import {
  useActiveListings,
  useContract,
  useDirectListings,
  useEnglishAuctions,
  useListingsCount,
} from "@thirdweb-dev/react";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "marketplace-v3"
  );
  const { data: directListings, isLoading: loadingDirectListings } =
    useDirectListings(contract);
  const { data: auctionListings, isLoading: loadingAuctionListings } =
    useEnglishAuctions(contract);

  console.log("directListings...:", directListings);
  console.log("auctionListings...:", auctionListings);

  return (
    <div>
      <Header />
      <main>
        <div className="c-wrapper">
          <div className="c-column">
            {loadingDirectListings || loadingAuctionListings ? (
              <p className="text-center text-blue-500 animate-bounce font-bold text-xl">
                loading...
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-6 ">
                {directListings?.map((listing) => (
                  <div className="c-listCard" key={listing.id}>
                    <Image
                      src={
                        listing.asset.image
                          ? listing.asset.image
                          : "https://placehold.co/200x150"
                      }
                      alt={
                        listing.asset.description
                          ? listing.asset.description
                          : "nft image"
                      }
                      width={200}
                      height={150}
                      className="c-card--image"
                    />
                    <div className="p-2 w-full">
                      <div className="flex flex-col">
                        <h2 className="text-lg truncate font-bold mb-2">
                          {listing.asset.name}
                        </h2>
                        <hr className="mb-2" />
                        <p className="truncate text-sm text-gray-600">
                          {listing.asset.description}
                        </p>
                      </div>
                      <p>
                        <span className="font-bold mr-1">
                          {listing.currencyValuePerToken.displayValue}
                        </span>
                        <span>{listing.currencyValuePerToken.symbol}</span>
                      </p>
                    </div>
                    <div>
                      <button className="c-card__btn o-btn--buy-now">
                        Buy Now
                        <BanknotesIcon className="h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
                {auctionListings?.map((listing) => (
                  <div className="c-listCard" key={`auction_${listing.id}`}>
                    <Image
                      src={
                        listing.asset.image
                          ? listing.asset.image
                          : "https://placehold.co/200x150"
                      }
                      alt={
                        listing.asset.description
                          ? listing.asset.description
                          : "nft image"
                      }
                      width={200}
                      height={150}
                      className="c-card--image"
                    />
                    <div className="p-2 w-full">
                      <div className="flex flex-col">
                        <h2 className="text-lg truncate font-bold mb-2">
                          {listing.asset.name}
                        </h2>
                        <hr className="mb-2" />
                        <p className="truncate text-sm text-gray-600">
                          {listing.asset.description}
                        </p>
                      </div>
                      <p>
                        <span className="font-bold mr-1">
                          {listing.buyoutCurrencyValue.displayValue}
                        </span>
                        <span>{listing.buyoutCurrencyValue.symbol}</span>
                      </p>
                    </div>
                    <div>
                      <button className="c-card__btn o-btn--auction">
                        Auction
                        <ClockIcon className="h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <h1 className={`w-full text-center ${inter.className}`}>
        let's build Ebay o_O
      </h1>
    </div>
  );
}
