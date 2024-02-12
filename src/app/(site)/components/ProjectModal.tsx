import React from 'react';

import useModalStore from '../store/modalStore';
import ProjectRow from './ProjectRow';

export default function ProjectModal({}) {
  const { isModalOpen, selectedProject, navBarHeight, selectedImageIndex } =
    useModalStore();

  if (!isModalOpen || !selectedProject) return null;

  return (
    <div
      className="fixed bottom-0 z-10 flex h-full items-end justify-center overflow-auto bg-white/80"
      style={{ paddingTop: navBarHeight }}
    >
      <ProjectRow
        project={selectedProject}
        inModal={true}
        initialSlide={selectedImageIndex}
      />
    </div>
  );
}
