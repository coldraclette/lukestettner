"use client";

import { useEffect } from "react";
import { create } from "zustand";

import { ProjectProps } from "../types";

interface ModalState {
  selectedProject: ProjectProps | null;
  isModalOpen: boolean;
  isIndexMenuOpen: boolean;
  navBarHeight: number;
  setNavBarHeight: (height: number) => void;
  toggleIndexMenu: () => void;
  openModal: (project: ProjectProps, imageIndex?: number) => void;
  closeModal: () => void;
  projects: ProjectProps[];
  setProjects: (projects: ProjectProps[]) => void;
  scrollToProject: (projectId: string) => void;
  selectedImageIndex: number;
}

const useModalStore = create<ModalState>((set) => ({
  projects: [],
  selectedProject: null,
  isModalOpen: false,
  isIndexMenuOpen: false,
  navBarHeight: 0,
  setNavBarHeight: (height: number) => set({ navBarHeight: height }),
  toggleIndexMenu: () =>
    set((state) => {
      return { isIndexMenuOpen: !state.isIndexMenuOpen };
    }),
  openModal: (project: ProjectProps, imageIndex?: number) => {
    set({
      selectedProject: project,
      isModalOpen: true,
      selectedImageIndex: imageIndex,
    });
  },
  closeModal: () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    window.history.pushState(null, "", url.toString());
    set({ selectedProject: null, isModalOpen: false });
  },
  setProjects: (projects: ProjectProps[]) => set({ projects }),
  scrollToProject: (projectId: string) => {
    const projectEl = document.getElementById(projectId);
    if (projectEl) {
      projectEl.scrollIntoView({ behavior: "smooth" });
    }
  },
  selectedImageIndex: 0,
}));

export const useLockBodyScroll = () => {
  const { isIndexMenuOpen, isModalOpen } = useModalStore((state) => ({
    isIndexMenuOpen: state.isIndexMenuOpen,
    isModalOpen: state.isModalOpen,
  }));

  useEffect(() => {
    if (isIndexMenuOpen || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isIndexMenuOpen, isModalOpen]);
};

export default useModalStore;
