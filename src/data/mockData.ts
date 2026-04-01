// ===== TYPES =====
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  balance: number;
  totalBets: number;
  wins: number;
  winRate: number;
  badges: Badge[];
  leagues: number[];
  joinedDate: string;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: string;
}

export interface Bet {
  id: number;
  title: string;
  description: string;
  category: string;
  type: "objective" | "subjective";
  creatorId: number;
  creatorName: string;
  entryFee: number;
  totalPot: number;
  maxParticipants: number;
  currentParticipants: number;
  participants: Participant[];
  options: BetOption[];
  status: "open" | "closed" | "voting" | "resolved";
  deadline: string;
  createdAt: string;
  result: string | null;
  winnerId: number | null;
  winnerName: string | null;
  isPrivate: boolean;
  leagueId: number | null;
  chatMessages: ChatMessage[];
}

export interface BetOption {
  id: number;
  label: string;
  votes: number;
  odds: number;
}

export interface Participant {
  userId: number;
  userName: string;
  avatar: string;
  selectedOption: number;
  joinedAt: string;
}

export interface ChatMessage {
  id: number;
  userId: number;
  userName: string;
  message: string;
  timestamp: string;
}

export interface League {
  id: number;
  name: string;
  description: string;
  creatorId: number;
  members: LeagueMember[];
  totalBets: number;
  isPrivate: boolean;
  inviteCode: string;
}

export interface LeagueMember {
  userId: number;
  userName: string;
  avatar: string;
  wins: number;
  totalBets: number;
  points: number;
}

export interface Transaction {
  id: number;
  userId: number;
  type: "deposit" | "withdrawal" | "bet_entry" | "prize" | "refund";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
  betId: number | null;
}

// ===== MOCK DATA =====
export const users: User[] = [
  {
    id: 1, name: "Lucas Mendes", username: "lucasm", email: "lucas@email.com",
    avatar: "LM", balance: 2450.80, totalBets: 45, wins: 28, winRate: 62.2,
    badges: [
      { id: 1, name: "Veterano", description: "Mais de 40 apostas", category: "experiencia", icon: "star" },
      { id: 2, name: "Rei do Futebol", description: "10 vitorias em esportes", category: "esporte", icon: "trophy" },
      { id: 3, name: "Sortudo", description: "3 vitorias seguidas", category: "streak", icon: "fire" },
    ],
    leagues: [1, 2], joinedDate: "2025-08-15",
  },
  {
    id: 2, name: "Ana Carolina", username: "anacarol", email: "ana@email.com",
    avatar: "AC", balance: 1890.50, totalBets: 32, wins: 18, winRate: 56.3,
    badges: [
      { id: 4, name: "Rainha do BBB", description: "5 apostas em reality shows", category: "entretenimento", icon: "crown" },
    ],
    leagues: [1], joinedDate: "2025-09-20",
  },
  {
    id: 3, name: "Pedro Souza", username: "pedros", email: "pedro@email.com",
    avatar: "PS", balance: 3200.00, totalBets: 58, wins: 35, winRate: 60.3,
    badges: [
      { id: 1, name: "Veterano", description: "Mais de 40 apostas", category: "experiencia", icon: "star" },
      { id: 5, name: "Apostador de Elite", description: "Win rate acima de 60%", category: "performance", icon: "medal" },
    ],
    leagues: [1, 2, 3], joinedDate: "2025-07-10",
  },
  {
    id: 4, name: "Juliana Ramos", username: "juramos", email: "juliana@email.com",
    avatar: "JR", balance: 780.25, totalBets: 15, wins: 8, winRate: 53.3,
    badges: [], leagues: [2], joinedDate: "2025-11-05",
  },
  {
    id: 5, name: "Rafael Costa", username: "rafac", email: "rafael@email.com",
    avatar: "RC", balance: 4150.90, totalBets: 72, wins: 48, winRate: 66.7,
    badges: [
      { id: 1, name: "Veterano", description: "Mais de 40 apostas", category: "experiencia", icon: "star" },
      { id: 5, name: "Apostador de Elite", description: "Win rate acima de 60%", category: "performance", icon: "medal" },
      { id: 6, name: "Lider de Liga", description: "Criou 3 ligas", category: "social", icon: "users" },
    ],
    leagues: [1, 3], joinedDate: "2025-06-01",
  },
  {
    id: 6, name: "Camila Oliveira", username: "camilao", email: "camila@email.com",
    avatar: "CO", balance: 1200.00, totalBets: 22, wins: 12, winRate: 54.5,
    badges: [], leagues: [1, 2], joinedDate: "2025-10-15",
  },
];

