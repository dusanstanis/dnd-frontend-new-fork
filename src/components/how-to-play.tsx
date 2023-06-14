import { AiFillHeart, AiOutlineLeft } from "react-icons/ai";
import { BsFillLightningFill, BsStars } from "react-icons/bs";
import { Box } from "./ui/box";

interface IHowToPlayProps {
  onHideHowToPlay: () => void;
  hideText: string;
}

const HowToPlay = ({ onHideHowToPlay, hideText }: IHowToPlayProps) => {
  return (
    <div className="flex gap-8 flex-col items-center justify-center mt-8">
      <div
        className="cursor-pointer flex gap-1 items-center text-lg font-medium tracking-[0.08em] uppercase"
        onClick={onHideHowToPlay}
      >
        <AiOutlineLeft className="inline-block" /> {hideText}
      </div>
      <div className="w-fit">
        <Box
          title="HOW TO PLAY"
          className="tracking-wider flex flex-row gap-12 items-start justify-center min-h-0 flex-1 px-12 py-8"
        >
          <div className="w-[444px] flex flex-col gap-5">
            <p className="tracking-widest font-semibold text-2xl uppercase border-b border-b-tomato w-fit">
              Quick guide
            </p>
            <p className="text-lg leading-6">
              🎲 The game consists of a <b>maximum of 8 turns</b>. The turns alternate between{" "}
              <b>preparation turns</b> and <b>free will turns</b>.
              <br />
              <br />
              🛡️ The preparation turn is the turn in which{" "}
              <b>you have the opportunity to manipulate the stats of your champions</b>. At this
              time you are shown what you can do, and the AI will interpret it as it sees fit for
              your adventure.
              <br />
              <br />
              🤞🏻 After selecting your action, <b>click roll and cross your fingers!</b>
              <br />
              <br />
              ✍🏻 After that turn comes the time when your creativity is most needed: the free will
              turn. <b>You can write whatever you want</b>.
              <br />
              <br />
              📜 <b>Your creativity + your role + the AI&apos;s humor</b> will propel the story
              forward
            </p>
          </div>

          <div className="border-l border-l-white/20 h-full" />

          <div className="w-[770px] flex flex-col">
            <p className="font-semibold text-2xl uppercase border-b border-b-tomato w-fit tracking-widest">
              Movement probabilities
            </p>
            <p className="font-semibold text-lg mt-4">PREPARATION TURNS</p>
            <p className="text-lg mt-2">
              Depending of what action you choose, the total dice value will have a different effect
              on your champion stats.
            </p>
            <table className="w-full mt-2 font-normal">
              <thead>
                <tr className="text-center bg-white/25">
                  <th className="text-left px-3 py-2 border-b border-b-white/25">Dice total</th>
                  {["2 to 6", "7 or 8", "9 or 10", "11 or 12"].map((value, index) => (
                    <th
                      key={index}
                      className="border-l border-l-white/25 border-b border-b-white/25 px-3 py-2"
                    >
                      {value}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white/20">
                <tr className="text-center">
                  <td className="text-left px-3 py-2 border-b border-b-white/25">
                    Try to heal yourself
                  </td>
                  {["-2", "+1", "+2", "+3"].map((value, index) => (
                    <td
                      key={index}
                      className="border-l border-l-white/25 border-b border-b-white/25"
                    >
                      <div className="flex flex-row items-center justify-center gap-2">
                        <p>{value}</p>
                        <AiFillHeart />
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="text-center">
                  <td className="text-left px-3 py-2 border-b border-b-white/25">
                    Try to find something useful
                  </td>
                  {["-2", "+1", "+2", "+3"].map((value, index) => (
                    <td
                      key={index}
                      className="border-l border-l-white/25 border-b border-b-white/25"
                    >
                      <div className="flex flex-row items-center justify-center gap-2">
                        <p>{value}</p>
                        {index === 0 ? <AiFillHeart /> : <BsStars />}
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="text-center">
                  <td className="text-left px-3 py-2 border-b border-b-white/25">
                    Talk with the team
                  </td>
                  <td className="border-l border-l-white/25 border-b border-b-white/25">
                    <div className="flex flex-row items-center justify-center gap-2">
                      <p>-1</p>
                      <BsFillLightningFill />
                    </div>
                  </td>
                  <td className="border-l border-l-white/25 border-b border-b-white/25" colSpan={3}>
                    <div className="flex flex-row items-center justify-center gap-2">
                      <p>+1</p>
                      <BsFillLightningFill />
                    </div>
                  </td>
                </tr>

                <tr className="text-center">
                  <td className="text-left px-3 py-2">Take a rest</td>
                  <td className="border-l border-l-white/25" colSpan={4}>
                    No effect on your stats
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="font-semibold text-lg mt-8 tracking-widest">FREE WILL TURNS</p>
            <p className="text-lg mt-2">
              Despite what you decide, the total dice value will have an effect on your champion
              stats.
            </p>

            <table className="w-full mt-2 font-normal table-fixed">
              <thead>
                <tr className="text-center bg-white/25">
                  <th className="text-left px-3 py-2 border-b border-b-white/25">Dice total</th>
                  {["2 to 6", "7 to 12"].map((value, index) => (
                    <th
                      key={index}
                      className="border-l border-l-white/25 border-b border-b-white/25 px-3 py-2"
                    >
                      {value}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white/20">
                <tr className="text-center">
                  <td className="text-left px-3 py-2 border-b border-b-white/25">
                    Try to find something useful
                  </td>
                  {["-2", "+1"].map((value, index) => (
                    <td
                      key={index}
                      className="border-l border-l-white/25 border-b border-b-white/25"
                    >
                      <div className="flex flex-row items-center justify-center gap-2">
                        <p>{value}</p>
                        {index === 0 ? <AiFillHeart /> : <BsStars />}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default HowToPlay;