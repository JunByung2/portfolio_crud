import React from "react";
import team from "@/data/team.json";
import projects from "@/data/team_pro.json";
import Image from "next/image";
import git from "@/image/git.png";
import Link from "next/link";

export default function TeamPage() {
  return (
    <div className="p-10 min-h-screen mt-10">
      {/* ---- 팀원 소개 ---- */}
      <h1 className="text-3xl font-bold mb-10 text-white text-center">
        Team 미정
      </h1>

      <div className="flex flex-wrap justify-center gap-10 mb-20">
        {team.map((member) => (
          <Link
            key={member.id}
            href={member.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#facc0092] p-7 rounded-lg shadow-lg w-40 text-center hover:scale-110 transition-transform"
          >
            <div className="w-24 h-24 mx-auto mb-2 relative">
              {member.image && (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-lg object-cover"
                />
              )}
            </div>

            <h2 className="text-white font-semibold">{member.name}</h2>
            <p className="text-white text-sm">{member.num}</p>

            <Image
              src={git}
              alt="github"
              width={35}
              className="block mx-auto mt-2"
            />
          </Link>
        ))}
      </div>

      {/* ---- 팀 프로젝트 섹션 ---- */}
      <h2 className="text-3xl font-bold mb-10 text-white text-center">
        Team Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center items-center">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#fdd30063] rounded-2xl shadow-lg overflow-hidden transition hover:scale-95"
          >
            <Link href={project.link} target="_blank">
              <div className="relative flex items-center justify-center">
                {project.image ? (
                  <Image
                    className="mt-5 rounded-xl"
                    src={project.image}
                    alt={project.title}
                    width={430}
                    height={260}
                  />
                ) : (
                  <span className="text-gray-600">No Image</span>
                )}
              </div>

              <div className="p-5 flex flex-col items-center text-center">
                <h3 className="text-xl text-white font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-white text-sm mb-2">{project.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