export const bets: Bet[] = [
  {
    id: 1, title: "Final da Champions League 2026", description: "Quem vai ganhar a final da Champions League? Real Madrid x Manchester City na grande decisao!",
    category: "Futebol", type: "objective", creatorId: 1, creatorName: "Lucas Mendes",
    entryFee: 50, totalPot: 300, maxParticipants: 20, currentParticipants: 6,
    participants: [
      { userId: 1, userName: "Lucas Mendes", avatar: "LM", selectedOption: 1, joinedAt: "2026-03-20" },
      { userId: 2, userName: "Ana Carolina", avatar: "AC", selectedOption: 2, joinedAt: "2026-03-20" },
      { userId: 3, userName: "Pedro Souza", avatar: "PS", selectedOption: 1, joinedAt: "2026-03-21" },
      { userId: 4, userName: "Juliana Ramos", avatar: "JR", selectedOption: 2, joinedAt: "2026-03-21" },
      { userId: 5, userName: "Rafael Costa", avatar: "RC", selectedOption: 1, joinedAt: "2026-03-22" },
      { userId: 6, userName: "Camila Oliveira", avatar: "CO", selectedOption: 2, joinedAt: "2026-03-22" },
    ],
    options: [
      { id: 1, label: "Real Madrid", votes: 3, odds: 1.8 },
      { id: 2, label: "Manchester City", votes: 3, odds: 2.1 },
    ],
    status: "open", deadline: "2026-05-30", createdAt: "2026-03-20", result: null, winnerId: null, winnerName: null,
    isPrivate: false, leagueId: 1,
    chatMessages: [
      { id: 1, userId: 1, userName: "Lucas Mendes", message: "Real Madrid vai amassar!", timestamp: "2026-03-20 15:30" },
      { id: 2, userId: 2, userName: "Ana Carolina", message: "Haaland vai destruir a defesa do Real", timestamp: "2026-03-20 15:45" },
      { id: 3, userId: 5, userName: "Rafael Costa", message: "Vini Jr em noite de Champions nao tem pra ninguem", timestamp: "2026-03-21 10:20" },
    ],
  },
  {
    id: 2, title: "Quem sai do BBB primeiro?", description: "Aposta sobre quem sera o proximo eliminado do Big Brother Brasil 2026.",
    category: "Reality Show", type: "subjective", creatorId: 2, creatorName: "Ana Carolina",
    entryFee: 30, totalPot: 150, maxParticipants: 15, currentParticipants: 5,
    participants: [
      { userId: 1, userName: "Lucas Mendes", avatar: "LM", selectedOption: 1, joinedAt: "2026-03-25" },
      { userId: 2, userName: "Ana Carolina", avatar: "AC", selectedOption: 2, joinedAt: "2026-03-25" },
      { userId: 3, userName: "Pedro Souza", avatar: "PS", selectedOption: 3, joinedAt: "2026-03-26" },
      { userId: 5, userName: "Rafael Costa", avatar: "RC", selectedOption: 1, joinedAt: "2026-03-26" },
      { userId: 6, userName: "Camila Oliveira", avatar: "CO", selectedOption: 2, joinedAt: "2026-03-27" },
    ],
    options: [
      { id: 1, label: "Participante A", votes: 2, odds: 2.5 },
      { id: 2, label: "Participante B", votes: 2, odds: 1.9 },
      { id: 3, label: "Participante C", votes: 1, odds: 3.2 },
    ],
    status: "open", deadline: "2026-04-08", createdAt: "2026-03-25", result: null, winnerId: null, winnerName: null,
    isPrivate: false, leagueId: null,
    chatMessages: [
      { id: 4, userId: 2, userName: "Ana Carolina", message: "O B vai sair com certeza, ta muito planta", timestamp: "2026-03-25 20:00" },
      { id: 5, userId: 3, userName: "Pedro Souza", message: "Eu acho que o C vai surpreender todo mundo", timestamp: "2026-03-26 09:15" },
    ],
  },
  {
    id: 3, title: "Eleicao Presidente do Clube 2026", description: "Quem sera eleito o novo presidente do clube? Vamos apostar!",
    category: "Politica", type: "objective", creatorId: 3, creatorName: "Pedro Souza",
    entryFee: 100, totalPot: 400, maxParticipants: 10, currentParticipants: 4,
    participants: [
      { userId: 1, userName: "Lucas Mendes", avatar: "LM", selectedOption: 1, joinedAt: "2026-03-15" },
      { userId: 3, userName: "Pedro Souza", avatar: "PS", selectedOption: 2, joinedAt: "2026-03-15" },
      { userId: 5, userName: "Rafael Costa", avatar: "RC", selectedOption: 1, joinedAt: "2026-03-16" },
      { userId: 6, userName: "Camila Oliveira", avatar: "CO", selectedOption: 2, joinedAt: "2026-03-17" },
    ],
    options: [
      { id: 1, label: "Candidato Silva", votes: 2, odds: 1.7 },
      { id: 2, label: "Candidato Santos", votes: 2, odds: 2.3 },
    ],
    status: "closed", deadline: "2026-04-01", createdAt: "2026-03-15", result: "Candidato Silva", winnerId: 1, winnerName: "Lucas Mendes",
    isPrivate: true, leagueId: 2,
    chatMessages: [],
  },
  {
    id: 4, title: "Desafio: Quem corre 5km mais rapido?", description: "Desafio entre amigos! Quem vai completar 5km primeiro neste sabado?",
    category: "Desafio Pessoal", type: "subjective", creatorId: 5, creatorName: "Rafael Costa",
    entryFee: 25, totalPot: 100, maxParticipants: 8, currentParticipants: 4,
    participants: [
      { userId: 1, userName: "Lucas Mendes", avatar: "LM", selectedOption: 1, joinedAt: "2026-03-28" },
      { userId: 3, userName: "Pedro Souza", avatar: "PS", selectedOption: 2, joinedAt: "2026-03-28" },
      { userId: 5, userName: "Rafael Costa", avatar: "RC", selectedOption: 3, joinedAt: "2026-03-28" },
      { userId: 6, userName: "Camila Oliveira", avatar: "CO", selectedOption: 3, joinedAt: "2026-03-29" },
    ],
    options: [
      { id: 1, label: "Lucas vence", votes: 1, odds: 2.8 },
      { id: 2, label: "Pedro vence", votes: 1, odds: 2.5 },
      { id: 3, label: "Rafael vence", votes: 2, odds: 1.6 },
    ],
    status: "voting", deadline: "2026-04-05", createdAt: "2026-03-28", result: null, winnerId: null, winnerName: null,
    isPrivate: true, leagueId: 3,
    chatMessages: [
      { id: 6, userId: 5, userName: "Rafael Costa", message: "Preparem-se pra perder hehe", timestamp: "2026-03-28 18:00" },
      { id: 7, userId: 1, userName: "Lucas Mendes", message: "Vai sonhando Rafael!", timestamp: "2026-03-28 18:15" },
    ],
  },
  {
    id: 5, title: "GP de Formula 1 - Monaco 2026", description: "Quem vai vencer o GP de Monaco? As apostas estao abertas!",
    category: "Automobilismo", type: "objective", creatorId: 1, creatorName: "Lucas Mendes",
    entryFee: 75, totalPot: 225, maxParticipants: 30, currentParticipants: 3,
    participants: [
      { userId: 1, userName: "Lucas Mendes", avatar: "LM", selectedOption: 1, joinedAt: "2026-04-01" },
      { userId: 3, userName: "Pedro Souza", avatar: "PS", selectedOption: 2, joinedAt: "2026-04-01" },
      { userId: 5, userName: "Rafael Costa", avatar: "RC", selectedOption: 3, joinedAt: "2026-04-01" },
    ],
    options: [
      { id: 1, label: "Max Verstappen", votes: 1, odds: 1.5 },
      { id: 2, label: "Lewis Hamilton", votes: 1, odds: 3.5 },
      { id: 3, label: "Charles Leclerc", votes: 1, odds: 2.8 },
    ],
    status: "open", deadline: "2026-05-25", createdAt: "2026-04-01", result: null, winnerId: null, winnerName: null,
    isPrivate: false, leagueId: null,
    chatMessages: [],
  },
  {
    id: 6, title: "Oscar 2026 - Melhor Filme", description: "Qual filme vai levar o Oscar de Melhor Filme este ano?",
    category: "Entretenimento", type: "objective", creatorId: 2, creatorName: "Ana Carolina",
    entryFee: 20, totalPot: 120, maxParticipants: 50, currentParticipants: 6,
    participants: [
      { userId: 1, userName: "Lucas Mendes", avatar: "LM", selectedOption: 2, joinedAt: "2026-02-01" },
      { userId: 2, userName: "Ana Carolina", avatar: "AC", selectedOption: 1, joinedAt: "2026-02-01" },
      { userId: 3, userName: "Pedro Souza", avatar: "PS", selectedOption: 3, joinedAt: "2026-02-02" },
      { userId: 4, userName: "Juliana Ramos", avatar: "JR", selectedOption: 1, joinedAt: "2026-02-03" },
      { userId: 5, userName: "Rafael Costa", avatar: "RC", selectedOption: 2, joinedAt: "2026-02-03" },
      { userId: 6, userName: "Camila Oliveira", avatar: "CO", selectedOption: 3, joinedAt: "2026-02-04" },
    ],
    options: [
      { id: 1, label: "Filme A", votes: 2, odds: 2.0 },
      { id: 2, label: "Filme B", votes: 2, odds: 2.2 },
      { id: 3, label: "Filme C", votes: 2, odds: 3.0 },
    ],
    status: "resolved", deadline: "2026-03-10", createdAt: "2026-02-01", result: "Filme B", winnerId: 1, winnerName: "Lucas Mendes",
    isPrivate: false, leagueId: 1,
    chatMessages: [],
  },
];

