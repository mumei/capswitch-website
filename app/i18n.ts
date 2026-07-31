export const languages = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "zh-Hans", label: "简体中文" },
  { code: "zh-Hant", label: "繁體中文" },
  { code: "fr", label: "Français" },
  { code: "ko", label: "한국어" },
  { code: "es", label: "Español" },
  { code: "it", label: "Italiano" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "th", label: "ไทย" },
] as const;

export type Locale = (typeof languages)[number]["code"];

type ModeCopy = {
  name: string;
  description: string;
  type: string;
  states: string[];
  actions: string[];
  loop?: boolean;
  note?: string;
};

type Translation = {
  language: string;
  download: string;
  hero: [string, string];
  heroLead: string;
  trial: string;
  viewCore: string;
  requirements: string;
  demo: {
    media: string;
    function: string;
    mediaShort: string;
    functionShort: string;
    pressLabel: string;
  };
  tour: {
    kicker: string;
    title: string;
    steps: [string, string, string];
    descriptions: [string, string, string];
    flow: [string, string, string];
    settingsAlt: string;
    menuAlt: string;
  };
  keep: {
    kicker: string;
    title: string;
    description: string;
    labels: [string, string, string];
    values: [string, string, string];
    aria: string;
  };
  modesKicker: string;
  modesTitle: string;
  stateFlow: string;
  backToStart: string;
  modes: ModeCopy[];
  led: {
    kicker: string;
    title: string;
    description: string;
    columns: [string, string, string];
    aria: string;
    rows: [string, string, string][];
  };
  price: {
    kicker: string;
    title: string;
    description: string;
    button: string;
    purchase: string;
  };
};

const mode = (
  name: string,
  description: string,
  type: string,
  states: string[],
  actions: string[],
  extra: Pick<ModeCopy, "loop" | "note"> = {},
): ModeCopy => ({ name, description, type, states, actions, ...extra });

