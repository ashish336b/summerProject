<template>
  <adminSidebar>
    <div class="customer-details mx-2 px-2">
      <div class="columns is-multiline">
        <div class="column is-10">
          <div class="has-text-primary is-size-4">Customer Details</div>
        </div>
        <div class="column is-2">
          <button class="button is-info">Add Invoice</button>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-4">
          <div class="field">
            <label class="label is-small">Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Name" />
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label class="label is-small">Address</label>
            <div class="control">
              <input class="input" type="text" placeholder="Address" />
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label class="label is-small">PhoneNumber</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Phone Number"
                ref="phoneNumber"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column">
          <div class="is-size-4 has-text-info">Order Details</div>
        </div>
      </div>
      <div class="order-details table-container">
        <table class="table is-striped is-fullwidth">
          <thead>
            <th>Sn</th>
            <th>ProductName</th>
            <th>quantity</th>
            <th>Rate</th>
            <th>discount %</th>
            <th>total</th>
            <th>Action</th>
          </thead>
          <tbody>
            <th>1</th>
            <th>Wai Wai</th>
            <th>1</th>
            <th>25</th>
            <th>10%</th>
            <th>100</th>
            <th></th>
          </tbody>
        </table>
      </div>
      <div class="columns is-multiline">
        <div class="column is-4">
          <div class="field">
            <label class="label is-small">Product Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Product Name"
                ref="productName"
              />
            </div>
          </div>
        </div>
        <div class="column is-1">
          <div class="field">
            <label class="label is-small">Qty</label>
            <div class="control">
              <input class="input" type="number" placeholder="0" />
            </div>
          </div>
        </div>
        <div class="column is-1">
          <div class="field">
            <label class="label is-small">Rate</label>
            <div class="control">
              <input class="input" type="number" placeholder="0" />
            </div>
          </div>
        </div>
        <div class="column is-1">
          <div class="field">
            <label class="label is-small">Total</label>
            <div class="control">
              <input class="input" type="number" placeholder="0" />
            </div>
          </div>
        </div>
        <div class="column is-1">
          <div class="field">
            <label class="label is-small">Discount %</label>
            <div class="control">
              <input class="input" type="number" placeholder="0" />
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="field">
            <label class="label is-small">Total Adj</label>
            <div class="control">
              <input class="input" type="number" placeholder="0" />
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="action mt-5">
            <button class="button is-primary">Add</button>
          </div>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-8"></div>
        <div class="column is-3">
          <div class="field">
            <label class="label is-small">Grand Total</label>
            <div class="control">
              <input class="input" type="number" placeholder="0" />
            </div>
          </div>
        </div>
        <div class="column is-1"></div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-8"></div>
        <div class="column is-3">
          <div class="field">
            <label class="label is-small">Adjust Amount</label>
            <div class="control">
              <input class="input" type="number" placeholder="0" />
            </div>
          </div>
        </div>
        <div class="column is-1"></div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-8"></div>
        <div class="column is-3">
          <div class="field">
            <label class="label is-small">NetTotal</label>
            <div class="control">
              <input class="input" type="number" placeholder="0" />
            </div>
          </div>
        </div>
        <div class="column is-1"></div>
      </div>
    </div>
  </adminSidebar>
</template>

<script>
export default {};
</script>

<style>
</style>