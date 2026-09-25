import "./styles/Career.css";
import { config } from "../config";



const Career = () => {
  return (
    <div className="career-section-wrapper" id="career">
      <div className="career-section section-container">
        <div className="career-container">
          <h2>
            My career <span>&</span>
            <br />
            experience
          </h2>
          <div className="career-info">
            <div className="career-timeline">
              <div className="career-dot"></div>
            </div>
            {config.experiences.map((exp, index) => (
              <div key={index} className="career-info-box">
                <div className="career-info-in">
                  <div className="career-role">
                    <h4>{exp.position}</h4>
                    <h5>{exp.company}</h5>
                    <h6 style={{ fontSize: "14px", fontWeight: "400", color: "#888", margin: "5px 0 0 0" }}>{exp.period}</h6>
                  </div>
                </div>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
