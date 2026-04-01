import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  DiceIcon,
  TrophyIcon,
  WalletIcon,
  UsersIcon,
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
  ShieldIcon,
  ChatIcon,
  ShareIcon,
  ClockIcon,
  FireIcon,
  VoteIcon,
  DollarIcon,
} from "@/components/Icons";
import { platformStats, testimonials } from "@/data/mockData";

const howItWorks = [
  {
    step: 1,
    title: "Crie sua Aposta",
    description:
      "Defina o tema, as opcoes, o valor da entrada e o prazo. Pode ser sobre futebol, reality shows, desafios pessoais ou qualquer coisa!",
    icon: DiceIcon,
  },
  {
    step: 2,
    title: "Convide os Amigos",
    description:
      "Compartilhe o link da aposta ou convide direto pela plataforma. Quanto mais amigos, maior a caixinha!",
    icon: ShareIcon,
  },
  {
    step: 3,
    title: "Participem da Caixinha",
    description:
      "Cada participante escolhe sua opcao e paga a entrada. O valor vai direto para a caixinha da aposta.",
    icon: WalletIcon,
  },
  {
    step: 4,
    title: "Premio Automatico",
    description:
      "Quando o resultado sai, o premio e distribuido automaticamente via Pix para os vencedores. Simples assim!",
    icon: TrophyIcon,
  },
];

const features = [
  {
    title: "Apostas Personalizadas",
    description:
      "Crie apostas sobre qualquer tema. Futebol, BBB, politica, desafios entre amigos e muito mais.",
    icon: DiceIcon,
  },
  {
    title: "Chat em Tempo Real",
    description:
      "Converse com os participantes durante a aposta. Provoque, comemore e se divirta com os amigos.",
    icon: ChatIcon,
  },
  {
    title: "Carteira Digital",
    description:
      "Deposite e saque via Pix. Acompanhe seu saldo, historico de transacoes e premios recebidos.",
    icon: WalletIcon,
  },
  {
    title: "Ranking e Badges",
    description:
      "Suba no ranking, conquiste badges exclusivos e mostre quem e o melhor apostador do grupo.",
    icon: TrophyIcon,
  },
  {
    title: "Ligas Privadas",
    description:
      "Crie ligas exclusivas para seu grupo de amigos, familia ou colegas de trabalho.",
    icon: UsersIcon,
  },
  {
    title: "Votacao Social",
    description:
      "Para apostas subjetivas, os participantes votam no resultado. Democracia pura entre amigos!",
    icon: VoteIcon,
  },
];

const betCategories = [
  { name: "Futebol", color: "bg-green-100 text-green-700" },
  { name: "Reality Shows", color: "bg-pink-100 text-pink-700" },
  { name: "Politica", color: "bg-blue-100 text-blue-700" },
  { name: "Desafios Pessoais", color: "bg-orange-100 text-orange-700" },
  { name: "Automobilismo", color: "bg-red-100 text-red-700" },
  { name: "E-Sports", color: "bg-purple-100 text-purple-700" },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="pt-24 pb-16 md:pb-24 bg-gradient-hero relative overflow-hidden">
        {/* Blur circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/3 w-64 h-64 bg-accent-400/15 rounded-full blur-3xl" />

        <div className="container-max px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left: Text */}
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                <span className="gradient-text">Apostas</span> Entre Amigos.{" "}
                <br />
                <span className="gradient-text">Diversao</span> Garantida.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
                Crie apostas personalizadas sobre qualquer tema, convide seus
                amigos e divida os premios automaticamente. A plataforma social
                de apostas mais divertida do Brasil.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/create" className="gradient-btn">
                  Criar Aposta
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <Link href="/explore" className="gradient-btn-outline">
                  Explorar Apostas
                </Link>
              </div>
            </div>

            {/* Right: Image with floating stats */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop"
                  alt="Amigos se divertindo juntos"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              {/* Floating stat: Premios */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                  <DollarIcon className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">R$8M+</p>
                  <p className="text-xs text-gray-500">Premios</p>
                </div>
              </div>

              {/* Floating stat: Usuarios */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 text-secondary-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">50K+</p>
                  <p className="text-xs text-gray-500">Usuarios</p>
                </div>
              </div>

              {/* Floating stat: Apostas */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <DiceIcon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">125K+</p>
                  <p className="text-xs text-gray-500">Apostas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-gradient-dark py-12">
        <div className="container-max px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {platformStats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-white/80 mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-white/50 mt-0.5">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Como <span className="gradient-text">Funciona</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Em apenas 4 passos voce cria sua aposta e divide a diversao com os
              amigos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="text-center group">
                  <div className="relative mx-auto mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent-400 text-white text-xs font-bold flex items-center justify-center shadow-md">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Tudo que voce <span className="gradient-text">precisa</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Recursos pensados para tornar suas apostas entre amigos mais
              divertidas, seguras e transparentes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BET TYPES ===== */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Aposte em <span className="gradient-text">Tudo</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              De esportes a reality shows, de politica a desafios pessoais.
              Se existe uma opiniao, existe uma aposta.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {betCategories.map((cat, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-200 transition-all duration-300 group cursor-pointer"
              >
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${cat.color}`}
                >
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              O que nossos <span className="gradient-text">apostadores</span>{" "}
              dizem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative"
              >
                {/* Quote SVG */}
                <svg
                  className="w-10 h-10 text-primary-200 mb-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-gradient-dark py-20">
        <div className="container-max px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para Apostar com os Amigos?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Junte-se a milhares de pessoas que ja estao se divertindo com
            apostas sociais. Crie sua conta gratis e faca sua primeira aposta
            agora!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2"
            >
              Criar Conta Gratis
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              href="/explore"
              className="border-2 border-white/30 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2"
            >
              Explorar Apostas
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
