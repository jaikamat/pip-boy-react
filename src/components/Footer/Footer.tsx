import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-item flush-left">HP 90/90</div>
      <div className="footer-item flush-center">
        <div className="level-gauge-container">
          <div>LEVEL 1</div>
          <div className="level-gauge" />
        </div>
      </div>
      <div className="footer-item flush-right">AP 70/70</div>
    </footer>
  );
};

export default Footer;
