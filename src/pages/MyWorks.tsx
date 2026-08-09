import { Link } from "react-router-dom";
import { config } from "../config";
import "./MyWorks.css";

const MyWorks = () => {
  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          All <span>Works</span>
        </h1>
        <p>A collection of all my projects and creations</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <div className="myworks-card" key={project.id} data-cursor="disable">
            <div className="myworks-card-number">0{index + 1}</div>
            <div className="myworks-card-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="myworks-card-info">
              <h3>{project.title}</h3>
              <p className="myworks-card-category">{project.category}</p>
              <p className="myworks-card-description">{project.description}</p>
              <p className="myworks-card-tech">{project.technologies}</p>
              {(project as any).github && (
                <a
                  href={(project as any).github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="myworks-github-link"
                  data-cursor="disable"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '13px', color: '#aaa', textDecoration: 'none', border: '1px solid #333', borderRadius: '6px', padding: '6px 12px', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#aaa'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#333'; }}
                >
                  View on GitHub →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;
