<template>
  <div>
    <div class="card table-container">
      <div class="px-3 py-3">
        <div class="card-header pb-2">
          <div class="search-and-select">
            <div class="has-select">
              <span class="pr-1">Show</span>
              <div class="select is-small">
                <select>
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                </select>
              </div>
              <span class="pl-1">Entry</span>
            </div>
            <div class="has-search is-flex">
              <label for class="pr-3">Search</label>
              <input
                class="input is-small"
                type="text"
                v-model="tableData.params.searchedText"
                @keyup="searchData()"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <table class="table is-narrow custom-table">
          <thead class="has-background-dark">
            <tr>
              <th class="sort" v-for="i in columns" :key="i">
                <span>{{i}}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData.data.data" :key="item._id">
              <td>{{item.composition}}</td>
              <td>{{item.group_name ? item.group_name : "none"}}</td>
              <td>{{item.discount_price}}</td>
              <td>{{item.name}}</td>
              <td class="actions">
                <a class="is-white has-text-primary px-2 py-0 mx-0 my-0" @click="hello()">
                  <span class="iconify" data-icon="ant-design:edit-filled" data-inline="false"></span>
                </a>
                <a class="is-white has-text-danger is-medium px-0 py-0 mx-0 my-0">
                  <span class="iconify" data-icon="ant-design:delete-filled" data-inline="false"></span>
                </a>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="1">
                <span>Showing Content 1 of 100</span>
              </td>
              <td colspan="4">
                <div
                  class="pagination is-rounded is-small"
                  role="navigation"
                  aria-label="pagination"
                >
                  <ul class="pagination-list">
                    <li @click="anotherPage(1)">
                      <a
                        class="pagination-link"
                        :class="{'pagination-ellipsis': tableData.data.currentPage == 1}"
                      >First</a>
                    </li>
                    <li @click="anotherPage(tableData.data.prevPage)">
                      <a
                        class="pagination-link"
                        :class="{'pagination-ellipsis': tableData.data.currentPage == 1}"
                      >Prev</a>
                    </li>
                    <li
                      @click="anotherPage(n)"
                      v-for="n in tableData.params.paginationLinks"
                      :key="n"
                    >
                      <a
                        class="pagination-link"
                        :class="{ 'is-current': tableData.params.page === n }"
                        aria-label="Goto page 1"
                      >{{ n }}</a>
                    </li>
                    <li @click="anotherPage(tableData.data.nextPage)">
                      <a
                        class="pagination-next"
                        :class="{'pagination-ellipsis': tableData.data.currentPage == tableData.data.totalNumberOfPage}"
                      >next</a>
                    </li>
                    <li @click="anotherPage(tableData.data.totalNumberOfPage)">
                      <a
                        class="pagination-next"
                        :class="{'pagination-ellipsis': tableData.data.currentPage == tableData.data.totalNumberOfPage}"
                      >Last</a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["columns", "endpoint"],
  data: () => ({
    data: "Hello World",
    tableData: {
      params: {
        page: 1,
        limit: 10,
        sortBy: "name",
        order: "desc",
        searchedText: "",
        totalPage: "",
        paginationLinks: [],
        loading: true
      },
      data: [],
      url: ""
    }
  }),
  methods: {
    anotherPage: function(id) {
      if (!id) return;
      (this.tableData.params.loading = true), (this.tableData.params.page = id);
      this.fetchPage();
    },
    range: function(start, stop, step) {
      var a = [start],
        b = start;
      while (b < stop) {
        a.push((b += step || 1));
      }
      return b > stop ? a.slice(0, -1) : a;
    },
    showPageNumber: function(currentPage, totalPage) {
      this.tableData.params.paginationLinks = [];
      var current = currentPage;
      var pages_to_show = 5;
      var end;
      var start;
      if (totalPage < pages_to_show) {
        start = 1;
        end = totalPage;
      } else {
        if (current > Math.ceil(pages_to_show / 2)) {
          start =
            current - Math.floor(pages_to_show / 2) == 0
              ? 1
              : current - Math.floor(pages_to_show / 2);

          end =
            current + pages_to_show >= totalPage
              ? totalPage
              : current + Math.floor(pages_to_show / 2);
        } else {
          start = 1;
          end = pages_to_show;
        }
        if (end - start < pages_to_show - 1) {
          start = end - (pages_to_show - 1);
        }
      }
      this.tableData.params.paginationLinks = this.range(start, end);
    },
    fetchPage: async function() {
      this.tableData.url =
        this.endpoint +
        `?limit=${this.tableData.params.limit}&page=${this.tableData.params.page}&sortBy=${this.tableData.params.sortBy}&order=${this.tableData.params.order}&searchText=${this.tableData.params.searchedText}`;
      console.log(this.tableData.url);
      var res = await axios.get(this.tableData.url);
      this.showPageNumber(
        this.tableData.params.page,
        res.data.totalNumberOfPage
      );
      this.tableData.data = res.data;
      setInterval(
        function() {
          this.tableData.params.loading = false;
        }.bind(this),
        900
      );
    },
    searchData() {
      this.tableData.params.page = 1;
      this.tableData.params.loading = true;
      this.fetchPage();
    }
  },
  async created() {
    this.fetchPage();
  }
};
</script>

<style lang="scss">
.search-and-select {
  width: 100%;
  display: flex;
  .has-select {
    width: 100%;
  }
}
.custom-table {
  width: 100%;
  thead {
    .sort {
      background-color: rgb(54, 38, 38);
    }
    tr {
      cursor: pointer;
      width: 100%;
      th {
        color: white;
        svg {
          text-align: left;
          cursor: pointer;
        }
      }
    }
  }
  tbody {
    tr {
      td.actions {
        font-size: 1.3rem;
        width: 15%;
      }
    }
  }
  tfoot {
    .pagination-list {
      justify-content: flex-end;
    }
  }
}
</style>