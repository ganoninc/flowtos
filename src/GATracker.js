import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

function GATracker(props) {
  const location = useLocation();
  const trackPage = (page) => {
    ReactGA.send({ hitType: "pageview", page: page });
  };

  useEffect(() => trackPage(location.pathname), [location]);

  return props.children;
}

export default GATracker;
