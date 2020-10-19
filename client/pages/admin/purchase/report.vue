<template>
  <adminSidebar>
    <div class="chart-container">
      <div class="box">
        <div class="has-text-right">
          <div class="select is-small">
            <select @change="change($event)">
              <option value="allTime">Lifetime</option>
              <option value="lastMonth" selected>Last 30 Days</option>
              <option value="lastWeek">Last 7 Days</option>
              <option value="today">Today</option>
            </select>
          </div>
        </div>
        <canvas id="invoice-chart" width="1000" height="250"></canvas>
      </div>
    </div>
    <div class="table-container">
      <div class="box">
        <table
          class="table is-fullwidth has-text-centered is-bordered is-stripped"
        >
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Sales</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(date, index) in [...xLabel].reverse()" :key="index">
              <td scope="row" v-if="timeframe != 'allTime'">
                {{ new Date(date).toDateString().slice(3) }}
              </td>
              <td scope="row" v-else>
                {{ new Date(date).toDateString().slice(4).replace("01", "") }}
              </td>
              <td>
                {{ format([...table.purchaseData].reverse()[index]) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </adminSidebar>
</template>

<script>
import Chart from "chart.js";
export default {
  data: () => ({
    timeframe: "lastMonth",
    purchaseData: [],
    xLabel: [],
    table: {
      purchaseData: "",
    },
  }),
  methods: {
    generateChart: function (timeframe) {
      this.$axios.get(`/crm/report/purchase/${timeframe}`).then((result) => {
        let xLabel = [];
        xLabel = new Set([
          ...result.data.result.map((el) => {
            return new Date(
              timeframe == "allTime" ? `1 ${el.date}` : el.date
            ).toLocaleDateString();
          }),
        ]);
        this.xLabel = [...xLabel].sort((a, b) => {
          return new Date(a) - new Date(b);
        });
        this.purchaseData = this.generateDatarow(result.data.result, timeframe);
        this.table.purchaseData = this.purchaseData;
        this.chart(this.xLabel, this.purchaseData, timeframe);
      });
    },
    change: function (event) {
      this.timeframe = event.target.value;
      this.generateChart(event.target.value);
    },
    format: function (currency) {
      let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NPR",
      });
      return `Rs. ${formatter.format(currency).slice(3)}`;
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
    chart: function (xLabel, purchaseData, timeFrame) {
      Chart.defaults.global.defaultFontFamily = "Nunito";
      Chart.defaults.global.defaultFontColor = "#858796";
      var ctx = document.getElementById("invoice-chart").getContext("2d");
      if (myChart) {
        myChart.destroy();
      }
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: xLabel.map((el) => {
            let label = new Date(el).toDateString().slice(4);
            if (timeFrame == "allTime") {
              label = label.split(" ");
              label.splice(1, 1);
            }
            return label;
          }),
          datasets: [
            {
              label: "Cash Recieved",
              data: purchaseData,
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