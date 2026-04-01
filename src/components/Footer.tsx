import Link from "next/link";
import { DiceIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <DiceIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ApostaSocial</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">Apostas sociais entre amigos. Diversao, transparencia e premios automaticos.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Plataforma</h3>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-sm text-gray-400 hover:text-white transition-colors">Explorar Apostas</Link></li>
              <li><Link href="/create" className="text-sm text-gray-400 hover:text-white transition-colors">Criar Aposta</Link></li>
              <li><Link href="/rankings" className="text-sm text-gray-400 hover:text-white transition-colors">Ranking</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Social</h3>
            <ul className="space-y-2">
              <li><Link href="/leagues" className="text-sm text-gray-400 hover:text-white transition-colors">Ligas Privadas</Link></li>
              <li><Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">Minha Area</Link></li>
              <li><Link href="/wallet" className="text-sm text-gray-400 hover:text-white transition-colors">Carteira Digital</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400">contato@apostasocial.com.br</li>
              <li className="text-sm text-gray-400">Central de Ajuda</li>
              <li className="text-sm text-gray-400">Termos de Uso</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">&copy; 2026 ApostaSocial. Todos os direitos reservados.</p>
          <p className="text-xs text-gray-600">Plataforma de entretenimento social. Nao constitui jogo de azar regulamentado.</p>
        </div>
      </div>
    </footer>
  );
}
