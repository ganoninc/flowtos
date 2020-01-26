import { useEffect } from "react";
import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";

function GATracker(props) {
  const location = useLocation();
  const trackPage = page => {
    ReactGA.pageview(page);
  };

  useEffect(() => trackPage(location.pathname), [location]);

  return props.children;
}

export default GATracker;
