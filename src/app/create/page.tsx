"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  DiceIcon,
  PlusIcon,
  CheckIcon,
  ArrowRightIcon,
  ClockIcon,
  UsersIcon,
  DollarIcon,
  LockIcon,
  GlobeIcon,
} from "@/components/Icons";
import { categories } from "@/data/mockData";

export default function CreateBetPage() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"objective" | "subjective">("objective");
  const [entryFee, setEntryFee] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [options, setOptions] = useState<string[]>(["", ""]);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== index));
  };

  const canProceedStep1 = title.trim() && description.trim() && category;
  const canProceedStep2 = options.filter((o) => o.trim()).length >= 2;
  const canProceedStep3 = entryFee && maxParticipants && deadline;

  const estimatedPot =
    (parseFloat(entryFee) || 0) * (parseInt(maxParticipants) || 0);
  const adminFee = estimatedPot * 0.1;

  const handleCreate = () => {
    alert("Aposta criada com sucesso!");
  };

  const stepLabels = ["Detalhes", "Opcoes", "Regras", "Revisao"];

  return (
    <>
      <Sidebar />
      <main className="page-container">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <DiceIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="page-title">Criar Nova Aposta</h1>
              <p className="page-subtitle">
                Configure sua aposta em poucos passos
              </p>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center gap-2 mb-8">
            {stepLabels.map((label, index) => {
              const stepNum = index + 1;
              const isCompleted = step > stepNum;
              const isCurrent = step === stepNum;
              return (
                <div key={label} className="flex items-center gap-2 flex-1">
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                        isCompleted
                          ? "bg-gradient-primary text-white"
                          : isCurrent
                          ? "bg-primary-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckIcon className="w-4 h-4" />
                      ) : (
                        stepNum
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium hidden sm:block ${
                        isCurrent ? "text-primary-600" : "text-gray-500"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {index < stepLabels.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 rounded ${
                        isCompleted ? "bg-primary-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step 1: Detalhes */}
          {step === 1 && (
            <div className="card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Detalhes da Aposta
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Titulo da Aposta
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Quem ganha o jogo de domingo?"
                  className="filter-input w-full"
                  maxLength={100}
                />
                <p className="text-xs text-gray-400 mt-1">
                  {title.length}/100 caracteres
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Descricao
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva os detalhes e regras da aposta..."
                  className="filter-input w-full h-28 resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-gray-400 mt-1">
                  {description.length}/500 caracteres
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Categoria
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="filter-select w-full"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Tipo de Aposta
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setType("objective")}
                    className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                      type === "objective"
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-semibold text-gray-900 text-sm">
                      Objetiva
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Resultado verificavel automaticamente (ex: placar de jogo,
                      resultado de eleicao)
                    </p>
                  </button>
                  <button
                    onClick={() => setType("subjective")}
                    className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                      type === "subjective"
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-semibold text-gray-900 text-sm">
                      Subjetiva
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Resultado decidido por votacao dos participantes (ex:
                      desafios pessoais)
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Opcoes */}
          {step === 2 && (
            <div className="card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Opcoes de Aposta
              </h2>
              <p className="text-sm text-gray-500">
                Adicione pelo menos 2 opcoes para os participantes escolherem.
              </p>

              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-400 w-6 text-center">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Opcao ${index + 1}`}
                      className="filter-input flex-1"
                      maxLength={80}
                    />
                    {options.length > 2 && (
                      <button
                        onClick={() => removeOption(index)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1"
                        title="Remover opcao"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addOption}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
                Adicionar Opcao
              </button>

              {options.filter((o) => o.trim()).length < 2 && (
                <p className="text-xs text-amber-600">
                  Minimo de 2 opcoes preenchidas para continuar.
                </p>
              )}
            </div>
          )}

          {/* Step 3: Regras */}
          {step === 3 && (
            <div className="card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Regras e Configuracoes
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <DollarIcon className="w-4 h-4 text-primary-500" />
                    Taxa de Entrada (R$)
                  </label>
                  <input
                    type="number"
                    value={entryFee}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (e.target.value === "" || (val >= 0 && val <= 1000)) {
                        setEntryFee(e.target.value);
                      }
                    }}
                    placeholder="0,00"
                    className="filter-input w-full"
                    min="0"
                    max="1000"
                    step="5"
                  />
                  <p className="text-xs text-gray-400 mt-1">Maximo R$1.000</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <UsersIcon className="w-4 h-4 text-primary-500" />
                    Maximo de Participantes
                  </label>
                  <input
                    type="number"
                    value={maxParticipants}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (e.target.value === "" || (val >= 2 && val <= 100)) {
                        setMaxParticipants(e.target.value);
                      }
                    }}
                    placeholder="2-100"
                    className="filter-input w-full"
                    min="2"
                    max="100"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Entre 2 e 100 participantes
                  </p>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                  <ClockIcon className="w-4 h-4 text-primary-500" />
                  Prazo Final
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="filter-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Privacidade
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsPrivate(false)}
                    className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      !isPrivate
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <GlobeIcon className="w-5 h-5 text-primary-500" />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 text-sm">
                        Publica
                      </p>
                      <p className="text-xs text-gray-500">
                        Qualquer pessoa pode participar
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => setIsPrivate(true)}
                    className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      isPrivate
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <LockIcon className="w-5 h-5 text-primary-500" />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 text-sm">
                        Privada
                      </p>
                      <p className="text-xs text-gray-500">
                        Apenas convidados podem participar
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Revisao */}
          {step === 4 && (
            <div className="card p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Revisao da Aposta
              </h2>
              <p className="text-sm text-gray-500">
                Confira todos os detalhes antes de criar sua aposta.
              </p>

              <div className="space-y-4">
                {/* Title & Description */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Titulo
                  </p>
                  <p className="text-gray-900 font-medium">{title}</p>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 mt-3">
                    Descricao
                  </p>
                  <p className="text-gray-700 text-sm">{description}</p>
                </div>

                {/* Category & Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Categoria
                    </p>
                    <p className="text-gray-900 font-medium text-sm">
                      {category}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Tipo
                    </p>
                    <p className="text-gray-900 font-medium text-sm">
                      {type === "objective" ? "Objetiva" : "Subjetiva"}
                    </p>
                  </div>
                </div>

                {/* Options */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Opcoes
                  </p>
                  <div className="space-y-1.5">
                    {options
                      .filter((o) => o.trim())
                      .map((opt, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <CheckIcon className="w-4 h-4 text-secondary-500" />
                          {opt}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Rules */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Taxa de Entrada
                    </p>
                    <p className="text-gray-900 font-medium text-sm">
                      R$ {parseFloat(entryFee || "0").toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Max. Participantes
                    </p>
                    <p className="text-gray-900 font-medium text-sm">
                      {maxParticipants}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Prazo Final
                    </p>
                    <p className="text-gray-900 font-medium text-sm">
                      {deadline}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Privacidade
                    </p>
                    <div className="flex items-center gap-1.5 text-sm text-gray-900 font-medium">
                      {isPrivate ? (
                        <>
                          <LockIcon className="w-4 h-4 text-primary-500" />
                          Privada
                        </>
                      ) : (
                        <>
                          <GlobeIcon className="w-4 h-4 text-primary-500" />
                          Publica
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Estimated Pot */}
                <div className="p-4 bg-gradient-primary rounded-xl text-white">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-white/80">
                      Pote Estimado (maximo)
                    </p>
                    <p className="text-xl font-bold">
                      R$ {estimatedPot.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-white/80">
                      Taxa administrativa (10%)
                    </p>
                    <p className="text-sm font-semibold">
                      - R$ {adminFee.toFixed(2)}
                    </p>
                  </div>
                  <div className="border-t border-white/20 mt-2 pt-2 flex justify-between items-center">
                    <p className="text-sm font-medium text-white/80">
                      Premio liquido estimado
                    </p>
                    <p className="text-lg font-bold">
                      R$ {(estimatedPot - adminFee).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCreate}
                className="gradient-btn w-full justify-center text-base"
              >
                <DiceIcon className="w-5 h-5" />
                Criar Aposta
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="gradient-btn-outline"
              >
                Anterior
              </button>
            ) : (
              <div />
            )}
            {step < 4 && (
              <button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !canProceedStep1) ||
                  (step === 2 && !canProceedStep2) ||
                  (step === 3 && !canProceedStep3)
                }
                className={`gradient-btn ${
                  (step === 1 && !canProceedStep1) ||
                  (step === 2 && !canProceedStep2) ||
                  (step === 3 && !canProceedStep3)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Proximo
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
