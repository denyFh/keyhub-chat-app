import { Divider } from "@mui/material";
import { useSelector } from "react-redux";

const CreateGrupButton = (props) => {

    const mode = useSelector((state) => state.darkMode.darkMode);
    const { isdarkMode } = mode;

    return (
        <>
            <div onClick={props.onClick} className={`flex flex-col items-center justify-center px-4 py-2 ${isdarkMode ? "light-hover" : "hover:bg-gray-100"}`} style={isdarkMode ? { "backgroundColor": "#292c35" } : { "backgroundColor": "" }}>
                <button className={`${isdarkMode ? "light-hover text-white" : "text-black"} w-full h-10`}>
                    Create New Group...
                </button>
            </div>
            <Divider className={`${isdarkMode ? "lighter" : ""} w-full`}></Divider>
        </>
    );
}

export default CreateGrupButton;