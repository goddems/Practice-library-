const PromoBanner = () => {
  return (
    <div className="promo-banner">
      <div className="promo-content">
        <div className="promo-logo">
          КНИГАРНЯ <span className="promo-logo-icon">Є</span>
        </div>
        <div className="promo-text">
          <h2>ДОДАТКОВА</h2>
          <h3 className="promo-subtitle">знижка</h3>
          <div className="promo-discount">
            <span className="promo-minus">-</span>
            <span className="promo-percent">10</span>
            <span className="promo-percent-sign">%</span>
          </div>
          <p className="promo-on">НА КНИГИ</p>
        </div>
        <div className="promo-code">
          <p>ПРОМОКОД</p>
          <h3>APRIL10</h3>
        </div>
      </div>
      <div className="promo-info">
        <span className="promo-badge">5500+ акційних товарів</span>
      </div>
    </div>
  );
};

export default PromoBanner;
