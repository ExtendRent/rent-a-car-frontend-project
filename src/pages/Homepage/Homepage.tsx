// Homepage.tsx
import Search from '../../components/Search/Search';
import './Homepage.css';
import carVideo from '../../assets/videos/lamboBackground.mp4';

type Props = {};

const Homepage: React.FC<Props> = (props: Props) => {

  return (
  
    <div className="homepage-container">
    
      <div className="searchDate">
      <Search />
      </div>
            
      <div> 

      <video autoPlay 
      loop 
      muted 
      className="background-video">
        <source src={carVideo} type="video/mp4" />
      </video>

      </div >
     
    </div>
  );
};

export default Homepage;
