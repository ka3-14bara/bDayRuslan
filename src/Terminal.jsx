import React, { useState, useEffect, useRef } from "react";
import "./Terminal.css";

// ASCII арт для заголовка
const ASCII_TITLE = `
██╗  ██╗ █████╗ ██████╗ ██████╗ ██╗   ██╗    ██████╗ ██╗██████╗ ████████╗██╗  ██╗██████╗  █████╗ ██╗   ██╗
██║  ██║██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝    ██╔══██╗██║██╔══██╗╚══██╔══╝██║  ██║██╔══██╗██╔══██╗╚██╗ ██╔╝
███████║███████║██████╔╝██████╔╝ ╚████╔╝     ██████╔╝██║██████╔╝   ██║   ███████║██║  ██║███████║ ╚████╔╝ 
██╔══██║██╔══██║██╔═══╝ ██╔═══╝   ╚██╔╝      ██╔══██╗██║██╔══██╗   ██║   ██╔══██║██║  ██║██╔══██║  ╚██╔╝  
██║  ██║██║  ██║██║     ██║        ██║       ██████╔╝██║██║  ██║   ██║   ██║  ██║██████╔╝██║  ██║   ██║   
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝        ╚═╝       ╚═════╝ ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝   
`;

// Части торта для анимации сборки
const CAKE_PARTS = [
  // 0: Основание
  `
   _______________
  |               |
  |_______________|
  `,
  // 1: Первый слой
  `
   _______________
  |               |
  |               |
  |_______________|
  `,
  // 2: Второй слой
  `
   ___________
  |           |
  |               |
  |_________________|
  `,
  // 3: Крем
  `
   ~~~~~~~~~~~
  |           |
  |               |
  |~~~~~~~~~~~~~~~~~|
  `,
  // 4: Свечи
  `
    !  !  !
  |           |
  |               |
  |~~~~~~~~~~~~~~~~~|
  `,
  // 5: Горящие свечи
  `
    ^  ^  ^
  |           |
  |               |
  |~~~~~~~~~~~~~~~~~|
  `,
  // 6: Мигающие свечи
  `
    *  *  *
  |           |
  |               |
  |~~~~~~~~~~~~~~~~~|
  `,
  // 7: Полный торт с поздравлением
  `
   * *  *  *  *  *
  |    H A P P Y  |
  |     BIRTHDAY   |
  |~~~~~~~~~~~~~~~~~|
   \\_______________/
  `,
];

// Прелоадеры для загрузки
const LOADERS = [
  "[|         ] 10%",
  "[||        ] 20%",
  "[|||       ] 30%",
  "[||||      ] 40%",
  "[|||||     ] 50%",
  "[||||||    ] 60%",
  "[|||||||   ] 70%",
  "[||||||||  ] 80%",
  "[||||||||| ] 90%",
  "[||||||||||] 100%",
];

const COMMANDS = {
  help: "ДОСТУПНЫЕ МОДУЛИ: status, inventory, craft_cake, connect_dota, get_wish, /gamemode_c",
  status:
    "ОБЪЕКТ: [ДРУГ-ПРОГРАММИСТ]. СОСТОЯНИЕ: Критически повышенный уровень мудрости. ВЕРСИЯ: 2025.12.19-stable. ПЕРВАЯ ВЕРСИЯ: 2001.12.19-birth",
  inventory:
    "ИНВЕНТАРЬ: 1x Portal Gun, 1x Netherite Pickaxe, 1x BKB (заряжен), 64x Coffee Beans, 1x Crowbar.",
  craft_cake:
    "ОШИБКА 404: The cake is a lie. Печенька обнаружена в памяти, но торт недоступен.",
  connect_dota:
    "ПОИСК МАТЧА... Найдена команда адекватных тиммейтов. Вероятность победы: 100% (Но это не точно XD). GL HF!",
  get_wish: "ИНИЦИАЛИЗАЦИЯ ПОЗДРАВИТЕЛЬНОГО ПРОТОКОЛА...",
  "/gamemode_c":
    "РЕЖИМ КРЕАТИВА ВКЛЮЧЕН. Теперь ты можешь летать над багами (визуальный эффект активирован).",
};

