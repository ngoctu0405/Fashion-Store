import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
