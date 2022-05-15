import "./style.css";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handledarkMode } from "../../store/actions/darkModeAction";

const ToggleDarkMode = () => {

  const dispatch = useDispatch();

  const mode = useSelector((state) => state.darkMode.darkMode);

  const { isdarkMode } = mode;

  const switchDarkMode = () => {
    isdarkMode
      ? dispatch(handledarkMode(false))
      : dispatch(handledarkMode(true));
  };
  
  useEffect(() => {
    document.body.style.backgroundColor = isdarkMode ? "#292c35" : "#f8edea";
  }, [isdarkMode]);

  return (
      <div
        id="darkmode"
      >
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          onChange={switchDarkMode}
          checked={isdarkMode}
        />
        <label htmlFor="checkbox" className="label">
          <BsMoonStarsFill color="white" />
          <BsFillSunFill color="yellow" />
          <div className="ball"></div>
        </label>
      </div>
  );
}

export default ToggleDarkMode;
