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
            <div class="has-search">
              <input class="input is-small" type="text" placeholder="Text input" />
            </div>
          </div>
        </div>
        <table class="table is-narrow custom-table">
          <thead class="has-background-dark">
            <tr>
              <th class="sort" v-for="i in tableData.columns" :key="i">
                <span>{{i}}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in rows" :key="item.sn">
              <td>{{item.sn}}</td>
              <td>{{item.name}}</td>
              <td>{{item.class}}</td>
              <td>{{item.rollNo}}</td>
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
              <td colspan="2">
                <span>Showing Content 1 of 100</span>
              </td>
              <td colspan="3">
                <div
                  class="pagination is-rounded is-small"
                  role="navigation"
                  aria-label="pagination"
                >
                  <ul class="pagination-list">
                    <li>
                      <a class="pagination-link">First</a>
                    </li>
                    <li>
                      <a class="pagination-link">Prev</a>
                    </li>
                    <li>
                      <a class="pagination-link" aria-label="Goto page 1">1</a>
                    </li>
                    <li>
                      <a class="pagination-link" aria-label="Goto page 45">2</a>
                    </li>
                    <li>
                      <a
                        class="pagination-link is-current"
                        aria-label="Page 46"
                        aria-current="page"
                      >3</a>
                    </li>
                    <li>
                      <a class="pagination-link" aria-label="Goto page 47">4</a>
                    </li>
                    <li>
                      <a class="pagination-link" aria-label="Goto page 86">5</a>
                    </li>
                    <li>
                      <a class="pagination-link" aria-label="Goto page 47">Next</a>
                    </li>
                    <li>
                      <a class="pagination-link" aria-label="Goto page 86">Last</a>
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
export default {
  props: ["rows"],
  data: () => ({
    data: "Hello World",
    tableData: {
      columns: ["SN", "Name", "Class", "Roll No", "Action"]
    }
  }),
  methods: {
    hello: function() {
      console.log("hello");
    }
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