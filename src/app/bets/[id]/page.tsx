"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import {
  DiceIcon,
  TrophyIcon,
  UsersIcon,
  ClockIcon,
  ChatIcon,
  ShareIcon,
  CheckIcon,
  DollarIcon,
  ArrowRightIcon,
  VoteIcon,
  LockIcon,
  GlobeIcon,
  StarIcon,
} from "@/components/Icons";
import {
  bets,
  formatCurrency,
  formatDate,
  formatDateTime,
  statusLabels,
  statusBadges,
} from "@/data/mockData";

export default function BetDetailPage() {
  const params = useParams<{ id: string }>();
  const betId = parseInt(params.id as string);
  const bet = bets.find((b) => b.id === betId);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [showChat, setShowChat] = useState(false);

  if (!bet) {
    return (
      <>
        <Sidebar />
        <main className="page-container">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <DiceIcon className="w-16 h-16 text-gray-300 mb-4" />
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Aposta nao encontrada
            </h1>
            <p className="text-gray-500 text-sm">
              A aposta que voce procura nao existe ou foi removida.
            </p>
          </div>
        </main>
      </>
    );
  }

  const totalVotes = bet.options.reduce((sum, opt) => sum + opt.votes, 0);

  const getOptionLabel = (optionId: number) => {
    const opt = bet.options.find((o) => o.id === optionId);
    return opt ? opt.label : "N/A";
  };

  const handleBet = () => {
    if (selectedOption) {
      alert(
        `Aposta realizada na opcao: ${getOptionLabel(selectedOption)}`
      );
    }
  };

  const handleVote = (optionId: number) => {
    alert(`Voto registrado na opcao: ${getOptionLabel(optionId)}`);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      alert("Mensagem enviada!");
      setChatMessage("");
    }
  };

  const handleCopyLink = () => {
    const link = `https://apostasocial.com/bets/${bet.id}`;
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copiado!");
    });
  };

  return (
    <>
      <Sidebar />
      <main className="page-container">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="card p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                    {bet.category}
                  </span>
                  <span className={statusBadges[bet.status]}>
                    {statusLabels[bet.status]}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                    {bet.isPrivate ? (
                      <>
                        <LockIcon className="w-3.5 h-3.5" />
                        Privada
                      </>
                    ) : (
                      <>
                        <GlobeIcon className="w-3.5 h-3.5" />
                        Publica
                      </>
                    )}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {bet.title}
                </h1>
                <p className="text-sm text-gray-500">{bet.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Criada por{" "}
                  <span className="font-medium text-gray-600">
                    {bet.creatorName}
                  </span>{" "}
                  em {formatDate(bet.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat-card">
              <div className="flex items-center gap-2 mb-2">
                <DollarIcon className="w-4 h-4 text-secondary-500" />
                <span className="text-xs font-medium text-gray-500">
                  Taxa de Entrada
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(bet.entryFee)}
              </p>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 mb-2">
                <StarIcon className="w-4 h-4 text-accent-500" />
                <span className="text-xs font-medium text-gray-500">
                  Pote Total
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(bet.totalPot)}
              </p>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 mb-2">
                <UsersIcon className="w-4 h-4 text-primary-500" />
                <span className="text-xs font-medium text-gray-500">
                  Participantes
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {bet.currentParticipants}/{bet.maxParticipants}
              </p>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-2 mb-2">
                <ClockIcon className="w-4 h-4 text-red-500" />
                <span className="text-xs font-medium text-gray-500">
                  Prazo Final
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {formatDate(bet.deadline)}
              </p>
            </div>
          </div>

          {/* Resolved: Winner Announcement */}
          {bet.status === "resolved" && bet.winnerName && (
            <div className="card p-6 bg-gradient-to-r from-accent-50 to-secondary-50 border-accent-200">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent-400 flex items-center justify-center">
                  <TrophyIcon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-accent-600 uppercase tracking-wider">
                    Resultado Final
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {bet.result}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Parabens a{" "}
                    <span className="font-semibold">{bet.winnerName}</span>!
                    Premio de{" "}
                    <span className="font-semibold text-secondary-600">
                      {formatCurrency(bet.totalPot * 0.9)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Options Section */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Opcoes
            </h2>
            <div className="space-y-3">
              {bet.options.map((option) => {
                const percentage =
                  totalVotes > 0
                    ? Math.round((option.votes / totalVotes) * 100)
                    : 0;
                const isWinner =
                  bet.status === "resolved" && bet.result === option.label;
                const isSelected = selectedOption === option.id;

                return (
                  <div
                    key={option.id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isWinner
                        ? "border-secondary-500 bg-secondary-50"
                        : isSelected
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {isWinner && (
                          <TrophyIcon className="w-4 h-4 text-accent-500" />
                        )}
                        <span
                          className={`font-medium text-sm ${
                            isWinner
                              ? "text-secondary-700"
                              : "text-gray-900"
                          }`}
                        >
                          {option.label}
                        </span>
                        {isWinner && (
                          <span className="text-xs font-semibold text-secondary-600 bg-secondary-100 px-2 py-0.5 rounded-full">
                            Vencedor
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">
                          {option.votes} voto{option.votes !== 1 ? "s" : ""} (
                          {percentage}%)
                        </span>
                        {bet.status === "open" && (
                          <button
                            onClick={() => setSelectedOption(option.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                              isSelected
                                ? "bg-primary-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {isSelected ? (
                              <span className="flex items-center gap-1">
                                <CheckIcon className="w-3 h-3" />
                                Selecionada
                              </span>
                            ) : (
                              "Selecionar"
                            )}
                          </button>
                        )}
                        {bet.status === "voting" && (
                          <button
                            onClick={() => handleVote(option.id)}
                            className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all"
                          >
                            <VoteIcon className="w-3 h-3" />
                            Votar
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isWinner
                            ? "bg-gradient-to-r from-secondary-400 to-secondary-500"
                            : "progress-fill"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {bet.status === "open" && selectedOption && (
              <button
                onClick={handleBet}
                className="gradient-btn mt-4 w-full justify-center"
              >
                <DiceIcon className="w-4 h-4" />
                Apostar - {formatCurrency(bet.entryFee)}
              </button>
            )}
          </div>

          {/* Participants */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Participantes ({bet.currentParticipants})
            </h2>
            <div className="space-y-3">
              {bet.participants.map((p) => (
                <div
                  key={p.userId}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">
                      {p.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {p.userName}
                      </p>
                      <p className="text-xs text-gray-400">
                        Entrou em {formatDate(p.joinedAt)}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    {getOptionLabel(p.selectedOption)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Section */}
          <div className="card overflow-hidden">
            <button
              onClick={() => setShowChat(!showChat)}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <ChatIcon className="w-5 h-5 text-primary-500" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Chat ({bet.chatMessages.length})
                </h2>
              </div>
              <ArrowRightIcon
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  showChat ? "rotate-90" : ""
                }`}
              />
            </button>

            {showChat && (
              <div className="px-6 pb-6">
                <p className="text-xs text-gray-400 mb-4">
                  Chat ativo ate 2h apos encerramento
                </p>

                {bet.chatMessages.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-6">
                    Nenhuma mensagem ainda. Seja o primeiro a comentar!
                  </p>
                ) : (
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {bet.chatMessages.map((msg) => (
                      <div key={msg.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {msg.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-semibold text-gray-900">
                              {msg.userName}
                            </span>
                            <span className="text-xs text-gray-400">
                              {formatDateTime(msg.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mt-0.5">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendMessage();
                    }}
                    placeholder="Escreva uma mensagem..."
                    className="filter-input flex-1"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                    className={`gradient-btn-sm ${
                      !chatMessage.trim()
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Share Section */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShareIcon className="w-5 h-5 text-primary-500" />
              <h2 className="text-lg font-semibold text-gray-900">
                Compartilhar
              </h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Convide amigos para participar desta aposta.
            </p>
            <div className="flex gap-3">
              <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2.5 text-sm text-gray-600 truncate">
                https://apostasocial.com/bets/{bet.id}
              </div>
              <button onClick={handleCopyLink} className="gradient-btn-sm">
                Copiar Link
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
