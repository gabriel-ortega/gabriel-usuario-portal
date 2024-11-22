import { Banner } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";

export function BannerComponent() {
  return (
    <Banner className="mb-4">
      <div className="flex w-full md:h-6 justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto flex items-center">
          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            <MdAnnouncement className="mr-4 h-4 w-4" />
            <span className="[&_p]:inline">
              If you need help with the application process, consult the&nbsp;
              <a
                href="https://flowbite.com"
                className="inline font-medium text-cyan-600 underline decoration-solid underline-offset-2 hover:no-underline dark:text-cyan-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                application guide.
              </a>
            </span>
          </p>
        </div>
      </div>
    </Banner>
  );
}
