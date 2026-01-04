import { Line, Pie } from "@ant-design/charts";
import React from "react";

const Charts = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type === "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });
  
  let finalSpendings = spendingData.reduce((acc, obj)=>{
    let key = obj.tag;
    if(!acc[key]){
      acc[key]={tag:obj.tag, amount: obj.amount}
    }else {
      acc[key].amount += obj.amount;
    }
    return acc;
  },{})

  const config = {
    data,
    xField: "date",
    yField: "amount",
    autoFit: true,
  };

  const spendingConfig = {
    data: Object.values(finalSpendings),
    angleField: "amount",
    colorField: "tag",
  };

  return (
    <div className="charts-wrapper">
      <div>
        <h2>Your Analytics</h2>
        <Line {...config} />
      </div>
      <div>
        <h2>Your Spendings</h2>
        <Pie {...spendingConfig} />
      </div>
    </div>
  );
};

export default Charts;
