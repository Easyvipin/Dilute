const { parse } = require("graphql");
const { flatMap, get } = require("lodash");
const jwt = require("jsonwebtoken");
const { PUBLIC_QUERIES, RESTRICTED_QUERIES } = require("./constants");

const isAuthenticated = (req, res, next) => {
  try {
    const operationName = req.body.operationName;
    const parsedQuery = parse(req.body.query);

    // continue if it is Introspection query
    console.log(operationName);
    if (operationName === "IntrospectionQuery") {
      return next();
    }

    const getQueryNamesFromSelectionSet = (def) =>
      def.selectionSet.selections.map((selection) => ({
        operationType: def.operation,
        queryName: selection.name.value,
      }));

    let queries = flatMap(
      parsedQuery.definitions,
      getQueryNamesFromSelectionSet
    );

    if (queries) {
      if (isPublic(queries[0].operationType, queries[0].queryName)) {
        console.log("asdsdsd");
        return next();
      } else if (isRestricted(queries[0].operationType, queries[0].queryName)) {
        console.log("restricted");
        res.status(401).send({
          error: "You dont have a permission to access this",
        });
      } else {
        return next();
      }
    }

    /* if (!req.headers.authorization) {
      console.log("not found!!");
      res.json({ error: "Header invalid" });
    } */
    /*   let authorization = req.headers.authorization;
    const decode = jwt.verify(authorization, process.env.JWT_SECRET);
    console.log(decode); */
  } catch (err) {
    throw Error(err);
  }
};

const isRestricted = (operationType, queryName) => {
  console.log(operationType, queryName);
  const item = get(RESTRICTED_QUERIES, `[${operationType}][${queryName}]`);
  return true;
};

const isPublic = (operationType, queryName) => {
  console.log("public", operationType, queryName);
  const item =
    PUBLIC_QUERIES[`${operationType}`]?.whitelist.includes(queryName);
  console.log(item);
  return item;
};

module.exports = {
  isAuthenticated,
};
