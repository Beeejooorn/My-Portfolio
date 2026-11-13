import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigation } from "react-router";
import styles from "./RouteReveal.module.css";

export function RouteReveal() {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const previousPath = useRef(pathname);
  const announcement = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (previousPath.current !== pathname && announcement.current) {
      announcement.current.textContent = document.title;
      previousPath.current = pathname;
    }
  }, [pathname]);

  // Keep main and footer as siblings and the preview's positioning viewport intact.
  return (
    <>
      <span
        ref={announcement}
        className={styles.announcement}
        aria-live="polite"
        aria-atomic="true"
        data-leaving={Boolean(
          navigation.location && navigation.location.pathname !== pathname,
        )}
      />
      <Outlet />
    </>
  );
}
