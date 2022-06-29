import PageNav from "./PageNav/PageNav";
import { useSelector } from "react-redux";


export default function Layout({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.username);

  return (
    <div className="layout">
      <PageNav isAuthenticated={isAuthenticated} username={username} />
      {children}
    </div>
  );
}
