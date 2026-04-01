"use client";

import { useState } from "react";
import Link from "next/link";
import { DiceIcon } from "@/components/Icons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <p className="text-gray-500 text-sm font-poppins">
            Apostas Entre Amigos
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
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

          <div className="text-right">
            <Link
              href="#"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium font-poppins transition-colors"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <button type="submit" className="gradient-btn justify-center w-full">
            Entrar
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500 mt-6 font-poppins">
          Nao tem conta?{" "}
          <Link
            href="/register"
            className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
