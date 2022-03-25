import PageNav from "./PageNav/PageNav";

export default function Layout ({ children }) {
    return (
        <div className="layout">
            <PageNav />
            {children}
        </div>
    );
}