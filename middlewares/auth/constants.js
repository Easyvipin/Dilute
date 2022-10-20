const RESTRICTED_QUERIES = {
  query: {
    Topics: {
      groups: ["USER", "ADMIN"],
    },
  },
  mutation: {},
};

const PUBLIC_QUERIES = {
  mutation: {
    whitelist: ["signup", "signin"],
  },
};

module.exports = {
  RESTRICTED_QUERIES,
  PUBLIC_QUERIES,
};
