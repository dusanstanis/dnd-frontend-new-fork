import { cn } from "@/utils/style-utils";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";

interface IUploadImageProps {
  image?: string;
  inputFile: React.MutableRefObject<HTMLInputElement | null>;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  defaultImage?: string;
}

const UploadImage = ({ image, inputFile, onClick, defaultImage }: IUploadImageProps) => {
  return (
    <div className="relative h-[250px] w-[250px]">
      <div
        className={cn(
          "absolute h-[250px] w-[250px] bg-black/50 text-white/75 flex flex-col z-10 gap-4 items-center cursor-pointer justify-center hover:bg-black/30",
          image && "bg-black/20",
        )}
        onClick={onClick}
      >
        <input type="file" ref={inputFile} className="hidden" accept="image/*" />
        <FiUpload size={90} />
        <p className="text-xs font-medium tracking-[0.07em] text-center indent-[0.07em] uppercase">
          UPLOAD IMAGE
        </p>
      </div>
      <Image
        src={image || defaultImage || "/images/bg-cover.png"}
        width={250}
        height={250}
        className={cn("h-[250px]", !image && "opacity-40")}
        alt="upload"
      />
    </div>
  );
};

export default UploadImage;
