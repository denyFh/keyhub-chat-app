import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import { selectedGroupState, selectedUserState } from '../../recoil';

import logoBlack from '../../assets/keyLogo-black.png';
import logoWhite from '../../assets/keyLogo-white.svg';
import Contacts from '../Contacts';

const SidebarHeader = () => {

    const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
    const [selectedGroup, setSelectedGroup] = useRecoilState(selectedGroupState); 
    const mode = useSelector((state) => state.darkMode.darkMode);
    const { isdarkMode } = mode;

    return (
        <div className={`flex h-16 items-center justify-between shadow-md px-6 ${isdarkMode ? "bg-cyan-700" : "bg-[#ffdc81]"}`}>
            <button className="flex items-center gap-1" aria-label={`${selectedUser.id} ${selectedGroup.id}`} onClick={() => {setSelectedUser({ id: null, name: ""}); setSelectedGroup({ id: null, name: ""})}}>
              <img className="rounded h-9" src={ isdarkMode ? logoWhite : logoBlack } alt="logo" />
            </button>
            <Contacts></Contacts>
        </div>
    );
}
 
export default SidebarHeader;