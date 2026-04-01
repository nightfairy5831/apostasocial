"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  SearchIcon,
  FilterIcon,
  DiceIcon,
  ClockIcon,
  UsersIcon,
  DollarIcon,
  ArrowRightIcon,
  LockIcon,
  GlobeIcon,
  TrophyIcon,
} from "@/components/Icons";
import {
  bets,
  categories,
  formatCurrency,
  formatDate,
  statusLabels,
  statusBadges,
} from "@/data/mockData";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const publicBets = bets.filter((bet) => bet.isPrivate === false);

  const filteredBets = publicBets.filter((bet) => {
    const matchesSearch =
      searchQuery === "" ||
      bet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bet.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || bet.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "" || bet.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const openBets = publicBets.filter((bet) => bet.status === "open");
  const totalPot = publicBets.reduce((sum, bet) => sum + bet.totalPot, 0);
  const totalParticipants = publicBets.reduce(
    (sum, bet) => sum + bet.currentParticipants,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container-max px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <GlobeIcon className="w-4 h-4" />
              Apostas Publicas
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-3">
              Explorar Apostas
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Descubra apostas abertas, participe com seus amigos e concorra a
              premios. Encontre a aposta perfeita para voce!
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container-max px-4 md:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <div className="relative flex-1">
              <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar apostas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input w-full pl-9 pr-4"
              />
            </div>
            <div className="flex gap-3 items-center">
              <FilterIcon className="w-4 h-4 text-gray-400 hidden md:block" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">Todas as Categorias</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="filter-select"
              >
                <option value="">Todos os Status</option>
                <option value="open">Aberta</option>
                <option value="voting">Em Votacao</option>
                <option value="resolved">Resolvida</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-max px-4 md:px-8 py-4">
          <div className="flex flex-wrap gap-6 md:gap-10 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <DiceIcon className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Apostas Abertas</p>
                <p className="text-sm font-bold text-gray-900">
                  {openBets.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                <DollarIcon className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total em Premios</p>
                <p className="text-sm font-bold text-gray-900">
                  {formatCurrency(totalPot)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center">
                <UsersIcon className="w-4 h-4 text-accent-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Participantes</p>
                <p className="text-sm font-bold text-gray-900">
                  {totalParticipants}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bet Cards Grid */}
      <section className="flex-1 section-padding">
        <div className="container-max">
          {filteredBets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBets.map((bet) => {
                const participantPercent =
                  (bet.currentParticipants / bet.maxParticipants) * 100;

                return (
                  <div
                    key={bet.id}
                    className="card p-5 hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    {/* Top row: category + type + status */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {bet.category}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            bet.type === "objective"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {bet.type === "objective" ? "Objetiva" : "Subjetiva"}
                        </span>
                      </div>
                      <span className={statusBadges[bet.status]}>
                        {statusLabels[bet.status]}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-gray-900 font-poppins mb-2 line-clamp-2">
                      {bet.title}
                    </h3>

                    {/* Entry fee + Pot */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1.5 text-sm">
                        <DollarIcon className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-gray-500">Entrada:</span>
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(bet.entryFee)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <TrophyIcon className="w-3.5 h-3.5 text-accent-500" />
                        <span className="font-semibold text-primary-600">
                          {formatCurrency(bet.totalPot)}
                        </span>
                      </div>
                    </div>

                    {/* Participants with progress bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <div className="flex items-center gap-1.5">
                          <UsersIcon className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-gray-600">
                            {bet.currentParticipants}/{bet.maxParticipants}{" "}
                            participantes
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {Math.round(participantPercent)}%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${participantPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
                      <ClockIcon className="w-3.5 h-3.5" />
                      <span>Prazo: {formatDate(bet.deadline)}</span>
                    </div>

                    {/* Options preview */}
                    <div className="mb-4 flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                        Opcoes
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {bet.options.slice(0, 3).map((option) => (
                          <span
                            key={option.id}
                            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200"
                          >
                            {option.label}
                            <span className="ml-1.5 text-gray-400">
                              {option.odds}x
                            </span>
                          </span>
                        ))}
                        {bet.options.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium text-gray-400">
                            +{bet.options.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <Link
                      href={`/bets/${bet.id}`}
                      className="gradient-btn-sm justify-center w-full"
                    >
                      Ver Detalhes
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <SearchIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 font-poppins mb-2">
                Nenhuma aposta encontrada
              </h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                N&apos;ao encontramos apostas com os filtros selecionados. Tente
                ajustar sua busca ou explore outras categorias.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setSelectedStatus("");
                }}
                className="gradient-btn-outline"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
