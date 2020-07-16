<template>
  <div>
    <sidebar>
      <div>
        <div class="table-container">
          <table class="table custom-table">
            <thead class="has-background-primary">
              <tr>
                <th>
                  <span>SN</span>
                  <span class="iconify" data-icon="bx:bx-sort" data-inline="false"></span>
                </th>
                <th>
                  <span>Name</span>
                  <span class="iconify" data-icon="bx:bx-sort" data-inline="false"></span>
                </th>
                <th>
                  <span>Class</span>
                  <span class="iconify" data-icon="bx:bx-sort" data-inline="false"></span>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Name</td>
                <td>12</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </sidebar>
  </div>
</template>
<script>
export default {
  data: () => ({
    data: "Hello World"
  })
};
</script>

<style lang="scss">
.custom-table {
  width: 100%;
  thead {
    tr {
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
}
.table-container .table thead {
  background-color: rebeccapurple;
}
</style>