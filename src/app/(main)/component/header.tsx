import { Button } from '@/components/ui/button';

const MainHeader = () => {
  return (
    <header className="flex flex-col gap-4 desktop:flex-row items-center justify-between py-6 px-8 border-b border-zinc-600">
      <ul className="flex text-white gap-5">
        <li className="text-base desktop:text-2xl font-semibold cursor-pointer">Cryptocurrencies</li>
        <li className="text-base desktop:text-2xl font-semibold cursor-pointer">DexScan</li>
        <li className="text-base desktop:text-2xl font-semibold cursor-pointer">Exchanges</li>
        <li className="text-base desktop:text-2xl font-semibold cursor-pointer">Community</li>
        <li className="text-base desktop:text-2xl font-semibold cursor-pointer">Products</li>
      </ul>
      <div className="flex gap-5 w-full desktop:w-fit">
        <label className="w-full grow-1 desktop:min-w-[250px] bg-gray-700  rounded-xx-sm">
          <input className="px-3 text-lg text-white w-full h-full" placeholder="Search" type="text" />
        </label>
        <Button className="py-2 px-6 rounded-xx-sm w-fit min-w-fit h-fit">Log in</Button>
      </div>
    </header>
  );
};

export default MainHeader;
