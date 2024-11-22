import { Button } from "flowbite-react";
import { Link } from 'react-router-dom';
export function ButtonIcon({label,icon,classname,link,classnamebtn,left=false,onClick, type, disabled=false}) {
  return (
    <div className={classname} >
    <Link to={link} className="flex">
        <Button className={classnamebtn} type={type} onClick={onClick} disabled={disabled}>
        {left?icon:""}
        {label}
        {!left?icon:""}
      </Button>
    </Link>
      </div>
  );
}