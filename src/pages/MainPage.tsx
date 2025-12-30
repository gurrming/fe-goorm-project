import CanvasChart from '../components/chart/CanvasChart';
import Chart from '../components/chart/Chart';
export default function MainPage() {
  return (
    <div className="flex justify-center items-center gap-10">
      <Chart />
      <CanvasChart />
    </div>
  );
}
