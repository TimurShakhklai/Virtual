const Keyboard = {
  
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false,
    english: true,
    curentCursor: 0
  },
  keyLayoutEng: [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
    "done","q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
    "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
    "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
    "language", "space", "<", ">"
  ],
  keyShiftEng: [
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "backspace",
    "done","Q", "W", "E", "R", "T", "Y", "U", "I", "O", "p", "{", "}",
    "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "enter",
    "shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "/",
    "language", "space", "<", ">"
  ],
  keyLayoutRus:[
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
    "done","й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
    "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
    "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
    "language", "space", "<", ">"
  ],
  keyShiftRus: [
    "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "backspace",
    "done","Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ",
    "caps", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "enter",
    "shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "\,",
    "language", "space", "<", ">"
  ],
  insertLineBreakEng: ["backspace", "]", "enter", "?"],
  insertLineBreakEngShift: ["backspace", "}", "enter", "/"],
  insertLineBreakRus: ["backspace", "Ъ", "enter", "."],
  insertLineBreakRusShift: ["backspace", "Ъ", "enter", ","],

  init() {
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
      element.addEventListener("click", () => {
        element.selectionStart = this.properties.curentCursor;
        element.selectionEnd = this.properties.curentCursor;
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();

    var keysMain = this.keyLayoutEng;
    var insertLineBreakMain = this.insertLineBreakEng;

    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keysMain.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = insertLineBreakMain.indexOf(key) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");
          keyElement.id = 'back';
          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          keyElement.id = "caps";

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });

          break;

        case "shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.textContent = "Shift";
          keyElement.id = "shift";

          keyElement.addEventListener("click", () => {
            this._toggleShift();
            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
            
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");
          keyElement.id = "enter";

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.toString().splice(this.properties.curentCursor, 0, "\n");
            this.properties.curentCursor+=1;
            this._triggerEvent("oninput");
            var elem = document.getElementById("myTextArea");
            elem.selectionStart = this.properties.curentCursor;
            elem.selectionEnd = this.properties.curentCursor;
            elem.focus();
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");
          keyElement.id = "space";

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.toString().splice(this.properties.curentCursor, 0, " ");
            this.properties.curentCursor+=1;
            this._triggerEvent("oninput");
            var elem = document.getElementById("myTextArea");
            elem.selectionStart = this.properties.curentCursor;
            elem.selectionEnd = this.properties.curentCursor;
            elem.focus();
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("keyboard");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        case "language":
           keyElement.textContent = "en/ru";

          keyElement.addEventListener("click", () => {
            this.properties.english = !this.properties.english;
            this._toggleLanguage();
          });

        break;

        case "<":
            keyElement.textContent = key;
            keyElement.id = "<";
            keyElement.addEventListener("click", () => {
              this.setCaretPosition("myTextArea", -1);
            });
  
            break;

        case ">":
              keyElement.textContent = key;
              keyElement.id = ">";
              keyElement.addEventListener("click", () => {
                this.setCaretPosition("myTextArea", 1);
              });
    
            break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.toString().splice(this.properties.curentCursor, 0, keyElement.textContent);
            this.properties.curentCursor+=1;
            this._triggerEvent("oninput");
            var elem = document.getElementById("myTextArea");
            elem.selectionStart = this.properties.curentCursor;
            elem.selectionEnd = this.properties.curentCursor;
            elem.focus();
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },
  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    this._changeSymbols();
  },
  _toggleShift(){
    this.properties.shift = !this.properties.shift;
    this._changeSymbols();
  },
  _toggleLanguage(){
    this._changeSymbols();
  },

  _changeSymbols(){
    var keysMain = this.keyLayoutEng;
    if(this.properties.shift && this.properties.english) {
      keysMain = this.keyShiftEng;
    }
    if(this.properties.shift && !this.properties.english) {
      keysMain = this.keyShiftRus;
    }
    if(!this.properties.shift && !this.properties.english) {
      keysMain = this.keyLayoutRus;
    }
    let i = 0;
    for (const key of this.elements.keys) {
      if (keysMain[i]!="backspace"
        && keysMain[i]!="space"
        && keysMain[i]!="enter"
        && keysMain[i]!="done"
        && keysMain[i]!="caps"
        && keysMain[i]!="language"
        && keysMain[i]!="<" &&  keysMain[i]!=">") {
        key.textContent = keysMain[i];
        if(keysMain[i]!="shift" && keysMain[i]!="caps" && key.childElementCount === 0 && this.properties.shift && this.properties.capsLock){
          key.textContent = key.textContent.toLowerCase();
        }
        if(keysMain[i]!="shift" && keysMain[i]!="caps" && key.childElementCount === 0 && !this.properties.shift && this.properties.capsLock){
          key.textContent = key.textContent.toUpperCase();
        }
        if(keysMain[i]!="shift" && keysMain[i]!="caps" && key.childElementCount === 0 && this.properties.shift && !this.properties.capsLock){
          key.textContent = key.textContent.toUpperCase();
        }
        if(keysMain[i]!="shift" && keysMain[i]!="caps" && key.childElementCount === 0 && !this.properties.shift && !this.properties.capsLock){
          key.textContent = key.textContent.toLowerCase();
        }
      }
      i++;
    }    
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  },

  setCaretPosition(elemId, caretPos) {
    var elem = document.getElementById(elemId);
    elem.focus();
  
    var position = elem.selectionStart;
  
    if(elem != null) {
      elem.selectionStart = position+caretPos;
      elem.selectionEnd = position+caretPos;
      this.properties.curentCursor = position+caretPos;
    }
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});
