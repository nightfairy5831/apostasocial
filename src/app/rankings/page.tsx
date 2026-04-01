"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  TrophyIcon,
  StarIcon,
  FireIcon,
  ChartIcon,
  MedalIcon,
  CrownIcon,
  ArrowRightIcon,
} from "@/components/Icons";
import { users, formatNumber } from "@/data/mockData";

type TabKey = "geral" | "vitorias" | "winrate" | "apostas";

const tabs: { key: TabKey; label: string; icon: typeof TrophyIcon }[] = [
  { key: "geral", label: "Geral", icon: TrophyIcon },
  { key: "vitorias", label: "Mais Vitorias", icon: StarIcon },
  { key: "winrate", label: "Maior Win Rate", icon: FireIcon },
  { key: "apostas", label: "Mais Apostas", icon: ChartIcon },
];

function getSortedUsers(tab: TabKey) {
  return [...users].sort((a, b) => {
    switch (tab) {
      case "geral":
        return b.wins * b.winRate - a.wins * a.winRate;
      case "vitorias":
        return b.wins - a.wins;
      case "winrate":
        return b.winRate - a.winRate;
      case "apostas":
        return b.totalBets - a.totalBets;
      default:
        return 0;
    }
  });
}

function getKeyStatLabel(tab: TabKey): string {
  switch (tab) {
    case "geral":
      return "Pontuacao";
    case "vitorias":
      return "Vitorias";
    case "winrate":
      return "Win Rate";
    case "apostas":
      return "Total Apostas";
  }
}

function getKeyStatValue(
  tab: TabKey,
  user: (typeof users)[0]
): string {
  switch (tab) {
    case "geral":
      return formatNumber(Math.round(user.wins * user.winRate));
    case "vitorias":
      return formatNumber(user.wins);
    case "winrate":
      return `${user.winRate}%`;
    case "apostas":
      return formatNumber(user.totalBets);
  }
}

const podiumColors = [
  {
    bg: "bg-gradient-to-b from-yellow-50 to-yellow-100",
    border: "border-yellow-300",
    ring: "ring-yellow-400",
    text: "text-yellow-700",
    badgeBg: "bg-yellow-400",
    badgeText: "text-yellow-900",
    avatarBg: "bg-yellow-100",
    avatarBorder: "border-yellow-400",
    label: "1o Lugar",
  },
  {
    bg: "bg-gradient-to-b from-gray-50 to-gray-100",
    border: "border-gray-300",
    ring: "ring-gray-400",
    text: "text-gray-600",
    badgeBg: "bg-gray-300",
    badgeText: "text-gray-800",
    avatarBg: "bg-gray-100",
    avatarBorder: "border-gray-400",
    label: "2o Lugar",
  },
  {
    bg: "bg-gradient-to-b from-amber-50 to-amber-100",
    border: "border-amber-400",
    ring: "ring-amber-500",
    text: "text-amber-700",
    badgeBg: "bg-amber-400",
    badgeText: "text-amber-900",
    avatarBg: "bg-amber-100",
    avatarBorder: "border-amber-500",
    label: "3o Lugar",
  },
];

export default function RankingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("geral");

  const sortedUsers = getSortedUsers(activeTab);
  const top3 = sortedUsers.slice(0, 3);
  const statLabel = getKeyStatLabel(activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container-max px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <TrophyIcon className="w-4 h-4" />
              Classificacao
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-3 flex items-center justify-center gap-3">
              <TrophyIcon className="w-8 h-8 text-accent-500" />
              Ranking
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Confira os melhores apostadores da plataforma. Suba no ranking,
              conquiste badges e mostre que voce e o melhor!
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container-max px-4 md:px-8">
          <div className="flex overflow-x-auto -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top 3 Podium */}
      <section className="section-padding pb-8">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {top3.map((user, index) => {
              const colors = podiumColors[index];
              return (
                <div
                  key={user.id}
                  className={`relative rounded-2xl border-2 ${colors.border} ${colors.bg} p-6 text-center transition-all duration-300 hover:shadow-lg ${
                    index === 0 ? "md:-mt-4 md:pb-8" : ""
                  }`}
                >
                  {/* Position badge */}
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 ${colors.badgeBg} ${colors.badgeText} w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm`}
                  >
                    {index + 1}
                  </div>

                  {/* Crown for 1st */}
                  {index === 0 && (
                    <div className="mb-2">
                      <CrownIcon className="w-8 h-8 text-yellow-500 mx-auto" />
                    </div>
                  )}

                  {/* Avatar */}
                  <div
                    className={`w-16 h-16 rounded-full ${colors.avatarBg} border-2 ${colors.avatarBorder} flex items-center justify-center mx-auto mb-3 ${
                      index === 0 ? "w-20 h-20" : ""
                    }`}
                  >
                    <span
                      className={`font-bold ${colors.text} ${
                        index === 0 ? "text-xl" : "text-lg"
                      }`}
                    >
                      {user.avatar}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-base font-semibold text-gray-900 font-poppins">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    @{user.username}
                  </p>

                  {/* Key Stat */}
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${colors.badgeBg} ${colors.badgeText}`}
                  >
                    <MedalIcon className="w-3.5 h-3.5" />
                    {statLabel}: {getKeyStatValue(activeTab, user)}
                  </div>

                  {/* Extra stats */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-black/5">
                    <div>
                      <p className="text-xs text-gray-500">Vitorias</p>
                      <p className="text-sm font-bold text-gray-900">
                        {user.wins}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Win Rate</p>
                      <p className="text-sm font-bold text-gray-900">
                        {user.winRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Apostas</p>
                      <p className="text-sm font-bold text-gray-900">
                        {user.totalBets}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Ranking Table */}
      <section className="flex-1 px-4 md:px-8 pb-16">
        <div className="container-max">
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 font-poppins">
                Ranking Completo
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="w-16">#</th>
                    <th>Apostador</th>
                    <th className="text-center">Vitorias</th>
                    <th className="text-center">Total Apostas</th>
                    <th className="text-center">Win Rate</th>
                    <th className="text-center">Badges</th>
                    <th className="text-right">Acao</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user, index) => {
                    const position = index + 1;
                    return (
                      <tr key={user.id}>
                        <td>
                          {position <= 3 ? (
                            <span
                              className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                                position === 1
                                  ? "bg-yellow-400 text-yellow-900"
                                  : position === 2
                                  ? "bg-gray-300 text-gray-800"
                                  : "bg-amber-400 text-amber-900"
                              }`}
                            >
                              {position}
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-7 h-7 text-sm font-medium text-gray-500">
                              {position}
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary-700">
                                {user.avatar}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                @{user.username}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="text-sm font-semibold text-gray-900">
                            {user.wins}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-sm text-gray-700">
                            {user.totalBets}
                          </span>
                        </td>
                        <td className="text-center">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                              user.winRate >= 60
                                ? "bg-green-100 text-green-700"
                                : user.winRate >= 50
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {user.winRate}%
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-sm font-medium text-gray-700">
                            {user.badges.length}
                          </span>
                        </td>
                        <td className="text-right">
                          <Link
                            href="/profile"
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                          >
                            Ver Perfil
                            <ArrowRightIcon className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
