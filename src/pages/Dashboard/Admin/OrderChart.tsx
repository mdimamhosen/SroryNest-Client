import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export interface Order {
  _id: string;
  totalPrice: number;
  createdAt: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface OrderChartProps {
  orders: Order[];
}

const OrderChart = ({ orders }: OrderChartProps) => {
  const formattedData = orders.map((order) => {
    const month = new Date(order.createdAt).toLocaleString("default", {
      month: "short",
    });
    return month;
  });

  // Count the number of orders per month
  const orderCounts = formattedData.reduce((acc, month) => {
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const months = Object.keys(orderCounts);
  const counts = Object.values(orderCounts);

  // Chart.js data format
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Orders per Month",
        data: counts,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        fill: true,
      },
    ],
  };

  // Chart options to control size
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // To allow custom height and width
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-64 w-full md:w-1/2 mx-auto mt-10 bg-[#18263d]  p-4 rounded-lg">
      {" "}
      {/* Set the height and width here */}
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default OrderChart;
