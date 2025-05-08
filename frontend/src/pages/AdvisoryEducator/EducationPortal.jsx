import '../../styles/Educator/pages/Portal.css';
import PortalLogoBar from '../../components/PortalLogoBar.jsx';
import Chart from '../../components/Educator/Chart.jsx';
import Classroom from '../../components/Educator/Classroom.jsx';
import useEducationPortal from "./EducatorPortalLogic.js";

const EducationPortal = () => {
  const {
    activeClassroom,
    setActiveClassroom,
    classrooms,
    classroomStat
  } = useEducationPortal();

  return (
      <div className="container">
        <PortalLogoBar />

        <div className="main">
          <p className="title">Classroom at a Glance</p>

          <div className="content">
            <div className="gap45">
              <Classroom
                  classrooms={classrooms}
                  activeClassroom={activeClassroom}
                  setActiveClassroom={setActiveClassroom}
              />
            </div>

            <p style={{ marginTop: '2.5rem' }}>Charts</p>
            <div className="charts gap-29">
              <Chart
                  activeClassroom={activeClassroom}
                  statistics={classroomStat[activeClassroom]}
                  ChartType="area"
              />
              
            </div>
          </div>
        </div>
      </div>
  );
};

export default EducationPortal;
