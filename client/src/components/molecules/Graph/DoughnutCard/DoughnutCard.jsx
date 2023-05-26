import styles from "./DoughnutCard.module.scss";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { Card } from "@/components/atoms/Card/Card";
import {
    Chart as ChartJS,
    Filler,
    Tooltip,
    Legend
  } from 'chart.js';

  
export const DoughnutCard = ({ title,  data }) => {
    ChartJS.register(
        ArcElement,
        Tooltip,
        Legend,
      )

  return (
    <Card>
      <div className={styles.data_wrapper}>
        <h2 className={styles.title}>{title}</h2>
        <Doughnut data={data} />
      </div>
    </Card>
  );
};

export default DoughnutCard;
