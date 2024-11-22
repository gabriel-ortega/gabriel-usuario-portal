import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
export function CardImg({ icon, title, description, link, onClick }) {
  const cardContent = (
    <>
      <h5 className="text-xl font-bold tracking-tight text-black ">
        {title}
      </h5>
      <p className="font-normal text-black dark:text-gray-400">
        {description}
      </p>
    </>
  );


  return (
    <div className="">
    {link ? (
      <Link to={link} target="_blank">
        <Card className="flex w-48 h-36 items-center justify-center text-center cursor-pointer px-2" onClick={onClick}>
          <div className=" h-auto w-auto items-center justify-center text-center">
            {icon}
          </div>
          {cardContent}
        </Card>
      </Link>
    ) : (
      <Card className="flex w-48 h-36 items-center justify-center text-center cursor-pointer " onClick={onClick}>
        <div className=" h-auto w-auto items-center justify-center text-center">
          {icon}
        </div>
        {cardContent}
      </Card>
    )}
  </div>
  );
}
