"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  UsersIcon,
  TrophyIcon,
  DiceIcon,
  PlusIcon,
  LinkIcon,
  ArrowRightIcon,
  StarIcon,
  CrownIcon,
  LockIcon,
  SearchIcon,
} from "@/components/Icons";
import { leagues, formatNumber } from "@/data/mockData";

export default function LeaguesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newLeagueName, setNewLeagueName] = useState("");
  const [newLeagueDesc, setNewLeagueDesc] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const maskCode = (code: string) => {
    if (code.length <= 3) return code;
    return code.slice(0, 3) + "***";
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container-max px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <UsersIcon className="w-4 h-4" />
              Competicao entre amigos
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ligas <span className="gradient-text">Privadas</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Crie ou entre em ligas com seus amigos. Acompanhe rankings, acumule pontos e dispute o topo com quem voce conhece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowCreateModal(true)}
                className="gradient-btn"
              >
                <PlusIcon className="w-5 h-5" />
                Criar Liga
              </button>
              <a href="#join-league" className="gradient-btn-outline">
                <LinkIcon className="w-5 h-5" />
                Entrar com Codigo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* My Leagues */}
      <section className="section-padding">
        <div className="container-max">
          <div className="flex items-center gap-3 mb-8">
            <TrophyIcon className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Minhas Ligas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leagues.map((league) => {
              const topMember = [...league.members].sort(
                (a, b) => b.points - a.points
              )[0];

              return (
                <div
                  key={league.id}
                  className="card p-6 hover:shadow-lg transition-all duration-300"
                >
                  {/* League Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {league.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {league.description}
                      </p>
                    </div>
                    {league.isPrivate && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                        <LockIcon className="w-4 h-4 text-primary-600" />
                      </div>
                    )}
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <UsersIcon className="w-4 h-4 text-gray-400" />
                      <span>{formatNumber(league.members.length)} membros</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <DiceIcon className="w-4 h-4 text-gray-400" />
                      <span>{formatNumber(league.totalBets)} apostas</span>
                    </div>
                  </div>

                  {/* Invite Code */}
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 mb-4">
                    <LinkIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Codigo:</span>
                    <span className="text-xs font-mono font-semibold text-primary-600">
                      {maskCode(league.inviteCode)}
                    </span>
                  </div>

                  {/* Members Avatars */}
                  <div className="flex items-center mb-4">
                    <div className="flex -space-x-2">
                      {league.members.slice(0, 5).map((member) => (
                        <div
                          key={member.userId}
                          className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                          title={member.userName}
                        >
                          {member.avatar}
                        </div>
                      ))}
                      {league.members.length > 5 && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold border-2 border-white">
                          +{league.members.length - 5}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Top Member */}
                  <div className="flex items-center gap-2 bg-accent-50 rounded-lg px-3 py-2 mb-4">
                    <CrownIcon className="w-4 h-4 text-accent-500" />
                    <span className="text-xs text-gray-600">Lider:</span>
                    <span className="text-xs font-semibold text-gray-900">
                      {topMember.userName}
                    </span>
                    <span className="text-xs text-accent-600 font-medium ml-auto">
                      {formatNumber(topMember.points)} pts
                    </span>
                  </div>

                  {/* View League Link */}
                  <Link
                    href={`/leagues/${league.id}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-primary-600 hover:bg-primary-50 transition-all duration-200"
                  >
                    Ver Liga
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join League */}
      <section id="join-league" className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-lg mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <SearchIcon className="w-4 h-4" />
              Entrar em uma liga
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tem um codigo de convite?
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Insira o codigo de convite que voce recebeu para entrar em uma liga privada.
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="Ex: AMIGOS2026"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all uppercase tracking-wider"
              />
              <button className="gradient-btn-sm">
                <ArrowRightIcon className="w-4 h-4" />
                Entrar na Liga
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Create League Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <StarIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Criar Nova Liga
                </h3>
                <p className="text-xs text-gray-500">
                  Convide seus amigos e comecem a apostar juntos
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="league-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nome da Liga
                </label>
                <input
                  id="league-name"
                  type="text"
                  value={newLeagueName}
                  onChange={(e) => setNewLeagueName(e.target.value)}
                  placeholder="Ex: Bolao da Galera"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="league-desc"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Descricao
                </label>
                <textarea
                  id="league-desc"
                  value={newLeagueDesc}
                  onChange={(e) => setNewLeagueDesc(e.target.value)}
                  placeholder="Descreva o proposito da sua liga..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button className="gradient-btn flex-1 justify-center">
                  <PlusIcon className="w-5 h-5" />
                  Criar Liga
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
