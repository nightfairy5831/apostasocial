"use client";

import { useState } from "react";
import Link from "next/link";
import { DiceIcon } from "@/components/Icons";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Blur circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary-600 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary-500 rounded-full opacity-20 blur-3xl" />

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <DiceIcon className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold gradient-text font-poppins">
              ApostaSocial
            </span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1 font-poppins"
            >
              Nome Completo
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1 font-poppins"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="seu_username"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1 font-poppins"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1 font-poppins"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1 font-poppins"
            >
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-poppins focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          <p className="text-xs text-gray-500 font-poppins">
            Ao criar conta voce concorda com os{" "}
            <Link
              href="#"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Termos de Uso
            </Link>
          </p>

          <button type="submit" className="gradient-btn justify-center w-full">
            Criar Conta
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm text-gray-500 mt-6 font-poppins">
          Ja tem conta?{" "}
          <Link
            href="/login"
            className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