export const leagues: League[] = [
  {
    id: 1, name: "Bolao dos Amigos", description: "Liga oficial do grupo de amigos. Apostas em esportes e entretenimento!",
    creatorId: 1, totalBets: 15, isPrivate: true, inviteCode: "AMIGOS2026",
    members: [
      { userId: 1, userName: "Lucas Mendes", avatar: "LM", wins: 8, totalBets: 15, points: 1250 },
      { userId: 2, userName: "Ana Carolina", avatar: "AC", wins: 5, totalBets: 12, points: 980 },
      { userId: 3, userName: "Pedro Souza", avatar: "PS", wins: 10, totalBets: 15, points: 1480 },
      { userId: 5, userName: "Rafael Costa", avatar: "RC", wins: 12, totalBets: 15, points: 1620 },
      { userId: 6, userName: "Camila Oliveira", avatar: "CO", wins: 4, totalBets: 10, points: 720 },
    ],
  },
  {
    id: 2, name: "Liga do Escritorio", description: "Apostas do pessoal do trabalho. So diversao!",
    creatorId: 3, totalBets: 8, isPrivate: true, inviteCode: "OFFICE26",
    members: [
      { userId: 1, userName: "Lucas Mendes", avatar: "LM", wins: 3, totalBets: 8, points: 580 },
      { userId: 4, userName: "Juliana Ramos", avatar: "JR", wins: 2, totalBets: 6, points: 420 },
      { userId: 6, userName: "Camila Oliveira", avatar: "CO", wins: 4, totalBets: 8, points: 650 },
    ],
  },
  {
    id: 3, name: "Desafio Fitness", description: "Liga de apostas em desafios fisicos e esportivos entre amigos.",
    creatorId: 5, totalBets: 5, isPrivate: true, inviteCode: "FIT2026",
    members: [
      { userId: 3, userName: "Pedro Souza", avatar: "PS", wins: 2, totalBets: 5, points: 380 },
      { userId: 5, userName: "Rafael Costa", avatar: "RC", wins: 4, totalBets: 5, points: 520 },
    ],
  },
];