export const translations: Record<Locale, Translation> = {
  ja: {
    language: "言語",
    download: "ダウンロード",
    hero: ["よく使う操作を、", "Caps Lockに"],
    heroLead: "LEDで状態も確認できます",
    trial: "14日間試す",
    viewCore: "公開Coreを見る",
    requirements: "macOS 14以降",
    demo: {
      media: "メディア操作", function: "Functionキー",
      mediaShort: "Media", functionShort: "Function",
      pressLabel: "Caps Lockを押す。現在は",
    },
    tour: {
      kicker: "使い方", title: "設定から、普段の操作まで",
      steps: ["設定でモードを選ぶ", "Caps Lockで操作する", "メニューバーから管理する"],
      descriptions: [
        "10種類から使いたい操作を1つ選び、必要な項目だけ調整します。",
        "単押し、連打、長押しをモードに合わせて使います。",
        "稼働状態の確認、一時停止、設定、終了をすぐに操作できます。",
      ],
      flow: ["Caps Lock", "モードが動作", "LED・HUDに表示"],
      settingsAlt: "Capswitchの設定画面。左側に一般、入力、モード、表示、ライセンス、診断のメニューが並ぶ",
      menuAlt: "Capswitchの常駐メニュー。稼働状態、一時停止、設定、終了を表示している",
    },
    keep: {
      kicker: "Caps Lockを残す", title: "通常のCaps Lockも使えます",
      description: "設定した回数だけ連打したときは、選んだモードではなく通常のCaps Lockとして動作します。",
      labels: ["設定", "操作", "結果"],
      values: ["3・4・5回から選ぶ", "選んだ回数だけ連打", "Caps LockをON／OFF"],
      aria: "通常のCaps Lockを使う手順",
    },
    modesKicker: "10モード", modesTitle: "モードを、1つ選ぶ",
    stateFlow: "状態遷移", backToStart: "最初の状態へ",
    modes: [
      mode("Functionキー切替", "F1〜F12の動作を切り替える", "2状態", ["メディア操作", "Functionキー入力"], ["単押し"], { loop: true }),
      mode("マイクミュート", "マイクをミュート／解除する", "2状態", ["使用中", "ミュート"], ["単押し"], { loop: true }),
      mode("外観切替", "ライト／ダークを切り替える", "2状態", ["ライト", "ダーク"], ["単押し"], { loop: true }),
      mode("スリープ防止", "スリープ防止を開始／停止する", "2状態", ["標準設定", "スリープ防止"], ["単押し"], { loop: true }),
      mode("スピーカーミュート", "音声出力をミュート／解除する", "2状態", ["再生中", "ミュート"], ["単押し"], { loop: true }),
      mode("音量コントローラー", "連打で上げ、長押しで下げる", "連続値", ["現在の音量", "＋5%"], ["連打"], { note: "長押し中は−5%ずつ調整" }),
      mode("オーディオ出力", "出力先を順番に切り替える", "複数状態", ["出力先 1", "出力先 2", "次の出力先"], ["単押し", "単押し"], { loop: true }),
      mode("入力ソース", "日本語・英語などを切り替える", "複数状態", ["入力 1", "入力 2", "次の入力"], ["単押し", "単押し"], { loop: true }),
      mode("タイマー", "開始・停止と時間調整を行う", "時間", ["停止中", "カウント中", "一時停止", "完了"], ["単押し", "単押し", "時間終了"], { note: "停止中は連打＋1分／長押し−1分" }),
      mode("ショートカット", "押し方ごとに操作を割り当てる", "カスタム", ["押し方を判定", "設定した操作を実行"], ["単押し・連打・長押し"], { note: "長押しは1回／連続を選択" }),
    ],
    led: {
      kicker: "物理フィードバック", title: "LEDで状態を表示",
      description: "点灯・消灯・点滅回数・点滅速度を使い分けます。",
      columns: ["状態の種類", "LEDの表し方", "対応するモード"], aria: "LED点滅パターン",
      rows: [
        ["2状態", "点灯／消灯", "Functionキー、ミュート、外観など"],
        ["複数状態", "短い点滅を1〜n回 → 長い消灯", "出力先、入力ソース"],
        ["連続値", "値が高いほど速く点滅", "音量"],
        ["残り時間", "終了に近づくほど速く点滅", "タイマー"],
      ],
    },
    price: {
      kicker: "まず試す", title: "14日間、すべて試せます",
      description: "登録なしで全機能を試せます。", button: "Capswitchをダウンロード",
      purchase: "Capswitchを購入 — $14.99",
    },
  },
  en: {
    language: "Language", download: "Download",
    hero: ["Your everyday actions,", "on Caps Lock"], heroLead: "See each state on the LED",
    trial: "Try for 14 days", viewCore: "View open Core", requirements: "macOS 14 or later",
    demo: { media: "Media controls", function: "Function keys", mediaShort: "Media", functionShort: "Function", pressLabel: "Press Caps Lock. Current state:" },
    tour: {
      kicker: "How it works", title: "From setup to everyday use",
      steps: ["Choose a mode", "Control it with Caps Lock", "Manage it from the menu bar"],
      descriptions: ["Choose one of 10 actions and adjust only what it needs.", "Use a tap, repeated taps, or a hold depending on the mode.", "Check status, pause monitoring, open settings, or quit instantly."],
      flow: ["Caps Lock", "Mode runs", "LED and HUD update"],
      settingsAlt: "Capswitch settings with General, Input, Mode, Display, License, and Diagnostics in the sidebar",
      menuAlt: "Capswitch menu bar menu showing status, pause, settings, and quit",
    },
    keep: {
      kicker: "Keep Caps Lock", title: "You can still use Caps Lock",
      description: "Tap the key the configured number of times to toggle Caps Lock instead of running the selected mode.",
      labels: ["Set", "Do", "Result"], values: ["Choose 3, 4, or 5 taps", "Tap that many times", "Caps Lock ON / OFF"], aria: "How to use the regular Caps Lock function",
    },
    modesKicker: "10 modes", modesTitle: "Choose one mode", stateFlow: "State flow", backToStart: "back to start",
    modes: [
      mode("Function key switching", "Switch F1–F12 between media and function keys", "2 states", ["Media controls", "Function keys"], ["Tap"], { loop: true }),
      mode("Microphone mute", "Mute or unmute the microphone", "2 states", ["Live", "Muted"], ["Tap"], { loop: true }),
      mode("Appearance", "Switch between Light and Dark", "2 states", ["Light", "Dark"], ["Tap"], { loop: true }),
      mode("Prevent sleep", "Start or stop sleep prevention", "2 states", ["System setting", "Stay awake"], ["Tap"], { loop: true }),
      mode("Speaker mute", "Mute or unmute audio output", "2 states", ["Playing", "Muted"], ["Tap"], { loop: true }),
      mode("Volume controller", "Repeated taps raise volume; hold lowers it", "Continuous", ["Current volume", "+5%"], ["Repeat"], { note: "Hold to lower by 5% steps" }),
      mode("Audio output", "Cycle through selected output devices", "Multiple", ["Output 1", "Output 2", "Next output"], ["Tap", "Tap"], { loop: true }),
      mode("Input source", "Switch between selected input sources", "Multiple", ["Input 1", "Input 2", "Next input"], ["Tap", "Tap"], { loop: true }),
      mode("Timer", "Start, pause, and adjust a countdown", "Time", ["Stopped", "Running", "Paused", "Done"], ["Tap", "Tap", "Time up"], { note: "While stopped: repeat +1 min / hold −1 min" }),
      mode("Shortcut", "Assign actions to each press pattern", "Custom", ["Detect press", "Run action"], ["Tap / repeat / hold"], { note: "Hold can run once or continuously" }),
    ],
    led: {
      kicker: "Physical feedback", title: "See the state on the LED", description: "Steady light, pulse count, and pulse speed communicate different states.",
      columns: ["State type", "LED pattern", "Used by"], aria: "LED patterns",
      rows: [["2 states", "On / off", "Function keys, mute, appearance"], ["Multiple states", "1–n short pulses → long pause", "Audio output, input source"], ["Continuous value", "Faster pulses for higher values", "Volume"], ["Time remaining", "Faster pulses near the end", "Timer"]],
    },
    price: { kicker: "Try first", title: "Try everything for 14 days", description: "No registration. Every feature is available.", button: "Download Capswitch", purchase: "Buy Capswitch — $14.99" },
  },
  de: {
    language: "Sprache", download: "Download",
    hero: ["Häufige Aktionen,", "auf Caps Lock"], heroLead: "Die LED zeigt den aktuellen Status",
    trial: "14 Tage testen", viewCore: "Open Core ansehen", requirements: "macOS 14 oder neuer",
    demo: { media: "Mediensteuerung", function: "Funktionstasten", mediaShort: "Medien", functionShort: "Funktion", pressLabel: "Caps Lock drücken. Aktueller Status:" },
    tour: {
      kicker: "So funktioniert es", title: "Von der Einrichtung bis zur Nutzung",
      steps: ["Modus auswählen", "Mit Caps Lock steuern", "Über die Menüleiste verwalten"],
      descriptions: ["Eine von 10 Aktionen auswählen und nur die nötigen Optionen anpassen.", "Je nach Modus tippen, mehrfach tippen oder gedrückt halten.", "Status prüfen, Überwachung pausieren, Einstellungen öffnen oder beenden."],
      flow: ["Caps Lock", "Modus wird ausgeführt", "LED und HUD zeigen den Status"],
      settingsAlt: "Capswitch-Einstellungen mit den Bereichen Allgemein, Eingabe, Modus, Anzeige, Lizenz und Diagnose",
      menuAlt: "Capswitch-Menü mit Status, Pause, Einstellungen und Beenden",
    },
    keep: {
      kicker: "Caps Lock behalten", title: "Caps Lock bleibt verfügbar",
      description: "Bei der festgelegten Anzahl schneller Tastendrücke wird Caps Lock statt des gewählten Modus umgeschaltet.",
      labels: ["Einstellung", "Aktion", "Ergebnis"], values: ["3, 4 oder 5 wählen", "So oft tippen", "Caps Lock EIN / AUS"], aria: "Normales Caps Lock verwenden",
    },
    modesKicker: "10 Modi", modesTitle: "Einen Modus auswählen", stateFlow: "Statusfolge", backToStart: "zurück zum Anfang",
    modes: [
      mode("Funktionstasten", "F1–F12 zwischen Medien- und Funktionstasten umschalten", "2 Zustände", ["Medien", "Funktion"], ["Tippen"], { loop: true }),
      mode("Mikrofon stummschalten", "Mikrofon stummschalten oder aktivieren", "2 Zustände", ["Aktiv", "Stumm"], ["Tippen"], { loop: true }),
      mode("Erscheinungsbild", "Zwischen Hell und Dunkel wechseln", "2 Zustände", ["Hell", "Dunkel"], ["Tippen"], { loop: true }),
      mode("Ruhezustand verhindern", "Ruhezustand verhindern oder zulassen", "2 Zustände", ["Standard", "Wach bleiben"], ["Tippen"], { loop: true }),
      mode("Lautsprecher stummschalten", "Audioausgabe stummschalten oder aktivieren", "2 Zustände", ["Wiedergabe", "Stumm"], ["Tippen"], { loop: true }),
      mode("Lautstärke", "Mehrfach tippen erhöht, halten senkt die Lautstärke", "Stufenlos", ["Aktuell", "+5 %"], ["Mehrfach"], { note: "Halten: in 5-%-Schritten senken" }),
      mode("Audioausgabe", "Ausgewählte Ausgabegeräte durchschalten", "Mehrere", ["Ausgabe 1", "Ausgabe 2", "Nächste"], ["Tippen", "Tippen"], { loop: true }),
      mode("Eingabequelle", "Zwischen ausgewählten Eingabequellen wechseln", "Mehrere", ["Eingabe 1", "Eingabe 2", "Nächste"], ["Tippen", "Tippen"], { loop: true }),
      mode("Timer", "Countdown starten, pausieren und anpassen", "Zeit", ["Gestoppt", "Läuft", "Pausiert", "Fertig"], ["Tippen", "Tippen", "Zeit ab"], { note: "Gestoppt: mehrfach +1 Min. / halten −1 Min." }),
      mode("Kurzbefehl", "Aktionen verschiedenen Tastmustern zuweisen", "Eigene", ["Muster erkennen", "Aktion ausführen"], ["Tippen / mehrfach / halten"], { note: "Halten einmalig oder fortlaufend" }),
    ],
    led: {
      kicker: "Physische Rückmeldung", title: "Status über die LED erkennen", description: "Dauerlicht, Anzahl und Geschwindigkeit der Impulse zeigen verschiedene Zustände.",
      columns: ["Statustyp", "LED-Muster", "Verwendet für"], aria: "LED-Muster",
      rows: [["2 Zustände", "Ein / Aus", "Funktionstasten, Stumm, Darstellung"], ["Mehrere Zustände", "1–n kurze Impulse → lange Pause", "Audioausgabe, Eingabequelle"], ["Stufenloser Wert", "Höherer Wert = schnellere Impulse", "Lautstärke"], ["Restzeit", "Zum Ende hin schnellere Impulse", "Timer"]],
    },
    price: { kicker: "Zuerst testen", title: "14 Tage alles ausprobieren", description: "Ohne Registrierung stehen alle Funktionen bereit.", button: "Capswitch laden", purchase: "Capswitch kaufen — $14.99" },
  },
  "zh-Hans": {
    language: "语言", download: "下载",
    hero: ["常用操作，", "交给 Caps Lock"], heroLead: "LED 同步显示当前状态",
    trial: "免费试用 14 天", viewCore: "查看开源 Core", requirements: "需要 macOS 14 或更高版本",
    demo: { media: "媒体控制", function: "功能键", mediaShort: "媒体", functionShort: "功能键", pressLabel: "按下 Caps Lock。当前状态：" },
    tour: {
      kicker: "使用方法", title: "从设置到日常使用",
      steps: ["选择模式", "使用 Caps Lock 操作", "从菜单栏管理"],
      descriptions: ["从 10 种操作中选择一种，只调整所需项目。", "根据模式使用单击、连击或长按。", "随时查看状态、暂停监听、打开设置或退出。"],
      flow: ["Caps Lock", "执行模式", "LED 与 HUD 显示状态"],
      settingsAlt: "Capswitch 设置界面，侧边栏包含通用、输入、模式、显示、许可证和诊断",
      menuAlt: "Capswitch 菜单栏菜单，显示状态、暂停、设置和退出",
    },
    keep: {
      kicker: "保留 Caps Lock", title: "仍可使用原本的 Caps Lock",
      description: "按设定次数连续敲击时，不执行所选模式，而是切换 Caps Lock。",
      labels: ["设置", "操作", "结果"], values: ["选择 3、4 或 5 次", "连续敲击所选次数", "Caps Lock 开 / 关"], aria: "使用原本 Caps Lock 的步骤",
    },
    modesKicker: "10 种模式", modesTitle: "选择一种模式", stateFlow: "状态变化", backToStart: "返回初始状态",
    modes: [
      mode("功能键切换", "切换 F1–F12 的媒体与功能键操作", "2 种状态", ["媒体控制", "功能键"], ["单击"], { loop: true }),
      mode("麦克风静音", "静音或恢复麦克风", "2 种状态", ["使用中", "静音"], ["单击"], { loop: true }),
      mode("外观切换", "切换浅色与深色模式", "2 种状态", ["浅色", "深色"], ["单击"], { loop: true }),
      mode("防止睡眠", "开启或关闭睡眠防止", "2 种状态", ["系统设置", "保持唤醒"], ["单击"], { loop: true }),
      mode("扬声器静音", "静音或恢复音频输出", "2 种状态", ["播放中", "静音"], ["单击"], { loop: true }),
      mode("音量控制", "连击提高音量，长按降低音量", "连续值", ["当前音量", "+5%"], ["连击"], { note: "长按时每次降低 5%" }),
      mode("音频输出", "按顺序切换所选输出设备", "多种状态", ["输出 1", "输出 2", "下一个输出"], ["单击", "单击"], { loop: true }),
      mode("输入法", "切换所选输入法", "多种状态", ["输入 1", "输入 2", "下一个输入"], ["单击", "单击"], { loop: true }),
      mode("计时器", "启动、暂停并调整倒计时", "时间", ["已停止", "计时中", "已暂停", "完成"], ["单击", "单击", "时间到"], { note: "停止时：连击 +1 分钟／长按 −1 分钟" }),
      mode("快捷操作", "为不同按键方式分配操作", "自定义", ["识别按法", "执行操作"], ["单击／连击／长按"], { note: "长按可选择执行一次或连续执行" }),
    ],
    led: {
      kicker: "物理反馈", title: "通过 LED 显示状态", description: "使用常亮、熄灭、闪烁次数和速度表达不同状态。",
      columns: ["状态类型", "LED 表示方式", "对应模式"], aria: "LED 闪烁模式",
      rows: [["2 种状态", "亮 / 灭", "功能键、静音、外观等"], ["多种状态", "短闪 1–n 次 → 长时间熄灭", "音频输出、输入法"], ["连续值", "数值越高，闪烁越快", "音量"], ["剩余时间", "越接近结束，闪烁越快", "计时器"]],
    },
    price: { kicker: "先试用", title: "14 天体验全部功能", description: "无需注册，即可使用全部功能。", button: "下载 Capswitch", purchase: "购买 Capswitch — $14.99" },
  },
  "zh-Hant": {
    language: "語言", download: "下載",
    hero: ["常用操作，", "交給 Caps Lock"], heroLead: "LED 同步顯示目前狀態",
    trial: "免費試用 14 天", viewCore: "查看開源 Core", requirements: "需要 macOS 14 或以上版本",
    demo: { media: "媒體控制", function: "功能鍵", mediaShort: "媒體", functionShort: "功能鍵", pressLabel: "按下 Caps Lock。目前狀態：" },
    tour: {
      kicker: "使用方式", title: "從設定到日常操作",
      steps: ["選擇模式", "使用 Caps Lock 操作", "從選單列管理"],
      descriptions: ["從 10 種操作中選擇一種，只調整需要的項目。", "依模式使用單按、連按或長按。", "隨時查看狀態、暫停監聽、開啟設定或結束程式。"],
      flow: ["Caps Lock", "執行模式", "LED 與 HUD 顯示狀態"],
      settingsAlt: "Capswitch 設定畫面，側邊欄包含一般、輸入、模式、顯示、授權與診斷",
      menuAlt: "Capswitch 選單列選單，顯示狀態、暫停、設定與結束",
    },
    keep: {
      kicker: "保留 Caps Lock", title: "仍可使用原本的 Caps Lock",
      description: "依設定次數連按時，不執行所選模式，而是切換 Caps Lock。",
      labels: ["設定", "操作", "結果"], values: ["選擇 3、4 或 5 次", "連按所選次數", "Caps Lock 開 / 關"], aria: "使用原本 Caps Lock 的步驟",
    },
    modesKicker: "10 種模式", modesTitle: "選擇一種模式", stateFlow: "狀態變化", backToStart: "回到初始狀態",
    modes: [
      mode("功能鍵切換", "切換 F1–F12 的媒體與功能鍵操作", "2 種狀態", ["媒體控制", "功能鍵"], ["單按"], { loop: true }),
      mode("麥克風靜音", "將麥克風靜音或恢復", "2 種狀態", ["使用中", "靜音"], ["單按"], { loop: true }),
      mode("外觀切換", "切換淺色與深色模式", "2 種狀態", ["淺色", "深色"], ["單按"], { loop: true }),
      mode("防止睡眠", "開始或停止防止睡眠", "2 種狀態", ["系統設定", "保持喚醒"], ["單按"], { loop: true }),
      mode("揚聲器靜音", "將音訊輸出靜音或恢復", "2 種狀態", ["播放中", "靜音"], ["單按"], { loop: true }),
      mode("音量控制", "連按提高音量，長按降低音量", "連續值", ["目前音量", "+5%"], ["連按"], { note: "長按時每次降低 5%" }),
      mode("音訊輸出", "依序切換所選輸出裝置", "多種狀態", ["輸出 1", "輸出 2", "下一個輸出"], ["單按", "單按"], { loop: true }),
      mode("輸入來源", "切換所選輸入來源", "多種狀態", ["輸入 1", "輸入 2", "下一個輸入"], ["單按", "單按"], { loop: true }),
      mode("計時器", "開始、暫停並調整倒數時間", "時間", ["已停止", "計時中", "已暫停", "完成"], ["單按", "單按", "時間到"], { note: "停止時：連按 +1 分鐘／長按 −1 分鐘" }),
      mode("捷徑", "為不同按鍵方式指定操作", "自訂", ["辨識按法", "執行操作"], ["單按／連按／長按"], { note: "長按可選擇執行一次或連續執行" }),
    ],
    led: {
      kicker: "實體回饋", title: "透過 LED 顯示狀態", description: "使用亮起、熄滅、閃爍次數與速度表達不同狀態。",
      columns: ["狀態類型", "LED 表示方式", "對應模式"], aria: "LED 閃爍模式",
      rows: [["2 種狀態", "亮 / 滅", "功能鍵、靜音、外觀等"], ["多種狀態", "短閃 1–n 次 → 長時間熄滅", "音訊輸出、輸入來源"], ["連續值", "數值越高，閃爍越快", "音量"], ["剩餘時間", "越接近結束，閃爍越快", "計時器"]],
    },
    price: { kicker: "先試用", title: "14 天體驗所有功能", description: "無需註冊，即可使用全部功能。", button: "下載 Capswitch", purchase: "購買 Capswitch — $14.99" },
  },
  fr: {
    language: "Langue", download: "Télécharger",
    hero: ["Vos raccourcis,", "sur Caps Lock"], heroLead: "La LED indique aussi l’état actuel",
    trial: "Essayer 14 jours", viewCore: "Voir le Core ouvert", requirements: "macOS 14 ou version ultérieure",
    demo: { media: "Commandes multimédia", function: "Touches de fonction", mediaShort: "Média", functionShort: "Fonction", pressLabel: "Appuyez sur Caps Lock. État actuel :" },
    tour: {
      kicker: "Fonctionnement", title: "Du réglage à l’usage quotidien",
      steps: ["Choisir un mode", "Commander avec Caps Lock", "Gérer depuis la barre des menus"],
      descriptions: ["Choisissez une action parmi 10 et réglez uniquement les options nécessaires.", "Utilisez un appui, plusieurs appuis ou un appui long selon le mode.", "Consultez l’état, mettez en pause, ouvrez les réglages ou quittez rapidement."],
      flow: ["Caps Lock", "Le mode s’exécute", "LED et HUD mis à jour"],
      settingsAlt: "Réglages Capswitch avec Général, Entrée, Mode, Affichage, Licence et Diagnostic dans la barre latérale",
      menuAlt: "Menu Capswitch affichant l’état, la pause, les réglages et la fermeture",
    },
    keep: {
      kicker: "Conserver Caps Lock", title: "Caps Lock reste disponible",
      description: "Appuyez le nombre de fois défini pour activer Caps Lock au lieu du mode sélectionné.",
      labels: ["Réglage", "Action", "Résultat"], values: ["Choisir 3, 4 ou 5 appuis", "Appuyer autant de fois", "Caps Lock activé / désactivé"], aria: "Utiliser la fonction Caps Lock normale",
    },
    modesKicker: "10 modes", modesTitle: "Choisissez un mode", stateFlow: "États", backToStart: "retour au début",
    modes: [
      mode("Touches de fonction", "Basculer F1–F12 entre média et fonction", "2 états", ["Média", "Fonction"], ["Appui"], { loop: true }),
      mode("Micro en sourdine", "Couper ou rétablir le microphone", "2 états", ["Actif", "Muet"], ["Appui"], { loop: true }),
      mode("Apparence", "Basculer entre clair et sombre", "2 états", ["Clair", "Sombre"], ["Appui"], { loop: true }),
      mode("Empêcher la veille", "Activer ou arrêter le maintien éveillé", "2 états", ["Réglage système", "Maintien éveillé"], ["Appui"], { loop: true }),
      mode("Haut-parleur muet", "Couper ou rétablir la sortie audio", "2 états", ["Lecture", "Muet"], ["Appui"], { loop: true }),
      mode("Volume", "Les appuis répétés augmentent, l’appui long diminue", "Continu", ["Volume actuel", "+5 %"], ["Répéter"], { note: "Maintenir pour diminuer par pas de 5 %" }),
      mode("Sortie audio", "Parcourir les sorties audio choisies", "Multiple", ["Sortie 1", "Sortie 2", "Suivante"], ["Appui", "Appui"], { loop: true }),
      mode("Source d’entrée", "Parcourir les sources d’entrée choisies", "Multiple", ["Entrée 1", "Entrée 2", "Suivante"], ["Appui", "Appui"], { loop: true }),
      mode("Minuteur", "Démarrer, mettre en pause et ajuster le compte à rebours", "Temps", ["Arrêté", "En cours", "En pause", "Terminé"], ["Appui", "Appui", "Fin"], { note: "À l’arrêt : répétition +1 min / maintien −1 min" }),
      mode("Raccourci", "Associer une action à chaque type d’appui", "Personnalisé", ["Détecter l’appui", "Exécuter l’action"], ["Appui / répétition / maintien"], { note: "Le maintien peut agir une fois ou en continu" }),
    ],
    led: {
      kicker: "Retour physique", title: "Voir l’état sur la LED", description: "Lumière fixe, nombre et vitesse des impulsions représentent différents états.",
      columns: ["Type d’état", "Motif LED", "Modes concernés"], aria: "Motifs de clignotement LED",
      rows: [["2 états", "Allumé / éteint", "Fonction, sourdine, apparence"], ["États multiples", "1–n impulsions courtes → longue pause", "Sortie audio, source d’entrée"], ["Valeur continue", "Plus la valeur monte, plus ça clignote vite", "Volume"], ["Temps restant", "Plus la fin approche, plus ça clignote vite", "Minuteur"]],
    },
    price: { kicker: "Essayer d’abord", title: "Tout essayer pendant 14 jours", description: "Aucune inscription. Toutes les fonctions sont disponibles.", button: "Télécharger Capswitch", purchase: "Acheter Capswitch — $14.99" },
  },
  ko: {
    language: "언어", download: "다운로드",
    hero: ["자주 쓰는 동작을", "Caps Lock 하나로"], heroLead: "LED로 현재 상태도 확인할 수 있습니다",
    trial: "14일 동안 사용", viewCore: "오픈 Core 보기", requirements: "macOS 14 이상",
    demo: { media: "미디어 조작", function: "Function 키", mediaShort: "미디어", functionShort: "Function", pressLabel: "Caps Lock을 누릅니다. 현재 상태:" },
    tour: {
      kicker: "사용 방법", title: "설정부터 평소 사용까지",
      steps: ["모드 선택", "Caps Lock으로 조작", "메뉴 막대에서 관리"],
      descriptions: ["10가지 동작 중 하나를 선택하고 필요한 항목만 조정합니다.", "모드에 따라 한 번 누르기, 연타, 길게 누르기를 사용합니다.", "상태 확인, 일시 정지, 설정, 종료를 바로 실행합니다."],
      flow: ["Caps Lock", "모드 실행", "LED와 HUD에 표시"],
      settingsAlt: "일반, 입력, 모드, 표시, 라이선스, 진단 메뉴가 있는 Capswitch 설정 화면",
      menuAlt: "상태, 일시 정지, 설정, 종료를 표시하는 Capswitch 메뉴",
    },
    keep: {
      kicker: "Caps Lock 유지", title: "기존 Caps Lock도 사용할 수 있습니다",
      description: "설정한 횟수만큼 연타하면 선택한 모드 대신 기존 Caps Lock이 전환됩니다.",
      labels: ["설정", "조작", "결과"], values: ["3·4·5회 중 선택", "선택한 횟수만큼 연타", "Caps Lock 켜기 / 끄기"], aria: "기존 Caps Lock 사용 방법",
    },
    modesKicker: "10가지 모드", modesTitle: "모드 하나 선택", stateFlow: "상태 전환", backToStart: "처음 상태로",
    modes: [
      mode("Function 키 전환", "F1–F12의 미디어/Function 동작 전환", "2상태", ["미디어", "Function"], ["한 번"], { loop: true }),
      mode("마이크 음소거", "마이크 음소거/해제", "2상태", ["사용 중", "음소거"], ["한 번"], { loop: true }),
      mode("화면 모드", "라이트/다크 모드 전환", "2상태", ["라이트", "다크"], ["한 번"], { loop: true }),
      mode("잠자기 방지", "잠자기 방지 시작/중지", "2상태", ["기본 설정", "잠자기 방지"], ["한 번"], { loop: true }),
      mode("스피커 음소거", "오디오 출력 음소거/해제", "2상태", ["재생 중", "음소거"], ["한 번"], { loop: true }),
      mode("음량 조절", "연타로 높이고 길게 눌러 낮추기", "연속값", ["현재 음량", "+5%"], ["연타"], { note: "길게 누르면 5%씩 낮춤" }),
      mode("오디오 출력", "선택한 출력 장치를 순서대로 전환", "다중 상태", ["출력 1", "출력 2", "다음 출력"], ["한 번", "한 번"], { loop: true }),
      mode("입력 소스", "선택한 입력 소스를 전환", "다중 상태", ["입력 1", "입력 2", "다음 입력"], ["한 번", "한 번"], { loop: true }),
      mode("타이머", "카운트다운 시작·일시 정지·시간 조절", "시간", ["정지", "진행 중", "일시 정지", "완료"], ["한 번", "한 번", "종료"], { note: "정지 중: 연타 +1분 / 길게 −1분" }),
      mode("단축어", "누르는 방법마다 동작 할당", "사용자 설정", ["입력 판정", "동작 실행"], ["한 번/연타/길게"], { note: "길게 누르기는 1회/연속 선택" }),
    ],
    led: {
      kicker: "물리 피드백", title: "LED로 상태 표시", description: "점등, 소등, 점멸 횟수와 속도로 상태를 구분합니다.",
      columns: ["상태 유형", "LED 표현", "해당 모드"], aria: "LED 점멸 패턴",
      rows: [["2상태", "켜짐 / 꺼짐", "Function 키, 음소거, 화면 모드"], ["다중 상태", "짧게 1–n회 점멸 → 긴 소등", "오디오 출력, 입력 소스"], ["연속값", "값이 높을수록 빠르게 점멸", "음량"], ["남은 시간", "종료에 가까울수록 빠르게 점멸", "타이머"]],
    },
    price: { kicker: "먼저 체험", title: "14일 동안 모든 기능 체험", description: "가입 없이 모든 기능을 사용할 수 있습니다.", button: "Capswitch 다운로드", purchase: "Capswitch 구매 — $14.99" },
  },
  es: {
    language: "Idioma", download: "Descargar",
    hero: ["Tus acciones diarias,", "en Caps Lock"], heroLead: "El LED también muestra el estado",
    trial: "Probar 14 días", viewCore: "Ver Core abierto", requirements: "macOS 14 o posterior",
    demo: { media: "Controles multimedia", function: "Teclas de función", mediaShort: "Media", functionShort: "Función", pressLabel: "Pulsa Caps Lock. Estado actual:" },
    tour: {
      kicker: "Cómo funciona", title: "De la configuración al uso diario",
      steps: ["Elegir un modo", "Controlar con Caps Lock", "Gestionar desde la barra de menús"],
      descriptions: ["Elige una de 10 acciones y ajusta solo lo necesario.", "Usa una pulsación, varias o una pulsación larga según el modo.", "Consulta el estado, pausa, abre los ajustes o sal al instante."],
      flow: ["Caps Lock", "El modo actúa", "LED y HUD se actualizan"],
      settingsAlt: "Ajustes de Capswitch con General, Entrada, Modo, Pantalla, Licencia y Diagnóstico",
      menuAlt: "Menú de Capswitch con estado, pausa, ajustes y salir",
    },
    keep: {
      kicker: "Conservar Caps Lock", title: "Caps Lock sigue disponible",
      description: "Pulsa el número configurado de veces para cambiar Caps Lock en lugar de ejecutar el modo.",
      labels: ["Ajuste", "Acción", "Resultado"], values: ["Elegir 3, 4 o 5 pulsaciones", "Pulsar ese número", "Caps Lock activado / desactivado"], aria: "Usar Caps Lock normalmente",
    },
    modesKicker: "10 modos", modesTitle: "Elige un modo", stateFlow: "Flujo de estados", backToStart: "volver al inicio",
    modes: [
      mode("Teclas de función", "Alternar F1–F12 entre multimedia y función", "2 estados", ["Multimedia", "Función"], ["Pulsar"], { loop: true }),
      mode("Silenciar micrófono", "Silenciar o activar el micrófono", "2 estados", ["Activo", "Silenciado"], ["Pulsar"], { loop: true }),
      mode("Apariencia", "Alternar entre Claro y Oscuro", "2 estados", ["Claro", "Oscuro"], ["Pulsar"], { loop: true }),
      mode("Evitar reposo", "Activar o desactivar la prevención de reposo", "2 estados", ["Sistema", "Mantener activo"], ["Pulsar"], { loop: true }),
      mode("Silenciar altavoz", "Silenciar o activar la salida de audio", "2 estados", ["Reproduciendo", "Silenciado"], ["Pulsar"], { loop: true }),
      mode("Volumen", "Las pulsaciones repetidas suben; mantener baja", "Continuo", ["Volumen actual", "+5%"], ["Repetir"], { note: "Mantener para bajar en pasos del 5%" }),
      mode("Salida de audio", "Recorrer las salidas seleccionadas", "Múltiple", ["Salida 1", "Salida 2", "Siguiente"], ["Pulsar", "Pulsar"], { loop: true }),
      mode("Fuente de entrada", "Recorrer las fuentes de entrada", "Múltiple", ["Entrada 1", "Entrada 2", "Siguiente"], ["Pulsar", "Pulsar"], { loop: true }),
      mode("Temporizador", "Iniciar, pausar y ajustar la cuenta atrás", "Tiempo", ["Detenido", "En marcha", "En pausa", "Terminado"], ["Pulsar", "Pulsar", "Fin"], { note: "Detenido: repetir +1 min / mantener −1 min" }),
      mode("Atajo", "Asignar acciones a cada tipo de pulsación", "Personalizado", ["Detectar pulsación", "Ejecutar acción"], ["Pulsar / repetir / mantener"], { note: "Mantener puede actuar una vez o de forma continua" }),
    ],
    led: {
      kicker: "Respuesta física", title: "Ver el estado en el LED", description: "Luz fija, número y velocidad de pulsos indican estados distintos.",
      columns: ["Tipo de estado", "Patrón LED", "Modos"], aria: "Patrones LED",
      rows: [["2 estados", "Encendido / apagado", "Función, silencio, apariencia"], ["Varios estados", "1–n pulsos cortos → pausa larga", "Salida de audio, entrada"], ["Valor continuo", "Más valor, pulsos más rápidos", "Volumen"], ["Tiempo restante", "Más rápido al acercarse el final", "Temporizador"]],
    },
    price: { kicker: "Pruébalo", title: "Prueba todo durante 14 días", description: "Sin registro. Todas las funciones disponibles.", button: "Descargar Capswitch", purchase: "Comprar Capswitch — $14.99" },
  },
  it: {
    language: "Lingua", download: "Scarica",
    hero: ["Le azioni di ogni giorno,", "sul Caps Lock"], heroLead: "Il LED mostra anche lo stato corrente",
    trial: "Prova per 14 giorni", viewCore: "Vedi il Core aperto", requirements: "macOS 14 o successivo",
    demo: { media: "Controlli multimediali", function: "Tasti funzione", mediaShort: "Media", functionShort: "Funzione", pressLabel: "Premi Caps Lock. Stato attuale:" },
    tour: {
      kicker: "Come funziona", title: "Dalla configurazione all’uso quotidiano",
      steps: ["Scegli una modalità", "Controlla con Caps Lock", "Gestisci dalla barra dei menu"],
      descriptions: ["Scegli una delle 10 azioni e regola solo ciò che serve.", "Usa una pressione, pressioni ripetute o una pressione lunga.", "Controlla lo stato, metti in pausa, apri le impostazioni o esci."],
      flow: ["Caps Lock", "La modalità agisce", "LED e HUD si aggiornano"],
      settingsAlt: "Impostazioni Capswitch con Generali, Input, Modalità, Schermo, Licenza e Diagnostica",
      menuAlt: "Menu Capswitch con stato, pausa, impostazioni e uscita",
    },
    keep: {
      kicker: "Mantieni Caps Lock", title: "Caps Lock resta disponibile",
      description: "Premi il numero configurato di volte per attivare Caps Lock invece della modalità scelta.",
      labels: ["Imposta", "Azione", "Risultato"], values: ["Scegli 3, 4 o 5 pressioni", "Premi quel numero di volte", "Caps Lock ON / OFF"], aria: "Usare la funzione Caps Lock normale",
    },
    modesKicker: "10 modalità", modesTitle: "Scegli una modalità", stateFlow: "Stati", backToStart: "torna all’inizio",
    modes: [
      mode("Tasti funzione", "Alterna F1–F12 tra media e funzione", "2 stati", ["Media", "Funzione"], ["Premi"], { loop: true }),
      mode("Microfono muto", "Disattiva o riattiva il microfono", "2 stati", ["Attivo", "Muto"], ["Premi"], { loop: true }),
      mode("Aspetto", "Alterna tra Chiaro e Scuro", "2 stati", ["Chiaro", "Scuro"], ["Premi"], { loop: true }),
      mode("Impedisci stop", "Avvia o ferma la prevenzione dello stop", "2 stati", ["Sistema", "Resta attivo"], ["Premi"], { loop: true }),
      mode("Altoparlante muto", "Disattiva o riattiva l’uscita audio", "2 stati", ["In riproduzione", "Muto"], ["Premi"], { loop: true }),
      mode("Volume", "Pressioni ripetute alzano; tenere premuto abbassa", "Continuo", ["Volume attuale", "+5%"], ["Ripeti"], { note: "Tieni premuto per scendere del 5%" }),
      mode("Uscita audio", "Scorri le uscite selezionate", "Multiplo", ["Uscita 1", "Uscita 2", "Successiva"], ["Premi", "Premi"], { loop: true }),
      mode("Sorgente input", "Scorri le sorgenti di input", "Multiplo", ["Input 1", "Input 2", "Successivo"], ["Premi", "Premi"], { loop: true }),
      mode("Timer", "Avvia, metti in pausa e regola il conto alla rovescia", "Tempo", ["Fermo", "In corso", "In pausa", "Finito"], ["Premi", "Premi", "Fine"], { note: "Da fermo: ripeti +1 min / tieni −1 min" }),
      mode("Comando rapido", "Assegna azioni a ogni tipo di pressione", "Personalizzato", ["Rileva pressione", "Esegui azione"], ["Premi / ripeti / tieni"], { note: "La pressione lunga può agire una volta o di continuo" }),
    ],
    led: {
      kicker: "Feedback fisico", title: "Vedi lo stato sul LED", description: "Luce fissa, numero e velocità degli impulsi distinguono gli stati.",
      columns: ["Tipo di stato", "Schema LED", "Modalità"], aria: "Schemi LED",
      rows: [["2 stati", "Acceso / spento", "Funzione, muto, aspetto"], ["Più stati", "1–n impulsi brevi → pausa lunga", "Uscita audio, input"], ["Valore continuo", "Valore più alto, impulsi più rapidi", "Volume"], ["Tempo restante", "Più rapido vicino alla fine", "Timer"]],
    },
    price: { kicker: "Prova prima", title: "Prova tutto per 14 giorni", description: "Nessuna registrazione. Tutte le funzioni disponibili.", button: "Scarica Capswitch", purchase: "Acquista Capswitch — $14.99" },
  },
  vi: {
    language: "Ngôn ngữ", download: "Tải xuống",
    hero: ["Thao tác quen thuộc,", "ngay trên Caps Lock"], heroLead: "Đèn LED cũng hiển thị trạng thái",
    trial: "Dùng thử 14 ngày", viewCore: "Xem Core công khai", requirements: "macOS 14 trở lên",
    demo: { media: "Điều khiển media", function: "Phím chức năng", mediaShort: "Media", functionShort: "Function", pressLabel: "Nhấn Caps Lock. Trạng thái hiện tại:" },
    tour: {
      kicker: "Cách hoạt động", title: "Từ thiết lập đến sử dụng hằng ngày",
      steps: ["Chọn chế độ", "Điều khiển bằng Caps Lock", "Quản lý từ thanh menu"],
      descriptions: ["Chọn một trong 10 thao tác và chỉ chỉnh những mục cần thiết.", "Nhấn một lần, nhấn liên tiếp hoặc nhấn giữ tùy chế độ.", "Xem trạng thái, tạm dừng, mở cài đặt hoặc thoát ngay."],
      flow: ["Caps Lock", "Chế độ hoạt động", "LED và HUD cập nhật"],
      settingsAlt: "Cài đặt Capswitch với Chung, Đầu vào, Chế độ, Hiển thị, Giấy phép và Chẩn đoán",
      menuAlt: "Menu Capswitch hiển thị trạng thái, tạm dừng, cài đặt và thoát",
    },
    keep: {
      kicker: "Giữ Caps Lock", title: "Caps Lock vẫn dùng được",
      description: "Nhấn liên tiếp đúng số lần đã đặt để bật hoặc tắt Caps Lock thay vì chạy chế độ.",
      labels: ["Đặt", "Thao tác", "Kết quả"], values: ["Chọn 3, 4 hoặc 5 lần", "Nhấn đúng số lần đó", "Caps Lock BẬT / TẮT"], aria: "Cách dùng Caps Lock thông thường",
    },
    modesKicker: "10 chế độ", modesTitle: "Chọn một chế độ", stateFlow: "Chuyển trạng thái", backToStart: "về trạng thái đầu",
    modes: [
      mode("Phím chức năng", "Chuyển F1–F12 giữa media và chức năng", "2 trạng thái", ["Media", "Function"], ["Nhấn"], { loop: true }),
      mode("Tắt mic", "Tắt hoặc bật lại micrô", "2 trạng thái", ["Đang dùng", "Đã tắt"], ["Nhấn"], { loop: true }),
      mode("Giao diện", "Chuyển giữa Sáng và Tối", "2 trạng thái", ["Sáng", "Tối"], ["Nhấn"], { loop: true }),
      mode("Chống ngủ", "Bắt đầu hoặc dừng chống ngủ", "2 trạng thái", ["Hệ thống", "Luôn thức"], ["Nhấn"], { loop: true }),
      mode("Tắt loa", "Tắt hoặc bật lại đầu ra âm thanh", "2 trạng thái", ["Đang phát", "Đã tắt"], ["Nhấn"], { loop: true }),
      mode("Âm lượng", "Nhấn liên tiếp để tăng, nhấn giữ để giảm", "Liên tục", ["Âm lượng hiện tại", "+5%"], ["Liên tiếp"], { note: "Nhấn giữ để giảm từng bước 5%" }),
      mode("Đầu ra âm thanh", "Luân phiên các thiết bị đầu ra đã chọn", "Nhiều trạng thái", ["Đầu ra 1", "Đầu ra 2", "Tiếp theo"], ["Nhấn", "Nhấn"], { loop: true }),
      mode("Nguồn nhập", "Luân phiên các nguồn nhập đã chọn", "Nhiều trạng thái", ["Nguồn 1", "Nguồn 2", "Tiếp theo"], ["Nhấn", "Nhấn"], { loop: true }),
      mode("Hẹn giờ", "Bắt đầu, tạm dừng và chỉnh đếm ngược", "Thời gian", ["Đã dừng", "Đang chạy", "Tạm dừng", "Hoàn tất"], ["Nhấn", "Nhấn", "Hết giờ"], { note: "Khi dừng: nhấn liên tiếp +1 phút / giữ −1 phút" }),
      mode("Phím tắt", "Gán thao tác cho từng kiểu nhấn", "Tùy chỉnh", ["Nhận kiểu nhấn", "Chạy thao tác"], ["Nhấn / liên tiếp / giữ"], { note: "Nhấn giữ có thể chạy một lần hoặc liên tục" }),
    ],
    led: {
      kicker: "Phản hồi vật lý", title: "Xem trạng thái trên LED", description: "Đèn sáng, số lần và tốc độ nháy thể hiện các trạng thái khác nhau.",
      columns: ["Loại trạng thái", "Kiểu LED", "Chế độ"], aria: "Các kiểu nháy LED",
      rows: [["2 trạng thái", "Bật / tắt", "Function, tắt tiếng, giao diện"], ["Nhiều trạng thái", "1–n nháy ngắn → nghỉ dài", "Đầu ra âm thanh, nguồn nhập"], ["Giá trị liên tục", "Giá trị càng cao, nháy càng nhanh", "Âm lượng"], ["Thời gian còn lại", "Càng gần kết thúc, nháy càng nhanh", "Hẹn giờ"]],
    },
    price: { kicker: "Dùng thử trước", title: "Dùng mọi tính năng trong 14 ngày", description: "Không cần đăng ký. Mọi tính năng đều khả dụng.", button: "Tải Capswitch", purchase: "Mua Capswitch — $14.99" },
  },
  th: {
    language: "ภาษา", download: "ดาวน์โหลด",
    hero: ["คำสั่งที่ใช้บ่อย", "ไว้ที่ Caps Lock"], heroLead: "ไฟ LED แสดงสถานะปัจจุบันได้ด้วย",
    trial: "ทดลองใช้ 14 วัน", viewCore: "ดู Core แบบเปิด", requirements: "macOS 14 ขึ้นไป",
    demo: { media: "ควบคุมสื่อ", function: "ปุ่มฟังก์ชัน", mediaShort: "Media", functionShort: "Function", pressLabel: "กด Caps Lock สถานะปัจจุบัน:" },
    tour: {
      kicker: "วิธีใช้งาน", title: "ตั้งค่าแล้วใช้ได้ทุกวัน",
      steps: ["เลือกโหมด", "ควบคุมด้วย Caps Lock", "จัดการจากแถบเมนู"],
      descriptions: ["เลือกหนึ่งคำสั่งจาก 10 แบบ แล้วปรับเฉพาะสิ่งที่ต้องใช้", "กดหนึ่งครั้ง กดซ้ำ หรือกดค้างตามโหมด", "ดูสถานะ พักการตรวจจับ เปิดการตั้งค่า หรือออกได้ทันที"],
      flow: ["Caps Lock", "โหมดทำงาน", "LED และ HUD อัปเดต"],
      settingsAlt: "หน้าตั้งค่า Capswitch พร้อมเมนูทั่วไป อินพุต โหมด การแสดงผล ใบอนุญาต และการวินิจฉัย",
      menuAlt: "เมนู Capswitch ที่แสดงสถานะ หยุดชั่วคราว การตั้งค่า และออก",
    },
    keep: {
      kicker: "คง Caps Lock", title: "ยังใช้ Caps Lock แบบเดิมได้",
      description: "กดซ้ำตามจำนวนที่ตั้งไว้เพื่อเปิดหรือปิด Caps Lock แทนการใช้โหมดที่เลือก",
      labels: ["ตั้งค่า", "การกด", "ผลลัพธ์"], values: ["เลือก 3, 4 หรือ 5 ครั้ง", "กดตามจำนวนที่เลือก", "Caps Lock เปิด / ปิด"], aria: "วิธีใช้ Caps Lock แบบเดิม",
    },
    modesKicker: "10 โหมด", modesTitle: "เลือกหนึ่งโหมด", stateFlow: "ลำดับสถานะ", backToStart: "กลับสถานะแรก",
    modes: [
      mode("สลับปุ่มฟังก์ชัน", "สลับ F1–F12 ระหว่างสื่อและฟังก์ชัน", "2 สถานะ", ["สื่อ", "ฟังก์ชัน"], ["กด"], { loop: true }),
      mode("ปิดไมโครโฟน", "ปิดหรือเปิดเสียงไมโครโฟน", "2 สถานะ", ["ใช้งาน", "ปิดเสียง"], ["กด"], { loop: true }),
      mode("รูปแบบหน้าจอ", "สลับระหว่างสว่างและมืด", "2 สถานะ", ["สว่าง", "มืด"], ["กด"], { loop: true }),
      mode("ป้องกันการพักเครื่อง", "เริ่มหรือหยุดป้องกันการพักเครื่อง", "2 สถานะ", ["ค่าระบบ", "ทำงานต่อ"], ["กด"], { loop: true }),
      mode("ปิดลำโพง", "ปิดหรือเปิดเสียงเอาต์พุต", "2 สถานะ", ["กำลังเล่น", "ปิดเสียง"], ["กด"], { loop: true }),
      mode("ระดับเสียง", "กดซ้ำเพื่อเพิ่ม กดค้างเพื่อลด", "ค่าต่อเนื่อง", ["ระดับปัจจุบัน", "+5%"], ["กดซ้ำ"], { note: "กดค้างเพื่อลดครั้งละ 5%" }),
      mode("เอาต์พุตเสียง", "วนอุปกรณ์เอาต์พุตที่เลือก", "หลายสถานะ", ["เอาต์พุต 1", "เอาต์พุต 2", "ถัดไป"], ["กด", "กด"], { loop: true }),
      mode("แหล่งอินพุต", "วนแหล่งอินพุตที่เลือก", "หลายสถานะ", ["อินพุต 1", "อินพุต 2", "ถัดไป"], ["กด", "กด"], { loop: true }),
      mode("ตัวจับเวลา", "เริ่ม พัก และปรับเวลานับถอยหลัง", "เวลา", ["หยุด", "กำลังนับ", "พัก", "เสร็จ"], ["กด", "กด", "หมดเวลา"], { note: "ขณะหยุด: กดซ้ำ +1 นาที / กดค้าง −1 นาที" }),
      mode("คำสั่งลัด", "กำหนดคำสั่งให้รูปแบบการกดแต่ละแบบ", "กำหนดเอง", ["ตรวจรูปแบบ", "เรียกคำสั่ง"], ["กด / กดซ้ำ / กดค้าง"], { note: "กดค้างแบบครั้งเดียวหรือต่อเนื่องได้" }),
    ],
    led: {
      kicker: "การตอบสนองทางกายภาพ", title: "ดูสถานะจากไฟ LED", description: "ไฟค้าง จำนวนครั้ง และความเร็วการกะพริบใช้แสดงสถานะต่างกัน",
      columns: ["ประเภทสถานะ", "รูปแบบ LED", "โหมดที่ใช้"], aria: "รูปแบบการกะพริบ LED",
      rows: [["2 สถานะ", "เปิด / ปิด", "ฟังก์ชัน ปิดเสียง รูปแบบหน้าจอ"], ["หลายสถานะ", "กะพริบสั้น 1–n ครั้ง → พักนาน", "เอาต์พุตเสียง แหล่งอินพุต"], ["ค่าต่อเนื่อง", "ค่ายิ่งสูง ยิ่งกะพริบเร็ว", "ระดับเสียง"], ["เวลาที่เหลือ", "ใกล้จบยิ่งกะพริบเร็ว", "ตัวจับเวลา"]],
    },
    price: { kicker: "ทดลองก่อน", title: "ทดลองทุกฟีเจอร์ 14 วัน", description: "ไม่ต้องลงทะเบียน ใช้ได้ทุกฟีเจอร์", button: "ดาวน์โหลด Capswitch", purchase: "ซื้อ Capswitch — $14.99" },
  },
};

export function resolveLocale(preferredLanguages: readonly string[]): Locale {
  for (const value of preferredLanguages) {
    const normalized = value.replaceAll("_", "-").toLowerCase();
    if (
      normalized === "zh-hant"
      || normalized.startsWith("zh-hant-")
      || normalized === "zh-tw"
      || normalized.startsWith("zh-tw-")
      || normalized === "zh-hk"
      || normalized.startsWith("zh-hk-")
      || normalized === "zh-mo"
      || normalized.startsWith("zh-mo-")
    ) return "zh-Hant";
    if (normalized === "zh" || normalized.startsWith("zh-")) return "zh-Hans";

    const language = languages.find(({ code }) => (
      normalized === code.toLowerCase()
      || normalized.startsWith(`${code.toLowerCase()}-`)
    ));
    if (language) return language.code;
  }
  return "en";
}
