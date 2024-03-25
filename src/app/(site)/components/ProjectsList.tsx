'use client';

import React, { useEffect } from 'react';

import useModalStore from '../store/modalStore';
import { ProjectProps } from '../types';
import ProjectModal from './ProjectModal';
import ProjectRow from './ProjectRow';

interface ProjectListProps {
  projects: ProjectProps[];
}

export default function ProjectsList({ projects }: ProjectListProps) {
  const { setProjects, openModal } = useModalStore();

  useEffect(() => {
    setProjects(projects);
  }, [projects, setProjects]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectTitle = urlParams.get('project');
    if (projectTitle) {
      const project = projects.find((p) => p.title === projectTitle);
      if (project) {
        openModal(project); 
      }
    }
  }, [projects]);

  return (
    <>
      {projects.map((project: ProjectProps) => (
        <div id={project._id} key={project._id}>
          <ProjectRow project={project} />
        </div>
      ))}

      <ProjectModal />
    </>
  );
}
