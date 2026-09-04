import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ScrollControls from "../components/ScrollControls/ScrollControls";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ScrollControls />
    </>
  );
}

export default MainLayout;
