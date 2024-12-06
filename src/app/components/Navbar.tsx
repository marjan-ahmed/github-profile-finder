'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


function Navbar() {
  const [username, setUsername] = useState("");

  const handleSubmit = async (value:string) => {
  const api = `https://api.github.com/users/${username}`;
  const response = await fetch(api);
  const data = await response.json();
  console.log(data);
  }

  const handleClick = () => {
    handleSubmit(username)
  }

  return (
    <>
      <div className="monasans">
        <div className="sm:h-[123vh] h-[98vh] bg-darkblue">
          <nav className="bg-darkblue sm:p-0 p-3">
            <ul className="text-white hidden sm:flex gap-12 p-7 h-20">
              <div>
                <Image
                  src={"/github-white-icon.webp"}
                  alt="github logo"
                  width={30}
                  height={30}
                />
              </div>
              <li>Home</li>
              <li>Search</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
            <div className="flex justify-between mx-1">
              <Sheet>
                <SheetTrigger className="flex sm:hidden">
                  <Menu color="white" />
                </SheetTrigger>
                <SheetContent>
                  <ul className="monasans flex flex-col gap-4 my-6">
                    <Button className="p-6" variant={"secondary"}>
                      <li>Home</li>
                    </Button>
                    <Button className="p-6" variant={"secondary"}>
                      <li>Search</li>
                    </Button>
                    <Button className="p-6" variant={"secondary"}>
                      <li>About</li>
                    </Button>
                    <Button className="p-6" variant={"secondary"}>
                      <li>Contact</li>
                    </Button>
                  </ul>
                </SheetContent>
              </Sheet>
              <div className="block sm:hidden">
                <Image
                  src={"/github-white-icon.webp"}
                  alt="github logo"
                  width={30}
                  height={30}
                />
              </div>
            </div>
          </nav>

          <div className="w-full flex text-white flex-col justify-center items-center mx-0 sm:mx-2 my-6 md:my-20 relative">
  <h1 className="text-center font-extrabold leading-tight text-[36px] md:text-[64px]">
    Discover, Explore, and Connect with <br /> GitHub Profiles in an Instant
  </h1>
  <p className="text-[18px] tracking-wide m-4">
    Join the world’s most widely adopted AI-powered developer platform.
  </p>
  <div className="flex flex-wrap justify-center sm:justify-between gap-2 z-10">
    <div>
      <Input 
        value={username} 
      onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username" 
        className="bg-white text-black shadow-lg shadow-gray-700 w-[350px] p-7 rounded-lg"
      />
    </div>
    <div>
      <button onClick={handleClick} className="bg-[#1a7537] outline-none border-0 hover:bg-[#166630] hover:transition-all p-[14px] rounded-lg mx-[-93px] my-[3px]">Search</button>
    </div>
    <button className="border-2 rounded-lg p-2 px-6 font-bold">
      Try GitHub Copilot
    </button>
  </div>
  <Image
    className="absolute top-[240px] sm:top-[-120px] w-50 h-50 z-0"
    src={"/hero-img.png"}
    alt="hero image"
    width={900}
    height={900}
  />
</div>
</div>
      </div>
    </>
  );
}

export default Navbar;
