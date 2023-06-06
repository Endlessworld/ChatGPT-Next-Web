import { SubmitKey } from "../store/config";
import type { LocaleType } from "./index";

const cs: LocaleType = {
  WIP: "V přípravě...",
  Error: {
    Unauthorized: `Přístupové heslo není správné nebo není zadáno. Přejděte na stránku [设置](/#/settings) a zadejte správné přístupové heslo. 
    Pokud používáte poprvé, přejděte na veřejný účet 【[微聊小助手]()】 a odešlete "密码" nebo navštivte [forum.xr21.me](https://forum.xr21.me), 
    abyste získali přístupové heslo. Nebo můžete zadat svůj klíč "OpenAI API", aby se tato omezení odstranila.
    ![weixin](/weixin-logo.png)  ![tme](/t-logo.jpg)
    `,
    HelloMessage: `Vítejte v "X-ChatGPT"
      K dispozici je bezplatný kanál, který vám poskytuje 15 bezplatných zkušebních přístupů na hodinu / ip.
      Můžete použít přístupové heslo k odemčení až 30 bezplatných přístupů na hodinu / ip.
      Můžete naskenovat následující QR kód a odebírat veřejný účet WeChat "微聊小助手" a poslat "password" pro bezplatné získání přístupového hesla.
      Nebo můžete zadat svůj vlastní OpenAI API klíč k odstranění tohoto omezení.
      Další informace naleznete na [ChatGPT论坛](https://forum.xr21.me)
      ![weixin](/weixin-logo.png) ![tme](/t-logo.jpg)
     `,
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} zpráv`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} zpráv s ChatGPT`,
    Actions: {
      ChatList: "Přejít na seznam chatů",
      CompressedHistory: "Pokyn z komprimované paměti historie",
      Export: "Exportovat všechny zprávy jako Markdown",
      Copy: "Kopírovat",
      Stop: "Zastavit",
      Retry: "Zopakovat",
      Delete: "Smazat",
      Replace: "Nahradit vybrané",
      Merge: "Sloučit kódy",
    },
    Rename: "Přejmenovat chat",
    Typing: "Píše...",
    Input: (submitKey: string) => {
      var inputHints = `${submitKey} pro odeslání`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", Shift + Enter pro řádkování";
      }
      return inputHints + ", / pro vyhledávání pokynů";
    },
    Send: "Odeslat",
    Config: {
      Reset: "Obnovit výchozí",
      SaveAs: "Uložit jako Masku",
    },
  },
  Export: {
    Title: "Všechny zprávy",
    Copy: "Kopírovat vše",
    Download: "Stáhnout",
    MessageFromYou: "Zpráva od vás",
    MessageFromChatGPT: "Zpráva z ChatGPT",
  },
  Memory: {
    Title: "Pokyn z paměti",
    EmptyContent: "Zatím nic.",
    Send: "Odeslat paměť",
    Copy: "Kopírovat paměť",
    Reset: "Obnovit relaci",
    ResetConfirm:
      "Resetováním se vymaže historie aktuálních konverzací i paměť historie pokynů. Opravdu chcete provést obnovu?",
  },
  Home: {
    NewChat: "Nový chat",
    DeleteChat: "Potvrzujete smazání vybrané konverzace?",
    DeleteToast: "Chat smazán",
    Revert: "Zvrátit",
  },
  Settings: {
    Title: "Nastavení",
    SubTitle: "Všechna nastavení",
    Actions: {
      ClearAll: "Vymazat všechna data",
      ResetAll: "Obnovit veškeré nastavení",
      Close: "Zavřít",
      ConfirmResetAll: "Jste si jisti, že chcete obnovit všechna nastavení?",
      ConfirmClearAll: "Jste si jisti, že chcete smazat všechna data?",
    },
    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "Všechny jazyky",
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Velikost písma",
      SubTitle: "Nastavení velikosti písma obsahu chatu",
    },
    Update: {
      Version: (x: string) => `Verze: ${x}`,
      IsLatest: "Aktuální verze",
      CheckUpdate: "Zkontrolovat aktualizace",
      IsChecking: "Kontrola aktualizace...",
      FoundUpdate: (x: string) => `Nalezena nová verze: ${x}`,
      GoToUpdate: "Aktualizovat",
    },
    SendKey: "Odeslat klíč",
    Theme: "Téma",
    ApiServerAddress: "服务地址",
    TightBorder: "Těsné ohraničení",
    SendPreviewBubble: {
      Title: "Odesílat chatovací bublinu s náhledem",
      SubTitle: "Zobrazit v náhledu bubliny",
    },
    Mask: {
      Title: "Úvodní obrazovka Masek",
      SubTitle: "Před zahájením nového chatu zobrazte úvodní obrazovku Masek",
    },
    Prompt: {
      Disable: {
        Title: "Deaktivovat automatické dokončování",
        SubTitle: "Zadejte / pro spuštění automatického dokončování",
      },
      List: "Seznam pokynů",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} vestavěných, ${custom} uživatelských`,
      Edit: "Upravit",
      Modal: {
        Title: "Seznam pokynů",
        Add: "Přidat pokyn",
        Search: "Hledat pokyny",
      },
      EditModal: {
        Title: "Editovat pokyn",
      },
    },
    HistoryCount: {
      Title: "Počet připojených zpráv",
      SubTitle: "Počet odeslaných připojených zpráv na žádost",
    },
    CompressThreshold: {
      Title: "Práh pro kompresi historie",
      SubTitle:
        "Komprese proběhne, pokud délka nekomprimovaných zpráv přesáhne tuto hodnotu",
    },
    Token: {
      Title: "API klíč",
      SubTitle: "Použitím klíče ignorujete omezení přístupového kódu",
      Placeholder: "Klíč API OpenAI",
    },
    Usage: {
      Title: "Stav účtu",
      SubTitle(used: any, total: any) {
        return `Použito tento měsíc $${used}, předplaceno $${total}`;
      },
      IsChecking: "Kontroluji...",
      Check: "Zkontrolovat",
      NoAccess: "Pro kontrolu zůstatku zadejte klíč API",
    },
    AccessCode: {
      Title: "Přístupový kód",
      SubTitle: "Kontrola přístupu povolena",
      Placeholder: "Potřebujete přístupový kód",
    },
    Model: "Model",
    Temperature: {
      Title: "Teplota",
      SubTitle: "Větší hodnota činí výstup náhodnějším",
    },
    MaxTokens: {
      Title: "Max. počet tokenů",
      SubTitle: "Maximální délka vstupního tokenu a generovaných tokenů",
    },
    PresencePenalty: {
      Title: "Přítomnostní korekce",
      SubTitle: "Větší hodnota zvyšuje pravděpodobnost nových témat.",
    },
  },
  Store: {
    DefaultTopic: "Nová konverzace",
    BotHello: "Ahoj! Jak mohu dnes pomoci?",
    Error: "Něco se pokazilo, zkuste to prosím později.",
    Prompt: {
      History: (content: string) =>
        "Toto je shrnutí historie chatu mezi umělou inteligencí a uživatelem v podobě rekapitulace: " +
        content,
      Topic:
        "Vytvořte prosím název o čtyřech až pěti slovech vystihující průběh našeho rozhovoru bez jakýchkoli úvodních slov, interpunkčních znamének, uvozovek, teček, symbolů nebo dalšího textu. Odstraňte uvozovky.",
      Summarize:
        "Krátce shrň naši diskusi v rozsahu do 200 slov a použij ji jako podnět pro budoucí kontext.",
    },
  },
  Replace: {
    Success: "Kódový blok byl nahrazen/vložen do editoru",
    Failed: "Kopírování se nezdařilo, povolte přístup k schránce",
  },
  Merge: {
    Success: "Bylo otevřeno okno pro sloučení kódu",
    Failed: "Nepodařilo se otevřít okno pro sloučení kódu",
  },
  Copy: {
    Success: "Zkopírováno do schránky",
    Failed: "Kopírování selhalo, prosím, povolte přístup ke schránce",
  },
  Context: {
    Toast: (x: any) => `Použití ${x} kontextových pokynů`,
    Edit: "Kontextové a paměťové pokyny",
    Add: "Přidat pokyn",
  },
  Plugin: {
    Name: "Plugin",
  },
  Shopping: {
    Name: "Nakupování",
  },
  Mask: {
    Name: "Maska",
    Page: {
      Title: "Šablona pokynu",
      SubTitle: (count: number) => `${count} šablon pokynů`,
      Search: "Hledat v šablonách",
      Create: "Vytvořit",
    },
    Item: {
      Info: (count: number) => `${count} pokynů`,
      Chat: "Chat",
      View: "Zobrazit",
      Edit: "Upravit",
      Delete: "Smazat",
      DeleteConfirm: "Potvrdit smazání?",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `Editovat šablonu pokynu ${readonly ? "(pouze ke čtení)" : ""}`,
      Download: "Stáhnout",
      Clone: "Duplikovat",
    },
    Config: {
      Avatar: "Avatar Bota",
      Name: "Jméno Bota",
    },
  },
  NewChat: {
    Return: "Zpět",
    Skip: "Přeskočit",
    Title: "Vyberte Masku",
    SubTitle: "Chatovat s duší za Maskou",
    More: "Najít více",
    NotShow: "Nezobrazovat znovu",
    ConfirmNoShow: "Potvrdit zakázání？Můžete jej povolit později v nastavení.",
  },

  UI: {
    Confirm: "Potvrdit",
    Cancel: "Zrušit",
    Close: "Zavřít",
    Create: "Vytvořit",
    Edit: "Upravit",
  },
};

export default cs;
