var prepareData = {
  create: (params, req) => {
    return params;
  },
  find: (params, req) => {
    params.isDeleted = false;
    return params;
  },
};

module.exports = prepareData;
