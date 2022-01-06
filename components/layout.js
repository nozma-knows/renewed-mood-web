/* eslint-disable @next/next/no-sync-scripts */
import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <div className="view">
      <head>
        <script src="https://cloud.tinymce.com/5/tinymce.min.js?apiKey=557orht9x0azyresgi1j7dw1j76vgadbnkbj5bihrzon3r98"></script>
      </head>
      <Navbar />
      <div className="content-container">
        <div className="content">{children}</div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
