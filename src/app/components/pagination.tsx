import { SetStateAction, useState } from "react";
import { IconButton, ButtonGroup, ThemeProvider } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export default function PaginationGroup() {
  const router = useRouter();
  const id = parseInt(router.query.id as string)
  
  const [active, setActive] = useState(id);




  const getItemProps = (index: SetStateAction<number>) => ({
    className: active === index ? "bg-gray-100 text-gray-900" : "",
    onClick: () => {
      setActive(index)
      router.push(`${index}`)
    },
  });

  const next = () => {
    if (active === 60) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };
   

  return <ThemeProvider>
    <ButtonGroup variant="outlined">
      <IconButton onClick={prev}>
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <IconButton {...getItemProps(id)}>{id}</IconButton>
      <IconButton {...getItemProps(id + 1)}>{id + 1}</IconButton>
      <IconButton {...getItemProps(id + 2)}>{id + 2}</IconButton>
      <IconButton {...getItemProps(id + 3)}>{id + 3}</IconButton>
      <IconButton {...getItemProps(id + 4)}>{id + 4}</IconButton>
      <IconButton onClick={next}>
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </ButtonGroup>
  </ThemeProvider>

}