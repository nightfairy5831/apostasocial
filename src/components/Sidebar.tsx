"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DiceIcon, HomeIcon, PlusIcon, WalletIcon, TrophyIcon, UsersIcon, UserIcon, ChartIcon, SearchIcon } from "./Icons";

const links = [
  { label: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { label: "Criar Aposta", href: "/create", icon: PlusIcon },
  { label: "Explorar", href: "/explore", icon: SearchIcon },
  { label: "Carteira", href: "/wallet", icon: WalletIcon },
  { label: "Ranking", href: "/rankings", icon: TrophyIcon },
  { label: "Ligas", href: "/leagues", icon: UsersIcon },
  { label: "Perfil", href: "/profile", icon: UserIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gradient-dark z-40 flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <DiceIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">ApostaSocial</span>
        </Link>
        <p className="text-xs text-white/50 mt-2 pl-10">Apostas Entre Amigos</p>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className={isActive ? "sidebar-link-active" : "sidebar-link"}>
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <Link href="/" className="sidebar-link text-xs">
          <HomeIcon className="w-4 h-4" />
          Voltar ao Site
        </Link>
      </div>
    </aside>
  );
}
