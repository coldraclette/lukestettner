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
  const { setProjects } = useModalStore();

  useEffect(() => {
    setProjects(projects);
  }, [projects, setProjects]);

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
