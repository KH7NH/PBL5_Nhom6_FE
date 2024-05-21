import Footer from "@/components/footer";
import Header from "@/components/header";

/* eslint-disable react/prop-types */
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
