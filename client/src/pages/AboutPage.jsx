function AboutPage() {
  return (
    <div className="container page-section">
      <div className="section-heading">
        <p className="eyebrow eyebrow-dark">Our story</p>
        <h1>Bringing wholesome products from farmers to homes</h1>
      </div>

      <div className="story-grid">
        <div className="story-card">
          <h3>Our Journey</h3>
          <p>Starting from 1992, our work has centered on connecting families with honest, nourishing products from trusted agricultural sources.</p>
        </div>
        <div className="story-card">
          <h3>Our Mission</h3>
          <p>To make natural, high-quality products accessible while supporting mindful living and healthier everyday routines.</p>
        </div>
        <div className="story-card">
          <h3>Our Vision</h3>
          <p>To create a future where wholesome nutrition, wellness, and sustainability are part of everyday life.</p>
        </div>
      </div>

      <div className="timeline">
        <div className="timeline-item">
          <span>1992</span>
          <div>
            <h4>Beginning</h4>
            <p>The journey began with a belief in bringing nature-first products to everyday homes.</p>
          </div>
        </div>
        <div className="timeline-item">
          <span>2005</span>
          <div>
            <h4>Growing trust</h4>
            <p>Our focus expanded to premium natural food and wellness essentials.</p>
          </div>
        </div>
        <div className="timeline-item">
          <span>Today</span>
          <div>
            <h4>Farm to home</h4>
            <p>We continue to curate healthy and vibrant choices for modern lifestyles.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
