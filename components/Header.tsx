import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";

import {
  BellIcon,
  ChevronDownIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

type Props = {};

const Header = ({}: Props) => {
  const connectToMetamask = useMetamask();
  const disconnectMetamask = useDisconnect();
  const address = useAddress();
  console.log(`add...: ${address}`);
  return (
    <div className="max-w-6xl mx-auto p-2">
      <nav className="flex justify-between ">
        <div className="flex items-center space-x-2 text-sm">
          {address ? (
            <button className="btnConnectWallet" onClick={disconnectMetamask}>
              Hi {`${address.slice(0, 5)}...${address.slice(-4)}`}
            </button>
          ) : (
            <button
              className="btnConnectWallet"
              onClick={() => connectToMetamask()}
            >
              Connect your wallet
            </button>
          )}

          <p className="headerLink">Daily Deals</p>
          <p className="headerLink">Help & Contact</p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="headerLink">Ship to</p>
          <p className="headerLink">Sell</p>
          <p className="headerLink">Whatchlist</p>
          <Link
            href="/addItem"
            className="flex items-center hover:linkHovered font-bold"
          >
            Add to Inventory <ChevronDownIcon className="h-4 ml-1" />
          </Link>

          <BellIcon className="h-6 w-6" />
          <ShoppingCartIcon className="h-6 w-6" />
        </div>
      </nav>

      <hr className="mt-2" />

      <section className="flex items-center py-5 space-x-2">
        <div className="h-16 w-16 sm:w-28 md:w-44 flex-shrink-0">
          <Link href="/" className="cursor-pointer">
            <Image
              className="h-full w-f object-contain"
              alt="ebay logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/300px-EBay_logo.svg.png?20120914082210"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <button className="hidden lg:flex items-center space-x-2 w-20 ">
          <p className="text-gray-600 text-sm">Shop By Category</p>
          <ChevronDownIcon className="h-4 flex-shrink-0" />
        </button>
        <div className="flex items-center space-x-2 px-2 md:px-5 py-2 border-black border-2 flex-1 rounded-md ml-2 ">
          <MagnifyingGlassIcon className="w-5 text-gray-400" />
          <input
            placeholder="Search for anything"
            type="text"
            className="flex-1 outline-none "
          />
        </div>
        <button className="hidden sm:inline bg-blue-600 text-white px-5 md:px-10 py-2 border-2 border-blue-600">
          Search
        </button>
        <Link href="/create">
          <button className="inline border-2 border-blue-600 px-5 md:px-10 py-2 text-blue-600 hover:bg-blue-600/50 hover:text-white cursor-pointer transition-all">
            List item
          </button>
        </Link>
      </section>

      <hr className="mt-2" />

      <section className="flex py-3 space-x-6 text-xs md:text-sm whitespace-nowrap justify-center font-bold">
        <p className="linkHovered">Home</p>
        <p className="linkHovered">Electronics</p>
        <p className="linkHovered">Computer</p>
        <p className="linkHovered hidden sm:inline">Video Games</p>
        <p className="linkHovered hidden sm:inline">Home & Garden</p>
        <p className="linkHovered hidden md:inline">Health & Beauty</p>
        <p className="linkHovered hidden lg:inline">Collectibles and Art</p>
        <p className="linkHovered hidden lg:inline">Books</p>
        <p className="linkHovered hidden lg:inline">Music</p>
        <p className="linkHovered hidden xl:inline">Deals</p>
        <p className="linkHovered hidden xl:inline">Other</p>
        <p className="linkHovered">More</p>
      </section>
    </div>
  );
};
export default Header;
