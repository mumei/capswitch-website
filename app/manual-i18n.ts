import type { Locale } from "./i18n";

export type ManualCopy = {
  navLabel: string;
  homeLabel: string;
  kicker: string;
  title: string;
  lead: string;
  version: string;
  updated: string;
  contents: string;
  startLink: string;
  troubleLink: string;
  sectionTitles: {
    quick: string;
    install: string;
    permission: string;
    basics: string;
    modes: string;
    display: string;
    license: string;
    trouble: string;
    support: string;
  };
  quickLead: string;
  quickSteps: Array<{ title: string; detail: string }>;
  installLead: string;
  installSteps: string[];
  installNote: string;
  permissionLead: string;
  permissionRequired: string;
  permissionDetail: string;
  permissionSteps: string[];
  systemPath: string;
  modeSpecificTitle: string;
  modeSpecific: string[];
  basicsLead: string;
  basicCards: Array<{ label: string; title: string; detail: string }>;
  modesLead: string;
  modesHint: string;
  modeOperation: string;
  modeStates: string;
  displayLead: string;
  displayItems: string[];
  licenseLead: string;
  licenseItems: string[];
  troubleLead: string;
  troubleItems: Array<{ question: string; answer: string }>;
  supportLead: string;
  supportSteps: string[];
  issueButton: string;
  privacyNote: string;
  downloadButton: string;
  settingsAlt: string;
  menuAlt: string;
};

const sharedUpdated = "2026-08-01";

