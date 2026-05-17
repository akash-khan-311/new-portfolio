import Image from "next/image";
import Button from "./CustomButton";
import { TProject } from "@/interface";

type Props = {
  project: TProject;
};

function ProjectCard({ project }: Props) {
  const { title, image, description, codeLink, liveLink, technologies } =
    project;

  return (
    <section className=" dark:bg-[#000000] bg-white p-5 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-x-10 ">
        <div className="cursor-pointer gradient-border overflow-hidden    lg:w-2/4 h-56  rounded-md">
          <Image
            src={image as string}
            className="hover:scale-105 transition-all duration-500 w-full h-full "
            alt={title}
            width={400}
            height={400}
          />
        </div>
        <div className="w-full md:w-3/5 flex flex-col justify-center items-center md:items-start">
          <h2 className="text-3xl gradient-text capitalize  font-bold mt-5 md:mt-0">
            {title}
          </h2>
          <p className="text-gray-400 text-sm lg:my-6 my-1 text-center md:text-left">
            {description}
          </p>
          <div className="flex gap-1 flex-wrap justify-center items-center md:items-start md:justify-start">
            {" "}
            {technologies.map((tech) => (
              <p
                key={tech}
                className="text-gray-600 dark:text-white  bg-green-600/25 p-1 px-3 text-sm rounded-lg"
              >
                {tech}
              </p>
            ))}
          </div>
          <div className="flex gap-x-5 mt-5">
            {/* Live Link */}
            <Button
              href={liveLink}
              className="  dark:text-white uppercase bg-[#87e63b] py-2 px-8 rounded-md text-sm"
            >
              Live Link
            </Button>

            {/* Code Link */}
            <Button
              href={codeLink}
              className=" dark:text-white  uppercase bg-[#87e63b] py-2 px-8 rounded-md text-sm"
            >
              Code Link
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectCard;
