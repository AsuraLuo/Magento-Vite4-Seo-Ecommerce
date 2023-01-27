import { useFooter } from "@hooks/Footer";

const Footer = () => {
  const { blocks } = useFooter();

  return (
    <footer>
      <p>Footer</p>
    </footer>
  );
};

export default Footer;
