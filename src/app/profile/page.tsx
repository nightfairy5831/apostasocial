"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  UserIcon,
  TrophyIcon,
  DiceIcon,
  StarIcon,
  FireIcon,
  ChartIcon,
  CalendarIcon,
  MedalIcon,
  CrownIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@/components/Icons";
import {
  users,
  bets,
  leagues,
  formatCurrency,
  formatDate,
  formatNumber,
} from "@/data/mockData";

type Tab = "apostas" | "badges" | "stats";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("apostas");

  const user = users.find((u) => u.id === 1)!;
  const userBets = bets.filter((b) =>
    b.participants.some((p) => p.userId === user.id)
  );
  const userLeagues = leagues.filter((l) =>
    l.members.some((m) => m.userId === user.id)
  );

  const openBets = userBets.filter((b) => b.status === "open");
  const votingBets = userBets.filter((b) => b.status === "voting");
  const closedBets = userBets.filter((b) => b.status === "closed");
  const resolvedBets = userBets.filter((b) => b.status === "resolved");

  const getUserOption = (bet: (typeof bets)[0]) => {
    const participant = bet.participants.find((p) => p.userId === user.id);
    if (!participant) return null;
    return bet.options.find((o) => o.id === participant.selectedOption);
  };

  const didUserWin = (bet: (typeof bets)[0]) => {
    if (bet.status !== "resolved" || !bet.result) return null;
    const userOption = getUserOption(bet);
    if (!userOption) return null;
    return userOption.label === bet.result;
  };

  // Badge data
  const earnedBadges = user.badges;

  const lockedBadges = [
    {
      id: 101,
      name: "Mestre das Apostas",
      description: "Faca 100 apostas no total",
      category: "experiencia",
      icon: "trophy",
      requirement: "100 apostas (faltam 55)",
    },
    {
      id: 102,
      name: "Invicto",
      description: "Venca 5 apostas seguidas",
      category: "streak",
      icon: "fire",
      requirement: "5 vitorias consecutivas",
    },
    {
      id: 103,
      name: "Social",
      description: "Participe de 5 ligas diferentes",
      category: "social",
      icon: "users",
      requirement: "5 ligas (faltam 3)",
    },
    {
      id: 104,
      name: "Diversificado",
      description: "Aposte em 8 categorias diferentes",
      category: "variedade",
      icon: "chart",
      requirement: "8 categorias (faltam 3)",
    },
  ];

  // Stats data
  const categoryStats = [
    { category: "Futebol", winRate: 72, bets: 18 },
    { category: "Entretenimento", winRate: 65, bets: 10 },
    { category: "Politica", winRate: 58, bets: 7 },
    { category: "Desafio Pessoal", winRate: 50, bets: 6 },
    { category: "Automobilismo", winRate: 45, bets: 4 },
  ];

  const monthlyPerformance = [
    { month: "Out", wins: 4, losses: 2 },
    { month: "Nov", wins: 6, losses: 3 },
    { month: "Dez", wins: 5, losses: 4 },
    { month: "Jan", wins: 7, losses: 2 },
    { month: "Fev", wins: 3, losses: 3 },
    { month: "Mar", wins: 3, losses: 1 },
  ];

  const iconForBadge = (iconName: string) => {
    switch (iconName) {
      case "star":
        return <StarIcon className="w-6 h-6 text-accent-500" />;
      case "trophy":
        return <TrophyIcon className="w-6 h-6 text-primary-600" />;
      case "fire":
        return <FireIcon className="w-6 h-6 text-red-500" />;
      case "crown":
        return <CrownIcon className="w-6 h-6 text-accent-500" />;
      case "medal":
        return <MedalIcon className="w-6 h-6 text-secondary-600" />;
      case "users":
        return <UserIcon className="w-6 h-6 text-primary-600" />;
      case "chart":
        return <ChartIcon className="w-6 h-6 text-secondary-600" />;
      default:
        return <StarIcon className="w-6 h-6 text-gray-400" />;
    }
  };

  const categoryBadgeColor = (cat: string) => {
    switch (cat) {
      case "experiencia":
        return "bg-accent-100 text-accent-700";
      case "esporte":
        return "bg-green-100 text-green-700";
      case "streak":
        return "bg-red-100 text-red-700";
      case "entretenimento":
        return "bg-pink-100 text-pink-700";
      case "performance":
        return "bg-blue-100 text-blue-700";
      case "social":
        return "bg-purple-100 text-purple-700";
      case "variedade":
        return "bg-teal-100 text-teal-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const statusLabel: Record<string, string> = {
    open: "Aberta",
    closed: "Encerrada",
    voting: "Em Votacao",
    resolved: "Resolvida",
  };

  const statusBadge: Record<string, string> = {
    open: "badge-open",
    closed: "badge-closed",
    voting: "badge-voting",
    resolved: "badge-resolved",
  };

  const maxMonthlyTotal = Math.max(
    ...monthlyPerformance.map((m) => m.wins + m.losses)
  );

  const totalPrizesWon = 520;
  const bestStreak = 3;
  const favoriteCategory = "Futebol";

  const renderBetGroup = (title: string, betsList: typeof bets) => {
    if (betsList.length === 0) return null;
    return (
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          {title} ({betsList.length})
        </h4>
        <div className="space-y-3">
          {betsList.map((bet) => {
            const userOption = getUserOption(bet);
            const won = didUserWin(bet);
            return (
              <div
                key={bet.id}
                className="card p-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="text-sm font-semibold text-gray-900 truncate">
                        {bet.title}
                      </h5>
                      <span className={statusBadge[bet.status]}>
                        {statusLabel[bet.status]}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full">
                        {bet.category}
                      </span>
                      <span>Entrada: {formatCurrency(bet.entryFee)}</span>
                      {userOption && (
                        <span className="text-primary-600 font-medium">
                          Escolha: {userOption.label}
                        </span>
                      )}
                    </div>
                  </div>
                  {bet.status === "resolved" && won !== null && (
                    <div
                      className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold ${
                        won
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {won ? "Vitoria" : "Derrota"}
                    </div>
                  )}
                </div>
                {bet.status === "resolved" && bet.result && (
                  <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                    Resultado: <span className="font-semibold text-gray-700">{bet.result}</span>
                    {bet.winnerName && (
                      <span className="ml-2">
                        - Vencedor: <span className="font-semibold text-primary-600">{bet.winnerName}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-poppins">
      <Sidebar />

      <div className="page-container">
        {/* Profile Header Card */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {user.avatar}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-sm text-primary-600 font-medium">
                @{user.username}
              </p>
              <p className="text-sm text-gray-500 mt-1">{user.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  Membro desde {formatDate(user.joinedDate)}
                </div>
                <div className="text-sm font-bold text-secondary-600">
                  Saldo: {formatCurrency(user.balance)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                <DiceIcon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {user.totalBets}
                </p>
                <p className="text-xs text-gray-500">Total Apostas</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <TrophyIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{user.wins}</p>
                <p className="text-xs text-gray-500">Vitorias</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                <ChartIcon className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {user.winRate}%
                </p>
                <p className="text-xs text-gray-500">Win Rate</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {userLeagues.length}
                </p>
                <p className="text-xs text-gray-500">Ligas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-100 mb-6">
          {[
            { key: "apostas" as Tab, label: "Minhas Apostas", icon: DiceIcon },
            { key: "badges" as Tab, label: "Badges", icon: MedalIcon },
            { key: "stats" as Tab, label: "Estatisticas", icon: ChartIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-primary text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}

        {/* Apostas Tab */}
        {activeTab === "apostas" && (
          <div>
            {renderBetGroup("Abertas", openBets)}
            {renderBetGroup("Em Votacao", votingBets)}
            {renderBetGroup("Encerradas", closedBets)}
            {renderBetGroup("Resolvidas", resolvedBets)}
            {userBets.length === 0 && (
              <div className="card p-12 text-center">
                <DiceIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Voce ainda nao participou de nenhuma aposta.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === "badges" && (
          <div>
            {/* Earned Badges */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <MedalIcon className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Badges Conquistados
                </h3>
                <span className="text-sm text-gray-500">
                  ({earnedBadges.length})
                </span>
              </div>
              {earnedBadges.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="card p-5 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center flex-shrink-0">
                          {iconForBadge(badge.icon)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900">
                            {badge.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {badge.description}
                          </p>
                          <span
                            className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${categoryBadgeColor(
                              badge.category
                            )}`}
                          >
                            {badge.category}
                          </span>
                        </div>
                        <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card p-8 text-center">
                  <MedalIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    Nenhum badge conquistado ainda.
                  </p>
                </div>
              )}
            </div>

            {/* Locked Badges */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <StarIcon className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-bold text-gray-900">
                  Proximos Badges
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lockedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="card p-5 opacity-60 hover:opacity-80 transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                        {iconForBadge(badge.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-700">
                          {badge.name}
                        </h4>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {badge.description}
                        </p>
                        <span
                          className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${categoryBadgeColor(
                            badge.category
                          )}`}
                        >
                          {badge.category}
                        </span>
                        <p className="text-xs text-primary-500 font-medium mt-2">
                          {badge.requirement}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === "stats" && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="stat-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <FireIcon className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {bestStreak} seguidas
                    </p>
                    <p className="text-xs text-gray-500">Melhor Sequencia</p>
                  </div>
                </div>
              </div>
              <div className="stat-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <TrophyIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(totalPrizesWon)}
                    </p>
                    <p className="text-xs text-gray-500">Total em Premios</p>
                  </div>
                </div>
              </div>
              <div className="stat-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <CrownIcon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      {favoriteCategory}
                    </p>
                    <p className="text-xs text-gray-500">Categoria Favorita</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Win Rate by Category */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-6">
                <ChartIcon className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Win Rate por Categoria
                </h3>
              </div>
              <div className="space-y-4">
                {categoryStats.map((stat) => (
                  <div key={stat.category}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700">
                        {stat.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {stat.bets} apostas
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {stat.winRate}%
                        </span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${stat.winRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Performance */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-6">
                <CalendarIcon className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Performance Mensal
                </h3>
              </div>
              <div className="flex items-end gap-3 h-48">
                {monthlyPerformance.map((month) => {
                  const total = month.wins + month.losses;
                  const winHeight =
                    maxMonthlyTotal > 0
                      ? (month.wins / maxMonthlyTotal) * 100
                      : 0;
                  const lossHeight =
                    maxMonthlyTotal > 0
                      ? (month.losses / maxMonthlyTotal) * 100
                      : 0;
                  return (
                    <div
                      key={month.month}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <div className="flex flex-col items-center justify-end h-36 w-full gap-0.5">
                        <span className="text-xs font-bold text-gray-700 mb-1">
                          {total}
                        </span>
                        <div
                          className="w-full max-w-[40px] bg-gradient-primary rounded-t-md transition-all duration-500"
                          style={{ height: `${winHeight}%` }}
                          title={`${month.wins} vitorias`}
                        />
                        <div
                          className="w-full max-w-[40px] bg-red-300 rounded-b-md transition-all duration-500"
                          style={{ height: `${lossHeight}%` }}
                          title={`${month.losses} derrotas`}
                        />
                      </div>
                      <span className="text-xs text-gray-500 font-medium mt-1">
                        {month.month}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-gradient-primary" />
                  <span className="text-xs text-gray-500">Vitorias</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-red-300" />
                  <span className="text-xs text-gray-500">Derrotas</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