export const manualTranslations: Record<Locale, ManualCopy> = {
  ja: {
    navLabel: "使い方", homeLabel: "ホーム", kicker: "USER GUIDE", title: "Capswitchの使い方",
    lead: "ダウンロードから最初のモード切替まで、順番に設定できます。",
    version: "対象: Capswitch 1.x", updated: `最終更新: ${sharedUpdated}`, contents: "目次",
    startLink: "5分で設定する", troubleLink: "困ったとき",
    sectionTitles: { quick: "まず使い始める", install: "インストール", permission: "権限を許可", basics: "基本操作", modes: "モードを選ぶ", display: "表示とLED", license: "ライセンスと更新", trouble: "困ったとき", support: "診断と問い合わせ" },
    quickLead: "次の6ステップでCaps Lockを切替キーとして使い始められます。",
    quickSteps: [
      { title: "ダウンロード", detail: "最新のDMGを取得します" }, { title: "Applicationsへ移動", detail: "DMG内のCapswitchをドラッグします" },
      { title: "起動", detail: "ApplicationsからCapswitchを開きます" }, { title: "権限を許可", detail: "アクセシビリティでCapswitchをオンにします" },
      { title: "モードを選択", detail: "設定の「モード」から役割を1つ選びます" }, { title: "動作確認", detail: "Caps Lockを押して状態の変化を確認します" },
    ],
    installLead: "配布用DMGからApplicationsへ追加します。ダウンロードした場所から直接使い続けないでください。",
    installSteps: ["DMGファイルを開く", "CapswitchをApplicationsフォルダへドラッグ", "ApplicationsからCapswitchを起動", "メニューバーのCapswitchアイコンから「設定」を開く"],
    installNote: "同じアプリが複数あると、macOSの権限が別のコピーへ付く場合があります。Applications版1つだけを使用してください。",
    permissionLead: "Caps Lockの入力を検出するため、アクセシビリティの許可が必要です。入力監視は必須ではありません。",
    permissionRequired: "必須", permissionDetail: "アクセシビリティ",
    permissionSteps: ["設定の「入力」を開く", "「権限を要求」を押す", "macOSのアクセシビリティ設定でCapswitchをオンにする", "Capswitchへ戻り「再確認」を押す", "状態が「稼働中」になったことを確認する"],
    systemPath: "システム設定 → プライバシーとセキュリティ → アクセシビリティ",
    modeSpecificTitle: "モードごとの追加設定",
    modeSpecific: ["ライト／ダーク: オートメーションを許可", "マイク: 操作する入力デバイスを選択", "ショートカット: macOSのショートカットを割り当て"],
    basicsLead: "通常は単押しで切り替えます。音量・タイマー・ショートカットでは連打や長押しも使います。",
    basicCards: [
      { label: "単押し", title: "状態を切り替える", detail: "選択中のモードを次の状態へ切り替えます" },
      { label: "LED", title: "状態を手元で確認", detail: "点灯・消灯・点滅が現在の状態に連動します" },
      { label: "HUD", title: "画面でも確認", detail: "切替時の表示は設定からオン・オフできます" },
      { label: "連打", title: "通常のCaps Lockも使う", detail: "入力設定で3・4・5回連打から選べます" },
    ],
    modesLead: "10の役割から、日常で最も減らしたい操作を1つ選びます。",
    modesHint: "各モードを開くと、操作と状態の流れを確認できます。", modeOperation: "操作", modeStates: "状態",
    displayLead: "HUDと物理LEDは、選択中モードの状態を確認するための表示です。",
    displayItems: ["HUDの表示・位置・画面端からの距離・表示時間", "LEDを使うキーボードの選択", "点灯状態と機能状態の対応", "キーボードの再検出・同期・点滅テスト"],
    licenseLead: "すべての機能を14日間試用できます。購入後はライセンスキーをアプリへ登録します。",
    licenseItems: ["「ライセンス」から購入画面を開く", "購入完了画面でライセンスキーをコピー", "アプリへ入力して「ライセンスを確認」", "「情報」で自動更新または「アップデートを確認」を設定"],
    troubleLead: "表示されている状態に近い項目から確認してください。",
    troubleItems: [
      { question: "停止中と表示される", answer: "「入力」でアクセシビリティの状態と一時停止設定を確認し、「再確認」を押します。" },
      { question: "権限を許可しても動かない", answer: "Applications版が1つだけか確認し、アクセシビリティを一度オフ・オンにしてCapswitchを再起動します。" },
      { question: "権限を削除した後に要求できない", answer: "起動中に権限を削除した場合は「Capswitchを再起動」を押し、再起動後に要求します。" },
      { question: "Caps Lockを押しても反応しない", answer: "一時停止、ライセンス、選択中モードを確認し、「診断」の最近のイベントを確認します。" },
      { question: "通常のCaps Lockも動いてしまう", answer: "監視が「稼働中」か確認します。複数コピーを終了し、Applications版だけを起動してください。" },
      { question: "LEDやHUDが変わらない", answer: "「表示」でHUDをオンにし、対象キーボードを再検出して「同期」または「点滅テスト」を実行します。" },
      { question: "マイクを選択できない", answer: "「モード」でマイクを選び、入力デバイスを再検出します。一部のUSB・仮想デバイスはミュート非対応です。" },
      { question: "ライセンスのため停止している", answer: "「ライセンス」を開き、購入済みキーを入力してオンライン確認します。" },
    ],
    supportLead: "解決しない場合は、診断情報を確認してGitHub Issueから問い合わせできます。",
    supportSteps: ["設定の「診断」を開く", "現在のモード・機能状態・アプリ状態を確認", "最近のイベントと再現手順をIssueへ記載"],
    issueButton: "GitHub Issueを開く", privacyNote: "ライセンスキー、購入情報、個人情報は公開Issueへ投稿しないでください。",
    downloadButton: "最新版をダウンロード", settingsAlt: "Capswitchのモード設定画面", menuAlt: "Capswitchのメニューバー画面",
  },
  en: {
    navLabel: "Guide", homeLabel: "Home", kicker: "USER GUIDE", title: "How to use Capswitch", lead: "Set up Capswitch from download to your first mode switch, one step at a time.",
    version: "For Capswitch 1.x", updated: `Updated: ${sharedUpdated}`, contents: "Contents", startLink: "Set up in 5 minutes", troubleLink: "Troubleshooting",
    sectionTitles: { quick: "Get started", install: "Install", permission: "Allow access", basics: "Basic controls", modes: "Choose a mode", display: "HUD and LED", license: "License and updates", trouble: "Troubleshooting", support: "Diagnostics and support" },
    quickLead: "Start using Caps Lock as a switch in six steps.",
    quickSteps: [{ title: "Download", detail: "Get the latest DMG" }, { title: "Move to Applications", detail: "Drag Capswitch from the DMG" }, { title: "Launch", detail: "Open Capswitch from Applications" }, { title: "Allow access", detail: "Enable Capswitch in Accessibility" }, { title: "Choose a mode", detail: "Pick one role in Mode settings" }, { title: "Test it", detail: "Press Caps Lock and check the state" }],
    installLead: "Add Capswitch to Applications from the distribution DMG. Do not keep using it directly from Downloads.",
    installSteps: ["Open the DMG", "Drag Capswitch to Applications", "Launch Capswitch from Applications", "Open Settings from the menu bar icon"],
    installNote: "Multiple copies can receive different macOS permissions. Keep and use only the copy in Applications.",
    permissionLead: "Accessibility access is required to detect Caps Lock. Input Monitoring is not required.", permissionRequired: "Required", permissionDetail: "Accessibility",
    permissionSteps: ["Open Input in Capswitch Settings", "Select Request permission", "Enable Capswitch in macOS Accessibility settings", "Return to Capswitch and select Check again", "Confirm the status is Running"],
    systemPath: "System Settings → Privacy & Security → Accessibility", modeSpecificTitle: "Mode-specific setup",
    modeSpecific: ["Light / Dark: allow Automation", "Microphone: choose the input device to control", "Shortcut: assign macOS Shortcuts"],
    basicsLead: "A single press normally switches state. Volume, timer, and shortcut modes also use repeated taps or press-and-hold.",
    basicCards: [{ label: "Press", title: "Switch the state", detail: "Move the selected mode to its next state" }, { label: "LED", title: "Check at the keyboard", detail: "On, off, and blinking follow the current state" }, { label: "HUD", title: "Check on screen", detail: "Turn the switch overlay on or off in Settings" }, { label: "Multi-tap", title: "Keep native Caps Lock", detail: "Choose three, four, or five taps in Input settings" }],
    modesLead: "Choose one of ten roles based on the repetitive action you most want to remove.", modesHint: "Open a mode to see its controls and state flow.", modeOperation: "Control", modeStates: "States",
    displayLead: "The HUD and physical LED show the current state of the selected mode.", displayItems: ["HUD visibility, position, edge distance, and duration", "Keyboard used for LED feedback", "Which function state lights the LED", "Detect again, sync, and blink test"],
    licenseLead: "Try every feature for 14 days. After purchase, activate the license key in the app.", licenseItems: ["Open the purchase page from License", "Copy the key on the purchase-complete page", "Enter it in the app and select Verify license", "Configure automatic or manual updates in About"],
    troubleLead: "Start with the item closest to the status you see.",
    troubleItems: [{ question: "The app says Stopped", answer: "Open Input, check Accessibility and Pause monitoring, then select Check again." }, { question: "It does not work after allowing access", answer: "Keep only the Applications copy, toggle Accessibility off and on, then restart Capswitch." }, { question: "Permission cannot be requested after removal", answer: "If access was removed while running, select Restart Capswitch and request it after relaunch." }, { question: "Caps Lock does nothing", answer: "Check pause, license, and selected mode, then review Recent events in Diagnostics." }, { question: "Native Caps Lock still changes", answer: "Confirm monitoring is Running. Quit duplicate copies and launch only the Applications copy." }, { question: "The LED or HUD does not change", answer: "Enable the HUD, detect the keyboard again, then run Sync or Blink test in Display." }, { question: "The microphone cannot be selected", answer: "Select Microphone mode and detect inputs again. Some USB and virtual devices do not support mute." }, { question: "Stopped by license", answer: "Open License, enter the purchased key, and verify it online." }],
    supportLead: "If the problem remains, review Diagnostics and contact us through GitHub Issues.", supportSteps: ["Open Diagnostics in Settings", "Check mode, feature state, and app state", "Add recent events and reproduction steps to the Issue"],
    issueButton: "Open GitHub Issues", privacyNote: "Do not post license keys, purchase details, or personal information in a public Issue.", downloadButton: "Download the latest version", settingsAlt: "Capswitch Mode settings", menuAlt: "Capswitch menu bar menu",
  },
  de: {
    navLabel: "Anleitung", homeLabel: "Start", kicker: "BENUTZERHANDBUCH", title: "Capswitch verwenden", lead: "Vom Download bis zum ersten Moduswechsel – Schritt für Schritt.", version: "Für Capswitch 1.x", updated: `Aktualisiert: ${sharedUpdated}`, contents: "Inhalt", startLink: "In 5 Minuten einrichten", troubleLink: "Probleme lösen",
    sectionTitles: { quick: "Schnellstart", install: "Installation", permission: "Zugriff erlauben", basics: "Grundbedienung", modes: "Modus wählen", display: "HUD und LED", license: "Lizenz und Updates", trouble: "Probleme lösen", support: "Diagnose und Support" },
    quickLead: "In sechs Schritten wird Caps Lock zum Umschalter.", quickSteps: [{ title: "Herunterladen", detail: "Aktuelles DMG laden" }, { title: "Nach Programme bewegen", detail: "Capswitch aus dem DMG ziehen" }, { title: "Starten", detail: "Aus Programme öffnen" }, { title: "Zugriff erlauben", detail: "Capswitch in Bedienungshilfen aktivieren" }, { title: "Modus wählen", detail: "Eine Funktion unter Modus wählen" }, { title: "Testen", detail: "Caps Lock drücken und Zustand prüfen" }],
    installLead: "Capswitch aus dem DMG in den Ordner Programme legen und nicht direkt aus Downloads verwenden.", installSteps: ["DMG öffnen", "Capswitch nach Programme ziehen", "Capswitch aus Programme starten", "Einstellungen über das Menüleistensymbol öffnen"], installNote: "Mehrere Kopien können unterschiedliche macOS-Rechte erhalten. Verwende nur die Kopie in Programme.",
    permissionLead: "Bedienungshilfen sind zum Erkennen von Caps Lock erforderlich. Eingabeüberwachung ist nicht erforderlich.", permissionRequired: "Erforderlich", permissionDetail: "Bedienungshilfen", permissionSteps: ["Eingabe in Capswitch öffnen", "Berechtigung anfordern wählen", "Capswitch in den macOS-Bedienungshilfen aktivieren", "Zu Capswitch zurückkehren und Erneut prüfen wählen", "Status Aktiv bestätigen"], systemPath: "Systemeinstellungen → Datenschutz & Sicherheit → Bedienungshilfen", modeSpecificTitle: "Zusätzliche Einrichtung je Modus", modeSpecific: ["Hell / Dunkel: Automation erlauben", "Mikrofon: Eingabegerät wählen", "Kurzbefehl: macOS-Kurzbefehle zuweisen"],
    basicsLead: "Ein Tastendruck schaltet normalerweise um. Lautstärke, Timer und Kurzbefehle nutzen auch Mehrfachtippen oder Halten.", basicCards: [{ label: "Drücken", title: "Zustand wechseln", detail: "Zum nächsten Zustand des Modus wechseln" }, { label: "LED", title: "Am Keyboard prüfen", detail: "An, aus und Blinken folgen dem Zustand" }, { label: "HUD", title: "Am Bildschirm prüfen", detail: "Anzeige in den Einstellungen aktivieren" }, { label: "Mehrfachtipp", title: "Caps Lock weiter nutzen", detail: "Drei, vier oder fünf Tippvorgänge wählen" }],
    modesLead: "Wähle eine von zehn Funktionen für den Ablauf, den du am häufigsten vereinfachen möchtest.", modesHint: "Öffne einen Modus für Bedienung und Zustände.", modeOperation: "Bedienung", modeStates: "Zustände",
    displayLead: "HUD und LED zeigen den aktuellen Zustand.", displayItems: ["HUD, Position, Randabstand und Dauer", "Keyboard für LED-Rückmeldung", "Zuordnung von LED und Zustand", "Neu erkennen, synchronisieren und Blinktest"],
    licenseLead: "Alle Funktionen 14 Tage testen und danach den gekauften Lizenzschlüssel aktivieren.", licenseItems: ["Kaufseite über Lizenz öffnen", "Schlüssel nach dem Kauf kopieren", "Im App-Feld eingeben und Lizenz prüfen", "Updates unter Info konfigurieren"],
    troubleLead: "Wähle den Eintrag, der deinem angezeigten Status entspricht.", troubleItems: [{ question: "Status Gestoppt", answer: "Unter Eingabe Bedienungshilfen und Pause prüfen, dann Erneut prüfen wählen." }, { question: "Nach Freigabe keine Funktion", answer: "Nur die Programme-Kopie behalten, Zugriff aus- und einschalten und Capswitch neu starten." }, { question: "Berechtigung lässt sich nach Entfernen nicht anfordern", answer: "Capswitch neu starten und danach erneut anfordern." }, { question: "Caps Lock reagiert nicht", answer: "Pause, Lizenz und Modus prüfen und die Diagnoseereignisse ansehen." }, { question: "Normales Caps Lock reagiert weiterhin", answer: "Aktiven Status prüfen und doppelte App-Kopien beenden." }, { question: "LED oder HUD ändert sich nicht", answer: "HUD aktivieren, Keyboard neu erkennen und Synchronisieren oder Blinktest ausführen." }, { question: "Mikrofon nicht wählbar", answer: "Eingaben neu erkennen. Manche USB- und virtuellen Geräte unterstützen Stummschalten nicht." }, { question: "Wegen Lizenz gestoppt", answer: "Gekauften Schlüssel unter Lizenz eingeben und online prüfen." }],
    supportLead: "Bleibt das Problem bestehen, Diagnose prüfen und ein GitHub Issue erstellen.", supportSteps: ["Diagnose öffnen", "Modus, Funktions- und App-Status prüfen", "Ereignisse und Schritte im Issue angeben"], issueButton: "GitHub Issues öffnen", privacyNote: "Keine Lizenzschlüssel, Kaufdaten oder persönlichen Daten öffentlich posten.", downloadButton: "Neueste Version laden", settingsAlt: "Capswitch-Moduseinstellungen", menuAlt: "Capswitch-Menüleiste",
  },
  "zh-Hans": {
    navLabel: "使用指南", homeLabel: "首页", kicker: "使用指南", title: "Capswitch 使用方法", lead: "从下载到第一次切换模式，按步骤完成设置。", version: "适用于 Capswitch 1.x", updated: `更新日期：${sharedUpdated}`, contents: "目录", startLink: "5 分钟完成设置", troubleLink: "故障排除",
    sectionTitles: { quick: "快速开始", install: "安装", permission: "允许访问", basics: "基本操作", modes: "选择模式", display: "HUD 与 LED", license: "许可证与更新", trouble: "故障排除", support: "诊断与支持" },
    quickLead: "通过六个步骤把 Caps Lock 变成切换键。", quickSteps: [{ title: "下载", detail: "获取最新 DMG" }, { title: "移到应用程序", detail: "从 DMG 拖动 Capswitch" }, { title: "启动", detail: "从应用程序打开" }, { title: "允许访问", detail: "在辅助功能中启用 Capswitch" }, { title: "选择模式", detail: "在模式设置中选择一个功能" }, { title: "测试", detail: "按 Caps Lock 查看状态变化" }],
    installLead: "请从 DMG 将 Capswitch 添加到应用程序，不要一直从下载目录运行。", installSteps: ["打开 DMG", "将 Capswitch 拖到应用程序", "从应用程序启动 Capswitch", "从菜单栏图标打开设置"], installNote: "多个副本可能获得不同的 macOS 权限。请只保留并使用应用程序中的副本。",
    permissionLead: "检测 Caps Lock 需要辅助功能权限，不需要输入监控权限。", permissionRequired: "必需", permissionDetail: "辅助功能", permissionSteps: ["打开 Capswitch 的输入设置", "点击请求权限", "在 macOS 辅助功能设置中启用 Capswitch", "返回 Capswitch 并点击再次检查", "确认状态为运行中"], systemPath: "系统设置 → 隐私与安全性 → 辅助功能", modeSpecificTitle: "各模式的附加设置", modeSpecific: ["浅色 / 深色：允许自动化", "麦克风：选择要控制的输入设备", "快捷指令：分配 macOS 快捷指令"],
    basicsLead: "通常单击即可切换。音量、计时器和快捷指令模式还会使用连按或长按。", basicCards: [{ label: "单击", title: "切换状态", detail: "让所选模式进入下一个状态" }, { label: "LED", title: "从键盘确认", detail: "亮、灭和闪烁会跟随当前状态" }, { label: "HUD", title: "从屏幕确认", detail: "可在设置中启用或关闭" }, { label: "连按", title: "保留原生 Caps Lock", detail: "可选择连按三、四或五次" }],
    modesLead: "从十种功能中选择最想简化的一项操作。", modesHint: "展开模式可查看操作与状态流程。", modeOperation: "操作", modeStates: "状态",
    displayLead: "HUD 和物理 LED 用来显示当前模式状态。", displayItems: ["HUD 显示、位置、边缘距离和时长", "用于 LED 反馈的键盘", "LED 点亮对应的功能状态", "重新检测、同步和闪烁测试"],
    licenseLead: "全部功能可试用 14 天。购买后在应用中激活许可证密钥。", licenseItems: ["从许可证页面打开购买页", "在购买完成页复制密钥", "输入应用并验证许可证", "在关于中设置自动或手动更新"],
    troubleLead: "请从与当前状态最接近的项目开始。", troubleItems: [{ question: "显示已停止", answer: "在输入中检查辅助功能和暂停设置，然后点击再次检查。" }, { question: "允许权限后仍无法使用", answer: "只保留应用程序中的副本，关闭再开启辅助功能并重启 Capswitch。" }, { question: "删除权限后无法再次请求", answer: "点击重启 Capswitch，重新启动后再请求。" }, { question: "按 Caps Lock 无反应", answer: "检查暂停、许可证和模式，并查看诊断中的最近事件。" }, { question: "原生 Caps Lock 仍会切换", answer: "确认状态为运行中，并退出其他 Capswitch 副本。" }, { question: "LED 或 HUD 不变化", answer: "启用 HUD，重新检测键盘，然后执行同步或闪烁测试。" }, { question: "无法选择麦克风", answer: "重新检测输入设备。部分 USB 或虚拟设备不支持静音。" }, { question: "因许可证而停止", answer: "输入已购买的密钥并在线验证。" }],
    supportLead: "仍未解决时，请查看诊断并通过 GitHub Issues 联系。", supportSteps: ["打开诊断", "检查模式、功能状态和应用状态", "在 Issue 中附上最近事件与复现步骤"], issueButton: "打开 GitHub Issues", privacyNote: "请勿在公开 Issue 中发布许可证密钥、购买信息或个人信息。", downloadButton: "下载最新版", settingsAlt: "Capswitch 模式设置", menuAlt: "Capswitch 菜单栏菜单",
  },
  "zh-Hant": {
    navLabel: "使用指南", homeLabel: "首頁", kicker: "使用指南", title: "Capswitch 使用方法", lead: "從下載到第一次切換模式，依序完成設定。", version: "適用於 Capswitch 1.x", updated: `更新日期：${sharedUpdated}`, contents: "目錄", startLink: "5 分鐘完成設定", troubleLink: "疑難排解",
    sectionTitles: { quick: "快速開始", install: "安裝", permission: "允許存取", basics: "基本操作", modes: "選擇模式", display: "HUD 與 LED", license: "授權與更新", trouble: "疑難排解", support: "診斷與支援" },
    quickLead: "透過六個步驟把 Caps Lock 變成切換鍵。", quickSteps: [{ title: "下載", detail: "取得最新 DMG" }, { title: "移至應用程式", detail: "從 DMG 拖移 Capswitch" }, { title: "啟動", detail: "從應用程式開啟" }, { title: "允許存取", detail: "在輔助使用中啟用 Capswitch" }, { title: "選擇模式", detail: "在模式設定選擇一項功能" }, { title: "測試", detail: "按 Caps Lock 查看狀態" }],
    installLead: "請從 DMG 將 Capswitch 加入應用程式，不要持續從下載項目執行。", installSteps: ["開啟 DMG", "將 Capswitch 拖到應用程式", "從應用程式啟動 Capswitch", "從選單列圖示開啟設定"], installNote: "多個副本可能取得不同的 macOS 權限。請只使用應用程式中的副本。",
    permissionLead: "偵測 Caps Lock 需要輔助使用權限，不需要輸入監控權限。", permissionRequired: "必須", permissionDetail: "輔助使用", permissionSteps: ["開啟 Capswitch 的輸入設定", "按下要求權限", "在 macOS 輔助使用設定啟用 Capswitch", "返回 Capswitch 並按再次檢查", "確認狀態為執行中"], systemPath: "系統設定 → 隱私權與安全性 → 輔助使用", modeSpecificTitle: "各模式的額外設定", modeSpecific: ["淺色 / 深色：允許自動化", "麥克風：選擇要控制的輸入裝置", "捷徑：指派 macOS 捷徑"],
    basicsLead: "一般以單按切換。音量、計時器與捷徑模式也會使用連按或長按。", basicCards: [{ label: "單按", title: "切換狀態", detail: "讓所選模式進入下一個狀態" }, { label: "LED", title: "從鍵盤確認", detail: "亮、滅與閃爍會跟隨目前狀態" }, { label: "HUD", title: "從畫面確認", detail: "可在設定中開啟或關閉" }, { label: "連按", title: "保留原生 Caps Lock", detail: "可選擇連按三、四或五次" }],
    modesLead: "從十種功能中選擇最想簡化的一項操作。", modesHint: "展開模式可查看操作與狀態流程。", modeOperation: "操作", modeStates: "狀態",
    displayLead: "HUD 與實體 LED 會顯示目前模式狀態。", displayItems: ["HUD 顯示、位置、邊緣距離與時間", "用於 LED 回饋的鍵盤", "LED 點亮對應的功能狀態", "重新偵測、同步與閃爍測試"],
    licenseLead: "所有功能可試用 14 天。購買後請在應用程式啟用授權金鑰。", licenseItems: ["從授權頁面開啟購買頁", "在購買完成頁複製金鑰", "輸入應用程式並驗證授權", "在關於中設定自動或手動更新"],
    troubleLead: "請從最接近目前狀態的項目開始。", troubleItems: [{ question: "顯示已停止", answer: "在輸入中檢查輔助使用與暫停設定，再按再次檢查。" }, { question: "允許權限後仍無法使用", answer: "只保留應用程式中的副本，關閉再開啟輔助使用並重新啟動。" }, { question: "刪除權限後無法再次要求", answer: "按下重新啟動 Capswitch，啟動後再要求。" }, { question: "按 Caps Lock 沒有反應", answer: "檢查暫停、授權與模式，再查看診斷中的最近事件。" }, { question: "原生 Caps Lock 仍會切換", answer: "確認狀態為執行中並結束其他副本。" }, { question: "LED 或 HUD 沒有變化", answer: "啟用 HUD、重新偵測鍵盤，並執行同步或閃爍測試。" }, { question: "無法選擇麥克風", answer: "重新偵測輸入裝置。部分 USB 或虛擬裝置不支援靜音。" }, { question: "因授權而停止", answer: "輸入已購買的金鑰並在線驗證。" }],
    supportLead: "仍未解決時，請查看診斷並透過 GitHub Issues 聯絡。", supportSteps: ["開啟診斷", "檢查模式、功能狀態與應用程式狀態", "在 Issue 附上最近事件與重現步驟"], issueButton: "開啟 GitHub Issues", privacyNote: "請勿在公開 Issue 發布授權金鑰、購買資訊或個人資料。", downloadButton: "下載最新版", settingsAlt: "Capswitch 模式設定", menuAlt: "Capswitch 選單列選單",
  },
  fr: {
    navLabel: "Guide", homeLabel: "Accueil", kicker: "GUIDE D’UTILISATION", title: "Utiliser Capswitch", lead: "Du téléchargement au premier changement de mode, étape par étape.", version: "Pour Capswitch 1.x", updated: `Mis à jour : ${sharedUpdated}`, contents: "Sommaire", startLink: "Configurer en 5 minutes", troubleLink: "Dépannage",
    sectionTitles: { quick: "Bien démarrer", install: "Installation", permission: "Autoriser l’accès", basics: "Commandes de base", modes: "Choisir un mode", display: "HUD et LED", license: "Licence et mises à jour", trouble: "Dépannage", support: "Diagnostic et assistance" },
    quickLead: "Transformez Caps Lock en commutateur en six étapes.", quickSteps: [{ title: "Télécharger", detail: "Récupérer le dernier DMG" }, { title: "Déplacer vers Applications", detail: "Faire glisser Capswitch depuis le DMG" }, { title: "Lancer", detail: "Ouvrir depuis Applications" }, { title: "Autoriser", detail: "Activer Capswitch dans Accessibilité" }, { title: "Choisir un mode", detail: "Sélectionner un rôle dans Mode" }, { title: "Tester", detail: "Appuyer sur Caps Lock et vérifier l’état" }],
    installLead: "Ajoutez Capswitch au dossier Applications depuis le DMG et ne l’utilisez pas directement depuis Téléchargements.", installSteps: ["Ouvrir le DMG", "Faire glisser Capswitch vers Applications", "Lancer depuis Applications", "Ouvrir Réglages depuis l’icône de la barre des menus"], installNote: "Plusieurs copies peuvent recevoir des autorisations différentes. N’utilisez que celle du dossier Applications.",
    permissionLead: "L’accès Accessibilité est nécessaire pour détecter Caps Lock. Surveillance de l’entrée n’est pas nécessaire.", permissionRequired: "Requis", permissionDetail: "Accessibilité", permissionSteps: ["Ouvrir Entrée dans Capswitch", "Choisir Demander l’autorisation", "Activer Capswitch dans Accessibilité macOS", "Revenir et choisir Vérifier à nouveau", "Confirmer l’état En cours"], systemPath: "Réglages Système → Confidentialité et sécurité → Accessibilité", modeSpecificTitle: "Réglages selon le mode", modeSpecific: ["Clair / Sombre : autoriser Automatisation", "Microphone : choisir le périphérique d’entrée", "Raccourci : attribuer des raccourcis macOS"],
    basicsLead: "Un appui simple change généralement l’état. Volume, minuteur et raccourci utilisent aussi les appuis répétés ou prolongés.", basicCards: [{ label: "Appui", title: "Changer l’état", detail: "Passer le mode sélectionné à l’état suivant" }, { label: "LED", title: "Vérifier au clavier", detail: "Allumé, éteint et clignotant suivent l’état" }, { label: "HUD", title: "Vérifier à l’écran", detail: "Activer ou désactiver dans les réglages" }, { label: "Appuis répétés", title: "Garder Caps Lock", detail: "Choisir trois, quatre ou cinq appuis" }],
    modesLead: "Choisissez parmi dix rôles l’action répétitive à simplifier en priorité.", modesHint: "Ouvrez un mode pour voir ses commandes et ses états.", modeOperation: "Commande", modeStates: "États",
    displayLead: "Le HUD et la LED physique indiquent l’état du mode.", displayItems: ["Affichage, position, distance et durée du HUD", "Clavier utilisé pour la LED", "État associé à la LED allumée", "Redétection, synchronisation et test"],
    licenseLead: "Essayez toutes les fonctions pendant 14 jours, puis activez la clé achetée.", licenseItems: ["Ouvrir l’achat depuis Licence", "Copier la clé après l’achat", "La saisir et vérifier la licence", "Configurer les mises à jour dans À propos"],
    troubleLead: "Commencez par l’élément le plus proche de l’état affiché.", troubleItems: [{ question: "L’application indique Arrêté", answer: "Dans Entrée, vérifiez Accessibilité et la pause, puis Vérifier à nouveau." }, { question: "Rien ne fonctionne après autorisation", answer: "Gardez uniquement la copie Applications, réactivez l’accès et relancez Capswitch." }, { question: "Impossible de redemander après suppression", answer: "Redémarrez Capswitch puis demandez de nouveau l’autorisation." }, { question: "Caps Lock ne répond pas", answer: "Vérifiez pause, licence et mode, puis les événements du Diagnostic." }, { question: "Caps Lock standard réagit encore", answer: "Confirmez l’état En cours et quittez les copies en double." }, { question: "LED ou HUD ne change pas", answer: "Activez le HUD, redétectez le clavier, puis synchronisez ou lancez le test." }, { question: "Microphone indisponible", answer: "Redétectez les entrées. Certains périphériques USB ou virtuels ne gèrent pas la sourdine." }, { question: "Arrêté par la licence", answer: "Saisissez la clé achetée et vérifiez-la en ligne." }],
    supportLead: "Si le problème persiste, consultez Diagnostic et ouvrez une Issue GitHub.", supportSteps: ["Ouvrir Diagnostic", "Vérifier mode, fonction et état de l’app", "Ajouter événements récents et étapes de reproduction"], issueButton: "Ouvrir GitHub Issues", privacyNote: "Ne publiez jamais de clé, d’achat ou de donnée personnelle dans une Issue publique.", downloadButton: "Télécharger la dernière version", settingsAlt: "Réglages de mode Capswitch", menuAlt: "Menu Capswitch dans la barre des menus",
  },
  ko: {
    navLabel: "사용법", homeLabel: "홈", kicker: "사용자 가이드", title: "Capswitch 사용법", lead: "다운로드부터 첫 모드 전환까지 순서대로 설정하세요.", version: "Capswitch 1.x용", updated: `업데이트: ${sharedUpdated}`, contents: "목차", startLink: "5분 만에 설정", troubleLink: "문제 해결",
    sectionTitles: { quick: "시작하기", install: "설치", permission: "권한 허용", basics: "기본 조작", modes: "모드 선택", display: "HUD와 LED", license: "라이선스와 업데이트", trouble: "문제 해결", support: "진단과 지원" },
    quickLead: "여섯 단계로 Caps Lock을 전환 키로 사용할 수 있습니다.", quickSteps: [{ title: "다운로드", detail: "최신 DMG 받기" }, { title: "응용 프로그램으로 이동", detail: "DMG에서 Capswitch 드래그" }, { title: "실행", detail: "응용 프로그램에서 열기" }, { title: "권한 허용", detail: "손쉬운 사용에서 Capswitch 켜기" }, { title: "모드 선택", detail: "모드 설정에서 기능 하나 선택" }, { title: "테스트", detail: "Caps Lock을 눌러 상태 확인" }],
    installLead: "DMG에서 Capswitch를 응용 프로그램에 추가하고 다운로드 폴더에서 계속 실행하지 마세요.", installSteps: ["DMG 열기", "Capswitch를 응용 프로그램으로 드래그", "응용 프로그램에서 실행", "메뉴 막대 아이콘에서 설정 열기"], installNote: "복사본이 여러 개면 macOS 권한이 다른 앱에 적용될 수 있습니다. 응용 프로그램의 한 복사본만 사용하세요.",
    permissionLead: "Caps Lock 감지에는 손쉬운 사용 권한이 필요합니다. 입력 모니터링은 필요하지 않습니다.", permissionRequired: "필수", permissionDetail: "손쉬운 사용", permissionSteps: ["Capswitch 설정에서 입력 열기", "권한 요청 선택", "macOS 손쉬운 사용에서 Capswitch 켜기", "Capswitch로 돌아와 다시 확인 선택", "상태가 실행 중인지 확인"], systemPath: "시스템 설정 → 개인정보 보호 및 보안 → 손쉬운 사용", modeSpecificTitle: "모드별 추가 설정", modeSpecific: ["라이트 / 다크: 자동화 허용", "마이크: 제어할 입력 장치 선택", "단축어: macOS 단축어 할당"],
    basicsLead: "보통 한 번 눌러 전환합니다. 음량, 타이머, 단축어 모드는 연타와 길게 누르기도 사용합니다.", basicCards: [{ label: "누르기", title: "상태 전환", detail: "선택한 모드를 다음 상태로 전환" }, { label: "LED", title: "키보드에서 확인", detail: "켜짐, 꺼짐, 깜박임이 상태와 연동" }, { label: "HUD", title: "화면에서 확인", detail: "설정에서 표시를 켜거나 끌 수 있음" }, { label: "연타", title: "기본 Caps Lock 유지", detail: "세 번, 네 번, 다섯 번 중 선택" }],
    modesLead: "반복 작업을 가장 줄이고 싶은 기능을 열 가지 중 하나 선택하세요.", modesHint: "모드를 열어 조작과 상태 흐름을 확인하세요.", modeOperation: "조작", modeStates: "상태",
    displayLead: "HUD와 물리 LED가 현재 모드 상태를 보여 줍니다.", displayItems: ["HUD 표시, 위치, 가장자리 거리, 시간", "LED 피드백에 사용할 키보드", "LED 켜짐에 대응하는 기능 상태", "재감지, 동기화, 깜박임 테스트"],
    licenseLead: "모든 기능을 14일간 체험하고 구매 후 키를 앱에서 활성화하세요.", licenseItems: ["라이선스에서 구매 페이지 열기", "구매 완료 페이지에서 키 복사", "앱에 입력하고 라이선스 확인", "정보에서 자동 또는 수동 업데이트 설정"],
    troubleLead: "화면에 표시된 상태와 가장 가까운 항목부터 확인하세요.", troubleItems: [{ question: "중지됨으로 표시", answer: "입력에서 손쉬운 사용과 일시 정지를 확인한 뒤 다시 확인을 누르세요." }, { question: "권한 허용 후에도 동작하지 않음", answer: "응용 프로그램 복사본 하나만 남기고 권한을 껐다 켠 뒤 재시작하세요." }, { question: "권한 삭제 후 다시 요청할 수 없음", answer: "Capswitch 재시작을 누르고 다시 실행된 뒤 요청하세요." }, { question: "Caps Lock이 반응하지 않음", answer: "일시 정지, 라이선스, 모드를 확인하고 진단 이벤트를 확인하세요." }, { question: "기본 Caps Lock도 전환됨", answer: "실행 중인지 확인하고 중복 복사본을 종료하세요." }, { question: "LED 또는 HUD가 바뀌지 않음", answer: "HUD를 켜고 키보드를 재감지한 뒤 동기화나 테스트를 실행하세요." }, { question: "마이크를 선택할 수 없음", answer: "입력을 재감지하세요. 일부 USB 및 가상 장치는 음소거를 지원하지 않습니다." }, { question: "라이선스로 인해 중지", answer: "구매한 키를 입력하고 온라인 확인하세요." }],
    supportLead: "해결되지 않으면 진단을 확인하고 GitHub Issues로 문의하세요.", supportSteps: ["진단 열기", "모드, 기능 상태, 앱 상태 확인", "최근 이벤트와 재현 절차를 Issue에 작성"], issueButton: "GitHub Issues 열기", privacyNote: "공개 Issue에 라이선스 키, 구매 정보, 개인정보를 올리지 마세요.", downloadButton: "최신 버전 다운로드", settingsAlt: "Capswitch 모드 설정", menuAlt: "Capswitch 메뉴 막대 메뉴",
  },
  es: {
    navLabel: "Guía", homeLabel: "Inicio", kicker: "GUÍA DE USO", title: "Cómo usar Capswitch", lead: "Configúralo paso a paso, desde la descarga hasta el primer cambio de modo.", version: "Para Capswitch 1.x", updated: `Actualizado: ${sharedUpdated}`, contents: "Contenido", startLink: "Configurar en 5 minutos", troubleLink: "Solución de problemas",
    sectionTitles: { quick: "Primeros pasos", install: "Instalación", permission: "Permitir acceso", basics: "Controles básicos", modes: "Elegir un modo", display: "HUD y LED", license: "Licencia y actualizaciones", trouble: "Solución de problemas", support: "Diagnóstico y soporte" },
    quickLead: "Convierte Caps Lock en un selector en seis pasos.", quickSteps: [{ title: "Descargar", detail: "Obtén el último DMG" }, { title: "Mover a Aplicaciones", detail: "Arrastra Capswitch desde el DMG" }, { title: "Abrir", detail: "Inicia desde Aplicaciones" }, { title: "Permitir acceso", detail: "Activa Capswitch en Accesibilidad" }, { title: "Elegir modo", detail: "Selecciona una función en Modo" }, { title: "Probar", detail: "Pulsa Caps Lock y comprueba el estado" }],
    installLead: "Añade Capswitch a Aplicaciones desde el DMG y no lo ejecutes continuamente desde Descargas.", installSteps: ["Abre el DMG", "Arrastra Capswitch a Aplicaciones", "Inicia desde Aplicaciones", "Abre Ajustes desde el icono de la barra de menús"], installNote: "Varias copias pueden recibir permisos distintos. Usa solo la copia de Aplicaciones.",
    permissionLead: "Se necesita Accesibilidad para detectar Caps Lock. Monitorización de entrada no es necesaria.", permissionRequired: "Obligatorio", permissionDetail: "Accesibilidad", permissionSteps: ["Abre Entrada en Capswitch", "Pulsa Solicitar permiso", "Activa Capswitch en Accesibilidad de macOS", "Vuelve y pulsa Comprobar de nuevo", "Confirma el estado En ejecución"], systemPath: "Ajustes del Sistema → Privacidad y seguridad → Accesibilidad", modeSpecificTitle: "Configuración por modo", modeSpecific: ["Claro / Oscuro: permite Automatización", "Micrófono: elige el dispositivo de entrada", "Atajo: asigna Atajos de macOS"],
    basicsLead: "Una pulsación suele cambiar el estado. Volumen, temporizador y atajo también usan pulsaciones repetidas o mantenidas.", basicCards: [{ label: "Pulsar", title: "Cambiar estado", detail: "Pasa el modo seleccionado al siguiente estado" }, { label: "LED", title: "Comprobar en el teclado", detail: "Encendido, apagado y parpadeo siguen el estado" }, { label: "HUD", title: "Comprobar en pantalla", detail: "Actívalo o desactívalo en Ajustes" }, { label: "Varias pulsaciones", title: "Mantener Caps Lock", detail: "Elige tres, cuatro o cinco pulsaciones" }],
    modesLead: "Elige entre diez funciones la acción repetitiva que más quieras simplificar.", modesHint: "Abre un modo para ver sus controles y estados.", modeOperation: "Control", modeStates: "Estados",
    displayLead: "El HUD y el LED físico muestran el estado actual.", displayItems: ["HUD, posición, distancia y duración", "Teclado usado para el LED", "Estado asociado al LED encendido", "Volver a detectar, sincronizar y probar"],
    licenseLead: "Prueba todas las funciones durante 14 días y activa la clave tras la compra.", licenseItems: ["Abre la compra desde Licencia", "Copia la clave tras comprar", "Introdúcela y verifica la licencia", "Configura actualizaciones en Acerca de"],
    troubleLead: "Empieza por el elemento que más se parezca al estado mostrado.", troubleItems: [{ question: "Aparece Detenido", answer: "En Entrada, revisa Accesibilidad y la pausa; después pulsa Comprobar de nuevo." }, { question: "No funciona tras permitir acceso", answer: "Conserva solo la copia de Aplicaciones, reactiva el permiso y reinicia." }, { question: "No se puede pedir permiso tras eliminarlo", answer: "Reinicia Capswitch y vuelve a solicitarlo." }, { question: "Caps Lock no responde", answer: "Revisa pausa, licencia y modo, y consulta los eventos de Diagnóstico." }, { question: "Caps Lock normal sigue cambiando", answer: "Confirma En ejecución y cierra copias duplicadas." }, { question: "LED o HUD no cambia", answer: "Activa HUD, detecta de nuevo el teclado y sincroniza o prueba el parpadeo." }, { question: "No se puede elegir micrófono", answer: "Detecta entradas de nuevo. Algunos dispositivos USB o virtuales no admiten silencio." }, { question: "Detenido por licencia", answer: "Introduce la clave comprada y verifícala en línea." }],
    supportLead: "Si continúa, revisa Diagnóstico y contacta mediante GitHub Issues.", supportSteps: ["Abre Diagnóstico", "Comprueba modo, función y estado de la app", "Añade eventos y pasos de reproducción al Issue"], issueButton: "Abrir GitHub Issues", privacyNote: "No publiques claves, compras ni datos personales en un Issue público.", downloadButton: "Descargar la última versión", settingsAlt: "Ajustes de modo de Capswitch", menuAlt: "Menú de Capswitch en la barra de menús",
  },
  it: {
    navLabel: "Guida", homeLabel: "Home", kicker: "GUIDA UTENTE", title: "Come usare Capswitch", lead: "Configuralo passo dopo passo, dal download al primo cambio di modalità.", version: "Per Capswitch 1.x", updated: `Aggiornato: ${sharedUpdated}`, contents: "Indice", startLink: "Configura in 5 minuti", troubleLink: "Risoluzione problemi",
    sectionTitles: { quick: "Per iniziare", install: "Installazione", permission: "Consenti accesso", basics: "Comandi di base", modes: "Scegli una modalità", display: "HUD e LED", license: "Licenza e aggiornamenti", trouble: "Risoluzione problemi", support: "Diagnostica e supporto" },
    quickLead: "Trasforma Caps Lock in un selettore in sei passaggi.", quickSteps: [{ title: "Scarica", detail: "Ottieni l’ultimo DMG" }, { title: "Sposta in Applicazioni", detail: "Trascina Capswitch dal DMG" }, { title: "Avvia", detail: "Apri da Applicazioni" }, { title: "Consenti accesso", detail: "Attiva Capswitch in Accessibilità" }, { title: "Scegli modalità", detail: "Seleziona una funzione in Modalità" }, { title: "Prova", detail: "Premi Caps Lock e controlla lo stato" }],
    installLead: "Aggiungi Capswitch ad Applicazioni dal DMG e non usarlo direttamente da Download.", installSteps: ["Apri il DMG", "Trascina Capswitch in Applicazioni", "Avvia da Applicazioni", "Apri Impostazioni dall’icona nella barra menu"], installNote: "Più copie possono ricevere permessi diversi. Usa solo quella in Applicazioni.",
    permissionLead: "Accessibilità è necessaria per rilevare Caps Lock. Monitoraggio input non è necessario.", permissionRequired: "Obbligatorio", permissionDetail: "Accessibilità", permissionSteps: ["Apri Input in Capswitch", "Seleziona Richiedi permesso", "Attiva Capswitch in Accessibilità macOS", "Torna e seleziona Ricontrolla", "Conferma lo stato In esecuzione"], systemPath: "Impostazioni di Sistema → Privacy e sicurezza → Accessibilità", modeSpecificTitle: "Configurazione per modalità", modeSpecific: ["Chiaro / Scuro: consenti Automazione", "Microfono: scegli il dispositivo di input", "Comando rapido: assegna Comandi Rapidi macOS"],
    basicsLead: "Una pressione cambia normalmente lo stato. Volume, timer e comando rapido usano anche pressioni ripetute o prolungate.", basicCards: [{ label: "Premi", title: "Cambia stato", detail: "Porta la modalità allo stato successivo" }, { label: "LED", title: "Controlla dalla tastiera", detail: "Acceso, spento e lampeggio seguono lo stato" }, { label: "HUD", title: "Controlla sullo schermo", detail: "Attivalo o disattivalo nelle impostazioni" }, { label: "Pressioni multiple", title: "Mantieni Caps Lock", detail: "Scegli tre, quattro o cinque pressioni" }],
    modesLead: "Scegli tra dieci funzioni l’operazione ripetitiva da semplificare.", modesHint: "Apri una modalità per vedere comandi e stati.", modeOperation: "Comando", modeStates: "Stati",
    displayLead: "HUD e LED fisico mostrano lo stato corrente.", displayItems: ["HUD, posizione, distanza e durata", "Tastiera usata per il LED", "Stato associato al LED acceso", "Rileva di nuovo, sincronizza e prova"],
    licenseLead: "Prova tutte le funzioni per 14 giorni e attiva la chiave dopo l’acquisto.", licenseItems: ["Apri l’acquisto da Licenza", "Copia la chiave dopo l’acquisto", "Inseriscila e verifica la licenza", "Configura gli aggiornamenti in Informazioni"],
    troubleLead: "Inizia dalla voce più simile allo stato visualizzato.", troubleItems: [{ question: "Mostra Interrotto", answer: "In Input controlla Accessibilità e pausa, poi Ricontrolla." }, { question: "Non funziona dopo il permesso", answer: "Mantieni solo la copia in Applicazioni, riattiva il permesso e riavvia." }, { question: "Impossibile richiedere dopo la rimozione", answer: "Riavvia Capswitch e richiedi di nuovo." }, { question: "Caps Lock non risponde", answer: "Controlla pausa, licenza e modalità, poi gli eventi in Diagnostica." }, { question: "Caps Lock normale cambia ancora", answer: "Conferma In esecuzione e chiudi copie duplicate." }, { question: "LED o HUD non cambia", answer: "Attiva HUD, rileva la tastiera e sincronizza o prova il lampeggio." }, { question: "Microfono non selezionabile", answer: "Rileva di nuovo gli input. Alcuni dispositivi USB o virtuali non supportano il mute." }, { question: "Interrotto dalla licenza", answer: "Inserisci la chiave acquistata e verificala online." }],
    supportLead: "Se il problema resta, controlla Diagnostica e usa GitHub Issues.", supportSteps: ["Apri Diagnostica", "Controlla modalità, funzione e stato app", "Aggiungi eventi e passaggi di riproduzione"], issueButton: "Apri GitHub Issues", privacyNote: "Non pubblicare chiavi, acquisti o dati personali in una Issue pubblica.", downloadButton: "Scarica l’ultima versione", settingsAlt: "Impostazioni modalità Capswitch", menuAlt: "Menu Capswitch nella barra menu",
  },
  vi: {
    navLabel: "Hướng dẫn", homeLabel: "Trang chủ", kicker: "HƯỚNG DẪN SỬ DỤNG", title: "Cách dùng Capswitch", lead: "Thiết lập từng bước từ tải xuống đến lần chuyển chế độ đầu tiên.", version: "Dành cho Capswitch 1.x", updated: `Cập nhật: ${sharedUpdated}`, contents: "Mục lục", startLink: "Thiết lập trong 5 phút", troubleLink: "Khắc phục sự cố",
    sectionTitles: { quick: "Bắt đầu", install: "Cài đặt", permission: "Cho phép truy cập", basics: "Thao tác cơ bản", modes: "Chọn chế độ", display: "HUD và LED", license: "Giấy phép và cập nhật", trouble: "Khắc phục sự cố", support: "Chẩn đoán và hỗ trợ" },
    quickLead: "Biến Caps Lock thành phím chuyển đổi trong sáu bước.", quickSteps: [{ title: "Tải xuống", detail: "Lấy DMG mới nhất" }, { title: "Chuyển vào Applications", detail: "Kéo Capswitch từ DMG" }, { title: "Khởi chạy", detail: "Mở từ Applications" }, { title: "Cho phép", detail: "Bật Capswitch trong Trợ năng" }, { title: "Chọn chế độ", detail: "Chọn một chức năng trong Chế độ" }, { title: "Kiểm tra", detail: "Nhấn Caps Lock và xem trạng thái" }],
    installLead: "Thêm Capswitch vào Applications từ DMG và không chạy lâu dài từ Downloads.", installSteps: ["Mở DMG", "Kéo Capswitch vào Applications", "Khởi chạy từ Applications", "Mở Cài đặt từ biểu tượng thanh menu"], installNote: "Nhiều bản sao có thể nhận quyền macOS khác nhau. Chỉ dùng bản trong Applications.",
    permissionLead: "Cần quyền Trợ năng để phát hiện Caps Lock. Không cần Giám sát đầu vào.", permissionRequired: "Bắt buộc", permissionDetail: "Trợ năng", permissionSteps: ["Mở Đầu vào trong Capswitch", "Chọn Yêu cầu quyền", "Bật Capswitch trong Trợ năng macOS", "Quay lại và chọn Kiểm tra lại", "Xác nhận trạng thái Đang chạy"], systemPath: "Cài đặt hệ thống → Quyền riêng tư & Bảo mật → Trợ năng", modeSpecificTitle: "Thiết lập theo chế độ", modeSpecific: ["Sáng / Tối: cho phép Tự động hóa", "Micrô: chọn thiết bị đầu vào", "Phím tắt: gán Phím tắt macOS"],
    basicsLead: "Một lần nhấn thường chuyển trạng thái. Âm lượng, hẹn giờ và phím tắt còn dùng nhấn liên tiếp hoặc giữ.", basicCards: [{ label: "Nhấn", title: "Chuyển trạng thái", detail: "Đưa chế độ sang trạng thái tiếp theo" }, { label: "LED", title: "Kiểm tra trên bàn phím", detail: "Sáng, tắt và nhấp nháy theo trạng thái" }, { label: "HUD", title: "Kiểm tra trên màn hình", detail: "Bật hoặc tắt trong cài đặt" }, { label: "Nhấn nhiều lần", title: "Giữ Caps Lock gốc", detail: "Chọn ba, bốn hoặc năm lần nhấn" }],
    modesLead: "Chọn một trong mười chức năng cho thao tác lặp lại bạn muốn giảm nhất.", modesHint: "Mở chế độ để xem thao tác và trạng thái.", modeOperation: "Thao tác", modeStates: "Trạng thái",
    displayLead: "HUD và LED vật lý hiển thị trạng thái hiện tại.", displayItems: ["Hiển thị, vị trí, khoảng cách và thời lượng HUD", "Bàn phím dùng cho LED", "Trạng thái tương ứng khi LED sáng", "Phát hiện lại, đồng bộ và thử nhấp nháy"],
    licenseLead: "Dùng thử mọi chức năng trong 14 ngày và kích hoạt khóa sau khi mua.", licenseItems: ["Mở trang mua từ Giấy phép", "Sao chép khóa sau khi mua", "Nhập và xác minh giấy phép", "Thiết lập cập nhật trong Giới thiệu"],
    troubleLead: "Bắt đầu với mục gần nhất với trạng thái đang thấy.", troubleItems: [{ question: "Hiển thị Đã dừng", answer: "Trong Đầu vào, kiểm tra Trợ năng và tạm dừng rồi chọn Kiểm tra lại." }, { question: "Không hoạt động sau khi cho phép", answer: "Chỉ giữ bản trong Applications, bật lại quyền và khởi động lại." }, { question: "Không thể yêu cầu lại sau khi xóa", answer: "Khởi động lại Capswitch rồi yêu cầu lại." }, { question: "Caps Lock không phản hồi", answer: "Kiểm tra tạm dừng, giấy phép, chế độ và sự kiện Chẩn đoán." }, { question: "Caps Lock gốc vẫn thay đổi", answer: "Xác nhận Đang chạy và thoát các bản sao." }, { question: "LED hoặc HUD không đổi", answer: "Bật HUD, phát hiện lại bàn phím rồi đồng bộ hoặc thử nhấp nháy." }, { question: "Không chọn được micrô", answer: "Phát hiện lại đầu vào. Một số thiết bị USB hoặc ảo không hỗ trợ tắt tiếng." }, { question: "Dừng do giấy phép", answer: "Nhập khóa đã mua và xác minh trực tuyến." }],
    supportLead: "Nếu vẫn còn lỗi, xem Chẩn đoán và liên hệ qua GitHub Issues.", supportSteps: ["Mở Chẩn đoán", "Kiểm tra chế độ, chức năng và trạng thái ứng dụng", "Thêm sự kiện và bước tái hiện vào Issue"], issueButton: "Mở GitHub Issues", privacyNote: "Không đăng khóa, thông tin mua hoặc dữ liệu cá nhân trong Issue công khai.", downloadButton: "Tải phiên bản mới nhất", settingsAlt: "Cài đặt chế độ Capswitch", menuAlt: "Menu Capswitch trên thanh menu",
  },
  th: {
    navLabel: "คู่มือ", homeLabel: "หน้าแรก", kicker: "คู่มือผู้ใช้", title: "วิธีใช้ Capswitch", lead: "ตั้งค่าทีละขั้นตั้งแต่ดาวน์โหลดจนถึงการสลับโหมดครั้งแรก", version: "สำหรับ Capswitch 1.x", updated: `อัปเดต: ${sharedUpdated}`, contents: "สารบัญ", startLink: "ตั้งค่าใน 5 นาที", troubleLink: "แก้ไขปัญหา",
    sectionTitles: { quick: "เริ่มต้นใช้งาน", install: "ติดตั้ง", permission: "อนุญาตการเข้าถึง", basics: "การควบคุมพื้นฐาน", modes: "เลือกโหมด", display: "HUD และ LED", license: "สิทธิ์ใช้งานและอัปเดต", trouble: "แก้ไขปัญหา", support: "การวินิจฉัยและช่วยเหลือ" },
    quickLead: "เปลี่ยน Caps Lock เป็นปุ่มสลับในหกขั้นตอน", quickSteps: [{ title: "ดาวน์โหลด", detail: "รับ DMG ล่าสุด" }, { title: "ย้ายไป Applications", detail: "ลาก Capswitch จาก DMG" }, { title: "เปิด", detail: "เปิดจาก Applications" }, { title: "อนุญาต", detail: "เปิด Capswitch ในการช่วยการเข้าถึง" }, { title: "เลือกโหมด", detail: "เลือกหนึ่งฟังก์ชันในโหมด" }, { title: "ทดสอบ", detail: "กด Caps Lock และดูสถานะ" }],
    installLead: "เพิ่ม Capswitch ไปยัง Applications จาก DMG และอย่าเรียกใช้จาก Downloads ต่อเนื่อง", installSteps: ["เปิด DMG", "ลาก Capswitch ไป Applications", "เปิดจาก Applications", "เปิดการตั้งค่าจากไอคอนแถบเมนู"], installNote: "สำเนาหลายชุดอาจได้รับสิทธิ์ macOS ต่างกัน ใช้เฉพาะชุดใน Applications",
    permissionLead: "ต้องใช้สิทธิ์การช่วยการเข้าถึงเพื่อตรวจจับ Caps Lock ไม่ต้องใช้การตรวจสอบอินพุต", permissionRequired: "จำเป็น", permissionDetail: "การช่วยการเข้าถึง", permissionSteps: ["เปิดอินพุตใน Capswitch", "เลือกขอสิทธิ์", "เปิด Capswitch ในการช่วยการเข้าถึงของ macOS", "กลับมาและเลือกตรวจสอบอีกครั้ง", "ยืนยันว่าสถานะกำลังทำงาน"], systemPath: "การตั้งค่าระบบ → ความเป็นส่วนตัวและความปลอดภัย → การช่วยการเข้าถึง", modeSpecificTitle: "การตั้งค่าเฉพาะโหมด", modeSpecific: ["สว่าง / มืด: อนุญาตระบบอัตโนมัติ", "ไมโครโฟน: เลือกอุปกรณ์อินพุต", "คำสั่งลัด: กำหนดคำสั่งลัด macOS"],
    basicsLead: "โดยทั่วไปกดหนึ่งครั้งเพื่อสลับ ระดับเสียง ตัวจับเวลา และคำสั่งลัดยังใช้การกดซ้ำหรือกดค้าง", basicCards: [{ label: "กด", title: "สลับสถานะ", detail: "เปลี่ยนโหมดไปยังสถานะถัดไป" }, { label: "LED", title: "ตรวจสอบที่แป้นพิมพ์", detail: "เปิด ปิด และกะพริบตามสถานะ" }, { label: "HUD", title: "ตรวจสอบบนหน้าจอ", detail: "เปิดหรือปิดได้ในการตั้งค่า" }, { label: "กดหลายครั้ง", title: "คง Caps Lock ปกติ", detail: "เลือกกดสาม สี่ หรือห้าครั้ง" }],
    modesLead: "เลือกหนึ่งในสิบฟังก์ชันสำหรับงานซ้ำที่ต้องการลดมากที่สุด", modesHint: "เปิดโหมดเพื่อดูการควบคุมและสถานะ", modeOperation: "การควบคุม", modeStates: "สถานะ",
    displayLead: "HUD และ LED แสดงสถานะปัจจุบัน", displayItems: ["การแสดง ตำแหน่ง ระยะขอบ และเวลา HUD", "แป้นพิมพ์สำหรับ LED", "สถานะที่ตรงกับ LED เปิด", "ตรวจจับใหม่ ซิงค์ และทดสอบกะพริบ"],
    licenseLead: "ทดลองทุกฟังก์ชัน 14 วัน และเปิดใช้คีย์หลังซื้อ", licenseItems: ["เปิดหน้าซื้อจากสิทธิ์ใช้งาน", "คัดลอกคีย์หลังซื้อ", "ป้อนและตรวจสอบสิทธิ์", "ตั้งค่าอัปเดตในเกี่ยวกับ"],
    troubleLead: "เริ่มจากหัวข้อที่ใกล้กับสถานะที่เห็น", troubleItems: [{ question: "แสดงว่าหยุด", answer: "ในอินพุต ตรวจสอบการช่วยการเข้าถึงและการหยุดชั่วคราว แล้วตรวจสอบอีกครั้ง" }, { question: "ไม่ทำงานหลังอนุญาต", answer: "เก็บเฉพาะชุดใน Applications เปิดสิทธิ์ใหม่และรีสตาร์ต" }, { question: "ขอสิทธิ์ไม่ได้หลังลบ", answer: "รีสตาร์ต Capswitch แล้วขออีกครั้ง" }, { question: "Caps Lock ไม่ตอบสนอง", answer: "ตรวจสอบหยุดชั่วคราว สิทธิ์ โหมด และเหตุการณ์วินิจฉัย" }, { question: "Caps Lock ปกติยังเปลี่ยน", answer: "ยืนยันว่าสถานะกำลังทำงานและปิดสำเนาอื่น" }, { question: "LED หรือ HUD ไม่เปลี่ยน", answer: "เปิด HUD ตรวจจับแป้นพิมพ์ใหม่ แล้วซิงค์หรือทดสอบ" }, { question: "เลือกไมโครโฟนไม่ได้", answer: "ตรวจจับอินพุตใหม่ อุปกรณ์ USB หรือเสมือนบางชนิดไม่รองรับปิดเสียง" }, { question: "หยุดเพราะสิทธิ์ใช้งาน", answer: "ป้อนคีย์ที่ซื้อและตรวจสอบออนไลน์" }],
    supportLead: "หากยังมีปัญหา ให้ดูการวินิจฉัยและติดต่อผ่าน GitHub Issues", supportSteps: ["เปิดการวินิจฉัย", "ตรวจสอบโหมด ฟังก์ชัน และสถานะแอป", "เพิ่มเหตุการณ์และขั้นตอนทำซ้ำใน Issue"], issueButton: "เปิด GitHub Issues", privacyNote: "อย่าโพสต์คีย์ ข้อมูลการซื้อ หรือข้อมูลส่วนตัวใน Issue สาธารณะ", downloadButton: "ดาวน์โหลดเวอร์ชันล่าสุด", settingsAlt: "การตั้งค่าโหมด Capswitch", menuAlt: "เมนู Capswitch บนแถบเมนู",
  },
};
