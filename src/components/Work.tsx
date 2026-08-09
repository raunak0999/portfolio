import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    if (window.innerWidth <= 768) return;

    let timeline: gsap.core.Timeline;

    function getTotalScrollWidth(): number {
      const boxes = document.getElementsByClassName("work-box");
      if (boxes.length === 0) return 0;
      const firstBox = boxes[0] as HTMLElement;
      const containerEl = document.querySelector(".work-container")!;
      const containerLeft = containerEl.getBoundingClientRect().left;
      const boxWidth = firstBox.getBoundingClientRect().width;
      const parentWidth = firstBox.parentElement!.getBoundingClientRect().width;
      const padding = parseInt(window.getComputedStyle(firstBox).padding) / 2;
      return boxWidth * boxes.length - (containerLeft + parentWidth) + padding;
    }

    function init() {
      ScrollTrigger.getById("work")?.kill();
      timeline?.kill();

      const scrollWidth = getTotalScrollWidth();
      if (scrollWidth <= 0) return;

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${scrollWidth}`,
          // scrub: true = 1:1 sync with scroll position, no lerp lag
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          id: "work",
          invalidateOnRefresh: true,
        },
      });

      timeline.to(".work-flex", {
        x: -scrollWidth,
        ease: "none",
      });

      ScrollTrigger.refresh();
    }

    // Delay to let images paint and layout settle
    const timer = setTimeout(init, 500);

    const onResize = () => {
      clearTimeout(timer);
      setTimeout(init, 300);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      timeline?.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {config.projects.slice(0, 5).map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.technologies}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} link={(project as any).github} />
            </div>
          ))}
          {/* See All Works Button */}
          <div className="work-box work-box-cta">
            <div className="see-all-works">
              <h3>Want to see more?</h3>
              <p>Explore all of my projects and creations</p>
              <Link to="/myworks" className="see-all-btn" data-cursor="disable">
                See All Works →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
