const getErrorFieldsObject = (errorFields) => {
  const errorFieldsObject = {};

  errorFields.forEach((item) => {
    errorFieldsObject[item.field] = item.message;
  });

  return errorFieldsObject;
};

export const getErrorMessage = (error) => {
  if (!error) return;

  if (!("status" in error)) {
    return error.message;
  }

  if (typeof error.status !== "number") {
    return `${error.status}: ${error.error}`;
  }

  if (error.data && typeof error.data === "object") {
    return "errorFields" in error.data
      ? getErrorFieldsObject(error.data.errorFields)
      : error.data.message 
  } else {
    return error.status === 500 ? "Internal server error" : "An error occured";
  }
};