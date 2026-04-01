"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  WalletIcon,
  DollarIcon,
  TrendUpIcon,
  ArrowRightIcon,
  ClockIcon,
  CheckIcon,
} from "@/components/Icons";
import {
  users,
  transactions,
  formatCurrency,
  formatDate,
} from "@/data/mockData";

const user = users.find((u) => u.id === 1)!;
const userTransactions = [...transactions]
  .filter((t) => t.userId === 1)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const totalDeposited = userTransactions
  .filter((t) => t.type === "deposit")
  .reduce((sum, t) => sum + t.amount, 0);

const totalPrizes = userTransactions
  .filter((t) => t.type === "prize")
  .reduce((sum, t) => sum + t.amount, 0);

const totalBetEntries = userTransactions
  .filter((t) => t.type === "bet_entry")
  .reduce((sum, t) => sum + Math.abs(t.amount), 0);

const typeLabels: Record<string, string> = {
  deposit: "Deposito",
  withdrawal: "Saque",
  bet_entry: "Aposta",
  prize: "Premio",
  refund: "Reembolso",
};

const typeBadgeClasses: Record<string, string> = {
  deposit:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800",
  withdrawal:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800",
  bet_entry:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800",
  prize:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800",
  refund:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800",
};

const statusBadgeClasses: Record<string, string> = {
  completed:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800",
  pending:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800",
  failed:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800",
};

const statusLabelsMap: Record<string, string> = {
  completed: "Concluido",
  pending: "Pendente",
  failed: "Falhou",
};

type TabKey = "extrato" | "depositar" | "sacar";

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("extrato");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [pixKey, setPixKey] = useState("");
  const [holderName, setHolderName] = useState("");
  const [cpf, setCpf] = useState("");

  const tabs: { key: TabKey; label: string }[] = [
    { key: "extrato", label: "Extrato" },
    { key: "depositar", label: "Depositar" },
    { key: "sacar", label: "Sacar" },
  ];

  return (
    <>
      <Sidebar />
      <main className="page-container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="page-title">Carteira Digital</h1>
          <p className="page-subtitle">
            Gerencie seu saldo, depositos e saques.
          </p>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-dark rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-4 right-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <WalletIcon className="w-5 h-5 text-white/70" />
              <span className="text-sm text-white/70 font-medium">
                Saldo disponivel
              </span>
            </div>
            <p className="text-4xl font-bold mb-6">
              {formatCurrency(user.balance)}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab("depositar")}
                className="bg-white text-primary-700 font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-white/90 transition-all"
              >
                Depositar
              </button>
              <button
                onClick={() => setActiveTab("sacar")}
                className="bg-white/15 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-white/25 transition-all border border-white/20"
              >
                Sacar
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <DollarIcon className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Total Depositado
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(totalDeposited)}
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                <TrendUpIcon className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Total em Premios
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(totalPrizes)}
            </p>
          </div>

          <div className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <WalletIcon className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Total Apostado
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(totalBetEntries)}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Extrato Tab */}
        {activeTab === "extrato" && (
          <div className="card overflow-hidden">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descricao</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userTransactions.map((tx) => {
                  const isPositive =
                    tx.type === "deposit" ||
                    tx.type === "prize" ||
                    tx.type === "refund";
                  return (
                    <tr key={tx.id}>
                      <td className="whitespace-nowrap">
                        {formatDate(tx.date)}
                      </td>
                      <td>{tx.description}</td>
                      <td>
                        <span className={typeBadgeClasses[tx.type]}>
                          {typeLabels[tx.type]}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`font-bold ${
                            isPositive ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {isPositive ? "+" : ""}
                          {formatCurrency(Math.abs(tx.amount))}
                        </span>
                      </td>
                      <td>
                        <span className={statusBadgeClasses[tx.status]}>
                          {statusLabelsMap[tx.status]}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Depositar Tab */}
        {activeTab === "depositar" && (
          <div className="card p-8 max-w-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Depositar Fundos
            </h3>

            <div className="mb-5">
              <label
                htmlFor="deposit-amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Valor do Deposito
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                  R$
                </span>
                <input
                  id="deposit-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0,00"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metodo de Pagamento
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setPaymentMethod("pix")}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                    paymentMethod === "pix"
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  Pix
                </button>
                <button
                  onClick={() => setPaymentMethod("cartao")}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                    paymentMethod === "cartao"
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  Cartao
                </button>
              </div>
            </div>

            <button className="gradient-btn justify-center w-full">
              <CheckIcon className="w-5 h-5" />
              Confirmar Deposito
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              Taxa: 0% - Deposito sem custos adicionais
            </p>
          </div>
        )}

        {/* Sacar Tab */}
        {activeTab === "sacar" && (
          <div className="card p-8 max-w-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Solicitar Saque
            </h3>

            <div className="mb-5">
              <label
                htmlFor="withdraw-amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Valor do Saque
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                  R$
                </span>
                <input
                  id="withdraw-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0,00"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
              <p className="text-sm font-medium text-blue-700">
                Saque via Pix
              </p>
              <p className="text-xs text-blue-500 mt-1">
                Informe seus dados para receber o valor na sua conta.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="holder-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nome Completo
                </label>
                <input
                  id="holder-name"
                  type="text"
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="cpf"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  CPF
                </label>
                <input
                  id="cpf"
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="pix-key"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Chave Pix
                </label>
                <input
                  id="pix-key"
                  type="text"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  placeholder="CPF, email, telefone ou chave aleatoria"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                />
              </div>
            </div>

            <button className="gradient-btn justify-center w-full">
              <ArrowRightIcon className="w-5 h-5" />
              Solicitar Saque
            </button>

            <div className="flex items-center justify-center gap-2 mt-4">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <p className="text-xs text-gray-400">Prazo: 1 dia util</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
