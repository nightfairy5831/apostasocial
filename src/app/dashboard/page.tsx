"use client";

import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import {
  DiceIcon,
  TrophyIcon,
  WalletIcon,
  ChartIcon,
  ClockIcon,
  ArrowRightIcon,
  FireIcon,
  CheckIcon,
  StarIcon,
} from "@/components/Icons";
import {
  users,
  bets,
  transactions,
  formatCurrency,
  formatDate,
  statusLabels,
  statusBadges,
} from "@/data/mockData";

const user = users.find((u) => u.id === 1)!;
const userBets = bets.filter((b) =>
  b.participants.some((p) => p.userId === 1)
);
const userTransactions = transactions.filter((t) => t.userId === 1);

const activeBets = userBets.filter(
  (b) => b.status === "open" || b.status === "voting"
);
const recentTransactions = [...userTransactions]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 5);

const badgeIconMap: Record<string, React.FC<{ className?: string }>> = {
  star: StarIcon,
  trophy: TrophyIcon,
  fire: FireIcon,
};

export default function DashboardPage() {
  return (
    <>
      <Sidebar />
      <main className="page-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="page-title">Ola, Lucas!</h1>
            <p className="page-subtitle">
              Veja o resumo da sua conta e apostas ativas.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
            <FireIcon className="w-4 h-4" />
            3 vitorias seguidas
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                <WalletIcon className="w-5 h-5 text-primary-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Saldo</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(user.balance)}
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <DiceIcon className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Apostas Ativas
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {activeBets.length}
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                <TrophyIcon className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Total de Vitorias
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{user.wins}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <ChartIcon className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Win Rate
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {user.winRate}%
            </p>
          </div>
        </div>

        {/* Active Bets */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Apostas Ativas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeBets.map((bet) => (
              <div key={bet.id} className="card p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-bold text-gray-900 leading-tight flex-1 mr-2">
                    {bet.title}
                  </h3>
                  <span className={statusBadges[bet.status]}>
                    {statusLabels[bet.status]}
                  </span>
                </div>

                <span className="inline-flex self-start items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                  {bet.category}
                </span>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    Entrada:{" "}
                    <span className="font-semibold text-gray-700">
                      {formatCurrency(bet.entryFee)}
                    </span>
                  </span>
                  <span>
                    Pote:{" "}
                    <span className="font-semibold text-gray-700">
                      {formatCurrency(bet.totalPot)}
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    {bet.currentParticipants}/{bet.maxParticipants}{" "}
                    participantes
                  </span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5" />
                    {formatDate(bet.deadline)}
                  </span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        (bet.currentParticipants / bet.maxParticipants) * 100
                      }%`,
                    }}
                  />
                </div>

                <Link
                  href={`/bets/${bet.id}`}
                  className="gradient-btn-sm justify-center mt-1"
                >
                  Ver Aposta
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Transacoes Recentes
            </h2>
            <Link
              href="/wallet"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              Ver todas
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="card overflow-hidden">
            <div className="divide-y divide-gray-100">
              {recentTransactions.map((tx) => {
                const isPositive =
                  tx.type === "deposit" ||
                  tx.type === "prize" ||
                  tx.type === "refund";
                return (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between px-5 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          isPositive ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {tx.description}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatDate(tx.date)}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        isPositive ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {formatCurrency(Math.abs(tx.amount))}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Badges Showcase */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Suas Conquistas
          </h2>
          <div className="flex flex-wrap gap-4">
            {user.badges.map((badge) => {
              const Icon = badgeIconMap[badge.icon] || StarIcon;
              return (
                <div
                  key={badge.id}
                  className="card px-5 py-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      {badge.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Acoes Rapidas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/create"
              className="card p-5 flex flex-col items-center gap-3 hover:shadow-md transition-shadow text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <DiceIcon className="w-6 h-6 text-primary-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                Criar Aposta
              </span>
            </Link>

            <Link
              href="/explore"
              className="card p-5 flex flex-col items-center gap-3 hover:shadow-md transition-shadow text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <ChartIcon className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                Explorar
              </span>
            </Link>

            <Link
              href="/wallet"
              className="card p-5 flex flex-col items-center gap-3 hover:shadow-md transition-shadow text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <WalletIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                Carteira
              </span>
            </Link>

            <Link
              href="/rankings"
              className="card p-5 flex flex-col items-center gap-3 hover:shadow-md transition-shadow text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <TrophyIcon className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                Ranking
              </span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