const Terminal = ({ isCreative, setIsCreative }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "bot", text: "APERTURE SCIENCE (TM) INTERACTIVE TERMINAL v2.5" },
    { type: "bot", text: 'Введите "help" для получения списка команд.' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [cakeStep, setCakeStep] = useState(0);
  const [showCake, setShowCake] = useState(false);
  const [wishText, setWishText] = useState("");
  const [showTitle, setShowTitle] = useState(false);
  const bottomRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, showCake, wishText, showTitle]);

  const startCakeAnimation = () => {
    setIsLoading(false);
    setShowCake(true);
    setCakeStep(0);

    let step = 0;
    animationRef.current = setInterval(() => {
      setCakeStep(step);
      step++;

      if (step >= CAKE_PARTS.length) {
        clearInterval(animationRef.current);
        // После сборки торта показываем поздравление
        setTimeout(() => {
          const fullWish = "[СИСТЕМА]: Инициализация поздравления...\n\n";
          const wish =
            "Пусть код компилируется с первого раза, баги исправляются сами, а тиммейты в играх всегда адекватные.Желаю бесконечного inspiration для новых проектови кайфа от каждой строчки кода. Пусть твои скиллы растут, а ранги в играх — тоже! Баланса между работой и игрой, здоровья и отличного настроения! Пусть этот год будет полон крутых achievements и irl, и в играх!";

          let index = 0;
          const typeWriter = () => {
            if (index < wish.length) {
              setWishText(fullWish + wish.substring(0, index + 1));
              index++;
              setTimeout(typeWriter, 50);
            } else {
              // В конце добавляем эффектный ASCII текст
              setTimeout(() => {
                setWishText(
                  (prev) =>
                    prev +
                    "\n\n" +
                    "=".repeat(50) +
                    "\n         🎉 С ДНЕМ РОЖДЕНИЯ! 🎉\n" +
                    "=".repeat(50)
                );
              }, 500);
            }
          };

          typeWriter();
        }, 500);
      }
    }, 400);
  };

  const startLoadingAnimation = () => {
    setIsLoading(true);
    setLoadingStep(0);
    setShowCake(false);
    setWishText("");
    setShowTitle(true);

    let step = 0;
    animationRef.current = setInterval(() => {
      setLoadingStep(step);
      step++;

      if (step >= LOADERS.length) {
        clearInterval(animationRef.current);
        setShowTitle(false);
        setTimeout(startCakeAnimation, 300);
      }
    }, 200);
  };

  const clearAnimations = () => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }
    setIsLoading(false);
    setShowCake(false);
    setWishText("");
    setShowTitle(false);
  };

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const fullCmd = input.trim();
      const cmd = fullCmd.toLowerCase();
      const newHistory = [...history, { type: "user", text: `> ${fullCmd}` }];

      clearAnimations();

      if (cmd === "/gamemode_c") {
        setIsCreative(!isCreative); // Используем пропс setIsCreative
        newHistory.push({ type: "bot", text: COMMANDS[cmd] });
      } else if (cmd === "get_wish") {
        newHistory.push({ type: "bot", text: COMMANDS[cmd] });
        setTimeout(startLoadingAnimation, 300);
      } else if (COMMANDS[cmd]) {
        newHistory.push({ type: "bot", text: COMMANDS[cmd] });
      } else {
        newHistory.push({
          type: "bot",
          text: `НЕИЗВЕСТНАЯ КОМАНДА: "${fullCmd}". Введите "help" для справки.`,
        });
      }

      setHistory(newHistory);
      setInput("");
    }
  };

  const getContainerStyle = () => {
    const baseStyle = "terminal-container";
    return `${baseStyle} ${isCreative ? "terminal-creative" : ""}`; // Используем пропс isCreative
  };

  return (
    <div className={getContainerStyle()}>
      <div className="terminal-history">
        {history.map((line, i) => (
          <div
            key={i}
            className={`terminal-line ${
              line.type === "user" ? "terminal-user-line" : "terminal-bot-line"
            }`}
            style={
              line.type === "bot"
                ? { color: isCreative ? "#55ff55" : "#e69526" }
                : {}
            } // Используем пропс isCreative
          >
            {line.text}
          </div>
        ))}

        {/* ASCII заголовок */}
        {showTitle && (
          <div className="terminal-bot-line ascii-title-animation">
            <pre
              style={{
                margin: "10px 0",
                lineHeight: "1.2",
                fontFamily: "'Courier New', monospace",
                fontSize: "8px",
                color: "#e69526",
                textAlign: "center",
                whiteSpace: "pre",
              }}
            >
              {ASCII_TITLE}
            </pre>
          </div>
        )}

        {/* Анимация загрузки */}
        {isLoading && (
          <div className="terminal-bot-line loading-animation">
            <div className="loader-text">
              {LOADERS[loadingStep]}
              <br />
              <span style={{ fontSize: "12px", opacity: 0.7 }}>
                Сборка праздничного модуля...{" "}
                {Math.round((loadingStep / (LOADERS.length - 1)) * 100)}%
              </span>
            </div>
          </div>
        )}

        {/* Анимация сборки торта */}
        {showCake && cakeStep < CAKE_PARTS.length && (
          <div className="terminal-bot-line cake-animation">
            <pre
              style={{
                margin: "0",
                lineHeight: "1.2",
                fontFamily: "'Monaco', 'Consolas', monospace'",
                fontSize: "12px",
                color: "#FFD700",
                textAlign: "center",
                textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
              }}
            >
              {CAKE_PARTS[cakeStep]}
            </pre>
            <div
              style={{
                fontSize: "11px",
                color: "#e69526",
                textAlign: "center",
                marginTop: "5px",
                opacity: 0.8,
              }}
            >
              {cakeStep === 0 && "Устанавливаем основание..."}
              {cakeStep === 1 && "Добавляем первый слой..."}
              {cakeStep === 2 && "Добавляем второй слой..."}
              {cakeStep === 3 && "Наносим крем..."}
              {cakeStep === 4 && "Устанавливаем свечи..."}
              {cakeStep === 5 && "Зажигаем свечи..."}
              {cakeStep === 6 && "Активируем праздничный режим..."}
              {cakeStep === 7 && "ТОРТ ГОТОВ!"}
            </div>
          </div>
        )}

        {/* Поздравление с печатной машинкой */}
        {wishText && (
          <div className="terminal-bot-line wish-animation">
            <pre
              style={{
                margin: "0",
                lineHeight: "1.4",
                fontFamily: "'Courier New', monospace",
                fontSize: "14px",
                color: "#e69526",
                whiteSpace: "pre-wrap",
              }}
            >
              {wishText}
            </pre>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="terminal-input-area">
        <span className="terminal-prompt">$</span>
        <input
          autoFocus
          className="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          placeholder="Введите команду..."
        />
      </div>
    </div>
  );
};

export default Terminal;
