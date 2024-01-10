import { useRouteError } from "react-router-dom";

const E404 = () => {
  const error: any = useRouteError();
  return <div>{error.statusText || error.message}</div>;
};

export default E404;
