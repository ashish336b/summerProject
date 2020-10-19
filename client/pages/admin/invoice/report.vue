<template>
  <adminSidebar>
    <div class="chart-container">
      <div class="box">
        <div class="has-text-right">
          <div class="select is-small">
            <select @change="change($event)">
              <option value="allTime">All Time</option>
              <option value="lastMonth">Last 30 Days</option>
              <option value="lastWeek">Last 7 Days</option>
              <option value="today">Today</option>
            </select>
          </div>
        </div>
        <canvas id="invoice-chart" width="1000" height="400"></canvas>
      </div>
    </div>
  </adminSidebar>
</template>

<script>
import Chart from "chart.js";
export default {
  data: () => ({
    timeframe: "lastMonth",
    paidSales: [],
    xLabel: [],
  }),
  methods: {
    generateChart: function (timeframe) {
      this.$axios
        .get(`/crm/report/sales/allSales/${timeframe}`)
        .then((result) => {
          let xLabel = [];
          this.paidSales = result.data.paidSales;
          xLabel = new Set([
            ...result.data.paidSales.result.map((el) => {
              return new Date(
                timeframe == "allTime" ? `1 ${el.date}` : el.date
              ).toLocaleDateString();
            }),
          ]);
          this.xLabel = [...xLabel].sort((a, b) => {
            return new Date(a) - new Date(b);
          });
          this.paidSales = this.generateDatarow(
            result.data.paidSales.result,
            timeframe
          );
          this.chart(this.xLabel, this.paidSales, timeframe);
        });
    },
    change: function (event) {
      this.generateChart(event.target.value);
    },
    generateDatarow: function (array, timeframe) {
      let container = [];
      array.forEach((e) => {
        container[
          new Date(
            timeframe == "allTime" ? `1 ${e.date}` : e.date
          ).toLocaleDateString()
        ] = e.sum;
      });
      let datarow = this.xLabel.map((date) => {
        return container[date]
          ? Number(container[date].replace(/[^0-9.-]+/g, ""))
          : 0;
      });
      return datarow;
    },
    chart: function (xLabel, paidSales, timeFrame) {
      Chart.defaults.global.defaultFontFamily = "Nunito";
      Chart.defaults.global.defaultFontColor = "#858796";
      let ctx = document.getElementById("invoice-chart").getContext("2d");
      let myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: xLabel,
          datasets: [
            {
              label: "Cash Recieved",
              data: paidSales,
              backgroundColor: "rgba(78, 115, 223, 0.05)",
              borderColor: "#28a745",
              pointBackgroundColor: "#28a745",
              pointHoverBackgroundColor: "#28a745",
              pointHoverBorderColor: "#28a745",
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  maxTicksLimit: 15,
                  padding: 10,
                  callback: (value, index, values) => {
                    return "Rs. " + value;
                  },
                  fontFamily: "Arial",
                },
                gridLines: {
                  color: "rgb(234, 236, 244)",
                  zeroLineColor: "rgb(234, 236, 244)",
                  drawBorder: false,
                  borderDash: [2],
                  zeroLineBorderDash: [2],
                },
              },
            ],
          },
        },
      });
    },
  },
  created() {
    this.generateChart("lastMonth");
  },
};
</script>

<style>
</style>