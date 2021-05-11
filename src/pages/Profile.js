import React from 'react';
import '../styles/styleProfilePage.scss';
import Navbar from '../components/Navbar'

document.body.style = 'background: #CAD2C5';
  
  function Profile(props) {
    const {
      yourRecipes,
      yourMetrics,
      ellipse9, //this is profile pic
      sobadri, //user name
      text1, //recipe list
      rectangle21, //graph box
      line1, //these are graph lines
      line2,
      line3,
      line4,
      friends,
      ellipse10, //these are friends pictures
      ellipse11,
      ellipse12,
      ellipse13,
    } = props;
  
    return (
      <div>
        <Navbar />
        <div class="container-center-horizontal">
          <div className="profile screen">
            <div className="flex-col-2">
              <div className="overlap-group1">
              </div>
              <div className="flex-row">
                <h1 className="title lato-bold-black-25px">{"Your Recipes"}</h1>
                <div className="your-metrics lato-bold-black-25px">{"Your Metrics"}</div>
              </div>
            </div>
            <div className="flex-row-2">
              <div className="flex-row-3">
                <div className="flex-col">
                  <img className="ellipse-9" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-9@2x.png"} />
                  <div className="sobadri">{"sobadri"}</div>
                </div>
                <div className="text-1 lato-normal-black-20px">{<>Recipe 1<br />Recipe 2<br />Recipe 3<br />Recipe 4<br />Recipe 5<br />Recipe 1<br />Recipe 2<br />Recipe 3<br />Recipe 4<br />Recipe 5<br />Recipe 1<br />Recipe 2<br />Recipe 3<br />Recipe 4<br />Recipe 5</>}</div>
              </div>
              <div className="flex-col-1">
                <div className="overlap-group">
                  <img className="rectangle-21" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/rectangle-21@2x.svg"} />
                  <img className="line-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/line-1@2x.svg"} />
                  <img className="line-2" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/line-2@2x.svg"} />
                  <img className="line-3" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/line-1@2x.svg"} />
                  <img className="line-4" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/line-4@2x.svg"} />
                </div>
                <div className="friends lato-bold-black-25px">{"Friends"}</div>
                <div className="flex-row-1">
                  <img className="ellipse-10" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} />
                  <img className="ellipse-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} />
                  <img className="ellipse-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} />
                  <img className="ellipse-1" src={"https://anima-uploads.s3.amazonaws.com/projects/608b4ca9ee3fce15866ca79a/releases/608b51b1f68e88411d270394/img/ellipse-10@2x.png"} />
                </div>
              </div>
            </div>
            <div className="overlap-group2">
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Profile;
