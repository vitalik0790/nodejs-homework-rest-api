const SUBSCRIPTION_TYPE = {
  free: "free",
  pro: "pro",
  premium: "premium",
};

const SALT_WORK_FACTOR = 8;

const HTTP_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
  SUBSCRIPTION_TYPE,
  SALT_WORK_FACTOR,
  HTTP_CODE,
};
