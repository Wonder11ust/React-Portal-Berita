
import RemoveCookie from './RemoveCookie';

function LogOut() {
  const handleLogOut = () => {
    RemoveCookie('token');
    window.location.reload(true);
    // history.push("/");
    // console.log('keluar');
  }

return (
  <div className=" text-red-500 text-lg hover:bg-red-100 cursor-pointer rounded-xl duration-300 transition-all px-2 "  onClick={handleLogOut}>Log Out</div>
  )
}

export default LogOut