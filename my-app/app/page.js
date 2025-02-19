import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[200vh]">
      <section className="min-h-[120vh]">

        <div className="grid grid-cols-2 ">

          <div className="flex gap-5 justify-center flex-col h-[118vh] mx-[6vw]">
            <p className="text-[#D2E823] font-extrabold text-7xl">Everything you are. In one, simple link in bio.</p>
            <p className="text-[#D2E823] text-xl">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
            <div className="input flex gap-5">
              <input type="text" placeholder="linktr.ee/yourname" className="border-2 border-[#D2E823] text-black rounded-md px-12 text-xl py-4" />
              <button className="bg-[#e9c0e9] text-black p-5 rounded-full font-semibold text-lg">Claim your Linktree</button>
            </div>

          </div>
          <div className="flex justify-center items-center">
            <Image src="/image.png" alt="asdfadsf" width={800} height={800} />
          </div>

        </div>


      </section >
      <section className="h-[100vh] bg-red-700">

      </section>
    </div >
  );
}
