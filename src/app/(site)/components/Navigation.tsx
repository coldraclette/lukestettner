"use client";

import { useEffect, useRef } from "react";

import useModalStore from "../store/modalStore";
import { ProjectProps } from "../types";
import Index from "./Index";

export default function Navigation() {
  const {
    isModalOpen,
    selectedProject,
    isIndexMenuOpen,
    toggleIndexMenu,
    closeModal,
    scrollToProject,
    openModal,
    projects,
  } = useModalStore();

  const navBarRef = useRef<HTMLDivElement>(null);
  const { setNavBarHeight } = useModalStore();

  useEffect(() => {
    if (navBarRef.current) {
      const height = navBarRef.current.offsetHeight + 92;
      setNavBarHeight(height);
    }
  }, [selectedProject, setNavBarHeight]);

  const handleProjectSelect = (projectId: string) => {
    const project = projects.find((p: ProjectProps) => p._id === projectId);

    if (project) {
      openModal(project);
      const url = new URL(window.location.href);
      url.searchParams.set("project", project.title);
      window.history.pushState(null, "", url.toString());
    }

    scrollToProject(projectId);
    toggleIndexMenu();
  };

  return (
    <>
      <div className="fixed z-50 flex h-16 w-full flex-col bg-white px-4 py-4 text-xl lg:h-24 lg:px-12 lg:py-8 lg:text-2xl">
        <div className="flex w-full justify-between gap-2 leading-6 md:text-[2rem] md:leading-9">
          <h1 className="shrink-0 z-50">Luke Stettner</h1>
          {isModalOpen && (
            <h3 className="hidden text-center leading-5 text-lg lg:flex">
              {selectedProject?.title}
            </h3>
          )}
          {isModalOpen ? (
            <button className="flex shrink-0 z-50" onClick={closeModal}>
              Close Artwork
            </button>
          ) : (
            <button className="flex shrink-0" onClick={toggleIndexMenu}>
              {isIndexMenuOpen && "close "}index
            </button>
          )}
        </div>
        {isModalOpen && (
          <div
            className="mt-2 flex w-full flex-col justify-center text-sm md:-mt-4"
            ref={navBarRef}
          >
            <h3 className="flex justify-center text-center text-lg leading-5 md:px-[14.5rem] lg:hidden">
              {selectedProject?.title}
            </h3>
            {selectedProject?.subtitle && (
              <p className="justify-center text-center text-lg leading-5 md:px-[14.5rem] lg:flex">
                {selectedProject?.subtitle}
              </p>
            )}
            {selectedProject?.year && (
              <p className="justify-center text-center text-lg leading-5 md:px-[14.5rem] lg:flex">
                {selectedProject?.year}
              </p>
            )}
          </div>
        )}
      </div>
      <Index
        isIndexMenuOpen={isIndexMenuOpen}
        projects={projects}
        handleProjectSelect={handleProjectSelect}
      />
    </>
  );
}
