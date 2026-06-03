import { col, L, BR } from "../colors"
import type { CommandHandler } from "../types"

// ── Fun & Games Commands ───────────────────────────────────────────────────────

export const funCommands: Record<string, CommandHandler> = {
  hack: () => [
    L("Initializing attack sequence...", col.red),
    L("Scanning target...", col.red),
    L("Bypassing firewall...", col.red),
    L("Accessing mainframe...", col.red),
    L("Decrypting database...", col.red),
    BR(),
    L("lol no.", col.primary),
    L("If you actually want to do security stuff, check out VulnRadar.", col.muted),
    L("https://vulnradar.dev", col.cyan),
    BR(),
  ],

  matrix: () => [
    L("Wake up, Neo...", col.green),
    L("The Matrix has you...", col.green),
    L("Follow the white rabbit.", col.green),
    BR(),
    L("01010010 01000101 01001010 01000101 01000011 01010100", col.green),
    L("01001101 01001111 01000100 01000100 01000101 01010010", col.green),
    L("01010011 00100000 01010010 01010101 01001100 01000101", col.green),
    BR(),
    L("(decoded: REJECTMODDERS RULE)", col.muted),
    BR(),
  ],

  cmatrix: () => [
    L("01001000 01100001 01100011 01101011", col.green),
    L("01100101 01110010 00100000 01110011", col.green),
    L("01110000 01101111 01110100 01110100", col.green),
    L("01100101 01100100 00100001 00100000", col.green),
    BR(),
    L("Decoded: Hacker spotted! ", col.muted),
    L("The matrix is just Next.js all the way down.", col.primary),
    BR(),
  ],

  cowsay: () => [
    L(" ________________________________", col.fg),
    L("< moo. you found the terminal. >", col.fg),
    L(" --------------------------------", col.fg),
    L("        \\   ^__^", col.fg),
    L("         \\  (oo)\\_______", col.fg),
    L("            (__)\\       )\\/\\", col.fg),
    L("                ||----w |", col.fg),
    L("                ||     ||", col.fg),
    BR(),
  ],

  fortune: () => {
    const fortunes = [
      "There's no place like 127.0.0.1.",
      "It works on my machine.",
      "Have you tried turning it off and on again?",
      "rm -rf / is not a valid debugging strategy.",
      "The best code is no code at all.",
      "A bug is just an undocumented feature.",
      "99 little bugs in the code... 99 little bugs... take one down, patch it around... 127 little bugs in the code.",
      "To understand recursion, you must first understand recursion.",
      "Go to sleep. The code will still be broken in the morning.",
      "Always code as if the person maintaining your code is a violent psychopath who knows where you live.",
      "Talk is cheap. Show me the code. - Linus Torvalds",
      "First, solve the problem. Then, write the code. - John Johnson",
    ]
    const f = fortunes[Math.floor(Math.random() * fortunes.length)]
    return [
      L("─────────────────────────────────────", col.muted),
      L(f, col.yellow),
      L("─────────────────────────────────────", col.muted),
      BR(),
    ]
  },

  joke: () => {
    const jokes = [
      ["Why do programmers prefer dark mode?", "Because light attracts bugs."],
      ["How many programmers does it take to change a light bulb?", "None - it's a hardware problem."],
      ["A SQL query walks into a bar...", "...walks up to two tables and asks: 'Can I join you?'"],
      ["Why do Java developers wear glasses?", "Because they don't C#."],
      ["What's a programmer's favourite hangout place?", "Foo Bar."],
      ["Why did the developer go broke?", "Because they used up all their cache."],
      ["What do you call a programmer from Finland?", "Nerdic."],
      ["Why was the JavaScript developer sad?", "Because they didn't Node how to Express themselves."],
      ["I have a joke about UDP...", "...but you might not get it."],
      ["There are 10 types of people in the world.", "Those who understand binary and those who don't."],
    ]
    const [setup, punchline] = jokes[Math.floor(Math.random() * jokes.length)]
    return [
      L(setup, col.fg),
      L(punchline, col.yellow),
      BR(),
    ]
  },

  quote: () => {
    const quotes = [
      ["The quieter you become, the more you can hear.", "- Ram Dass"],
      ["First, do no harm.", "- Hippocrates (also applies to prod deployments)"],
      ["The only way to do great work is to love what you do.", "- Steve Jobs"],
      ["Security is a process, not a product.", "- Bruce Schneier"],
      ["With great power comes great responsibility.", "- Uncle Ben (and sudo)"],
      ["The best defense is a good offense.", "- Sun Tzu / every pentester ever"],
      ["Simplicity is the ultimate sophistication.", "- Leonardo da Vinci"],
      ["Move fast and break things.", "- Zuckerberg (please don't do this in prod)"],
      ["If it's stupid but it works, it's not stupid.", "- Murphy's Other Law"],
      ["Never trust user input.", "- Every security engineer, always"],
    ]
    const [q, attr] = quotes[Math.floor(Math.random() * quotes.length)]
    return [
      L(`"${q}"`, col.cyan),
      L(`  ${attr}`, col.muted),
      BR(),
    ]
  },

  weather: () => [
    L("Weather for: rejectmodders.dev (76.76.21.21)", col.primary),
    BR(),
    L("  Location:    The Cloud, Edge Network", col.fg),
    L("  Condition:   Partly Cloudy with a chance of downtime", col.fg),
    L("  Temp:        20C (68F)", col.fg),
    L("  Humidity:    69%", col.fg),
    L("  Wind:        4.2 Gbps NNE", col.fg),
    L("  UV Index:    0 (it's a server room)", col.fg),
    BR(),
    L("  Forecast: Clear skies and fast response times all week.", col.green),
    BR(),
  ],

  lolcat: () => [
    L("R", "text-red-400"),
    L("e", "text-orange-400"),
    L("j", "text-yellow-400"),
    L("e", "text-green-400"),
    L("c", "text-cyan-400"),
    L("t", "text-blue-400"),
    L("M", "text-violet-400"),
    L("o", "text-red-400"),
    L("d", "text-orange-400"),
    L("d", "text-yellow-400"),
    L("e", "text-green-400"),
    L("r", "text-cyan-400"),
    L("s", "text-blue-400"),
    BR(),
    L("(lolcat applied. much rainbow. very wow.)", col.muted),
    BR(),
  ],

  yes: () => [
    L("y", col.fg),
    L("y", col.fg),
    L("y", col.fg),
    L("y", col.fg),
    L("y", col.fg),
    L("y", col.fg),
    L("y", col.fg),
    L("y", col.fg),
    L("y", col.fg),
    L("y", col.fg),
    L("^C", col.red),
    BR(),
  ],

  sl: () => [
    L("        ====        ________                ___________            ", col.yellow),
    L("    _D _|  |_______/        \\__I_I_____===__|_________|            ", col.yellow),
    L("     |(_)---  |   H\\________/ |   |        =|___ ___|    _________________", col.yellow),
    L("     /     |  |   H  |  |     |   |         ||_| |_||   _|                \\_____A", col.yellow),
    L("    |      |  |   H  |__--------------------| [___] |   =|                      |", col.yellow),
    L("    | ________|___H__/__|_____/[][]~\\_______|       |   -|                      |", col.yellow),
    L("    |/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_", col.yellow),
    L("  __/ =| o |=-O=====O=====O=====O \\ ____Y___________|__|__________________________|_", col.yellow),
    L(" |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|", col.yellow),
    L("  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/", col.yellow),
    BR(),
    L("CHOO CHOO! (install sl to avoid this)", col.muted),
    BR(),
  ],

  flip: () => {
    const result = Math.random() < 0.5 ? "HEADS" : "TAILS"
    return [
      L("Flipping coin...", col.muted),
      L(`  ${result}`, result === "HEADS" ? col.green : col.yellow),
      BR(),
    ]
  },
  coinflip: () => funCommands.flip!(),

  shrug: () => [L("\\_(ツ)_/", col.fg), BR()],
  tableflip: () => [L("(╯°□°）╯︵ ┻━┻", col.red), BR()],
  unflip: () => [L("┬─┬ノ( º _ ºノ)", col.green), BR()],

  dice: (args) => {
    const n = Math.min(10, Math.max(1, parseInt((args ?? "").replace(/dice\s*/i, "").trim()) || 1))
    const rolls = Array.from({length: n}, () => Math.floor(Math.random() * 6) + 1)
    const faces = ["", "⚀","⚁","⚂","⚃","⚄","⚅"]
    return [
      L(`Rolling ${n}d6...`, col.muted),
      L(`  ${rolls.map(r => faces[r]).join("  ")}`, col.yellow),
      L(`  Values: ${rolls.join(", ")}  →  Total: ${rolls.reduce((a,b) => a+b, 0)}`, col.fg),
      BR(),
    ]
  },

  rps: (args) => {
    const choices = ["rock","paper","scissors"] as const
    const icons = { rock: "rock", paper: "paper", scissors: "scissors" }
    const raw = (args ?? "").replace(/^rps\s*/i, "").trim().toLowerCase() as typeof choices[number]
    const player = choices.includes(raw) ? raw : choices[Math.floor(Math.random() * 3)]
    const cpu = choices[Math.floor(Math.random() * 3)]
    const win = (player === "rock" && cpu === "scissors") ||
                (player === "paper" && cpu === "rock") ||
                (player === "scissors" && cpu === "paper")
    const result = player === cpu ? "TIE" : win ? "YOU WIN" : "YOU LOSE"
    return [
      L(`  You:      ${icons[player]} ${player}`, col.fg),
      L(`  Computer: ${icons[cpu]} ${cpu}`, col.fg),
      L(`  Result:   ${result}`, win ? col.green : player === cpu ? col.yellow : col.red),
      BR(),
    ]
  },

  doge: () => [
    L("       ▄              ▄           ", col.yellow),
    L("      ▌▒█           ▄▀▒▌          ", col.yellow),
    L("      ▌▒▒█        ▄▀▒▒▒▐          ", col.yellow),
    L("     ▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐          ", col.yellow),
    L("   ▄▄▀▒▒▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐          ", col.yellow),
    L("  ▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀▀▒▒▒▐         ", col.yellow),
    BR(),
    L("  wow. such terminal. very commands. much bash.", col.yellow),
    L("  many linux. so hacker. wow.", col.yellow),
    BR(),
  ],

  nyan: () => [
    L("+      o     +              o   ", "text-pink-400"),
    L("    +             o     +       +", "text-pink-400"),
    L("o          +                       ", "text-pink-400"),
    L("   █████▓▓▓▒▒▒░░░░░░ ≋≋≋≋≋≋≋≋≋≋ ~", "text-pink-400"),
    L("  ██  ██ ██  ██ █████ ≋≋≋≋≋≋≋≋≋≋ ~", "text-yellow-400"),
    L("  ██████ ██████ ██    ≋≋≋≋≋≋≋≋≋≋ ~", "text-green-400"),
    L("  ██  ██ ██  ██ █████ ≋≋≋≋≋≋≋≋≋≋ ~", "text-cyan-400"),
    L("+             +   nyan nyan nyan  ~", "text-blue-400"),
    BR(),
  ],

  parrot: () => [
    L("    party parrot", col.primary),
    L("  PARTY PARROT", col.primary),
    L(" ▓▒░ beep boop ░▒▓", col.muted),
    L("   PARTYING", col.green),
    BR(),
  ],

  rick: () => [
    L("Never gonna give you up,", col.primary),
    L("Never gonna let you down,", col.primary),
    L("Never gonna run around and desert you.", col.primary),
    L("Never gonna make you cry,", col.primary),
    L("Never gonna say goodbye,", col.primary),
    L("Never gonna tell a lie and hurt you.", col.primary),
    BR(),
    L("  You have been rickrolled by the terminal.", col.muted),
    BR(),
  ],

  whoishiring: () => [
    L("# Who's Hiring in Security? (Mar 2026)", col.primary),
    BR(),
    L("  > Cloudflare         - Security Engineer", col.fg),
    L("    cloudflare.com/careers", col.cyan),
    BR(),
    L("  > Google Project Zero - Vulnerability Researcher", col.fg),
    L("    careers.google.com", col.cyan),
    BR(),
    L("  > Synack              - Pentest / Red Team", col.fg),
    L("    synack.com/company/careers", col.cyan),
    BR(),
    L("  > VulnRadar           - You? :)", col.primary),
    L("    vulnradar.dev", col.cyan),
    BR(),
    L("  Check HN: Who's Hiring thread for more.", col.muted),
    BR(),
  ],

  "2048": () => [
    L("┌──────┬──────┬──────┬──────┐", col.primary),
    L("│  2   │  4   │  8   │  16  │", col.fg),
    L("├──────┼──────┼──────┼──────┤", col.primary),
    L("│  32  │  64  │ 128  │ 256  │", col.fg),
    L("├──────┼──────┼──────┼──────┤", col.primary),
    L("│ 512  │1024  │2048  │      │", col.fg),
    L("├──────┼──────┼──────┼──────┤", col.primary),
    L("│      │      │      │      │", col.muted),
    L("└──────┴──────┴──────┴──────┘", col.primary),
    BR(),
    L("YOU WIN! (I cheated for you)", col.green),
    L("Score: 420,069", col.yellow),
    BR(),
  ],

  snake: () => [
    L("┌──────────────────────────┐", col.primary),
    L("│  @@@@                    │", col.green),
    L("│      ↓                  │", col.muted),
    L("│  *                      │", col.red),
    L("│                         │", col.muted),
    L("│                         │", col.muted),
    L("└──────────────────────────┘", col.primary),
    BR(),
    L("Score: 3   Length: 5", col.fg),
    L("(controls: arrow keys - but this is fake)", col.muted),
    BR(),
  ],

  doom: () => [
    L("          ████████████████", col.red),
    L("       ██░░░░░░░░░░░░░░░░░░██", col.red),
    L("      ██░░  DOOM  ░░░░░░░░░░██", col.red),
    L("      ██░░ RUNS ON░░░░░░░░░░██", col.yellow),
    L("      ██░░ NEXT.JS░░░░░░░░░░██", col.yellow),
    L("       ██░░░░░░░░░░░░░░░░░░██", col.red),
    L("          ████████████████", col.red),
    BR(),
    L("It runs Doom.", col.green),
    L("Everything runs Doom.", col.muted),
    L("Your portfolio now also runs Doom.", col.muted),
    BR(),
  ],

  tetris: () => [
    L("┌──────────┐", col.primary),
    L("│  ██      │", col.cyan),
    L("│  ████    │", col.yellow),
    L("│    ██    │", col.red),
    L("│   ████   │", col.green),
    L("│██████████│", col.muted),
    L("└──────────┘", col.primary),
    BR(),
    L("Lines: 4   Level: 3   Score: 1337", col.fg),
    L("(also fake - but you knew that)", col.muted),
    BR(),
  ],

  leet: (args) => {
    const txt = (args ?? "").replace(/^leet\s*/i, "").trim() || "hello world"
    const map: Record<string, string> = {
      a:"4",e:"3",g:"9",i:"1",o:"0",s:"5",t:"7",l:"|",b:"8",z:"2"
    }
    const encoded = txt.toLowerCase().split("").map(c => map[c] ?? c).join("")
    return [
      L(`  Input:  ${txt}`, col.muted),
      L(`  1337:   ${encoded}`, col.green),
      BR(),
    ]
  },

  crypto: () => {
    const prices = [
      ["BTC", (95000 + Math.random() * 5000).toFixed(2), "+2.4%"],
      ["ETH", (3200 + Math.random() * 200).toFixed(2), "-0.8%"],
      ["SOL", (180 + Math.random() * 20).toFixed(2), "+5.1%"],
      ["DOGE", (0.15 + Math.random() * 0.05).toFixed(4), "+69.0%"],
      ["RM",  "1337.00", "+∞%"],
    ]
    return [
      L("# Crypto Prices (totally real)", col.primary),
      L("  Symbol    Price (USD)    24h Change", col.muted),
      L("  ──────    ───────────    ──────────", col.muted),
      ...prices.map(([sym, price, chg]) =>
        L(`  ${sym.padEnd(8)}  $${String(price).padEnd(13)}  ${chg}`, chg.startsWith("+") ? col.green : col.red)
      ),
      BR(),
      L("  RM coin is not listed anywhere. We're saving it for the moon.", col.muted),
      BR(),
    ]
  },

  coffee: () => [
    L("       ( (", col.yellow),
    L("        ) )", col.yellow),
    L("     ..........", col.fg),
    L("     |        |]", col.fg),
    L("     \\        /", col.fg),
    L("      `------'", col.fg),
    BR(),
    L("  ☕  Coffee: brewed. Code: unwritten.", col.muted),
    L("  Estimated coding time before next cup: 12 minutes.", col.muted),
    BR(),
  ],

  aquarium: () => [
    L("  ≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋", "text-blue-400"),
    L("       ><(((º>          ><>        ", "text-cyan-400"),
    L("   ~  ·  ·  ·  ·  ·  ·  ·  ·  ~  ", "text-blue-300"),
    L("            <°)))><               ", "text-yellow-400"),
    L("  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ", "text-blue-300"),
    L("       ><>          ><(((º>       ", "text-green-400"),
    L("  ≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋", "text-blue-400"),
    BR(),
    L("  ASCII Aquarium v1.0 - no fish were harmed", col.muted),
    BR(),
  ],

  moon: () => {
    const phase = Math.floor((Date.now() / 86400000) % 29.53)
    const phases = ["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"]
    const idx = Math.floor(phase / 29.53 * 8)
    const names = ["New Moon","Waxing Crescent","First Quarter","Waxing Gibbous","Full Moon","Waning Gibbous","Last Quarter","Waning Crescent"]
    return [
      L(`  ${phases[idx]}  ${names[idx]}`, col.fg),
      L(`  Day ${phase} of lunar cycle`, col.muted),
      BR(),
      L("  (actual moon phase based on today's date)", col.muted),
      BR(),
    ]
  },

  msfconsole: () => [
    L("       =[ metasploit v6.3.0                          ]", col.red),
    L("+ -- --=[ 2374 exploits - 1232 auxiliary - 413 post  ]", col.red),
    L("+ -- --=[ 1395 payloads - 46 encoders - 11 nops      ]", col.red),
    BR(),
    L("msf6 > search vulnradar", col.green),
    L("", col.muted),
    L("  Matching Modules", col.fg),
    L("  ================", col.fg),
    BR(),
    L("  # Name                         Disclosure Date  Rank    Description", col.muted),
    L("  0 exploit/web/vulnradar/cool    2024-01-01       normal  VulnRadar Scanner (very cool)", col.green),
    BR(),
    L("msf6 > use 0", col.green),
    L("msf6 exploit(vulnradar) > run", col.green),
    L("[*] Started reverse handler on 0.0.0.0:4444", col.fg),
    L("[+] Target is extremely secure. Aborting.", col.red),
    L("[*] VulnRadar wins again.", col.yellow),
    BR(),
  ],

  sqlmap: (args) => {
    const target = (args ?? "").replace(/^sqlmap\s*/i, "").trim() || "https://rejectmodders.dev"
    return [
      L(`sqlmap -u "${target}" --dbs`, col.muted),
      BR(),
      L("  [*] testing connection to target URL...", col.fg),
      L("  [*] testing if the target URL content is stable...", col.fg),
      L("  [!] heuristic (basic) test shows that GET parameter might be injectable", col.yellow),
      L("  [*] available databases [2]:", col.fg),
      L("  [*] information_schema", col.fg),
      L("  [*] rejectmodders_prod", col.green),
      BR(),
      L("  [!] just kidding - this site has no SQL. It's Next.js.", col.muted),
      L("  [!] and VulnRadar would catch that anyway.", col.primary),
      BR(),
    ]
  },

  gobuster: (args) => {
    const target = (args ?? "").replace(/^gobuster\s*/i, "").trim() || "rejectmodders.dev"
    return [
      L(`gobuster dir -u https://${target} -w /usr/share/wordlists/common.txt`, col.muted),
      BR(),
      L("  /about                (Status: 200) [Size: 42069]", col.green),
      L("  /projects             (Status: 200) [Size: 13370]", col.green),
      L("  /friends              (Status: 200) [Size: 6969]", col.green),
      L("  /spotify              (Status: 200) [Size: 1337]", col.green),
      L("  /api/github           (Status: 200) [Size: 4200]", col.green),
      L("  /admin                (Status: 403) [Size: 0]", col.red),
      L("  /secrets              (Status: 404) [Size: 0]", col.muted),
      L("  /.env                 (Status: 404) [Size: 0]", col.muted),
      BR(),
      L("  Found: 5 paths. Nothing juicy. Try harder.", col.yellow),
      BR(),
    ]
  },

  nikto: (args) => {
    const target = (args ?? "").replace(/^nikto\s*/i, "").trim() || "rejectmodders.dev"
    return [
      L(`- Nikto v2.5.0`, col.green),
      L(`- Target Host: ${target}`, col.fg),
      L("- Start Time: " + new Date().toUTCString(), col.muted),
      BR(),
      L("+ Server: nginx (no version disclosure - good)", col.green),
      L("+ X-Frame-Options: DENY - good security posture", col.green),
      L("+ HSTS header present and correct", col.green),
      L("+ CSP header present", col.green),
      L("+ No dangerous HTTP methods enabled", col.green),
      L("+ No default files found", col.green),
      BR(),
      L("+ 0 vulnerabilities found. VulnRadar agrees.", col.green),
      BR(),
    ]
  },

  virus: () => [
    L("Running VirusScan Pro 2026...", col.muted),
    L("", col.muted),
    L("  Scanning files...      [████████████████████] 100%", col.fg),
    L("  Scanning memory...     [████████████████████] 100%", col.fg),
    L("  Scanning registry...   [████████████████████] 100%", col.fg),
    L("  Scanning your soul...  [████████████████████] 100%", col.fg),
    BR(),
    L("  Threats found: 1", col.red),
    BR(),
    L("  ⚠ THREAT: rm_curiosity.exe", col.yellow),
    L("    Risk: HIGH (you keep typing things into terminal easter eggs)", col.yellow),
    L("    Action: Quarantine? [Y/N]: Y", col.muted),
    L("    Result: FAILED. Curiosity cannot be quarantined.", col.red),
    BR(),
    L("  All other systems: CLEAN.", col.green),
    BR(),
  ],

  ponysay: () => [
    L("   /\\   /\\        ", "text-pink-400"),
    L("  ( o   o )       My little hacker,", "text-pink-400"),
    L("  =( Y )=         my little hacker...", "text-pink-300"),
    L("   )-   -(        what are you doing", "text-pink-400"),
    L("  /|   |\\         in this terminal?", "text-pink-300"),
    L(" (_|   |_)        ", "text-pink-400"),
    BR(),
    L("  Sparkle says: type 'help' for more commands!", col.muted),
    BR(),
  ],

  fire: () => [
    L("          (  )   (   )  )        ", col.red),
    L("          ) (   )  (  (          ", col.red),
    L("          ( )  (    ) )          ", col.red),
    L("      _.-'  '-.(___.-'  '-.      ", col.yellow),
    L("   .-'   .'  '         '.  '-.   ", col.yellow),
    L("  /    .'                  '.  \\ ", col.yellow),
    L(" |   .'                      '. |", col.fg),
    L("  \\ '                          '/", col.fg),
    BR(),
    L("  🔥 This is fine.", col.muted),
    BR(),
  ],

  "10print": () => {
    const chars = ["\\","/"," ","\\","/"," ","\\","\\","/","/"," ","\\","/","\\","/"," ","/","\\"]
    const rows = Array.from({length: 5}, () =>
      Array.from({length: 36}, () => chars[Math.floor(Math.random() * chars.length)]).join("")
    )
    return [
      L("10 PRINT CHR$(205.5+RND(1)); : GOTO 10", col.muted),
      BR(),
      ...rows.map(r => L(r, col.cyan)),
      BR(),
      L("(Commodore 64 vibes intensify)", col.muted),
      BR(),
    ]
  },

  clap: (args) => {
    const txt = (args ?? "").replace(/^clap\s*/i, "").trim() || "this is the terminal"
    const clapified = txt.split(" ").join(" 👏 ")
    return [L(clapified + " 👏", col.fg), BR()]
  },

  "sudo make me a sandwich": () => [
    L("Okay.", col.green),
    BR(),
    L("  🥪 Sandwich: made.", col.fg),
    BR(),
    L("  (xkcd.com/149)", col.muted),
    BR(),
  ],

  "make me a sandwich": () => [
    L("What? Make it yourself.", col.red),
    BR(),
    L("  hint: try 'sudo make me a sandwich'", col.muted),
    BR(),
  ],

  ":(){ :|:& };:": () => [
    L("Fork bomb detected!", col.red),
    BR(),
    L("  :(){ :|:& };:", col.red),
    L("  bash: fork: Resource temporarily unavailable", col.red),
    L("  bash: fork: Resource temporarily unavailable", col.red),
    L("  bash: fork: Resource temporarily unavailable", col.red),
    BR(),
    L("  lol no. This is a browser.", col.green),
    L("  Nothing actually forked. You're safe.", col.muted),
    L("  (but don't run this in a real shell)", col.yellow),
    BR(),
  ],

  "rm -rf /": () => [
    L("rm: it is dangerous to operate recursively on '/'", col.red),
    L("rm: use --no-preserve-root to override this failsafe", col.red),
    BR(),
    L("  Not gonna do it.", col.green),
    L("  The site stays up.", col.muted),
    BR(),
  ],

  logout: () => [
    L("Logout requested.", col.muted),
    L("Saving session... done.", col.muted),
    L("", col.muted),
    L("There is no logout. The terminal is eternal.", col.primary),
    L("Type 'exit' to close.", col.muted),
    BR(),
  ],

  screenfetch: () => [
    L("  rm@rejectmodders.dev", col.primary),
    L("  ─────────────────────────────────", col.muted),
    L("  OS:       Custom Linux x86_64", col.fg),
    L("  Host:     rejectmodders.dev", col.fg),
    L("  Kernel:   Next.js 16.2.7 (Turbopack)", col.fg),
    L("  Shell:    rm-terminal v2.0", col.fg),
    L("  DE:       React 19 + Framer Motion", col.fg),
    L("  WM:       Tailwind CSS v4", col.fg),
    L("  Theme:    Blood Red on Void Black", col.red),
    L("  Icons:    Lucide React", col.fg),
    L("  Terminal: This one. Obviously.", col.primary),
    BR(),
    L("  ████ ████ ████ ████ ████ ████ ████", col.primary),
    BR(),
  ],

  "cat flag.txt": () => [
    L("cat: flag.txt: No such file or directory", col.red),
    BR(),
    L("  hint: flags are hidden throughout this terminal.", col.muted),
    L("  try: env, sudo cat secrets.txt, cat amanda.txt", col.muted),
    BR(),
  ],

  uname: () => [
    L("Linux rejectmodders.dev 6.1.0 #1 SMP PREEMPT Next.js x86_64 GNU/Linux", col.fg),
    BR(),
  ],

  xkcd: () => {
    const refs = [
      ["149", "Sandwich", "https://xkcd.com/149"],
      ["327", "Exploits of a Mom (Bobby Tables)", "https://xkcd.com/327"],
      ["353", "Python (import antigravity)", "https://xkcd.com/353"],
      ["378", "Real Programmers", "https://xkcd.com/378"],
      ["705", "Devotion to Duty", "https://xkcd.com/705"],
      ["936", "Password Strength", "https://xkcd.com/936"],
      ["1319", "Automation", "https://xkcd.com/1319"],
      ["1654", "Universal Install Script", "https://xkcd.com/1654"],
    ]
    const [num, title, url] = refs[Math.floor(Math.random() * refs.length)]
    return [
      L(`xkcd #${num}: ${title}`, col.primary),
      L(`  ${url}`, col.cyan),
      BR(),
      L("(random xkcd - go read it, they're all worth it)", col.muted),
      BR(),
    ]
  },
}
