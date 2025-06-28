// トップページ

import Balance from "./components/Balance";
import Income from "./components/Income";
import Savings from "./components/Savings";
import Acounts from './components/Acounts';
import Chart from "./components/Chart";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-50 p-4 bg-gray-100 bg-[url('/background.png')] bg-no-repeat bg-cover">
      <Balance />
      <Income />
      <Savings />
      <Chart />
      <Acounts />
    </main>
  );
}
