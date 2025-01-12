import Image from "next/image";

import BuildCommunityFormModal from "./build-community-form-modal";

const BuildCommunity = () => {
  return (
    <div className="relative max-lg:mx-4">
      <div className="absolute inset-0 -z-10 rounded-lg bg-black lg:hidden">
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <Image
            src={"/images/communities-mage.png"}
            alt="wizard"
            width={295}
            height={271}
            className="absolute -top-8 w-full object-cover blur-[2px]"
          />
          <div className="absolute inset-0 rounded-lg bg-black/50 bg-gradient-to-t from-black via-black/90 via-30% to-transparent" />
        </div>
      </div>
      <Image
        src={"/images/communities-mage.png"}
        alt="wizard"
        width={360}
        height={330}
        className="absolute bottom-0 left-0 max-lg:hidden"
      />
      <div className="flex flex-col items-center gap-3 rounded-lg px-4 py-3 lg:flex-row lg:gap-10 lg:bg-black lg:p-6 lg:pl-[360px]">
        <div className="flex shrink-0 flex-col gap-2 leading-snug lg:w-[600px] lg:gap-3">
          <p className="font-light tracking-[2.24px] lg:text-5xl lg:tracking-[4.48px]">
            MORE COMMUNITIES <br /> <span className="font-bold">ARE COMING</span>
          </p>
          <p className="font-light tracking-[1.05px] max-lg:text-sm lg:tracking-[1.2px]">
            Want to create your own? Build amazing adventures and distribute rewards to your
            community?
          </p>
        </div>

        <BuildCommunityFormModal />
      </div>
    </div>
  );
};

export default BuildCommunity;
