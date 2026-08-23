import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
    return (
        <div className="app-layout">
            <Header />

            <main className="app-content">
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default Layout;