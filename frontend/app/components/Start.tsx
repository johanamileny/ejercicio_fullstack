import "../styles/startStyles.css";


export default function Start() {

  const storedUserData = sessionStorage.getItem("userAuthData");

let userName = "Usuario"; // nombre por defecto

try {
  if (storedUserData) {
    const parsedUserData = JSON.parse(storedUserData);
    if (parsedUserData && typeof parsedUserData.name === "string") {
      userName = parsedUserData.name;
    }
  }
} catch (error) {
  console.error("Error al parsear userAuthData:", error);
}

  

  return (
    <div className="container">
      <div className="header-container">
        <img
          src="https://s17.postimg.cc/ypm5ye95r/image.jpg"
          alt=""
          className="header-image"
        />
        <div className="header">
          <svg
            fill="#ffffff"
            height="18"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
            className="header-icon"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>

          <svg
            fill="#ffffff"
            height="18"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
            className="u-float-right header-icon"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>

          <h1 className="main-heading">{userName}</h1>
          <div className="stats">
            <span className="stat-module">
              Películas <span className="stat-number">56</span>
            </span>
            <span className="stat-module">
              Reproducciones <span className="stat-number">29</span>
            </span>
            <span className="stat-module">
              Musicales <span className="stat-number">11</span>
            </span>
          </div>
        </div>
      </div>

      <div className="overlay-header"></div>

      <div className="body">
        <img
          src="https://i.postimg.cc/C1DT0ffF/HGDF.jpg"
          alt="Hugh Jackman"
          className="body-image"
        />
        <div className="body-action-button u-flex-center">
          <svg
            fill="#ffffff"
            height="28"
            viewBox="0 0 24 24"
            width="28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </div>
        <span className="body-stats">
          Seguidores <span>3.5k</span>
        </span>
        <span className="body-stats">
          Siguiendo <span>1.9k</span>
        </span>
        <div className="u-clearfix"></div>
        <div className="body-more">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="card u-clearfix">
          <span className="card-heading">Movies</span>
          <span className="card-more">
            <svg
              fill="#777777"
              height="18"
              viewBox="0 0 24 24"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </span>
          <ul className="card-list">
            <li>
              <img src="https://s12.postimg.cc/c0ryp65lp/m1f.jpg" alt="" />
            </li>
            <li>
              <img src="https://s14.postimg.cc/6ts0it3xt/m2f.jpg" alt="" />
            </li>
            <li>
              <img src="https://s13.postimg.cc/ri499o2zr/m3f.jpg" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

