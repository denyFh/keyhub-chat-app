import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import { selectedGroupState, selectedUserState } from '../../recoil';

import logo from '../../logo.svg';
import Contacts from '../Contacts';

const SidebarHeader = () => {

    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
    const [selectedGroup, setSelectedGroup] = useRecoilState(selectedGroupState); 
    const mode = useSelector((state) => state.darkMode.darkMode);
    const { isdarkMode } = mode;

    return (
        <div className={`flex h-16 items-center justify-between shadow-md px-6 ${isdarkMode ? "bg-cyan-700" : "bg-[#ffdc81]"}`}>
            <button className="flex items-center gap-1" aria-label={`${selectedUser.id} ${selectedGroup.id}`} onClick={() => {setSelectedUser({ id: null, name: ""}); setSelectedGroup({ id: null, name: ""})}}>
              <img className="mr-1 bg-black rounded h-7 w-7" src={logo} alt="logo" />
              <h1 className={`text-xl font-semibold ${isdarkMode ? "text-white" : "text-amber-700"}`}>Keyhub</h1>
            </button>
            <Contacts></Contacts>
        </div>
    );
}
 
export default SidebarHeader;