export const transactions: Transaction[] = [
  { id: 1, userId: 1, type: "deposit", amount: 500, description: "Deposito via Pix", date: "2026-03-28", status: "completed", betId: null },
  { id: 2, userId: 1, type: "bet_entry", amount: -50, description: "Entrada: Final Champions League", date: "2026-03-20", status: "completed", betId: 1 },
  { id: 3, userId: 1, type: "bet_entry", amount: -30, description: "Entrada: Quem sai do BBB", date: "2026-03-25", status: "completed", betId: 2 },
  { id: 4, userId: 1, type: "prize", amount: 180, description: "Premio: Oscar 2026 - Melhor Filme", date: "2026-03-10", status: "completed", betId: 6 },
  { id: 5, userId: 1, type: "bet_entry", amount: -100, description: "Entrada: Eleicao Presidente Clube", date: "2026-03-15", status: "completed", betId: 3 },
  { id: 6, userId: 1, type: "prize", amount: 340, description: "Premio: Eleicao Presidente Clube", date: "2026-04-01", status: "completed", betId: 3 },
  { id: 7, userId: 1, type: "bet_entry", amount: -25, description: "Entrada: Desafio 5km", date: "2026-03-28", status: "completed", betId: 4 },
  { id: 8, userId: 1, type: "bet_entry", amount: -75, description: "Entrada: GP Monaco F1", date: "2026-04-01", status: "completed", betId: 5 },
  { id: 9, userId: 1, type: "deposit", amount: 1000, description: "Deposito via Cartao", date: "2026-03-01", status: "completed", betId: null },
  { id: 10, userId: 1, type: "withdrawal", amount: -300, description: "Saque via Pix", date: "2026-03-15", status: "completed", betId: null },
  { id: 11, userId: 1, type: "bet_entry", amount: -20, description: "Entrada: Oscar 2026", date: "2026-02-01", status: "completed", betId: 6 },
  { id: 12, userId: 1, type: "deposit", amount: 200, description: "Deposito via Pix", date: "2026-02-15", status: "completed", betId: null },
];

