import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <div className="view">
      <Navbar />
      <div className="content-container">
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