export const platformStats = [
  { label: "Apostas Criadas", value: "125,000+", description: "Entre amigos" },
  { label: "Usuarios Ativos", value: "50,000+", description: "Comunidade crescendo" },
  { label: "Premios Distribuidos", value: "R$ 8M+", description: "Pagamento automatico" },
  { label: "Ligas Privadas", value: "12,000+", description: "Grupos de amigos" },
];

export const testimonials = [
  { name: "Lucas Mendes", role: "Apostador desde 2025", avatar: "LM", text: "A melhor parte e criar apostas personalizadas com os amigos. A caixinha automatica e o pagamento por Pix tornam tudo muito facil e transparente." },
  { name: "Ana Carolina", role: "Fa de Reality Shows", avatar: "AC", text: "Adoro apostar no BBB com minhas amigas! O chat durante a aposta e super divertido e a votacao para apostas subjetivas e genial." },
  { name: "Rafael Costa", role: "Lider de 3 Ligas", avatar: "RC", text: "As ligas privadas sao perfeitas pro nosso grupo. O ranking com badges motiva todo mundo e a taxa de 10% e justa pelo servico." },
];

export const categories = ["Futebol", "Reality Show", "Politica", "Desafio Pessoal", "Automobilismo", "Entretenimento", "Basquete", "MMA", "E-Sports", "Outros"];

// ===== UTILITY FUNCTIONS =====
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("pt-BR").format(value);
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
};

export const formatDateTime = (dateStr: string): string => {
  const date = new Date(dateStr.replace(" ", "T"));
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
};

export const statusLabels: Record<string, string> = {
  open: "Aberta", closed: "Encerrada", voting: "Em Votacao", resolved: "Resolvida",
};

export const statusBadges: Record<string, string> = {
  open: "badge-open", closed: "badge-closed", voting: "badge-voting", resolved: "badge-resolved",
};
